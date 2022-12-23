import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';

const router = Router();

export default (rabbitmq: Rabbitmq) => {
	router.get('/', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await rabbitmq.sendRPC(
			'categories.get_all',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.get('/:id', async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await rabbitmq.sendRPC(
			'categories.get_one',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.post('/', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await rabbitmq.sendRPC(
			'categories.post',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.patch('/:id', async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await rabbitmq.sendRPC(
			'categories.patch',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	return router;
};
