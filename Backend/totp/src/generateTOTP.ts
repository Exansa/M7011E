import { ConsumeMessage } from 'amqplib';
import Rabbitmq from '../../common/rabbitmq';
import DB from '../../common/db';
import { generate } from './totp';

export default async (message: ConsumeMessage) => {
	// Parse message body and assert bearer parameter
	const { bearer } = JSON.parse(message.content.toString());
	if (!bearer) {
		return { success: false, response: 'Missing param bearer' };
	}
	// Get user object by verify bearer. Return if error
	const userResponse = await Rabbitmq.sendRPC(
		'authentication.verifyGetUser',
		JSON.stringify(bearer)
	);
	if (!userResponse.success) return userResponse;
	const { _id: user_id } = await JSON.parse(userResponse.response);
	// Generate secret and save as pending to database. Return if error
	const secret = generate(user_id);
	const dbResponse = await DB.performQuery('users', 'totp', (collection) =>
		collection.updateOne(
			{ user_id },
			{
				$set: {
					user_id,
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
	return { success: true, response: secret as any };
};
