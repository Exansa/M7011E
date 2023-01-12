import { Document, MongoClient, ServerApiVersion } from 'mongodb';
import Rabbitmq, { RPCResponse } from '../../common/rabbitmq';
import { ObjectId, WithId } from 'mongodb';
import DB from '../../common/db';

export default () => {
	Rabbitmq.listen('admins.get_all', async (message) => {
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
			const userResponse = await Rabbitmq.sendRPC(
				'authentication.verifyGetUser',
				JSON.stringify(data.bearer)
			);

			if (!userResponse.success) return userResponse;
			const user = JSON.parse(userResponse.response);
			const userId = user._id;

			validateSet(data.set);
			const set = data.set;

			//check access
			await checkAccess(userId, client);

			let result = await DB.performQuery(
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

			if (result) {
				result = (await getUserFromAdminArray(result, client)) as any;
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
	});

	Rabbitmq.listen('admins.get_one', async (message) => {
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
			const userResponse = await Rabbitmq.sendRPC(
				'authentication.verifyGetUser',
				JSON.stringify(data.bearer)
			);

			if (!userResponse.success) return userResponse;
			const user = JSON.parse(userResponse.response);
			const userId = user._id;

			//check access
			await checkAccess(userId, client);

			let result = await DB.performQuery(
				'blog',
				'admins',
				async (collection) => {
					const query = {
						user_id: data.id
					};
					const result = await collection.findOne(query);
					return result;
				}
			);

			if (!result) {
				throw new Error('Admin not found');
			}
			result = (await getUserFromAdmin(result, client)) as any;
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

	Rabbitmq.listen('admins.me', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.bearer) {
			return { success: false, response: 'Missing bearer' };
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

			let result = await DB.performQuery(
				'blog',
				'admins',
				async (collection) => {
					const query = {
						user_id: userId
					};

					const result = await collection.findOne(query, {
						projection: { access: 1 }
					});
					return result;
				}
			);

			if (!result) {
				throw new Error('Admin not found');
			}

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

	Rabbitmq.listen('admins.post', async (message) => {
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
			const userResponse = await Rabbitmq.sendRPC(
				'authentication.verifyGetUser',
				JSON.stringify(data.bearer)
			);

			if (!userResponse.success) return userResponse;
			const user = JSON.parse(userResponse.response);
			const userId = user._id;
			let admin = data.admin;
			admin = generateAdmin(admin);
			validateAdmin(admin);

			//check access
			await checkAccess(userId, client);

			//check user exists
			await checkUserExists(admin.user_id, client);

			//check admin exists
			await checkAdminExists(admin.user_id, client);
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

	Rabbitmq.listen('admins.patch', async (message) => {
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
			const userResponse = await Rabbitmq.sendRPC(
				'authentication.verifyGetUser',
				JSON.stringify(data.bearer)
			);

			if (!userResponse.success) return userResponse;
			const user = JSON.parse(userResponse.response);
			const userId = user._id;

			let admin = data.admin;
			validateAdmin(admin);

			//check access
			await checkAccess(userId, client);

			//check user exists
			await checkUserExists(data.id, client);

			if (admin.access == 'admin') {
				await lastSuperAdmin(data.id, client);
			}

			client.close();

			const result = await DB.performQuery(
				'blog',
				'admins',
				async (collection) => {
					const query = {
						user_id: data.id
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

	Rabbitmq.listen('admins.delete', async (message) => {
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
			const userResponse = await Rabbitmq.sendRPC(
				'authentication.verifyGetUser',
				JSON.stringify(data.bearer)
			);

			if (!userResponse.success) return userResponse;
			const user = JSON.parse(userResponse.response);
			const userId = user._id;

			//check access
			await checkAccess(userId, client);

			await lastSuperAdmin(data.id, client);

			client.close();

			const result = await DB.performQuery(
				'blog',
				'admins',
				async (collection) => {
					const query = {
						user_id: data.id
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
	if (admin.user_id && admin.user_id == '')
		throw new Error('Name is not defined, invalid admin');
	if (!admin.access) throw new Error('Access is not defined, invalid admin');
	if (!(admin.access == 'admin' || admin.access == 'superAdmin'))
		throw new Error('Invalid value for access');
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
async function checkUserExists(user_id: any, client: MongoClient) {
	const collection = await client.db('blog').collection('users');
	const query = { _id: new ObjectId(user_id) };
	const result = await collection.findOne(query);
	if (!result) throw new Error('User does not exist');
}
async function checkAdminExists(id: any, client: MongoClient) {
	const collection = await client.db('blog').collection('admins');
	const query = { user_id: id };
	const alreadyExists = await collection.findOne(query);
	if (alreadyExists) throw new Error('Admin already exists');
}

async function getUserFromAdminArray(
	array: WithId<Document>[],
	client: MongoClient
) {
	for (let i = 0; i < array.length; i++) {
		array[i] = await getUserFromAdmin(array[i], client);
	}
	return array;
}
async function getUserFromAdmin(admin: any, client: MongoClient) {
	const collection = await client.db('blog').collection('users');
	const query = {
		_id: new ObjectId(admin.user_id)
	};
	const result = await collection.findOne(query);
	if (!result) throw new Error('User does not exist');

	admin.user = result;
	return admin;
}

async function lastSuperAdmin(id: any, client: MongoClient) {
	const collection = await client.db('blog').collection('admins');
	const query = { access: 'superAdmin' };
	const result = await collection.find(query).toArray();
	if (result.length == 1 && result[0].user_id == id)
		throw new Error('Cant remove last super admin');
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
