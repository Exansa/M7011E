import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';
import { unpackParams } from '../middlewares/unpack';
import authenticate from '../middlewares/authenticate';

const router = Router();

export default () => {
	/**
	 * @swagger
	 * /posts?set={set}:
	 *   get:
	 *     tags:
	 *       - Posts
	 *     summary: Get a set of 10 posts
	 *     description: Get a set of 10 posts, ordered by newest created. Set = 1 gets the fist 10 posts, set = 2 gets the next 10, etc.
	 *     parameters:
	 *       - in: path
	 *         name: set
	 *         schema:
	 *           type: string
	 *           required: true
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
	router.get('/', unpackParams, async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'posts.get_all',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /posts/{id}:
	 *   get:
	 *     tags:
	 *       - Posts
	 *     summary: Get one post
	 *     description: Get the post of the given id
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *           required: true
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PostWithData'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.get('/:id', async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await Rabbitmq.sendRPC(
			'posts.get_one',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /posts:
	 *   post:
	 *     tags:
	 *       - Posts
	 *     summary: Create a new post
	 *     description: Create a new post with the given data
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                 $ref: '#/components/schemas/PostCreate'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/PostCreate'
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post('/', authenticate, async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'posts.post',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /posts/{id}:
	 *   patch:
	 *     tags:
	 *       - Posts
	 *     summary: Update one post
	 *     description: Update the post of the given id with the given data
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *           required: true
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                 $ref: '#/components/schemas/PostUpdate'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/PostUpdate'
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *       500:
	 *         description: Internal Server Error
	 */
	router.patch('/:id', authenticate, async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await Rabbitmq.sendRPC(
			'posts.patch',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /posts/{id}:
	 *   delete:
	 *     tags:
	 *       - Posts
	 *     summary: Delete one post
	 *     description: Update the post of the given id with the given data. Only the owner of the post and can delete it.
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *           required: true
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *       500:
	 *         description: Internal Server Error
	 */
	router.delete('/:id', authenticate, async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await Rabbitmq.sendRPC(
			'posts.delete',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	return router;
};
