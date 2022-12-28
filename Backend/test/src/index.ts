'use strict';

// Import the express in typescript file
import express, { Request, Response } from 'express';
import Rabbitmq, { RPCResponse } from '../../common/rabbitmq';

// Initialize the express engine
const app: express.Application = express();

// Take a port 8080 for running server.
const port = 8079;

// parse the request body
app.use(express.json());

Rabbitmq.listen('test', async (message) => {
	const data = JSON.parse(message.content.toString());
	const response: RPCResponse = {
		success: true,
		status: 200,
		response: data
	};
	return response;
});

app.get('/healthcheck', (_: Request, res: Response) => {
	res.send({ status: 'ok' });
});

// Server setup
app.listen(port, () => {
	console.info(`Started Service test`);
});
