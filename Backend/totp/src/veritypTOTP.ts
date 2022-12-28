import { ConsumeMessage } from 'amqplib';
import Rabbitmq from '../../common/rabbitmq';
import DB from '../../common/db';
import { verify } from './totp';

export default async (message: ConsumeMessage) => {
	// Parse message body and assert parameters for JWT and TOTP
	const { userId, totp } = JSON.parse(message.content.toString());
	if (!userId) {
		return {
			success: false,
			status: 400,
			response: 'Missing param userId'
		};
	}
	if (!totp) {
		return {
			success: false,
			status: 400,
			response: 'Missing param totp'
		};
	}

	return await DB.performQuery('users', 'totp', async (collection) => {
		const dbUser = await collection.findOne(
			{ user_id: userId },
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
		if (!verify(dbUser.secret, totp)) {
			return { success: false, status: 400, response: 'Invalid TOTP' };
		}
		return { success: true, response: 'TOTP verified' };
	});
};
