'use strict';

import express from 'express';
import Rabbitmq from '../../common/rabbitmq';
import createUser from './createUser';
import getAllUsers from './getAllUsers';
import getUser from './getUser';
import searchUsers from './searchUsers';

const app: express.Application = express();

const PORT = process.env.PORT ?? 8085;

Rabbitmq.listen('user.create', createUser);
Rabbitmq.listen('users.get_all', getAllUsers);
Rabbitmq.listen('users.get_one', getUser);
Rabbitmq.listen('users.search', searchUsers);

app.get('/healthcheck', (_req, _res) => {
	_res.send({ status: 'ok' });
});

// Server setup
app.listen(PORT, () => {
	console.info(`Started User Service on port ${PORT}`);
});
