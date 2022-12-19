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
			var userId = req.body.user_id;
			var tag = req.body.tag;
			tag = generateTag(tag);
			validateTag(tag);

			await checkAccess(userId, client);

			await checkTagExists(tag, client);

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

	router.get('', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			const collection = await client.db('blog').collection('tags');
			var myCursor = await collection.find();
			const result = await myCursor.toArray();

			result
				? res.status(200).send(result)
				: res.status(304).send(`Tags not retrieved`);
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

	router.patch('/:tag', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const tagId = req?.params?.tag;

		try {
			var userId = req.body.user_id;
			var tag = req.body.tag;
			validateTag(tag);

			await checkAccess(userId, client);

			await checkUniuqeTag(tag, tagId, client);

			const collection = await client.db('blog').collection('tags');
			const query = { _id: new ObjectId(tagId) };
			const result = await collection.updateOne(query, {
				$set: tag
			});

			result && result.modifiedCount
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
