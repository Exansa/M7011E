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
			var post = req.body.post;
			post = generatePost(post, userId);
			validatePost(post);
			console.log(post);

			const collection = await client.db('blog').collection('posts');

			const result = await collection.insertOne(post);

			result
				? res.status(200).send(`Post created successfully`)
				: res.status(304).send(`Post not created`);
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
			const collection = await client.db('blog').collection('posts');
			var myCursor = await collection.find().sort({ created_at: -1 });
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
			const collection = await client.db('blog').collection('posts');
			const query = { user_id: userId };

			var myCursor = await collection
				.find(query)
				.sort({ created_at: -1 });
			const result = await myCursor.toArray();

			result
				? res.status(200).send(result)
				: res
						.status(304)
						.send(`Blogposts form user ${userId} not retrieved`);
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

	router.get('/category/:category', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const categoryId = req?.params?.category;

		try {
			const collection = await client.db('blog').collection('posts');
			const query = { categories_id: { $all: [categoryId] } };

			var myCursor = await collection
				.find(query)
				.sort({ created_at: -1 });
			const result = await myCursor.toArray();

			result
				? res.status(200).send(result)
				: res
						.status(304)
						.send(
							`Blogposts form user ${categoryId} not retrieved`
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

	router.get('/tag/:tag', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const tagId = req?.params?.tag;

		try {
			const collection = await client.db('blog').collection('posts');
			const query = { tags_id: { $all: [tagId] } };

			var myCursor = await collection
				.find(query)
				.sort({ created_at: -1 });
			const result = await myCursor.toArray();

			result
				? res.status(200).send(result)
				: res
						.status(304)
						.send(`Blogposts form user ${tagId} not retrieved`);
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

	router.get('/:user/:post', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const userId = req?.params?.user;
		const postId = req?.params?.post;

		try {
			const collection = await client.db('blog').collection('posts');
			const query = { _id: new ObjectId(postId), user_id: userId };

			const result = await collection.findOne(query);

			result
				? res.status(200).send(result)
				: res.status(304).send(`Post with id: ${postId} not retrieved`);
			console.log(
				result ? result : `Post with id: ${postId} not retrieved`
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

	router.patch('/:user/:post', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const userId = req?.params?.user;
		const postId = req?.params?.post;

		try {
			checkCurrentUser(userId, req.body.user_id);
			var post = req.body.post;
			post = generatePost(post, userId);
			validatePost(post);
			console.log(post);

			const collection = await client.db('blog').collection('posts');
			const query = { _id: new ObjectId(postId), user_id: userId };

			const result = await collection.updateOne(query, {
				$set: post
			});

			result
				? res
						.status(200)
						.send(`Successfully updated post with id ${postId}`)
				: res.status(304).send(`Post with id: ${postId} not updated`);
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

	router.delete('/:user/:post', async (req, res, next) => {
		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		const userId = req?.params?.user;
		const postId = req?.params?.post;

		try {
			checkCurrentUser(userId, req.body.user_id);
			const collection = await client.db('blog').collection('posts');
			const query = { _id: new ObjectId(postId), user_id: userId };
			const result = await collection.deleteOne(query);

			if (result && result.deletedCount) {
				res.status(202).send(
					`Successfully removed post with id ${postId}`
				);
			} else if (!result) {
				res.status(400).send(`Failed to remove post with id ${postId}`);
			} else if (!result.deletedCount) {
				res.status(404).send(`Post with id ${postId} does not exist`);
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

function checkCurrentUser(userId: string, userId1: any) {
	if (userId !== userId1) throw new Error('Not current user. Access denied');
}

function generatePost(inPost: any, userId: string) {
	var post = {
		title: inPost.title,
		created_at: new Date(),
		content: inPost.content,
		user_id: userId,
		location_id: inPost.location_id,
		categories_id: inPost.categories_id,
		tags_id: inPost.tags_id,
		media_id: inPost.media_id
	};

	return post;
}

function validatePost(post: any) {
	if (!post.title) throw new Error('Title is required');
	if (!post.content) throw new Error('Content is required');
	if (!post.created_at) throw new Error('Created at is required');
	if (!post.user_id) throw new Error('User id is required');
}
