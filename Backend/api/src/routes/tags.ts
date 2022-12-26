import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';

const router = Router();

export default (rabbitmq: Rabbitmq) => {
	router.get('/', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await rabbitmq.sendRPC(
			'tags.get_all',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.get('/:id', async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await rabbitmq.sendRPC(
			'tags.get_one',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.post('/', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await rabbitmq.sendRPC(
			'tags.post',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.patch('/:id', async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await rabbitmq.sendRPC(
			'tags.patch',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	return router;
};
