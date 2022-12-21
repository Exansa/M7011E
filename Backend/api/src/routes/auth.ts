import { Router, Request, Response } from 'express';
import Rabbitmq from '../rabbitmq';

const router = Router();

export default (rabbitmq: Rabbitmq) => {
	router.post('/', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await rabbitmq.sendRPC(
			'authentication.verify',
			JSON.stringify(data)
		);
		res.send(result);
	});

	router.post('/sign', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await rabbitmq.sendRPC(
			'authentication.sign',
			JSON.stringify(data)
		);
		res.send(result);
	});

	return router;
};
