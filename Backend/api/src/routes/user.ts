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
	router.post('/', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'user.create',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	//! The 404 error is a securty issue and only used for debugging and information purposes.
	/**
	 * @swagger
	 * /user/login:
	 *   post:
	 *     tags:
	 *       - User
	 *     summary: Login user
	 *     description: Verify user with username and password. A totp code needs to be provided if enabled by user. Returns a Bearer Token. If lts is set to true, a long term token will be returned (1 year). Else a short term token will be returned (1 hour).
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                $ref: '#/components/schemas/UserLogin'
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/UserLogin'
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/BearerToken'
	 *       400:
	 *         description: Bad Request
	 *       401:
	 *         description: Unauthorized
	 *       404:
	 *         description: Not Found
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post('/login', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'authentication.login',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.get('/posts', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'posts.user_get_all',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.get('/', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'users.get_all',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.get('/:id', unpackParams, async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'users.get_one',
			JSON.stringify(data)
		);
		respond(res, result);
	});

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
