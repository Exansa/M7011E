import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';

const router = Router();

export default () => {
	router.get('/', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'posts.get_all',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.get('/:id', async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await Rabbitmq.sendRPC(
			'posts.get_one',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.post('/', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'posts.post',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.patch('/:id', async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await Rabbitmq.sendRPC(
			'posts.patch',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.delete('/:id', async (req: Request, res: Response) => {
		const data = { ...req.body, ...req?.params };
		const result = await Rabbitmq.sendRPC(
			'posts.delete',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	return router;
};
