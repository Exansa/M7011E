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
			const collection = await client.db('blog').collection('posts');

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

	router.get('/:user', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const userId = req?.params?.user;

		/*try {
			var postId = req.body._id;
			if (!postId) {
				throw new Error('No post id provided');
			}
		} catch (err) {
			if (err instanceof Error) {
				console.error(err.message);
				res.status(400).send(err.message);
			} else {
				console.log('Unexpected error', err);
				res.status(400).send('Unexpected error');
			}
		}*/

		try {
			const collection = await client.db('blog').collection('posts');
			const query = { user_id: userId };

			var myCursor = await collection.findOne(query);
			console.log('my  cursor: ' + myCursor);

			//TODO: find a way to iterate through the cursor

			/*
            var runCursor = function (cursor : MongoCursor){
                cursor.next(function(error : any, record : any){

			if (myCursor != null) {
				var myDocument = myCursor.next();
				console.log('my document: ' + myDocument);
				if (myDocument) {
					var title = myDocument.title;
					console.log('title: ' + title);
				}
			} else {
				console.log('No document found');
			}*/

			const result = null;
			result
				? res.status(200).send(result)
				: res
						.status(304)
						.send(`Blogposts form user ${userId} not retrieved`);
			//console.log(result);
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
			const collection = await client.db('blog').collection('posts');
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
			const collection = await client.db('blog').collection('posts');
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
