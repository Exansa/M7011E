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
	 *                 $ref: '#/components/schemas/useridAndSet'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/useridAndSet'
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

	router.post('/', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'admins.post',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.patch('/:id', async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await Rabbitmq.sendRPC(
			'admins.patch',
			JSON.stringify(data)
		);
		respond(res, result);
	});

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
