'use strict';

// Import the express in typescript file
import express from 'express';
import bodyParser from 'body-parser';
import post from './blog';
import tag from './tag';
import category from './category';

// Initialize the express engine
const app: express.Application = express();

// Take a port 8080 for running server.
const port = 8080;

app.use(bodyParser.json());

// Handling '/' Request
app.use('/post', post());
app.use('/tag', tag());
app.use('/category', category());

// Server setup
app.listen(port, () => {
	console.log(`TypeScript with Express http://localhost:${port}/`);
});
