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
					bearerFormat: 'Auth0'
				}
			},
			schemas: {
				BearerToken: {
					type: 'string'
				},
				Tokens: {
					type: 'object',
					properties: {
						access_token: {
							type: 'string'
						},
						refresh_token: {
							type: 'string'
						}
					}
				},
				TOTP: {
					type: 'object',
					properties: {
						totp: {
							required: true,
							pattern: '^[0-9]{6}$',
							description: '6 digit TOTP code'
						}
					}
				},
				TOTPSecret: {
					type: 'object',
					properties: {
						secret: {
							type: 'string'
						},
						otpath_url: {
							type: 'string'
						}
					}
				},
				Test: {
					type: 'object',
					properties: {
						test: {
							type: 'string'
						}
					}
				},
				UserCreate: {
					type: 'object',
					properties: {
						username: {
							type: 'string',
							required: true
						}
					}
				},
				User: {
					type: 'object',
					properties: {
						_id: {
							type: 'string'
						},
						auth0_id: {
							type: 'string'
						},
						username: {
							type: 'string'
						},
						email: {
							type: 'string'
						},
						picture: {
							type: 'string'
						},
						createdAt: {
							type: 'string'
						}
					}
				},
				UserId: {
					type: 'object',
					properties: {
						user_id: {
							type: 'string',
							pattern: '[0-9a-z]{24}',
							required: true
						}
					}
				},
				Set: {
					type: 'object',
					properties: {
						set: {
							type: 'string',
							required: true
						}
					}
				},
				Admin: {
					type: 'object',
					properties: {
						_id: {
							type: 'string',
							pattern: '[0-9a-z]{24}'
						},
						user_id: {
							type: 'string',
							pattern: '[0-9a-z]{24}'
						},
						access: {
							type: 'string',
							enum: ['admin', 'superAdmin']
						}
					}
				},
				AdminsArray: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							_id: {
								type: 'string',
								pattern: '[0-9a-z]{24}',
								required: true
							},
							user_id: {
								type: 'string',
								pattern: '[0-9a-z]{24}',
								required: true
							},
							access: {
								type: 'string',
								enum: ['admin', 'superAdmin'],
								required: true
							}
						}
					}
				},
				UseridAndSet: {
					type: 'object',
					properties: {
						user_id: {
							type: 'string',
							pattern: '[0-9a-z]{24}',
							required: true
						},
						set: {
							type: 'string',
							required: true
						}
					}
				},
				AdminCreate: {
					type: 'object',
					properties: {
						user_id: {
							type: 'string',
							pattern: '[0-9a-z]{24}',
							required: true
						},
						admin: {
							type: 'object',
							properties: {
								user_id: {
									type: 'string',
									pattern: '[0-9a-z]{24}',
									required: true
								},
								access: {
									type: 'string',
									enum: ['admin', 'superAdmin'],
									required: true
								}
							}
						}
					}
				},
				Post: {
					type: 'object',
					properties: {
						_id: {
							type: 'string',
							pattern: '[0-9a-z]{24}',
							required: true
						},
						title: {
							type: 'string',
							required: true
						},
						created_at: {
							type: 'date',
							required: true
						},
						content: {
							type: 'string',
							required: true
						},
						user_id: {
							type: 'string',
							pattern: '[0-9a-z]{24}',
							required: true
						},
						categories_id: {
							type: 'array',
							items: {
								type: 'string',
								pattern: '[0-9a-z]{24}'
							},
							required: false
						},
						tags_id: {
							type: 'array',
							items: {
								type: 'string',
								pattern: '[0-9a-z]{24}'
							},
							required: false
						},
						media_id: {
							type: 'array',
							items: {
								type: 'string',
								pattern: '[0-9a-z]{24}'
							},
							required: false
						}
					}
				},
				PostsArray: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							_id: {
								type: 'string',
								pattern: '[0-9a-z]{24}',
								required: true
							},
							title: {
								type: 'string',
								required: true
							},
							created_at: {
								type: 'date',
								required: true
							},
							content: {
								type: 'string',
								required: true
							},
							user_id: {
								type: 'string',
								pattern: '[0-9a-z]{24}',
								required: true
							},
							categories_id: {
								type: 'array',
								items: {
									type: 'string',
									pattern: '[0-9a-z]{24}'
								},
								required: false
							},
							tags_id: {
								type: 'array',
								items: {
									type: 'string',
									pattern: '[0-9a-z]{24}'
								},
								required: false
							},
							media_id: {
								type: 'array',
								items: {
									type: 'string',
									pattern: '[0-9a-z]{24}'
								},
								required: false
							}
						}
					}
				},
				PostCreate: {
					type: 'object',
					properties: {
						user_id: {
							type: 'string',
							pattern: '[0-9a-z]{24}',
							required: true
						},
						post: {
							type: 'object',
							required: true,
							properties: {
								title: {
									type: 'string',
									required: true
								},
								created_at: {
									type: 'date',
									required: true
								},
								content: {
									type: 'string',
									required: true
								},
								categories_id: {
									type: 'array',
									items: {
										type: 'string',
										pattern: '[0-9a-z]{24}'
									},
									required: false
								},
								tags_id: {
									type: 'array',
									items: {
										type: 'string',
										pattern: '[0-9a-z]{24}'
									},
									required: false
								},
								media_id: {
									type: 'array',
									items: {
										type: 'string',
										pattern: '[0-9a-z]{24}'
									},
									required: false
								}
							}
						}
					}
				}
			}
		},
		servers: [
			{
				url: 'http://localhost:5001',
				description: 'Docker server'
			},
			{
				url: 'http://localhost:8080',
				description: 'Local server'
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
