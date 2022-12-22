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
			var media = req.body.media;
			media = generateMedia(media, userId);
			validateMedia(media);

			const collection = await client.db('blog').collection('media');
			const result = await collection.insertOne(media);

			result
				? res.status(200).send(`Media created successfully`)
				: res.status(304).send(`Media not created`);
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
			var set = req.body.set;
			set ? set : (set = 1);
			const collection = await client.db('blog').collection('media');
			var myCursor = await collection
				.find()
				.sort({ _id: 1 })
				.skip((set - 1) * 10)
				.limit(10);
			const result = await myCursor.toArray();

			result
				? res.status(200).send(result)
				: res.status(304).send(`Media not retrieved`);
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

	router.get('/user/:user', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const userId = req?.params?.user;

		try {
			var set = req.body.set;
			set ? set : (set = 1);
			const collection = await client.db('blog').collection('media');
			const query = { user_id: userId };
			var myCursor = await collection
				.find(query)
				.sort({ _id: 1 })
				.skip((set - 1) * 10)
				.limit(10);
			const result = await myCursor.toArray();

			result
				? res.status(200).send(result)
				: res.status(304).send(`Media not retrieved`);
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

	router.get('/:media', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const mediaId = req?.params?.media;

		try {
			const collection = await client.db('blog').collection('media');
			const query = { _id: new ObjectId(mediaId) };

			const result = await collection.findOne(query);

			result
				? res.status(200).send(result)
				: res
						.status(304)
						.send(`Media with id: ${mediaId} not retrieved`);
			console.log(
				result ? result : `Post with id: ${mediaId} not retrieved`
			);
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

	router.patch('/:media', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const mediaId = req?.params?.media;

		try {
			var userId = req.body.user_id;
			var media = req.body.media;
			media = generateMedia(media, userId);
			validateMedia(media);

			const collection = await client.db('blog').collection('media');
			const query = { _id: new ObjectId(mediaId) };
			const result = await collection.updateOne(query, {
				$set: media
			});

			result && result.modifiedCount
				? res
						.status(200)
						.send(`Media with id ${mediaId} updated successfully`)
				: res.status(304).send(`Media with id ${mediaId} not updated`);
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

function validateMedia(media: any) {
	if (!media.user_id)
		throw new Error('User id is not defined, invalid media');
	if (!media.name) throw new Error('Name is not defined, invalid media');
	if (!media.type) throw new Error('Type is not defined, invalid media');
	if (!media.href) throw new Error('Href is not defined, invalid media');
}
function generateMedia(media: any, user_id: any): any {
	return {
		user_id: user_id,
		name: media.name,
		type: media.type,
		href: media.href
	};
}
