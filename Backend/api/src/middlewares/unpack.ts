import { Request, Response, NextFunction } from 'express';

export const unpackParams = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	req.body = {
		...req.body,
		...req.query,
		...req.params
	};
	next();
};
