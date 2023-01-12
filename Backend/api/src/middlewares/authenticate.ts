import { Request, Response, NextFunction } from 'express';
import Rabbitmq from '../../../common/rabbitmq';

export default async (req: Request, res: Response, next: NextFunction) => {
	const authorizationHeader = req.header('Authorization');

	if (!authorizationHeader)
		return res.status(401).send({ error: 'Authorization Header missing' });
	const type = authorizationHeader.split(' ')[0];
	if (type !== 'Bearer')
		return res
			.status(401)
			.send({ error: 'Application only allows Bearer token' });
	const token = authorizationHeader.split(' ')[1];
	if (!token) return res.status(401).send({ error: 'Bearer token missing' });
	const user = await Rabbitmq.sendRPC(
		'authentication.verify',
		JSON.stringify(token)
	);
	req.body.bearer = token;
	if (!user.success) {
		return res.status(401).json('Invalid Bearer token');
	}
	next();
};
