import { ConsumeMessage } from 'amqplib';
import Rabbitmq, { RPCResponse } from '../../common/rabbitmq';
import DB from '../../common/db';

export default async (message: ConsumeMessage): Promise<RPCResponse> => {
	const { username, bearer } = JSON.parse(message.content.toString());
	if (!username) {
		return {
			success: false,
			status: 400,
			response: 'Missing parameter username'
		};
	}
	if (!bearer) {
		return {
			success: false,
			status: 400,
			response: 'Missing parameter bearer'
		};
	}

	const userResponse = await Rabbitmq.sendRPC(
		'authentication.verify',
		JSON.stringify(bearer)
	);
	if (!userResponse.success) return userResponse;
	const {
		sub: auth0_id,
		email,
		picture: profile_picture
	} = JSON.parse(userResponse.response);

	return await DB.performQuery('blog', 'users', async (collection) => {
		const existingUser = await collection.findOne({
			$or: [{ username }, { email }, { auth0_id }]
		});
		if (existingUser) {
			return {
				success: false,
				status: 400,
				response: 'User already exists'
			};
		}
		const createdUser = await collection.insertOne({
			auth0_id,
			username,
			email,
			profile_picture,
			createdAt: new Date()
		});
		if (!createdUser) {
			return {
				success: false,
				response: 'User could not be created for unknown reason'
			};
		}
		return { success: true, status: 201, response: 'User created' };
	});
};
