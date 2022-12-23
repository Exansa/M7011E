import { Collection, Document, MongoClient, ServerApiVersion } from 'mongodb';
import Rabbitmq, { RPCResponse } from './rabbitmq';
import { ObjectId, WithId } from 'mongodb';
import DB from '../../common/db';

export default (rabbitmq: Rabbitmq) => {
	rabbitmq.listen('admins.get_all', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.set) {
			return { success: false, response: 'Missing param set' };
		}
		if (!data.admin) {
			return { success: false, response: 'Missing param admin' };
		}

		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			const set = data.set;
			const userId = data.user_id;
			const admin = generateAdmin(data.admin);
			validateAdmin(admin);

			//check access
			await checkAccess(userId, client);

			const array = await DB.performQuery(
				'blog',
				'admins',
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

			const result = (await getUserFromAdminArray(array, client)) as any;
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
	});

	rabbitmq.listen('admins.get_one', async (message) => {
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
			const userId = data.user_id;

			//check access
			await checkAccess(userId, client);

			var result = await DB.performQuery(
				'blog',
				'admins',
				async (collection) => {
					const query = {
						_id: new ObjectId(data.id),
						user_id: data.admin.user_id
					};
					const result = await collection.findOne(query);
					return result;
				}
			);

			result = await getUserFromAdmin(result, client);
			client.close();

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

	rabbitmq.listen('admins.post', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.admin) {
			return { success: false, response: 'Missing param admin' };
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
			var admin = data.admin;
			admin = generateAdmin(admin);
			validateAdmin(admin);

			//check access
			await checkAccess(userId, client);

			//check user exists
			await checkUserExists(admin, client);

			//check admin exists
			await checkAdminExists(admin, client);
			client.close();

			const result = await DB.performQuery(
				'blog',
				'admins',
				async (collection) => {
					const result = await collection.insertOne(admin);
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

	rabbitmq.listen('admins.patch', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.admin) {
			return { success: false, response: 'Missing param admin' };
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
			var admin = data.admin;
			admin = generateAdmin(admin);
			validateAdmin(admin);

			//check access
			await checkAccess(userId, client);

			//check user exists
			await checkUserExists(admin, client);

			client.close();

			const result = await DB.performQuery(
				'blog',
				'admins',
				async (collection) => {
					const query = {
						_id: new ObjectId(data.id),
						user_id: admin.user_id
					};
					const result = await collection.updateOne(query, {
						$set: admin
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

	rabbitmq.listen('admins.delete', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.admin) {
			return { success: false, response: 'Missing param admin' };
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

			//check access
			await checkAccess(userId, client);

			await lastSuperAdmin(data.id, client);

			client.close();

			const result = await DB.performQuery(
				'blog',
				'admins',
				async (collection) => {
					const query = {
						_id: new ObjectId(data.id)
					};
					const result = await collection.deleteOne(query);
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

function validateAdmin(admin: any) {
	if (!admin.user_id) throw new Error('Name is not defined, invalid admin');
	if (!admin.access) throw new Error('Access is not defined, invalid admin');
}
function generateAdmin(admin: any): any {
	return {
		user_id: admin.user_id,
		access: admin.access
	};
}

async function checkAccess(userId: any, client: MongoClient) {
	const collection = await client.db('blog').collection('admins');
	const query = { user_id: userId };
	const result = await collection.findOne(query);
	if (!result || result.access != 'superAdmin')
		throw new Error('Access denied');
}
async function checkUserExists(admin: any, client: MongoClient) {
	const collection = await client.db('blog').collection('users');
	const query = { _id: new ObjectId(admin.user_id) };
	const result = await collection.findOne(query);
	if (!result) throw new Error('User does not exist');
}
async function checkAdminExists(admin: any, client: MongoClient) {
	const collection = await client.db('blog').collection('admins');
	const query = { user_id: admin.user_id };
	const alreadyExists = await collection.findOne(query);
	if (alreadyExists) throw new Error('Admin already exists');
}

async function getUserFromAdminArray(
	array: WithId<Document>[],
	client: MongoClient
) {
	for (let i = 0; i < array.length; i++) {
		array[i] = await getUserFromAdmin(array[i], client);
		console.log(array[i]);
	}
	return array;
}
async function getUserFromAdmin(admin: any, client: MongoClient) {
	const collection = await client.db('blog').collection('users');
	const query = {
		_id: new ObjectId(admin.user_id)
	};
	const result = await collection.findOne(query, {
		projection: { pw: 0 }
	});
	if (!result) throw new Error('User does not exist');

	admin.user = result;
	return admin;
}

async function lastSuperAdmin(id: any, client: MongoClient) {
	const collection = await client.db('blog').collection('admins');
	const query = { access: 'superAdmin' };
	const result = await collection.find(query).toArray();
	if (result.length == 1 && result[0]._id == id)
		throw new Error('Cant delete last super admin');
}
