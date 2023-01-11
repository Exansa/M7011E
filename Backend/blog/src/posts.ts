import { Document, MongoClient, ServerApiVersion } from 'mongodb';
import Rabbitmq, { RPCResponse } from '../../common/rabbitmq';
import { ObjectId, WithId } from 'mongodb';
import DB from '../../common/db';

export default () => {
	Rabbitmq.listen('posts.get_all', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.set) {
			return { success: false, response: 'Missing param set' };
		}

		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			validateSet(data.set);
			const set = data.set;
			let result = await DB.performQuery(
				'blog',
				'posts',
				async (collection) => {
					const result = await collection
						.find()
						.sort({ created_at: -1 })
						.skip((set - 1) * 10)
						.limit(10)
						.toArray();
					return result;
				}
			);

			if (result) {
				result = (await getDataFromPostsArray(result, client)) as any;
			}
			client.close();

			const response: RPCResponse = {
				success: true,
				status: 200,
				response: result
			};
			return response;
		} catch (error: any) {
			const response = {
				success: false,
				response: error?.message.toString()
			};
			return response;
		}
	});

	Rabbitmq.listen('posts.user_get_all', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.set) {
			return { success: false, response: 'Missing param set' };
		}
		if (!data.id) {
			return { success: false, response: 'Missing param id' };
		}

		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			validateSet(data.set);
			const set = data.set;
			let result = await DB.performQuery(
				'blog',
				'posts',
				async (collection) => {
					const query = { user_id: data.id };
					const result = await collection
						.find(query)
						.sort({ created_at: -1 })
						.skip((set - 1) * 10)
						.limit(10)
						.toArray();
					return result;
				}
			);

			if (result) {
				result = (await getDataFromPostsArray(result, client)) as any;
			}
			client.close();

			const response: RPCResponse = {
				success: true,
				status: 200,
				response: result
			};
			return response;
		} catch (error: any) {
			const response = {
				success: false,
				response: error?.message.toString()
			};
			return response;
		}
	});

	Rabbitmq.listen('posts.search', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.set) {
			return { success: false, response: 'Missing param set' };
		}
		if (!data.search) {
			return { success: false, response: 'Missing param search' };
		}

		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			validateSet(data.set);
			const set = data.set;
			const search = generateSearch(data.search);

			let result = await DB.performQuery(
				'blog',
				'posts',
				async (collection) => {
					const result = await collection
						.find(search)
						.sort({ created_at: -1 })
						.skip((set - 1) * 10)
						.limit(10)
						.toArray();
					return result;
				}
			);

			if (result) {
				result = (await getDataFromPostsArray(result, client)) as any;
			}
			client.close();

			const response: RPCResponse = {
				success: true,
				status: 200,
				response: result
			};
			return response;
		} catch (error: any) {
			const response = {
				success: false,
				response: error?.message.toString()
			};
			return response;
		}
	});

	Rabbitmq.listen('posts.get_one', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.id) {
			return { success: false, response: 'Missing param id' };
		}

		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			let result = await DB.performQuery(
				'blog',
				'posts',
				async (collection) => {
					const query = { _id: new ObjectId(data.id) };

					const result = await collection.findOne(query);
					return result;
				}
			);

			if (result) {
				result = (await getDataFromPost(result, client)) as any;
			}
			client.close();

			const response: RPCResponse = {
				success: true,
				status: 200,
				response: result
			};
			return response;
		} catch (error: any) {
			const response = {
				success: false,
				response: error?.message.toString()
			};
			return response;
		}
	});

	Rabbitmq.listen('posts.post', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.post) {
			return { success: false, response: 'Missing param post' };
		}

		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			const userResponse = await Rabbitmq.sendRPC(
				'authentication.verifyGetUser',
				JSON.stringify(data.bearer)
			);

			if (!userResponse.success) return userResponse;
			const user = JSON.parse(userResponse.response);
			const userId = user._id;

			let post = data.post;
			post = generatePost(post, userId);
			await validatePostCreate(post, client);

			const result = await DB.performQuery(
				'blog',
				'posts',
				async (collection) => {
					const result = await collection.insertOne(post);
					return result;
				}
			);

			const response: RPCResponse = {
				success: result !== null,
				response: result
			};
			return response;
		} catch (error: any) {
			const response = {
				success: false,
				response: error?.message.toString()
			};
			return response;
		}
	});

	Rabbitmq.listen('posts.patch', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.post) {
			return { success: false, response: 'Missing param post' };
		}
		if (!data.id) {
			return { success: false, response: 'Missing param id' };
		}

		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			const userResponse = await Rabbitmq.sendRPC(
				'authentication.verifyGetUser',
				JSON.stringify(data.bearer)
			);

			if (!userResponse.success) return userResponse;
			const user = JSON.parse(userResponse.response);
			const userId = user._id;

			const post = data.post;

			await checkAccess(data.id, userId, client);
			await validatePostUpdate(post, client);

			client.close();

			const result = await DB.performQuery(
				'blog',
				'posts',
				async (collection) => {
					const query = { _id: new ObjectId(data.id) };
					const result = await collection.updateOne(query, {
						$set: post
					});
					return result;
				}
			);

			const response: RPCResponse = {
				success: result !== null,
				response: result
			};
			return response;
		} catch (error: any) {
			const response = {
				success: false,
				response: error?.message.toString()
			};
			return response;
		}
	});

	Rabbitmq.listen('posts.delete', async (message) => {
		const data = JSON.parse(message.content.toString());

		if (!data.id) {
			return { success: false, response: 'Missing param id' };
		}

		const uri =
			'mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority';
		const client = new MongoClient(uri, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1
		});

		try {
			const userResponse = await Rabbitmq.sendRPC(
				'authentication.verifyGetUser',
				JSON.stringify(data.bearer)
			);

			if (!userResponse.success) return userResponse;
			const user = JSON.parse(userResponse.response);
			const userId = user._id;

			//check access
			await checkAccess(data.id, userId, client);

			client.close();

			const result = await DB.performQuery(
				'blog',
				'posts',
				async (collection) => {
					const query = {
						_id: new ObjectId(data.id)
					};
					const result = await collection.deleteOne(query);
					return result;
				}
			);

			const response: RPCResponse = {
				success: result !== null,
				response: result
			};
			return response;
		} catch (error: any) {
			const response = {
				success: false,
				response: error?.message.toString()
			};
			return response;
		}
	});
};

