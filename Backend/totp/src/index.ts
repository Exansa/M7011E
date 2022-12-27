'use strict';

import express, { Request, Response } from 'express';
import Rabbitmq from '../../common/rabbitmq';
import generateTOTP from './generateTOTP';
import saveTOTP from './saveTOTP';
import veritypTOTP from './veritypTOTP';

const app: express.Application = express();

const port = 8081;

app.use(express.json());

Rabbitmq.listen('totp.generate', async (message) => generateTOTP(message));
Rabbitmq.listen('totp.save', async (message) => saveTOTP(message));
Rabbitmq.listen('totp.verify', async (message) => veritypTOTP(message));

app.get('/healthcheck', (_: Request, res: Response) => {
	res.send({ status: 'ok' });
});

// Server setup
app.listen(port, () => {
	console.info(`Started Service totp`);
});
