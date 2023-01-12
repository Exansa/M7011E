import { ConsumeMessage } from 'amqplib';
import Rabbitmq, { RPCResponse } from '../../common/rabbitmq';
import DB from '../../common/db';

export default async (message: ConsumeMessage): Promise<RPCResponse> => {
	const { bearer } = JSON.parse(message.content.toString());
	const auth0User = await Rabbitmq.sendRPC(
		'authentication.verify',
		JSON.stringify(bearer)
	);
	if (!auth0User.success) return auth0User;
	const { sub: auth0_id } = JSON.parse(auth0User.response);
	const user = await DB.performQuery(
		'blog',
		'users',
		async (collection) => await collection.findOne({ auth0_id })
	);
	if (!user) {
		return {
			success: false,
			status: 404,
			response: 'User does not exist'
		};
	}
	const adminResponse = await Rabbitmq.sendRPC(
		'admins.me',
		JSON.stringify({ bearer })
	);
	const admin = await JSON.parse(JSON.stringify(adminResponse.response));
	const access = admin.access ?? '';
	return { success: true, status: 200, response: { ...user, access } };
};
