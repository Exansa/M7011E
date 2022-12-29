import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';

const router = Router();

export default () => {
	router.get('/posts', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'posts.search',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.get('/users', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'users.search',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	return router;
};