function generatePost(inPost: any, userId: string) {
	const post = {
		title: inPost.title,
		created_at: new Date(),
		content: inPost.content,
		user_id: userId,
		category_id: inPost.category_id,
		tags_id: inPost.tags_id,
		media: inPost.media
	};

	return post;
}

async function validatePostCreate(post: any, client: MongoClient) {
	if (!post.title) throw new Error('Title is required');
	if (!post.content) throw new Error('Content is required');
	if (!post.category_id) throw new Error('Category is required');
	if (!post.user_id) throw new Error('User_id is required');
	validateId(post.user_id, 'users', client);
	validateId(post.category_id, 'categories', client);
	if (post.tags_id) validateIdArray(post.tags_id, 'tags', client);
}

async function validatePostUpdate(post: any, client: MongoClient) {
	if (post.user_id) validateId(post.user_id, 'users', client);
	if (post.category_id) validateId(post.category_id, 'categories', client);
	if (post.tags_id) validateIdArray(post.tags_id, 'tags', client);
}

async function validateIdArray(
	id: string[],
	collectionName: string,
	client: MongoClient
) {
	let collection = await client.db('blog').collection(collectionName);
	const length = id.length ? id.length : 0;
	for (let i = 0; i < length; i++) {
		const query = {
			_id: new ObjectId(id[i])
		};
		const result = await collection.findOne(query);
		if (!result) throw new Error('Invalid id');
	}
}

async function validateId(
	id: string,
	collectionName: string,
	client: MongoClient
) {
	let collection = await client.db('blog').collection(collectionName);
	const query = {
		_id: new ObjectId(id)
	};
	const result = await collection.findOne(query);
	if (!result) throw new Error('Invalid id');
}

async function getDataFromPostsArray(
	array: WithId<Document>[],
	client: MongoClient
) {
	for (let i = 0; i < array.length; i++) {
		array[i] = await getDataFromPost(array[i], client);
	}
	return array;
}

async function getDataFromPost(post: any, client: MongoClient) {
	let collection = await client.db('blog').collection('users');
	const query = {
		_id: new ObjectId(post.user_id)
	};
	const result = await collection.findOne(query, {
		projection: { username: 1, profile_picture: 1 }
	});
	post.user = result;

	collection = await client.db('blog').collection('categories');
	const query2 = {
		_id: new ObjectId(post.category_id)
	};
	const result2 = await collection.findOne(query2, {
		projection: { name: 1 }
	});
	post.category = result2;

	collection = await client.db('blog').collection('tags');
	const tagsLength = post.tags_id?.length ?? 0;
	post.tags = [];
	for (let j = 0; j < tagsLength; j++) {
		const query = {
			_id: new ObjectId(post.tags_id[j])
		};
		const result = await collection.findOne(query, {
			projection: { name: 1 }
		});
		post.tags[j] = result ?? null;
	}
	return post;
}

async function checkAccess(id: any, userId: any, client: MongoClient) {
	const collectionPosts = await client.db('blog').collection('posts');
	const queryPosts = { _id: new ObjectId(id), user_id: userId };
	const resultPosts = await collectionPosts.findOne(queryPosts);

	const collectionAdmins = await client.db('blog').collection('admins');
	const queryAdmins = { user_id: userId };
	const resultAdmins = await collectionAdmins.findOne(queryAdmins);

	if (!resultPosts && !resultAdmins) throw new Error('Access denied');
}
function generateSearch(search: any) {
	const out: any = {};
	if (search.title && search.title !== '')
		out.title = { $regex: search.title, $options: 'i' };
	if (search.content && search.constent !== '')
		out.content = { $regex: search.content, $options: 'i' };
	if (search.user_id && search.user_id !== '') out.user_id = search.user_id;
	if (search.tags_id && search.tags_id.length !== 0)
		out.tags_id = { $in: search.tags_id };
	if (search.category_id && search.category_id !== '')
		out.category_id = search.category_id;
	if (search.media && search.media !== '') {
		out.media = { $regex: search.media, $options: 'i' };
	}
	return out;
}
function validateSet(inSet: any) {
	const set = parseInt(inSet);
	if (Number.isNaN(set)) {
		throw new Error('Invalid set, must be integer');
	}
	if (set < 1) {
		throw new Error('Invalid set, must be greater than 0');
	}
}
