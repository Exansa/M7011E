'use strict';

import express from 'express';
import JWT from 'jsonwebtoken';
import Rabbitmq from '../../common/rabbitmq';
import DB from '../../common/db';

const app: express.Application = express();

const port = 8082;

const SECRET = process.env.JWT_SECRET ?? 'not-so-secret';

const rabbitmq = new Rabbitmq();

rabbitmq.listen('authentication.verify', async (message) => {
	const data = JSON.parse(message.content.toString());
	if (!data) {
		return { success: false, response: 'Missing JWT data' };
	}
	try {
		const user = JWT.verify(data, SECRET);
		return { success: true, response: JSON.stringify(user) };
	} catch (e) {
		return { success: false, response: JSON.stringify(e) };
	}
});

rabbitmq.listen('authentication.sign', async (message) => {
	const data = JSON.parse(message.content.toString());
	if (!(data.email || data.username)) {
		return { success: false, response: 'Missing param email or username' };
	}
	if (!data.password) {
		return { success: false, response: 'Missing param password' };
	}
	const result = await DB.performQuery('blog', 'users', (collection) =>
		collection.findOne(
			{
				$or: [{ email: data.email }, { username: data.username }],
				pw: data.password
			},
			{ projection: { username: 1, email: 1 } }
		)
	);
	if (!result) {
		return {
			success: false,
			status: 400,
			response: 'Invalid email or password'
		};
	}
	const token = JWT.sign(result, SECRET);
	return { success: true, response: JSON.stringify(token) };
});

app.get('/healthcheck', (_req, _res) => {
	_res.send({ status: 'ok' });
});

app.listen(port, () => {
	console.info(`Started Service authentication`);
});
