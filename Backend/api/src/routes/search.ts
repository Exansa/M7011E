import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';
import { unpackParams } from '../middlewares/unpack';

const router = Router();

export default () => {
	/**
	 * @swagger
	 * /search/posts?set={set}:
	 *   post:
	 *     tags:
	 *       - Search
	 *       - Posts
	 *     summary: Get a set of 10 posts based on the search query
	 *     description: Get a set of 10 posts based on the search query, ordered by newest created. Set = 1 gets the fist 10 posts, set = 2 gets the next 10, etc. An empty string OR empty list will ignore that parameter, empty string in list doe not work. There is AND between the different parameters, meaning every parameter must be true for the post to be returned.
	 *     parameters:
	 *       - in: path
	 *         name: set
	 *         schema:
	 *           type: string
	 *           required: true
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                 $ref: '#/components/schemas/SearchPosts'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/SearchPosts'
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PostsWithDataArray'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post('/posts', unpackParams, async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'posts.search',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /search/users?set={set}:
	 *   post:
	 *     tags:
	 *       - Search
	 *       - User
	 *     summary: Get a set of 10 users based on the search query
	 *     description: Get a set of 10 users based on the search query, ordered by newest created. Set = 1 gets the fist 10 users, set = 2 gets the next 10, etc. An empty string will exclude that parameter. There is AND between the different parameters, meaning every parameter must be true for the user to be returned.
	 *     parameters:
	 *       - in: path
	 *         name: set
	 *         schema:
	 *           type: string
	 *           required: true
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                 $ref: '#/components/schemas/SearchUsers'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/SearchUsers'
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/UsersArray'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post('/users', unpackParams, async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'users.search',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /search/tags?set={set}:
	 *   post:
	 *     tags:
	 *       - Search
	 *       - Tags
	 *     summary: Get a set of 10 tags based on the search query
	 *     description: Get a set of 10 tags based on the search query, ordered by newest created. Set = 1 gets the fist 10 tags, set = 2 gets the next 10, etc. An empty string will ignore that parameter. There is AND between the different parameters, meaning every parameter must be true for the post to be returned.
	 *     parameters:
	 *       - in: path
	 *         name: set
	 *         schema:
	 *           type: string
	 *           required: true
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                 $ref: '#/components/schemas/SearchTags'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/SearchTags'
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/TagsArray'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post('/tags', unpackParams, async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'tags.search',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /search/categories?set={set}:
	 *   post:
	 *     tags:
	 *       - Search
	 *       - Categories
	 *     summary: Get a set of 10 categories based on the search query
	 *     description: Get a set of 10 categories based on the search query, ordered by newest created. Set = 1 gets the fist 10 categories, set = 2 gets the next 10, etc. An empty string will ignore that parameter. There is AND between the different parameters, meaning every parameter must be true for the post to be returned.
	 *     parameters:
	 *       - in: path
	 *         name: set
	 *         schema:
	 *           type: string
	 *           required: true
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                 $ref: '#/components/schemas/SearchCategories'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/SearchCategories'
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/CategoriesArray'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post(
		'/categories',
		unpackParams,
		async (req: Request, res: Response) => {
			const data = req.body;
			const result = await Rabbitmq.sendRPC(
				'categories.search',
				JSON.stringify(data)
			);
			respond(res, result);
		}
	);

	return router;
};
