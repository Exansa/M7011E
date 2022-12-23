import { Request, Response, NextFunction } from 'express';
import Rabbitmq from '../../../common/rabbitmq';

const rabbitmq = new Rabbitmq();

export default async (req: Request, res: Response, next: NextFunction) => {
	const authorizationHeader = req.header('Authorization');
	if (!authorizationHeader)
		return res.status(401).send({ error: 'Authorization Header missing' });
	const token = authorizationHeader.split(' ')[1];
	if (!token) return res.status(401).send({ error: 'Bearer token missing' });
	const user = await rabbitmq.sendRPC(
		'authentication.verify',
		JSON.stringify(token)
	);
	if (!user.success) {
		return res.status(401).json('Invalid Bearer token');
	}
	next();
};
