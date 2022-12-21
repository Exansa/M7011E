'use strict';

// Third Party Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

// Custom Dependencies
import Rabbitmq from '../../common/rabbitmq';

// Routes imports
import Test from './routes/test';
import Auth from './routes/auth';

// Configs
const PORT = process.env.PORT || 8080;
const rabbitmq = new Rabbitmq();

// Setup Express and middlewares
const app: express.Application = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}
	next();
});

// Routes
app.use('/test', Test(rabbitmq));
app.use('/auth', Auth(rabbitmq));

app.get('/healthcheck', (_req, _res) => {
	_res.send({ status: 'ok' });
});

// Start the Server
app.listen(PORT, async () => {
	console.info(`Server started at url http://localhost:${PORT}/`);
});
