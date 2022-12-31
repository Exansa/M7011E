import { ConsumeMessage } from 'amqplib';
import { RPCResponse } from '../../common/rabbitmq';

export default async (message: ConsumeMessage): Promise<RPCResponse> => {
	console.info('authentication.verify');
	const data = JSON.parse(message.content.toString());
	if (!data) {
		return { success: false, response: 'Missing data' };
	}
	try {
		const user = await fetch('https://peterpanduro.eu.auth0.com/userinfo', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${data}`
			}
		}).then((res) => res.json());
		return { success: true, response: JSON.stringify(user) };
	} catch (e) {
		return { success: false, response: JSON.stringify(e) };
	}
};
