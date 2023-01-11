import { MongoClient, ServerApiVersion } from 'mongodb';
import Rabbitmq, { RPCResponse } from '../../common/rabbitmq';
import { ObjectId } from 'mongodb';
import DB from '../../common/db';

export default () => {
	Rabbitmq.listen('categories.get_all', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.set) {
			return { success: false, response: 'Missing param set' };
		}

		try {
			validateSet(data.set);
			const set = data.set;
			const result = await DB.performQuery(
				'blog',
				'categories',
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
				response: error?.message.toString()
			};
			return response;
		}
	});

	Rabbitmq.listen('categories.get_one', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.id) {
			return { success: false, response: 'Missing param id' };
		}

		try {
			const query = { _id: new ObjectId(data.id) };
			const result = await DB.performQuery(
				'blog',
				'categories',
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
				response: error?.message.toString()
			};
			return response;
		}
	});

	Rabbitmq.listen('categories.search', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.set) {
			return { success: false, response: 'Missing param set' };
		}

		if (!data.search) {
			return { success: false, response: 'Missing param search' };
		}

		try {
			validateSet(data.set);
			const set = data.set;
			const search = generateSearch(data.search);

			const result = await DB.performQuery(
				'blog',
				'categories',
				async (collection) => {
					const result = await collection
						.find(search)
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

	Rabbitmq.listen('categories.post', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.category) {
			return { success: false, response: 'Missing param category' };
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

			if (!userResponse.success) return userResponse;
			const user = JSON.parse(userResponse.response);
			const userId = user._id;

			let category = data.category;
			category = generateCategory(category);
			validateCategory(category);

			await checkAccess(userId, client);
			await checkCategoryExists(category, client);
			client.close();

			const result = await DB.performQuery(
				'blog',
				'categories',
				async (collection) => {
					const result = await collection.insertOne(category);
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

	Rabbitmq.listen('categories.patch', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.category) {
			return { success: false, response: 'Missing param category' };
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
			const userResponse = await Rabbitmq.sendRPC(
				'authentication.verifyGetUser',
				JSON.stringify(data.bearer)
			);

			if (!userResponse.success) return userResponse;
			const user = JSON.parse(userResponse.response);
			const userId = user._id;

			const id = data.id;
			const category = data.category;
			validateCategoryPatch(category);

			await checkAccess(userId, client);
			await checkUniuqeCategory(category, id, client);
			client.close();

			const result = await DB.performQuery(
				'blog',
				'categories',
				async (collection) => {
					const query = { _id: new ObjectId(id) };
					const result = await collection.updateOne(query, {
						$set: category
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

function generateCategory(category: any): any {
	return {
		name: category.name,
		description: category.description
	};
}
function validateCategory(category: any) {
	if (!category.name)
		throw new Error('Name is not defined, invalid category');
	if (!category.description)
		throw new Error('Description is not defined, invalid category');
}

function validateCategoryPatch(category: any) {
	if (category.name && category.name === '')
		throw new Error('Name is not defined, invalid category');
	if (category.description || category.description === '')
		throw new Error('Description is not defined, invalid category');
}

async function checkAccess(userId: any, client: MongoClient) {
	const collection = await client.db('blog').collection('admins');
	const query = { user_id: userId };
	const result = await collection.findOne(query);
	if (!result) throw new Error('Access denied');
}
async function checkCategoryExists(category: any, client: MongoClient) {
	const collection = await client.db('blog').collection('categories');
	const query1 = {
		name: category.name
	};
	const alreadyExists = await collection.findOne(query1);
	if (alreadyExists) throw new Error('Category already exists');
}

async function checkUniuqeCategory(
	category: any,
	categoryId: string,
	client: MongoClient
) {
	const collection = await client.db('blog').collection('categories');
	const query1 = {
		name: category.name,
		_id: { $ne: new ObjectId(categoryId) }
	};
	const alreadyExists = await collection.findOne(query1);
	if (alreadyExists)
		throw new Error('Category with that name already exists');
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
	if (search.name && search.name !== '')
		out.name = { $regex: search.name, $options: 'i' };
	if (search.description && search.description !== '')
		out.description = { $regex: search.description, $options: 'i' };
	return out;
}
