'use strict';

import express from 'express';
import Rabbitmq from '../../common/rabbitmq';
import verify from './verify';
import verifyGetUser from './verifyGetUser';

const app: express.Application = express();
const PORT = process.env.PORT ?? 8082;

Rabbitmq.listen('authentication.verify', verify);
Rabbitmq.listen('authentication.verifyGetUser', verifyGetUser);

app.get('/healthcheck', (_req, _res) => {
	_res.send({ status: 'ok' });
});

app.listen(PORT, () => {
	console.info(`Started Service authentication on port ${PORT}`);
});
