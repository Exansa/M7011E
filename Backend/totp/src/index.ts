'use strict';

import express, { Request, Response } from 'express';
import Rabbitmq from '../../common/rabbitmq';
import DB from '../../common/db';
import { verify, generate } from './totp';

const PENDING_TOTP_TIME = 300000; // 5 minutes

const app: express.Application = express();

const port = 8081;

app.use(express.json());

const rabbitmq = new Rabbitmq();

rabbitmq.listen('totp.generate', async (message) => {
	// Parse message body and assert JWT parameter
	const data = JSON.parse(message.content.toString());
	if (!data.jwt) {
		return { success: false, response: 'Missing param "jwt' };
	}
	// Get user object by verify JWT. Return if error
	const userResponse = await rabbitmq.sendRPC(
		'authentication.verify',
		JSON.stringify({ jwt: data.jwt })
	);
	if (!userResponse.success) {
		return userResponse;
	}
	// Parse user object and assert _id parameter. Return if error
	const user = JSON.parse(userResponse.response);
	if (!user._id) {
		return { success: false, response: 'user object missing _id' };
	}
	// Generate secret and save as pending to database. Return if error
	const secret = generate(user._id);
	const dbResponse = await DB.performQuery('users', 'totp', (collection) =>
		collection.updateOne(
			{ user_id: user._id },
			{
				$set: {
					user_id: user._id,
					pending_secret: secret.secret,
					pending_date: Date.now()
				}
			},
			{ upsert: true }
		)
	);
	if (!dbResponse) {
		return {
			success: false,
			response: 'Failed to save secret to database'
		};
	}
	// Return the secret used to verify the TOTP (and Google Authenticator compatible URL)
	return { success: true, response: JSON.stringify(secret) };
});

rabbitmq.listen('totp.save', async (message) => {
	// Parse message body and assert parameters for JWT and TOTP
	const data = JSON.parse(message.content.toString());
	if (!data.jwt) {
		return { success: false, status: 400, response: '' };
	}
	if (!data.totp) {
		return { success: false, status: 400, response: 'Missing param "totp' };
	}
	// Verify JWT and return if error
	const userResponse = await rabbitmq.sendRPC(
		'authentication.verify',
		JSON.stringify(data)
	);
	if (!userResponse.success) {
		return userResponse;
	}
	// Parse user object and assert _id parameter. Return if error
	const user = JSON.parse(userResponse.response);
	if (!user._id) {
		return { success: false, response: 'user object missing _id' };
	}
	// Update databse with secret and remove pending secret. Return if any error
	return await DB.performQuery('users', 'totp', async (collection) => {
		const dbUser = await collection.findOne({ user_id: user._id });
		if (!dbUser) {
			return { success: false, status: 404, response: 'User not found' };
		}
		if (!dbUser.pending_secret) {
			return {
				success: false,
				status: 400,
				response: 'No pending secret'
			};
		}
		if (Date.now() - dbUser.pending_date > PENDING_TOTP_TIME) {
			return {
				success: false,
				status: 400,
				response: 'Pending secret expired'
			};
		}
		if (!verify(dbUser.pending_secret, data.totp)) {
			return { success: false, status: 400, response: 'Invalid TOTP' };
		}
		const updated = await collection.updateOne(
			{ user_id: user._id },
			{
				$set: {
					secret: dbUser.pending_secret,
					pending_secret: null,
					pending_date: null
				}
			}
		);
		if (!updated) {
			return {
				success: false,
				response: 'Failed to update database'
			};
		}
		return { success: true, response: 'TOTP saved' };
	});
});

rabbitmq.listen('totp.verify', async (message) => {
	// Parse message body and assert parameters for JWT and TOTP
	const data = JSON.parse(message.content.toString());
	if (!data.jwt) {
		return { success: false, status: 400, response: 'Missing param "jwt' };
	}
	if (!data.totp) {
		return {
			success: false,
			status: 400,
			response: 'Missing param "totp"'
		};
	}
	// Verify JWT and return if error
	const userResponse = await rabbitmq.sendRPC(
		'authentication.verify',
		JSON.stringify(data)
	);
	if (!userResponse.success) {
		return userResponse;
	}
	// Parse user object and assert _id parameter. Return if error
	const user = JSON.parse(userResponse.response);
	if (!user._id) {
		return { success: false, response: 'user object missing _id' };
	}
	return await DB.performQuery('users', 'totp', async (collection) => {
		const dbUser = await collection.findOne(
			{ user_id: user._id },
			{ projection: { secret: 1 } }
		);
		if (!dbUser) {
			return { success: false, status: 404, response: 'User not found' };
		}
		if (!dbUser.secret) {
			return {
				success: false,
				status: 400,
				response: 'User does not use TOTP'
			};
		}
		if (!verify(dbUser.secret, data.totp)) {
			return { success: false, status: 400, response: 'Invalid TOTP' };
		}
		return { success: true, response: 'TOTP verified' };
	});
});

app.get('/healthcheck', (_: Request, res: Response) => {
	res.send({ status: 'ok' });
});

// Server setup
app.listen(port, () => {
	console.info(`Started Service totp`);
});
