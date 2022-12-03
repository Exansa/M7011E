import { MongoClient, ServerApiVersion } from 'mongodb';
import { Router, Request, Response } from 'express';

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

	return router;
};
