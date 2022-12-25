import { Router, Request, Response } from 'express';
import Rabbitmq from '../rabbitmq';
import { respond } from '..';

const router = Router();

export default (rabbitmq: Rabbitmq) => {
	router.get('/posts', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await rabbitmq.sendRPC(
			'posts.search',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	return router;
};
