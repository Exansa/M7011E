import { ConsumeMessage } from 'amqplib';
import bcrypt from 'bcryptjs';
import Rabbitmq, { RPCResponse } from '../../common/rabbitmq';
import DB from '../../common/db';

export default async (message: ConsumeMessage): Promise<RPCResponse> => {
	console.info('authentication.login');
	const { email, username, password, totp, lts } = JSON.parse(
		message.content.toString()
	);
	if (!(email || username)) {
		return { success: false, response: 'Missing param email or username' };
	}
	if (!password) {
		return { success: false, response: 'Missing param password' };
	}

	// Get user from database
	const unauthenticatedUser = await DB.performQuery(
		'users',
		'users',
		(collection) =>
			collection.findOne({
				$or: [{ email }, { username }]
			})
	);

	// If used doesnt exist, or password is wrong, return error.
	// ! WARN: This is a security issue, as it tells the user if the email or username exists or not.
	// ! This is done to make the code easier to debug and understand.
	if (!unauthenticatedUser) {
		return {
			success: false,
			status: 404,
			response: 'User not found'
		};
	}
	// Ugly solution to check if the result is a user object that contains a password field. Else return as probably error.
	if (!unauthenticatedUser.password) {
		return { success: false, status: 500, response: unauthenticatedUser };
	}
	if (!bcrypt.compareSync(password, unauthenticatedUser.password)) {
		return {
			success: false,
			status: 401,
			response: 'Wrong password'
		};
	}

	// If user uses TOTP, make sure code is provided, and then verify it.
	const usesOTP = await DB.performQuery(
		'users',
		'totp',
		async (collection) =>
			await collection.findOne({
				user_id: unauthenticatedUser._id.toString()
			})
	);
	if (usesOTP) {
		if (!totp) {
			return {
				success: false,
				status: 401,
				response: 'Missing param totp'
			};
		}
		if (!totp.match(/^[0-9]{6}$/)) {
			return {
				success: false,
				status: 401,
				response: 'Invalid param totp'
			};
		}
		const totpVerificationResponse = await Rabbitmq.sendRPC(
			'totp.verify',
			JSON.stringify({ userId: unauthenticatedUser._id, totp })
		);
		if (!totpVerificationResponse.success) {
			return totpVerificationResponse;
		}
	}

	// Remove the password from the user object.
	const { password: _, ...user } = unauthenticatedUser;
	const exp = Date.now() + 1000 * (lts === true ? 31536000 : 3600);

	// Sign JWT
	const jwtResponse = await Rabbitmq.sendRPC(
		'authentication.sign',
		JSON.stringify({ ...user, exp: Math.floor(exp / 1000) })
	);

	// Save session to database
	await saveSession(user, jwtResponse.response, exp);

	// Return JWT
	return jwtResponse;
};

const saveSession = async (user: any, jwt: string, expiration: number) => {
	const session = {
		user_id: user._id,
		token: jwt,
		last_used: new Date(),
		expiration: new Date(expiration)
	};
	await DB.performQuery('users', 'sessions', (collection) =>
		collection.insertOne(session)
	);
	return session;
};
