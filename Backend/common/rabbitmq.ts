'use strict';

import amqp, { ConsumeMessage } from 'amqplib';
import { v4 as uuidv4 } from 'uuid';

const HOST = process.env.NODE_ENV === 'production' ? 'rabbitmq' : 'localhost';
const AMQP_SERVER = `amqp://${HOST}:5672`;

export type RPCResponse = {
	success: boolean;
	status?: number;
	response: string;
};

export default class Rabbitmq {
	/**
	 * Send a quick RPC-like message using RabbitMQ to a Queue. Not optimized for high workloads.
	 *
	 * @param queue The queue to send the message
	 * @param message The message to be sent
	 * @returns Promise containing string
	 */
	static sendRPC = async (
		queue: string,
		message: string
	): Promise<RPCResponse> => {
		const connection = await amqp.connect(AMQP_SERVER);
		const channel = await connection.createChannel();
		const rpcQueue = await channel.assertQueue(queue + '.rpc', {
			durable: false
		});
		await channel.assertQueue(queue);

		const correlationId = uuidv4();
		channel.sendToQueue(queue, Buffer.from(message), {
			correlationId: correlationId,
			replyTo: rpcQueue.queue
		});

		return new Promise((resolve, _) => {
			channel.consume(rpcQueue.queue, (msg: any) => {
				if (msg) {
					if (msg.properties.correlationId === correlationId) {
						const content = msg.content.toString();
						channel.ack(msg);
						connection.close();
						resolve(JSON.parse(content));
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
	static listen = async (
		queue: string,
		method: (message: ConsumeMessage) => Promise<RPCResponse>
	): Promise<void> => {
		try {
			const connection = await amqp.connect(AMQP_SERVER);
			const channel = await connection.createChannel();
			await channel.assertQueue(queue);

			await channel.consume(queue, async (data: any) => {
				if (data) {
					channel.sendToQueue(
						data?.properties.replyTo,
						Buffer.from(JSON.stringify(await method(data))),
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
