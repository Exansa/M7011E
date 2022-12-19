import { Router, Request, Response } from 'express';
import Rabbitmq from '../rabbitmq';

const router = Router();

export default (rabbitmq: Rabbitmq) => {
	router.post('/', async (req: Request, res: Response) => {
		const data = {
			...req.body,
			date: new Date()
		};

		const result = await rabbitmq.sendRPC(JSON.stringify(data), 'test');

		res.send(
			'Test message was sent with data: ' +
				JSON.stringify(data) +
				' and recieved the response: ' +
				result
		);
	});

	return router;
};
