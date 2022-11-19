import { Channel } from 'amqplib';
import { Router, Request, Response } from 'express';

const router = Router();

export default (channel: Promise<Channel>) => {
	router.post('/', async (req: Request, res: Response) => {
		if (!channel) {
			res.status(500).send('Channel not initialized');
		}

		const data = {
			...req.body,
			date: new Date()
		};
		(await channel).sendToQueue('test', Buffer.from(JSON.stringify(data)));
		res.send('Test message was sent with data: ' + JSON.stringify(data));
	});

	return router;
};
