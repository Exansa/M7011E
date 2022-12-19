import { MongoClient, ServerApiVersion } from 'mongodb';
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
			var category = req.body.category;
			category = generateCategory(category);
			validateCategory(category);

			await checkAccess(userId, client);

			await checkCategoryExists(category, client);

			const collection = await client.db('blog').collection('categories');
			const result = await collection.insertOne(category);

			result
				? res.status(200).send(`Category created successfully`)
				: res.status(304).send(`Category not created`);
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
			const collection = await client.db('blog').collection('categories');
			var myCursor = await collection.find();
			const result = await myCursor.toArray();

			result
				? res.status(200).send(result)
				: res.status(304).send(`Blogposts not retrieved`);
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

	router.patch('/:category', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const categoryId = req?.params?.category;

		try {
			var userId = req.body.user_id;

			var category = req.body.category;
			validateCategory(category);

			await checkAccess(userId, client);

			await checkUniuqeCategory(category, categoryId, client);

			const collection = await client.db('blog').collection('categories');
			const query = { _id: new ObjectId(categoryId) };
			const result = await collection.updateOne(query, {
				$set: category
			});

			result && result.modifiedCount
				? res
						.status(200)
						.send(
							`Category with id ${categoryId} updated successfully`
						)
				: res
						.status(304)
						.send(`Category with id ${categoryId} not updated`);
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

async function checkAccess(userId: any, client: MongoClient) {
	const collection = await client.db('blog').collection('admins');
	const query = { user_id: userId };
	const result = await collection.findOne(query);
	if (!result || result.access != 'superAdmin')
		throw new Error('Access denied');
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
	const collection = await client.db('blog').collection('tags');
	const query1 = {
		name: category.name,
		_id: { $ne: new ObjectId(categoryId) }
	};
	const alreadyExists = await collection.findOne(query1);
	if (alreadyExists)
		throw new Error('Category with that name already exists');
}
