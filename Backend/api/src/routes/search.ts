import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';

const router = Router();

export default () => {
	/**
	 * @swagger
	 * /search/posts:
	 *   post:
	 *     tags:
	 *       - Search
	 *       - Posts
	 *     summary: Get a set of 10 posts based on the search query
	 *     description: Get a set of 10 posts based on the search query, ordered by newest created. Set = 1 gets the fist 10 posts, set = 2 gets the next 10, etc.
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
	router.post('/posts', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'posts.search',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /search/users:
	 *   get:
	 *     tags:
	 *       - Search
	 *       - Users
	 *     summary: Get a set of 10 posts based on the search query
	 *     description: Get a set of 10 posts based on the search query, ordered by newest created. Set = 1 gets the fist 10 posts, set = 2 gets the next 10, etc.
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
	 *               $ref: '#/components/schemas/UsersWithDataArray'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.get('/users', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'users.search',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	return router;
};
