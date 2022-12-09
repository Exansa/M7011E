import { Collection, Document, MongoClient, ServerApiVersion } from 'mongodb';
import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

const router = Router();

export default () => {
	router.post('/', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			var user = req.body.user;
			user = generateUser(user);
			validateUser(user);

			await checkUserTaken(user, client);

			const collection = await client.db('blog').collection('users');
			const result = await collection.insertOne(user);

			result
				? res.status(200).send(`User created successfully`)
				: res.status(304).send(`User not created`);
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

	router.get('/:user', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const userId = req?.params?.user;

		try {
			const collection = await client.db('blog').collection('users');
			const query = { _id: new ObjectId(userId) };

			var result;
			if (userId == req.body.user_id) {
				result = await collection.findOne(query);
			} else {
				result = await collection.findOne(query, {
					projection: { pw: 0 }
				});
			}

			result
				? res.status(200).send(result)
				: res.status(304).send(`Post with id: ${userId} not retrieved`);
			console.log(
				result ? result : `Post with id: ${userId} not retrieved`
			);
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

	router.patch('/:user', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const userId = req?.params?.user;

		try {
			checkCurrentUser(userId, req.body.user_id);
			var user = req.body.user;
			formatUser(user);
			validateUser(user);

			await checkAccess(userId, user, client);

			const collection = await client.db('blog').collection('users');

			//checkTagExists(collection, tag);
			const query1 = {
				username: user.username,
				_id: { $ne: new ObjectId(userId) }
			};
			const alreadyExists = await collection.findOne(query1);
			console.log(alreadyExists);
			if (alreadyExists)
				throw new Error('A user with that username already exists');

			const query = { _id: new ObjectId(userId) };
			const result = await collection.updateOne(query, {
				$set: user
			});

			result
				? res
						.status(200)
						.send(`User with id ${userId} updated successfully`)
				: res.status(304).send(`User with id ${userId} not updated`);
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
	return router;
};

function checkCurrentUser(userId: string, userId1: any) {
	if (userId !== userId1) throw new Error('Not current user. Access denied');
}

function validateUser(user: any) {
	if (!user.username) throw new Error('Name is not defined, invalid user');
	if (!user.email) throw new Error('Email is not defined, invalid user');
	if (!user.phone) throw new Error('Phone is not defined, invalid user');
	if (!user.pw) throw new Error('Password is not defined, invalid user');
}

function generateUser(user: any): any {
	return {
		...formatUser(user),
		created_at: new Date()
	};
}

function formatUser(user: any): any {
	return {
		username: user.username,
		email: user.email,
		phone: user.phone,
		pw: user.pw,
		profilePicture_id: user.profilePicture_id
	};
}

async function checkUserTaken(user: any, client: MongoClient) {
	const collection = await client.db('blog').collection('users');
	const query = {
		$or: [
			{ username: user.username },
			{ email: user.email },
			{ phone: user.phone }
		]
	};
	const alreadyExists = await collection.findOne(query);
	if (alreadyExists)
		throw new Error('A user with those credentials already exists');
}
function checkAccess(userId: string, user: any, client: MongoClient) {
	//TODO
	throw new Error('Function not implemented.');
}
