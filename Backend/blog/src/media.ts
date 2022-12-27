import { Collection, Document, MongoClient, ServerApiVersion } from 'mongodb';
import Rabbitmq, { RPCResponse } from './rabbitmq';
import { ObjectId, WithId } from 'mongodb';
import DB from '../../common/db';

export default (rabbitmq: Rabbitmq) => {
	rabbitmq.listen('media.get_all', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.set) {
			return { success: false, response: 'Missing param set' };
		}

		try {
			const set = data.set;
			const user_id = data.user_id;

			const result = await DB.performQuery(
				'blog',
				'media',
				async (collection) => {
					const query = { user_id: user_id };
					const result = await collection
						.find(query)
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
				response: error?.message.toString()
			};
			return response;
		}
	});

	rabbitmq.listen('media.get_one', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.id) {
			return { success: false, response: 'Missing param id' };
		}

		try {
			var result = await DB.performQuery(
				'blog',
				'media',
				async (collection) => {
					const query = {
						_id: new ObjectId(data.id)
					};
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
			console.log(error);
			const response = {
				success: false,
				response: error?.message.toString()
			};
			return response;
		}
	});

	rabbitmq.listen('media.post', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.media) {
			return { success: false, response: 'Missing param media' };
		}

		try {
			var userId = data.user_id;
			var media = data.media;
			media = generateMedia(media, userId);
			validateMedia(media);

			const result = await DB.performQuery(
				'blog',
				'media',
				async (collection) => {
					const result = await collection.insertOne(media);
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

	rabbitmq.listen('media.patch', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.media) {
			return { success: false, response: 'Missing param media' };
		}
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
			var userId = data.user_id;
			var media = data.media;
			media = generateMedia(media, userId);
			validateMedia(media);

			await checkAccess(data.id, userId, client);
			client.close();

			const result = await DB.performQuery(
				'blog',
				'media',
				async (collection) => {
					const query = {
						_id: new ObjectId(data.id),
						user_id: data.user_id
					};
					const result = await collection.updateOne(query, {
						$set: media
					});
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

function validateMedia(media: any) {
	if (!media.user_id)
		throw new Error('User id is not defined, invalid media');
	if (!media.name) throw new Error('Name is not defined, invalid media');
	if (!media.type) throw new Error('Type is not defined, invalid media');
	if (!media.href) throw new Error('Href is not defined, invalid media');
}
function generateMedia(media: any, user_id: any): any {
	return {
		user_id: user_id,
		name: media.name,
		type: media.type,
		href: media.href
	};
}

async function checkAccess(id: any, userId: any, client: MongoClient) {
	const collection = await client.db('blog').collection('media');
	const query = { _id: new ObjectId(id), user_id: userId };
	const result = await collection.findOne(query);
	if (!result) throw new Error('Access denied');
}
