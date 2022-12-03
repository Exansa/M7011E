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

		const collection = client.db('test').collection('testcollection');

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

		var myCursor = collection.find({ age: 22 });

		while (myCursor.hasNext()) {
			res.send(myCursor.next());
		}

		client.close();
		//res.send(req.body);
	});

	return router;
};
