import { ConsumeMessage } from 'amqplib';
import JWT from 'jsonwebtoken';
import { RPCResponse } from '../../common/rabbitmq';
import DB from '../../common/db';
import { SECRET } from '.';

/**
 * Verifies a JWT token and returns the user object
 * Updates 'users.sessions' database collection to update the last_used field
 */
export default async (message: ConsumeMessage): Promise<RPCResponse> => {
	console.info('authentication.verify');
	const data = JSON.parse(message.content.toString());
	if (!data) {
		return { success: false, response: 'Missing JWT data' };
	}
	try {
		if (
			!(await DB.performQuery('users', 'sessions', (collection) =>
				collection.findOne({ token: data })
			))
		) {
			return { success: false, status: 400, response: 'Invalid session' };
		}
		const user = JWT.verify(data, SECRET);
		await DB.performQuery('users', 'sessions', (collection) =>
			collection.updateOne(
				{ token: data },
				{ $set: { last_used: new Date() } }
			)
		);
		return { success: true, response: JSON.stringify(user) };
	} catch (e) {
		return { success: false, response: JSON.stringify(e) };
	}
};
