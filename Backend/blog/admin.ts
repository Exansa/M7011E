import { Collection, Document, MongoClient, ServerApiVersion } from 'mongodb';
import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

const router = Router();

export default () => {
	router.post('', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			var userId = req.body.user_id;
			var admin = req.body.admin;
			admin = generateAdmin(admin);
			validateAdmin(admin);

			//check access
			await checkAccess(userId, client);

			//check user exists
			await checkUserExists(admin, client);

			//check admin exists
			await checkAdminExists(admin, client);

			const collection = await client.db('blog').collection('admins');
			const result = await collection.insertOne(admin);

			result
				? res.status(200).send(`Admin created successfully`)
				: res.status(304).send(`Admin not created`);
			console.log(result);
		} catch (err) {
			if (err instanceof Error) {
				console.error(err.message);
				res.status(400).send(err.message);
			} else {
				console.log('Unexpected error', err);
				res.status(400).send('Unexpected error');
			}
		}
		client.close();
	});

	router.get('', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			var userId = req.body.user_id;
			var admin = req.body.admin;
			admin = generateAdmin(admin);
			validateAdmin(admin);

			//check access
			await checkAccess(userId, client);

			const collection = await client.db('blog').collection('admins');

			var set = req.body.set;
			set ? set : (set = 1);

			const myCursor = await collection
				.find()
				.sort({ _id: 1 })
				.skip((set - 1) * 10)
				.limit(10);
			const result = await myCursor.toArray();

			result
				? res.status(200).send(result)
				: res.status(304).send('Could not retrieve admins');
			console.log(result);
		} catch (err) {
			if (err instanceof Error) {
				console.error(err.message);
				res.status(400).send(err.message);
			} else {
				console.log('Unexpected error', err);
				res.status(400).send('Unexpected error');
			}
		}
		client.close();
	});

	router.patch('/:admin', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const adminId = req.params.admin;

		try {
			var userId = req.body.user_id;
			var admin = req.body.admin;
			admin = generateAdmin(admin);
			validateAdmin(admin);

			//check access
			await checkAccess(userId, client);

			const collection = await client.db('blog').collection('admins');
			const query = {
				_id: new ObjectId(adminId),
				user_id: admin.user_id
			};
			const result = await collection.updateOne(query, {
				$set: admin
			});

			if (result && result.matchedCount) {
				res.status(200).send(`Admin updated successfully`);
			} else if (!result) {
				res.status(400).send(
					`Failed to update admin with id ${adminId}`
				);
			} else if (!result.matchedCount) {
				res.status(404).send(`Admin with id ${adminId} does not exist`);
			}
		} catch (err) {
			if (err instanceof Error) {
				console.error(err.message);
				res.status(400).send(err.message);
			} else {
				console.log('Unexpected error', err);
				res.status(400).send('Unexpected error');
			}
		}
		client.close();
	});

	router.delete('/:admin', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const adminId = req.params.admin;

		try {
			var userId = req.body.user_id;

			//check access
			await checkAccess(userId, client);

			const collection = await client.db('blog').collection('admins');
			const query = { _id: new ObjectId(adminId) };
			const result = await collection.deleteOne(query);

			if (result && result.deletedCount) {
				res.status(202).send(
					`Successfully removed admin with id ${adminId}`
				);
			} else if (!result) {
				res.status(400).send(
					`Failed to remove admin with id ${adminId}`
				);
			} else if (!result.deletedCount) {
				res.status(404).send(`Admin with id ${adminId} does not exist`);
			}
		} catch (err) {
			if (err instanceof Error) {
				console.error(err.message);
				res.status(400).send(err.message);
			} else {
				console.log('Unexpected error', err);
				res.status(400).send('Unexpected error');
			}
		}

		client.close();
	});
	return router;
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
