import { ConsumeMessage } from 'amqplib';
import DB from '../../common/db';
import { verify } from './totp';
import Rabbitmq from '../../common/rabbitmq';

export default async (message: ConsumeMessage) => {
	// Parse message body and assert parameters for bearer and TOTP
	const { totp, bearer } = JSON.parse(message.content.toString());
	if (!totp) {
		return {
			success: false,
			status: 400,
			response: 'Missing param totp'
		};
	}
	const userResponse = await Rabbitmq.sendRPC(
		'authentication.verifyGetUser',
		JSON.stringify(bearer)
	);
	if (!userResponse.success) return userResponse;
	const { _id: user_id } = await JSON.parse(userResponse.response);

	return await DB.performQuery('users', 'totp', async (collection) => {
		const dbUser = await collection.findOne(
			{ user_id },
			{ projection: { secret: 1 } }
		);
		if (!dbUser) {
			return {
				success: false,
				status: 404,
				response: 'TOTP for user not found'
			};
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
