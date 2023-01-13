import { ConsumeMessage } from 'amqplib';
import Rabbitmq from '../../common/rabbitmq';
import DB from '../../common/db';
import { verify } from './totp';

const PENDING_TOTP_TIME = 300000; // 5 minutes

export default async (message: ConsumeMessage) => {
	// Parse message body and assert parameters for bearer and TOTP
	const { bearer, totp } = JSON.parse(message.content.toString());
	if (!bearer) {
		return {
			success: false,
			status: 400,
			response: 'Missing param bearer'
		};
	}
	if (!totp) {
		return { success: false, status: 400, response: 'Missing param totp' };
	}
	// Verify bearer and return if error
	const userResponse = await Rabbitmq.sendRPC(
		'authentication.verifyGetUser',
		JSON.stringify(bearer)
	);
	if (!userResponse.success) return userResponse;
	const { _id: user_id } = await JSON.parse(userResponse.response);
	// Update databse with secret and remove pending secret. Return if any error
	return await DB.performQuery('users', 'totp', async (collection) => {
		const dbUser = await collection.findOne({ user_id });
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
		if (!verify(dbUser.pending_secret, totp)) {
			return { success: false, status: 400, response: 'Invalid TOTP' };
		}
		const updated = await collection.updateOne(
			{ user_id },
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
};
