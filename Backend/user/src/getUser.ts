import { Document, MongoClient, ServerApiVersion } from 'mongodb';
import { RPCResponse } from '../../common/rabbitmq';
import { ObjectId, WithId } from 'mongodb';
import DB from '../../common/db';
import { ConsumeMessage } from 'amqplib';

export default async (message: ConsumeMessage) => {
	const data = JSON.parse(message.content.toString());

	if (!data.id) {
		return { success: false, response: 'Missing param id' };
	}
	const uri =
		'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
	const client = new MongoClient(uri, {
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1
	});

	try {
		let result = await DB.performQuery(
			'blog',
			'users',
			async (collection) => {
				const query = { _id: new ObjectId(data.id) };
				const result = await collection.findOne(query, {
					projection: { pw: 0 }
				});
				return result;
			}
		);

		if (result) {
			result = (await getDataFromUser(result, client)) as any;
		}
		client.close();

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

async function getDataFromUser(user: any, client: MongoClient) {
	let collection = await client.db('blog').collection('media');
	if (!user.profilePicture_id) {
		user.profile_picture = null;
		return user;
	}
	const query = {
		_id: new ObjectId(user.profilePicture_id)
	};
	const result = await collection.findOne(query, {
		projection: { href: 1 }
	});
	user.profile_picture = result;
	return user;
}
