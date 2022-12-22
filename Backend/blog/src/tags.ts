import { Collection, Document, MongoClient, ServerApiVersion } from 'mongodb';
import Rabbitmq, { RPCResponse } from '../../common/rabbitmq';
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
};
