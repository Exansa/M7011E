'use strict';

import express from 'express';
import JWT from 'jsonwebtoken';
import Rabbitmq from '../../common/rabbitmq';
import login from './login';
import verify from './verify';

const app: express.Application = express();

export const SECRET = process.env.JWT_SECRET ?? 'not-so-secret';
const PORT = process.env.PORT ?? 8082;

Rabbitmq.listen('authentication.login', login);
Rabbitmq.listen('authentication.verify', verify);

Rabbitmq.listen('authentication.sign', async (message) => {
	console.info('authentication.sign');
	const data = JSON.parse(message.content.toString());
	const token = JWT.sign(data, SECRET);
	return { success: true, response: token };
});

app.get('/healthcheck', (_req, _res) => {
	_res.send({ status: 'ok' });
});

app.listen(PORT, () => {
	console.info(`Started Service authentication on port ${PORT}`);
});
