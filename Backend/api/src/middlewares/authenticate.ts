import { Request, Response, NextFunction } from 'express';
import Rabbitmq from '../../../common/rabbitmq';

const rabbitmq = new Rabbitmq();

export default async (req: Request, res: Response, next: NextFunction) => {
	const jwt = req.body?.jwt;
	if (!jwt) {
		return res.status(401).json('Missing JWT');
	}
	const user = await rabbitmq.sendRPC(
		'authentication.verify',
		JSON.stringify({ jwt })
	);
	if (!user.success) {
		return res.status(401).json('Invalid JWT');
	}
	next();
};
