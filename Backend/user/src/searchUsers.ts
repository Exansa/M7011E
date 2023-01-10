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
	if (!data.search) {
		return { success: false, response: 'Missing param search' };
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
		const search = generateSearch(data.search);

		let result = await DB.performQuery(
			'blog',
			'users',
			async (collection) => {
				const result = await collection
					.find(search, { projection: { pw: 0 } })
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

function generateSearch(search: any) {
	const out: any = {};
	if (search.username && search.username !== '')
		out.username = { $regex: search.username, $options: 'i' };
	if (search.email && search.email !== '')
		out.email = { $regex: search.email, $options: 'i' };
	if (search.profile_picture && search.profile_picture !== '')
		out.profile_picture = search.profile_picture;
	return out;
}
