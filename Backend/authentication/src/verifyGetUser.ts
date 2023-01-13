import { ConsumeMessage } from 'amqplib';
import Rabbitmq, { RPCResponse } from '../../common/rabbitmq';
import DB from '../../common/db';

export default async (message: ConsumeMessage): Promise<RPCResponse> => {
	try {
		const data = message.content.toString();
		if (!data) {
			return { success: false, response: 'Missing data' };
		}
		const bearerUserResponse = await Rabbitmq.sendRPC(
			'authentication.verify',
			data
		);
		if (!bearerUserResponse.success) {
			return bearerUserResponse;
		}
		const bearerUser = await JSON.parse(bearerUserResponse.response);

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
	} catch (e: any) {
		return { success: false, response: JSON.stringify(e) };
	}
};
