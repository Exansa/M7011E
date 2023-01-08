import { ConsumeMessage } from 'amqplib';
import { RPCResponse } from '../../common/rabbitmq';
import DB from '../../common/db';

export default async (message: ConsumeMessage): Promise<RPCResponse> => {
	console.info('authentication.verifyGetUser');
	const data = JSON.parse(message.content.toString());
	if (!data) {
		return { success: false, response: 'Missing data' };
	}
	try {
		const bearerUser = await fetch(
			'https://peterpanduro.eu.auth0.com/userinfo',
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${data}`
				}
			}
		).then((res) => res.json());
		const userWithId = await DB.performQuery(
			'blog',
			'users',
			async (collection) => {
				const user = await collection.findOne({
					auth0_id: bearerUser.sub
				});
				return user;
			}
		);

		return { success: true, response: JSON.stringify(userWithId) };
	} catch (e) {
		return { success: false, response: JSON.stringify(e) };
	}
};
