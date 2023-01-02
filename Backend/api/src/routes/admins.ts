import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';

const router = Router();

export default () => {
	/**
	 * @swagger
	 * /admins:
	 *   get:
	 *     tags:
	 *       - Admins
	 *     summary: Get a set of 10 admins
	 *     description: Get a set of 10 admins, ordered by id
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                 $ref: '#/components/schemas/UseridAndSet'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/UseridAndSet'
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/AdminsArray'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.get('/', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'admins.get_all',
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
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                 $ref: '#/components/schemas/UserId'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/UserId'
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Admin'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.get('/:id', async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await Rabbitmq.sendRPC(
			'admins.get_one',
			JSON.stringify(data)
		);
		respond(res, result);
	});

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
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Admin'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post('/', async (req: Request, res: Response) => {
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
	 *     description: Update the admin of the given id with the given data
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
	 *                 $ref: '#/components/schemas/AdminCreate'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/AdminCreate'
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Admin'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.patch('/:id', async (req: Request, res: Response) => {
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
	 *     description: Update the admin of the given id with the given data, only superAdmin can delete admins and superAdmins. There must be at least one superAdmin.
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
	 *                 $ref: '#/components/schemas/UserId'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/UserId'
	 *     responses:
	 *       200:
	 *         description: Success
	 *       500:
	 *         description: Internal Server Error
	 */
	router.delete('/:id', async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await Rabbitmq.sendRPC(
			'admins.delete',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	return router;
};
