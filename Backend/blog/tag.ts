import { MongoClient, ServerApiVersion } from 'mongodb';
import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

const router = Router();

export default () => {
	router.post('/:user', async (req, res, next) => {
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
			var tag = req.body.tag;
			tag = generateTag(tag, userId);
			validateTag(tag);
			console.log(tag);

			const collection = await client.db('blog').collection('tags');

			const result = await collection.insertOne(tag);

			result
				? res.status(200).send(`Tag created successfully`)
				: res.status(304).send(`Tag not created`);
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
			validateTag(tag);
			console.log(tag);

			const collection = await client.db('blog').collection('tags');
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

function validateTag(tag: any) {
	if (!tag.name) throw new Error('Name is not defined, invalid tag');
}
function generateTag(tag: any, userId: string): any {
	return {
		user_id: userId,
		name: tag.name
	};
}
