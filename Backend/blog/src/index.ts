'use strict';

// Import the express in typescript file
import express, { Request, Response } from 'express';
import Tags from './tags';
import Categories from './categories';
import Admins from './admins';
import posts from './posts';

// Initialize the express engine
const app: express.Application = express();

// Take a port 8080 for running server.
const PORT = process.env.PORT ?? 8090;

Tags();
Categories();
Admins();
posts();

app.get('/healthcheck', (_: Request, res: Response) => {
	res.send({ status: 'ok' });
});

// Server setup
app.listen(PORT, () => {
	console.log(`Started Blog Service at port ${PORT}/`);
});
