import { Router, Request, Response } from 'express';
import Rabbitmq from '../../../common/rabbitmq';
import { respond } from '..';

const router = Router();

export default () => {
	/**
	 * @swagger
	 * /totp/generate:
	 *   post:
	 *     tags:
	 *       - 2FA
	 *     summary: Generate a 2FA secret
	 *     description: Puts a user into pending 2FA status. Needs to be verified with /totp/save within 5 minutes.
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/TOTPSecret'
	 *       401:
	 *         description: Unauthorized
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post('/generate', async (req: Request, res: Response) => {
		const data = { ...req.body };
		const result = await Rabbitmq.sendRPC(
			'totp.generate',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	/**
	 * @swagger
	 * /totp/save:
	 *   post:
	 *     tags:
	 *       - 2FA
	 *     summary: Saves a 2FA secret
	 *     description: Verifies and saves a 2FA secret in the database for TOTP verification.
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                $ref: '#/components/schemas/TOTP'
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/TOTP'
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             type: string
	 *             example: 'TOTP saved'
	 *       401:
	 *         description: Unauthorized
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post('/save', async (req: Request, res: Response) => {
		const data = req.body;
		const result = await Rabbitmq.sendRPC(
			'totp.save',
			JSON.stringify(data)
		);
		respond(res, result);
	});

	//! WARNING: This endpoint is not secure. It is only used for testing purposes
	/**
	 * @swagger
	 * /totp/verify:
	 *   post:
	 *     tags:
	 *       - 2FA
	 *     summary: Verifies a 2FA TOTP code
	 *     description: This is only for testing purposes. Should not be deployed for a real project.
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *         content:
	 *            application/x-www-form-urlencoded:
	 *              schema:
	 *                $ref: '#/components/schemas/TOTP'
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/TOTP'
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             type: string
	 *             example: 'TOTP verified'
	 *       401:
	 *         description: Unauthorized
	 *       500:
	 *         description: Internal Server Error
	 */
	router.post('/verify', async (req: Request, res: Response) => {
		const data = req.body;
		const token = await Rabbitmq.sendRPC(
			'authentication.verify',
			JSON.stringify(req.header('Authorization')?.split(' ')[1])
		);
		const user = JSON.parse(token.response);
		const result = await Rabbitmq.sendRPC(
			'totp.verify',
			JSON.stringify({ ...data, userId: user._id })
		);
		respond(res, result);
	});

	return router;
};
