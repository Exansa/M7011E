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
				const result = await collection.findOne(query);
				return result;
			}
		);

		if (result==null) {
			throw new Error('User not found');
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
