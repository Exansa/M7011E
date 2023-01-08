import { Document, MongoClient, ServerApiVersion } from 'mongodb';
import { RPCResponse } from '../../common/rabbitmq';
import { ObjectId, WithId } from 'mongodb';
import DB from '../../common/db';
import { ConsumeMessage } from 'amqplib';

export default async (message: ConsumeMessage) => {
	const data = JSON.parse(message.content.toString());

	if (!data.set) {
		return { success: false, response: 'Missing param set' };
	}

	const uri =
		'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
	const client = new MongoClient(uri, {
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1
	});

	try {
		validateSet(data.set);
		const set = data.set;

		let result = await DB.performQuery(
			'blog',
			'users',
			async (collection) => {
				const result = await collection
					.find({})
					.sort({ created_at: -1 })
					.skip((set - 1) * 10)
					.limit(10)
					.toArray();
				return result;
			}
		);

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

function validateSet(inSet: any) {
	const set = parseInt(inSet);
	if (Number.isNaN(set)) {
		throw new Error('Invalid set, must be integer');
	}
	if (set < 1) {
		throw new Error('Invalid set, must be greater than 0');
	}
}
