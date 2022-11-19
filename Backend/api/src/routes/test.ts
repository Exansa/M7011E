import { Channel } from 'amqplib';
import { Router, Request, Response } from 'express';

const router = Router();

export default (channel: Promise<Channel>) => {
	router.post('/', async (req: Request, res: Response) => {
		if (!channel) {
			res.status(500).send('Channel not initialized');
		}
		const data = req.body;

		(await channel).sendToQueue(
			'test',
			Buffer.from(
				JSON.stringify({
					...data,
					date: new Date()
				})
			)
		);

		res.send('Order submitted');
	});

	return router;
};
