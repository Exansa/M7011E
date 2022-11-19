'use strict';

// Import the express in typescript file
import amqplib, { Channel, Connection } from 'amqplib';
import express, { Response } from 'express';

// Initialize the express engine
const app: express.Application = express();

// Take a port 8080 for running server.
const port = 8080;

// parse the request body
app.use(express.json());

// rabbitmq to be global variables
let channel: Channel, connection: Connection;
connect();

async function connect() {
	try {
		const RABBITMQ_HOST =
			process.env.NODE_ENV === 'production' ? 'rabbitmq' : 'localhost';
		const amqpServer = `amqp://${RABBITMQ_HOST}:5672`;
		connection = await amqplib.connect(amqpServer);
		channel = await connection.createChannel();

		// consume all the orders that are not acknowledged
		await channel.consume('test', (data) => {
			console.log(`Received ${Buffer.from(data!.content)}`);
			channel.ack(data!);
		});
	} catch (error) {
		console.error(error);
	}
}

app.get('*', (_, res: Response) => {
	res.status(404).send('Not found');
});

// Server setup
app.listen(port, () => {
	console.log(`TypeScript with Express http://localhost:${port}/`);
});
