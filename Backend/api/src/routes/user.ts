import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';
import { unpackParams } from '../middlewares/unpack';
import authenticate from '../middlewares/authenticate';

const router = Router();

export default () => {
	/**
	 * @swagger
	 * /user:
	 *   post:
	 *     tags:
	 *       - User
	 *     summary: Create a new user
	 *     description: Create a new user
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                $ref: '#/components/schemas/UserCreate'
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/UserCreate'
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       201:
	 *         description: Created
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: string
	 *               value: "User created"
	 *       400:
	 *         description: Bad Request
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post('/', authenticate, async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'user.create',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /user/{id}/posts?set={set}:
	 *   get:
	 *     tags:
	 *       - User
	 *       - Posts
	 *     summary: Get a set of 10 posts for a user
	 *     description: Get a set of 10 posts for the given user, ordered by newest created. Set = 1 gets the fist 10 posts, set = 2 gets the next 10, etc.
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *           required: true
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
	router.get(
		'/:id/posts',
		unpackParams,
		async (req: Request, res: Response) => {
			const data = req.body;
			const result = await Rabbitmq.sendRPC(
				'posts.user_get_all',
				JSON.stringify(data)
			);
			respond(res, result);
		}
	);

	/**
	 * @swagger
	 * /user/me:
	 *   get:
	 *     tags:
	 *       - User
	 *     summary: Current user
	 *     description: Get the current user from Authentication Token
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/User'
	 *       401:
	 *         description: Unauthorized
	 *       404:
	 *         description: Not Found
	 *       500:
	 *         description: Internal Server Error
	 */
	router.get('/me', authenticate, async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC('user.me', JSON.stringify(data));
		respond(res, result);
	});

	/**
	 * @swagger
	 * /user?set={set}:
	 *   get:
	 *     tags:
	 *       - User
	 *     summary: Get a set of 10 users
	 *     description: Get a set of 10 users, ordered by id. Set = 1 gets the fist 10 users, set = 2 gets the next 10, etc.
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
	 *               $ref: '#/components/schemas/UsersArray'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.get('/', unpackParams, async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'users.get_all',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /user/{id}:
	 *   get:
	 *     tags:
	 *       - User
	 *     summary: Get one user
	 *     description: Get the user of the given id
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
	 *               $ref: '#/components/schemas/User'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.get('/:id', unpackParams, async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'users.get_one',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /user/{id}:
	 *   patch:
	 *     tags:
	 *       - User
	 *     summary: Update one user
	 *     description: Update the user of the given id with the given data
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
	 *                 $ref: '#/components/schemas/UserUpdate'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/UserUpdate'
	 *     security:
	 *          - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *       500:
	 *         description: Internal Server Error
	 */
	router.patch(
		'/:id',
		unpackParams,
		authenticate,
		async (req: Request, res: Response) => {
			const data = req.body;
			const result = await Rabbitmq.sendRPC(
				'user.patch',
				JSON.stringify(data)
			);
			respond(res, result);
		}
	);

	/**
	 * @swagger
	 * /user/{id}:
	 *   delete:
	 *     tags:
	 *       - User
	 *     summary: Delete one user, aka inactivate it
	 *     description: Update the user of the given id to inactive, sets username to Deactivated, deactivated to true, email to null and password to null. Only superAdmin can delete users.
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *           required: true
	 *     security:
	 *          - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *       500:
	 *         description: Internal Server Error
	 */
	router.delete(
		'/:id',
		unpackParams,
		authenticate,
		async (req: Request, res: Response) => {
			const data = req.body;
			const result = await Rabbitmq.sendRPC(
				'user.delete',
				JSON.stringify(data)
			);
			respond(res, result);
		}
	);

	return router;
};
