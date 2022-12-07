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
			var data = req.body.data;
			const collection = await client
				.db('test')
				.collection('testcollection');

			const result = await collection.insertOne(data);

			result
				? res.status(200).send(`Document created successfully`)
				: res.status(304).send(`Document not created`);
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

	router.get('/', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			var id = req.body._id;
			const collection = await client
				.db('test')
				.collection('testcollection');
			const query = { _id: new ObjectId(id) };

			const result = await collection.findOne(query);

			result
				? res.status(200).send(result)
				: res.status(304).send(`Document with id: ${id} not retrieved`);
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

	router.patch('/', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			var id = req.body._id;
			var data = req.body.data;
			const collection = await client
				.db('test')
				.collection('testcollection');
			const query = { _id: new ObjectId(id) };

			const result = await collection.updateOne(query, {
				$set: data
			});

			result
				? res
						.status(200)
						.send(`Successfully updated document with id ${id}`)
				: res.status(304).send(`Document with id: ${id} not updated`);
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

	router.delete('/', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			var id = req.body._id;
			var data = req.body.data;
			const collection = await client
				.db('test')
				.collection('testcollection');
			const query = { _id: new ObjectId(id) };
			const result = await collection.deleteOne(query);

			if (result && result.deletedCount) {
				res.status(202).send(
					`Successfully removed document with id ${id}`
				);
			} else if (!result) {
				res.status(400).send(`Failed to remove document with id ${id}`);
			} else if (!result.deletedCount) {
				res.status(404).send(`Document with id ${id} does not exist`);
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
