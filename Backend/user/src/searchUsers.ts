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

		if (result) {
			result = (await getDataFromUsersArray(result, client)) as any;
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

async function getDataFromUsersArray(
	array: WithId<Document>[],
	client: MongoClient
) {
	for (let i = 0; i < array.length; i++) {
		array[i] = await getDataFromUser(array[i], client);
	}
	return array;
}

async function getDataFromUser(user: any, client: MongoClient) {
	const collection = await client.db('blog').collection('media');
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
	if (search.profilePicture_id && search.profilePicture_id !== '')
		out.profilePicture_id = search.profilePicture_id;
	return out;
}
