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
	const { sub: auth0_id, email, picture } = JSON.parse(userResponse.response);

	const createdUser = await DB.performQuery(
		'users',
		'users',
		async (collection) => {
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
				picture,
				createdAt: new Date()
			});
			return createdUser;
		}
	);
	if (!createdUser) {
		return {
			success: false,
			response: 'User could not be created for unknown reason'
		};
	}
	if (createdUser.success === false) return createdUser;
	console.log(createdUser);

	const createdMedia = await DB.performQuery(
		'blog',
		'media',
		async (collection) => {
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
				picture,
				createdAt: new Date()
			});
			return createdUser;
		}
	);

	return { success: true, status: 201, response: 'User created' };
};
