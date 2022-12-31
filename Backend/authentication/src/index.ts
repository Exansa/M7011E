'use strict';

import express from 'express';
import Rabbitmq from '../../common/rabbitmq';
import verify from './verify';

const app: express.Application = express();
const PORT = process.env.PORT ?? 8082;

Rabbitmq.listen('authentication.verify', verify);

app.get('/healthcheck', (_req, _res) => {
	_res.send({ status: 'ok' });
});

app.listen(PORT, () => {
	console.info(`Started Service authentication on port ${PORT}`);
});
