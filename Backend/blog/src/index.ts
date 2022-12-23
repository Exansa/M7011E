'use strict';

// Import the express in typescript file
import express, { Request, Response } from 'express';
import Rabbitmq from '../../common/rabbitmq';
import post from '../post';
import Tags from './tags';
import Categories from './categories';
import user from '../user';
import Admins from './admins';
import media from '../media';

// Initialize the express engine
const app: express.Application = express();

// Take a port 8080 for running server.
const port = 8090;

const rabbitmq = new Rabbitmq();

Tags(rabbitmq);
Categories(rabbitmq);
Admins(rabbitmq);

app.get('/healthcheck', (_: Request, res: Response) => {
	res.send({ status: 'ok' });
});

// Server setup
app.listen(port, () => {
	console.log(`TypeScript with Express http://localhost:${port}/`);
});
