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

		const collection = await client.db('test').collection('testcollection');

		collection.insertOne(req.body);

		client.close();
		res.send(req.body);
	});

	router.get('/', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const collection = client.db('test').collection('testcollection');

		try {
			const data = await collection.find({});
			res.status(200).send(data);
		} catch (error) {
			res.status(500).send('error with GET request');
			//res.status(500).send(error.message);
		}

		/*while (myCursor.hasNext()) {
			res.send(myCursor.next());
		}*/

		client.close();
		res.send(req.body);

		/*try {
			const games = (await collections.games
				.find({})
				.toArray()) as Game[];

			res.status(200).send(games);
		} catch (error) {
			res.status(500).send(error.message);
		}

		try {
			const query = { _id: new ObjectId(id) };
			const game = (await collections.games.findOne(query)) as Game;

			if (game) {
				res.status(200).send(game);
			}
		} catch (error) {
			res.status(404).send(
				`Unable to find matching document with id: ${req.params.id}`
			);
		}*/
	});

	router.patch('/', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});
		//const id = req?.params?.id;

		console.log(req.body);
		var id = req.body._id;
		var data = req.body.data;
		var idObject = new ObjectId(id);
		console.log(idObject);

		try {
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

	return router;
};
