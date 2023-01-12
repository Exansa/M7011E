import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';
import { unpackParams } from '../middlewares/unpack';
import authenticate from '../middlewares/authenticate';

const router = Router();

export default () => {
	/**
	 * @swagger
	 * /admins?set={set}:
	 *   get:
	 *     tags:
	 *       - Admins
	 *     summary: Get a set of 10 admins
	 *     description: Get a set of 10 admins, ordered by user id. Set = 1 gets the fist 10 admins, set = 2 gets the next 10, etc.
	 *     parameters:
	 *       - in: path
	 *         name: set
	 *         schema:
	 *           type: string
	 *           required: true
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/AdminsWithUserDataArray'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.get(
		'/',
		authenticate,
		unpackParams,
		async (req: Request, res: Response) => {
			const data = req.body;
			const result = await Rabbitmq.sendRPC(
				'admins.get_all',
				JSON.stringify(data)
			);
			respond(res, result);
		}
	);

	/**
	 * @swagger
	 * /admins/me:
	 *   get:
	 *     tags:
	 *       - Admins
	 *     summary: Get the admin of the current user
	 *     description: Get the admin of the current user
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/AdminAccess'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.get('/me', authenticate, async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await Rabbitmq.sendRPC(
			'admins.me',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /admins/{id}:
	 *   get:
	 *     tags:
	 *       - Admins
	 *     summary: Get one admin
	 *     description: Get the admin of the given id
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
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/AdminWithUserData'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.get(
		'/:id',
		authenticate,
		unpackParams,
		async (req: Request, res: Response) => {
			const data = { ...req.body, ...req?.params };
			const result = await Rabbitmq.sendRPC(
				'admins.get_one',
				JSON.stringify(data)
			);
			respond(res, result);
		}
	);

	/**
	 * @swagger
	 * /admins:
	 *   post:
	 *     tags:
	 *       - Admins
	 *     summary: Create a new admin
	 *     description: Create a new admin with the given data
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                 $ref: '#/components/schemas/AdminCreate'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/AdminCreate'
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
			'admins.post',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /admins/{id}:
	 *   patch:
	 *     tags:
	 *       - Admins
	 *     summary: Update one admin
	 *     description: Update the admin of the given user id with the given data
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
	 *                 $ref: '#/components/schemas/AdminUpdate'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/AdminUpdate'
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
			'admins.patch',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /admins/{id}:
	 *   delete:
	 *     tags:
	 *       - Admins
	 *     summary: Delete one admin
	 *     description: Update the admin of the given user id with the given data, only superAdmin can delete admins and superAdmins. There must be at least one superAdmin.
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
			'admins.delete',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	return router;
};
