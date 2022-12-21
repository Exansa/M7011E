'use strict';

// Import the express in typescript file
import express, { Request, Response } from 'express';
import Rabbitmq from '../../common/rabbitmq';

// Initialize the express engine
const app: express.Application = express();

// Take a port 8080 for running server.
const port = 8079;

// parse the request body
app.use(express.json());

const rabbitmq = new Rabbitmq();
rabbitmq.listen('test', async () => {
	return { success: true, response: 'testdata' };
});

app.get('/healthcheck', (_: Request, res: Response) => {
	res.send({ status: 'ok' });
});

// Server setup
app.listen(port, () => {
	console.info(`TypeScript with Express http://localhost:${port}/`);
});
