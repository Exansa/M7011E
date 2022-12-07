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

			const collection = await client.db('blog').collection('tags');

			//checkTagExists(collection, tag);
			const query = { username: user.username };
			const alreadyExists = await collection.findOne(query);
			if (alreadyExists)
				throw new Error('A user with that username already exists');

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

	router.patch('/:user/:tag', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const userId = req?.params?.user;
		const tagId = req?.params?.tag;

		try {
			checkCurrentUser(userId, req.body.user_id);
			var tag = req.body.tag;
			validateUser(tag);

			const collection = await client.db('blog').collection('tags');

			//checkTagExists(collection, tag);
			const query1 = {
				name: tag.name,
				user_id: userId,
				_id: { $ne: new ObjectId(tagId) }
			};
			const alreadyExists = await collection.findOne(query1);
			console.log(alreadyExists);
			if (alreadyExists) throw new Error('Tag already exists');

			const query = { _id: new ObjectId(tagId), user_id: userId };
			const result = await collection.updateOne(query, {
				$set: tag
			});

			result
				? res
						.status(200)
						.send(`Tag with id ${tagId} updated successfully`)
				: res.status(304).send(`Tag with id ${tagId} not updated`);
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
		username: user.username,
		email: user.email,
		phone: user.phone,
		pw: user.pw,
		profilePicture_id: user.profilePicture_id,
		created_at: new Date()
	};
}

async function checkTagExists(tag: any, collection: Collection<Document>) {
	const query = { name: tag.name, user_id: tag.user_id };
	const alreadyExists = await collection.findOne(query);
	if (alreadyExists) throw new Error('Tag already exists');
}
