import { ConsumeMessage } from 'amqplib';
import Rabbitmq from '../../common/rabbitmq';
import DB from '../../common/db';
import { verify } from './totp';

const PENDING_TOTP_TIME = 300000; // 5 minutes

export default async (message: ConsumeMessage) => {
	// Parse message body and assert parameters for JWT and TOTP
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
	// Verify JWT and return if error
	const userResponse = await Rabbitmq.sendRPC(
		'authentication.verify',
		JSON.stringify(bearer)
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
		if (!verify(dbUser.pending_secret, totp)) {
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
};
