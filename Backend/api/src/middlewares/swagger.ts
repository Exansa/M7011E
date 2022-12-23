import swaggerJsDoc from 'swagger-jsdoc';

export default () => {
	const swaggerDefinition = {
		openapi: '3.0.1',
		info: {
			title: 'M7011E API',
			version: '1.0.0',
			description: 'This is a REST API application made with Express.',
			license: {
				name: 'Licensed Under MIT',
				url: 'https://spdx.org/licenses/MIT.html'
			}
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT'
				}
			},
			schemas: {
				Test: {
					type: 'object',
					properties: {
						test: {
							type: 'string'
						}
					}
				}
			}
		},
		servers: [
			{
				url: 'http://localhost:8080',
				description: 'Development server'
			}
		]
	};
	const options = {
		swaggerDefinition,
		apis: ['src/routes/*.ts']
	};

	const swaggerSpec = swaggerJsDoc(options);
	return swaggerSpec;
};
