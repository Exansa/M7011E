'use strict';

// Third Party Dependencies
import express, { Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

// Middlewares
import swaggerSpec from './middlewares/swagger';
import authenticate from './middlewares/authenticate';

// Custom Dependencies
import { RPCResponse } from '../../common/rabbitmq';

// Routes imports
import Test from './routes/test';
import User from './routes/user';
import TOTP from './routes/totp';
import Tags from './routes/tags';
import Categories from './routes/categories';
import Admins from './routes/admins';
import Posts from './routes/posts';
import Search from './routes/search';
import { jsonParse } from './middlewares/jsonParse';

// Configs
const PORT = process.env.PORT || 8080;

// Setup Express and middlewares
const app: express.Application = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec()));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
app.use(jsonParse);

// Routes
app.use('/test', authenticate, Test());
app.use('/user', User());
app.use('/totp', authenticate, TOTP());
app.use('/tags', Tags());
app.use('/categories', Categories());
app.use('/admins', Admins());
app.use('/posts', Posts());
app.use('/search', Search());

app.get('/healthcheck', (_req, _res) => {
	_res.send({ status: 'ok' });
});

// Start the Server
app.listen(PORT, async () => {
	console.info(`Server started at url http://localhost:${PORT}/`);
});

/**
 * Quick and easy HTTP Response from a RPCResponse.
 *
 * Automatically sets the status code and sends the RPCResponse response object as JSON.
 *
 * @param res the Response instance
 * @param response the RPCResponse
 * @param fallbackStatusCode Optional status code to use if the RPCResponse status is undefined and success is false
 */
export const respond = (
	res: Response,
	response: RPCResponse,
	fallbackStatusCode = 500
): void => {
	res.status(
		response.status ?? (response.success ? 200 : fallbackStatusCode)
	).json(response.response);
};
