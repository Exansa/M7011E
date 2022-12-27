'use strict';

import express from 'express';
import Rabbitmq from '../../common/rabbitmq';
import createUser from './createUser';

const app: express.Application = express();

const PORT = process.env.PORT ?? 8085;

Rabbitmq.listen('user.create', async (message) => createUser(message));

app.get('/healthcheck', (_req, _res) => {
	_res.send({ status: 'ok' });
});

// Server setup
app.listen(PORT, () => {
	console.info(`Started User Service on port ${PORT}`);
});
