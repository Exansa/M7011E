'use strict';

// Import the express in typescript file
import express from 'express';
import Rabbitmq from './rabbitmq';

// Initialize the express engine
const app: express.Application = express();

// Take a port 8080 for running server.
const port = 8081;

// parse the request body
app.use(express.json());

const rabbitmq = new Rabbitmq();
rabbitmq.listen('test', () => {
	return { success: true, response: 'testdata' };
});

// Server setup
app.listen(port, () => {
	console.info(`TypeScript with Express http://localhost:${port}/`);
});
