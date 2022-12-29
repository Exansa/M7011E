import { ConsumeMessage } from 'amqplib';
import Rabbitmq from '../../common/rabbitmq';
import DB from '../../common/db';
import { generate } from './totp';

export default async (message: ConsumeMessage) => {
	// Parse message body and assert JWT parameter
	const { jwt } = JSON.parse(message.content.toString());
	if (!jwt) {
		return { success: false, response: 'Missing param "jwt' };
	}
	// Get user object by verify JWT. Return if error
	const userResponse = await Rabbitmq.sendRPC(
		'authentication.verify',
		JSON.stringify(jwt)
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
	return { success: true, response: secret as any };
};
