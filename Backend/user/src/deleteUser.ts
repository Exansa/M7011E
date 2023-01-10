import { Document, MongoClient, ServerApiVersion } from 'mongodb';
import Rabbitmq, { RPCResponse } from '../../common/rabbitmq';
import { ObjectId, WithId } from 'mongodb';
import DB from '../../common/db';
import { ConsumeMessage } from 'amqplib';

export default async (message: ConsumeMessage) => {
	const data = JSON.parse(message.content.toString());

	if (!data.id) {
		return { success: false, response: 'Missing param id' };
	}
	if (!data.bearer) {
		return { success: false, response: 'Missing param bearer' };
	}

	const uri =
		'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
	const client = new MongoClient(uri, {
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1
	});

	try {
		const userResponse = await Rabbitmq.sendRPC(
			'authentication.verifyGetUser',
			JSON.stringify(data.bearer)
		);
		if (!userResponse.success) {
			return userResponse;
		}
		const authUser = JSON.parse(userResponse.response);

		await checkAccess(authUser._id, data.id, client);
		client.close();

		const user = inactivateUser();

		let result = await DB.performQuery(
			'blog',
			'users',
			async (collection) => {
				const query = { _id: new ObjectId(data.id) };
				const result = await collection.updateOne(query, {
					$set: user
				});
				return result;
			}
		);

		const response: RPCResponse = {
			success: true,
			status: 200,
			response: result
		};
		return response;
	} catch (error: any) {
		const response = {
			success: false,
			response: error?.message.toString()
		};
		return response;
	}
};

async function checkAccess(
	currentUser: string,
	id: string,
	client: MongoClient
) {
	if (currentUser == id) return;
	const collection = await client.db('blog').collection('admins');
	const query = { user_id: currentUser };
	const admin = await collection.findOne(query);
	if (admin != null && admin.access === 'superAdmin') return;
	throw new Error('Access denied');
}

function inactivateUser() {
	return {
		username: 'Deactivated',
		deactivated: 'true',
		email: null,
		auth0_id: null,
		profile_picture: null
	};
}
