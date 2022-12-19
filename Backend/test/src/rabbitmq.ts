import amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';

const HOST = process.env.NODE_ENV === 'production' ? 'rabbitmq' : 'localhost';
const AMQP_SERVER = `amqp://${HOST}:5672`;

export default class Rabbitmq {
	/**
	 * Send a quick RPC-like message using RabbitMQ to a Queue. Not optimized for high workloads.
	 *
	 * @param message The message to be sent
	 * @param queue The queue to send the message
	 * @param serviceName An optional, but recommended, service name to distinguish in the AMQP queue
	 * @returns Promise containing string
	 */
	sendRPC = async (
		message: string,
		queue: string,
		serviceName = undefined
	): Promise<string> => {
		const connection = await amqp.connect(AMQP_SERVER);
		const channel = await connection.createChannel();
		const rpcQueueName = serviceName ? 'rpc.' + serviceName : 'rpc';
		const rpcQueue = await channel.assertQueue(rpcQueueName, {
			durable: false
		});
		await channel.assertQueue(queue);

		const correlationId = uuidv4();
		channel.sendToQueue(queue, Buffer.from(message), {
			correlationId: correlationId,
			replyTo: rpcQueue.queue
		});

		return new Promise((resolve, _) => {
			channel.consume(rpcQueue.queue, (msg) => {
				if (msg) {
					if (msg.properties.correlationId === correlationId) {
						const content = msg.content.toString();
						channel.ack(msg);
						connection.close();
						resolve(content.toString());
					}
				}
			});
		});
	};

	/**
	 * Start listen for a queue and execute some method.
	 *
	 * Expects return type of {success: boolean, response: string} to be returned to the calling service
	 *
	 * @param queue Which queue to listen for
	 * @param method The method to be invoked on message
	 */
	listen = async (
		queue: string,
		method: () => { success: boolean; response: string }
	): Promise<void> => {
		try {
			const connection = await amqp.connect(AMQP_SERVER);
			const channel = await connection.createChannel();

			await channel.consume(queue, (data) => {
				if (data) {
					channel.sendToQueue(
						data?.properties.replyTo,
						Buffer.from(JSON.stringify(method())),
						{
							correlationId: data.properties.correlationId
						}
					);
					channel.ack(data);
				}
			});
		} catch (error) {
			console.error(error);
		}
	};
}
