'use strict';

// Import the express in typescript file
import express from 'express';
import bodyParser from 'body-parser';
import db from './blog';

// Initialize the express engine
const app: express.Application = express();

// Take a port 8080 for running server.
const port = 8080;

app.use(bodyParser.json());

// Handling '/' Request
app.use('/', db());

// Server setup
app.listen(port, () => {
	console.log(`TypeScript with Express http://localhost:${port}/`);
});
