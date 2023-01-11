import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';
import { unpackParams } from '../middlewares/unpack';
import authenticate from '../middlewares/authenticate';

const router = Router();

export default () => {
	/**
	 * @swagger
	 * /categories?set={set}:
	 *   get:
	 *     tags:
	 *       - Categories
	 *     summary: Get a set of 10 categories
	 *     description: Get a set of 10 categories, ordered by newest created. Set = 1 gets the fist 10 categories, set = 2 gets the next 10, etc.
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
	 *               $ref: '#/components/schemas/CategoriesArray'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.get('/', unpackParams, async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'categories.get_all',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /categories/{id}:
	 *   get:
	 *     tags:
	 *       - Categories
	 *     summary: Get one category
	 *     description: Get the category of the given id
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
	 *               $ref: '#/components/schemas/Category'
	 *       500:
	 *         description: Internal Server Error
	 */
	router.get('/:id', async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await Rabbitmq.sendRPC(
			'categories.get_one',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /categories:
	 *   post:
	 *     tags:
	 *       - Categories
	 *     summary: Create a new category. Only admins can do this.
	 *     description: Create a new category with the given data. Only admins can do this.
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                 $ref: '#/components/schemas/CategoryCreate'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/CategoryCreate'
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
			'categories.post',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /categories/{id}:
	 *   patch:
	 *     tags:
	 *       - Categories
	 *     summary: Update one category
	 *     description: Update the category of the given id with the given data. Only admins can do this.
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
	 *                 $ref: '#/components/schemas/CategoryUpdate'
	 *            application/json:
	 *              schema:
	 *                 $ref: '#/components/schemas/CategoryUpdate'
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
			'categories.patch',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	return router;
};
