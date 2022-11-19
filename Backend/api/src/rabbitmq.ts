import amqplib, { Channel } from 'amqplib';

const HOST = process.env.NODE_ENV === 'production' ? 'rabbitmq' : 'localhost';

let channel: Channel;

export default class Rabbitmq {
	private connect = async () => {
		try {
			const amqpServer = `amqp://${HOST}:5672`;
			const connection = await amqplib.connect(amqpServer);
			channel = await connection.createChannel();
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	channel = async (assertQueue: string): Promise<Channel> => {
		if (!channel) {
			await this.connect();
		}
		await channel.assertQueue(assertQueue);
		return channel;
	};
}
