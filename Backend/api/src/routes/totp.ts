import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';

const router = Router();

export default (rabbitmq: Rabbitmq) => {
	router.post('/generate', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await rabbitmq.sendRPC(
			'totp.generate',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	router.post('/save', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await rabbitmq.sendRPC(
			'totp.save',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	// WARNING: This endpoint is not secure. It is only used for testing purposes
	router.post('/verify', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await rabbitmq.sendRPC(
			'totp.verify',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	return router;
};
