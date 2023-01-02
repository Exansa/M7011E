import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';
import { unpackParams } from '../middlewares/unpack';

const router = Router();

export default () => {
	/**
	 * @swagger
	 * /test:
	 *   post:
	 *     tags:
	 *       - Test
	 *     summary: Perform a test query
	 *     description: Perform a test query
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                $ref: '#/components/schemas/Test'
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/Test'
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Test'
	 *       401:
	 *         description: Unauthorized
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post('/', async (req: Request, res: Response) => {
		const data = { ...req.body };
		const result = await Rabbitmq.sendRPC('test', JSON.stringify(data));
		respond(res, result);
	});

	/**
	 * @swagger
	 * /test/{id}:
	 *   post:
	 *     tags:
	 *       - Test
	 *     summary: Perform a test query with a path parameter
	 *     description: Perform a test query with a path parameter
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *           required: true
	 *     requestBody:
	 *         content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/Test'
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                $ref: '#/components/schemas/Test'
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Test'
	 *       401:
	 *         description: Unauthorized
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post('/:id', unpackParams, async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC('test', JSON.stringify(data));
		respond(res, result);
	});

	return router;
};
