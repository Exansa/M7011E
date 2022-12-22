import { Collection, Document, MongoClient, ServerApiVersion } from 'mongodb';
import Rabbitmq, { RPCResponse } from '../../common/rabbitmq';
import { ObjectId, WithId } from 'mongodb';
import DB from '../../common/db';

export default (rabbitmq: Rabbitmq) => {
	rabbitmq.listen('tags.get_all', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.set) {
			return { success: false, response: 'Missing param set' };
		}

		try {
			var set = data.set;
			const result = await DB.performQuery(
				'blog',
				'tags',
				async (collection) => {
					const result = await collection
						.find()
						.sort({ _id: 1 })
						.skip((set - 1) * 10)
						.limit(10)
						.toArray();
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
				response: error
			};
			return response;
		}
	});

	rabbitmq.listen('tags.get_one', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.id) {
			return { success: false, response: 'Missing param id' };
		}

		try {
			var set = data.set;
			const query = { _id: new ObjectId(data.id) };
			const result = await DB.performQuery(
				'blog',
				'tags',
				async (collection) => {
					const result = await collection.findOne(query);
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
				response: error
			};
			return response;
		}
	});

	rabbitmq.listen('tags.post', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.tag) {
			return { success: false, response: 'Missing param tag' };
		}

		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			var userId = data.user_id;
			var tag = data.tag;
			tag = generateTag(tag);
			validateTag(tag);

			await checkAccess(userId, client);
			await checkTagExists(tag, client);
			client.close();
			var set = data.set;
			const result = await DB.performQuery(
				'blog',
				'tags',
				async (collection) => {
					const result = await collection.insertOne(tag);
					return result;
				}
			);

			const response: RPCResponse = {
				success: result !== null,
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
	});
};

function validateTag(tag: any) {
	if (!tag.name) throw new Error('Name is not defined, invalid tag');
}
function generateTag(tag: any): any {
	return {
		name: tag.name
	};
}

async function checkTagExists(tag: any, client: MongoClient) {
	const collection = await client.db('blog').collection('tags');
	const query = { name: tag.name };
	const alreadyExists = await collection.findOne(query);
	if (alreadyExists) throw new Error('Tag already exists');
}
async function checkAccess(userId: any, client: MongoClient) {
	const collection = await client.db('blog').collection('admins');
	const query = { user_id: userId };
	const result = await collection.findOne(query);
	if (!result) throw new Error('Access denied');
}
async function checkUniuqeTag(tag: any, tagId: string, client: MongoClient) {
	const collection = await client.db('blog').collection('tags');
	const query1 = {
		name: tag.name,
		_id: { $ne: new ObjectId(tagId) }
	};
	const alreadyExists = await collection.findOne(query1);
	if (alreadyExists) throw new Error('Tag with that name already exists');
}
