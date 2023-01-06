import { Request, Response, NextFunction } from 'express';

export const jsonParse = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	for (const key in req.body) {
		if (typeof req.body[key] === 'string') {
			try {
				req.body[key] = JSON.parse(req.body[key]);
			} catch (e) {
				console.error(e);
			}
		}
	}
	next();
};
