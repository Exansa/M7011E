import { ConsumeMessage } from 'amqplib';
import { RPCResponse } from '../../common/rabbitmq';
import bcrypt from 'bcryptjs';
import DB from '../../common/db';

export default async (message: ConsumeMessage): Promise<RPCResponse> => {
	const { username, email, password } = JSON.parse(
		message.content.toString()
	);
	if (!username) {
		return {
			success: false,
			status: 400,
			response: 'Missing parameter username'
		};
	}
	if (!email) {
		return {
			success: false,
			status: 400,
			response: 'Missing parameter email'
		};
	}
	if (!password) {
		return {
			success: false,
			status: 400,
			response: 'Missing parameter password'
		};
	}
	return await DB.performQuery('users', 'users', async (collection) => {
		const existingUser = await collection.findOne({
			$or: [{ username }, { email }]
		});
		if (existingUser) {
			return {
				success: false,
				status: 400,
				response: 'User already exists'
			};
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const createdAt = new Date();
		const createdUser = await collection.insertOne({
			username,
			email,
			password: hashedPassword,
			profile_picture_url: null,
			createdAt
		});
		if (!createdUser) {
			return {
				success: false,
				response: 'User could not be created'
			};
		}
		return { success: true, status: 201, response: 'User created' };
	});
};
