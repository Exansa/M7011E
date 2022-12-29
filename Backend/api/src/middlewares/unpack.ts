import { Request, Response, NextFunction } from 'express';

import Rabbitmq from '../../../common/rabbitmq';

export const unpackJWT = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	const jwt = req.header('Authorization')?.split(' ')[1];
	if (jwt) {
		await Rabbitmq.sendRPC(
			'authentication.verify',
			JSON.stringify(jwt)
		).then((result) => {
			if (result.success) {
				const user = JSON.parse(result.response);
				req.body = { ...req.body, user_id: user._id };
			}
		});
	}
	next();
};

export const unpackParams = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	req.body = {
		...req.body,
		...req.params
	};
	next();
};
