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
			var category = req.body.category;
			category = generateCategory(category);
			validateCategory(category);

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
			var category = req.body.category;
			validateCategory(category);

			const collection = await client.db('blog').collection('categories');
			const query = { _id: new ObjectId(categoryId) };

			const result = await collection.updateOne(query, {
				$set: category
			});

			result
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
