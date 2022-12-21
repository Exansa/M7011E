import { Router, Request, Response } from 'express';
import Rabbitmq from '../rabbitmq';

const router = Router();

export default (rabbitmq: Rabbitmq) => {
	router.post('/', async (req: Request, res: Response) => {
		const data = {
			...req.body,
			date: new Date()
		};
		const result = await rabbitmq.sendRPC(
			JSON.stringify(data),
			'authentication.verify'
		);
		res.send(result);
	});

	router.post('/sign', async (req: Request, res: Response) => {
		const data = {
			...req.body,
			date: new Date()
		};
		const result = await rabbitmq.sendRPC(
			JSON.stringify(data),
			'authentication.sign'
		);
		res.send(result);
	});

	return router;
};
