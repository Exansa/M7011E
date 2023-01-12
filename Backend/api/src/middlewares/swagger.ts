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
						profile_picture: {
							type: 'string'
						},
						createdAt: {
							type: 'string'
						}
					}
				},
				UsersArray: {
					type: 'array',
					items: {
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
							profile_picture: {
								type: 'string'
							},
							createdAt: {
								type: 'string'
							}
						}
					}
				},
				UserUpdate: {
					type: 'object',
					properties: {
						user: {
							type: 'object',
							properties: {
								username: {
									type: 'string',
									required: false
								},
								email: {
									type: 'string',
									required: false
								},
								profile_picture: {
									type: 'string',
									required: false
								}
							}
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
				AdminWithUserData: {
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
								profile_picture: {
									type: 'string'
								},
								createdAt: {
									type: 'string'
								}
							}
						}
					}
				},
				AdminsWithUserDataArray: {
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
									profile_picture: {
										type: 'string'
									},
									createdAt: {
										type: 'string'
									}
								}
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
				AdminUpdate: {
					type: 'object',
					properties: {
						admin: {
							type: 'object',
							properties: {
								access: {
									type: 'string',
									enum: ['admin', 'superAdmin'],
									required: true
								}
							}
						}
					}
				},
				AdminAccess: {
					type: 'object',
					properties: {
						access: {
							type: 'object',
							properties: {
								_id: {
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
				PostWithData: {
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
							type: 'string',
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
						category_id: {
							type: 'string',
							pattern: '[0-9a-z]{24}'
						},
						tags_id: {
							type: 'array',
							items: {
								type: 'string',
								pattern: '[0-9a-z]{24}'
							},
							required: false
						},
						media: {
							type: 'string',
							required: false
						},
						User: {
							type: 'object',
							properties: {
								_id: {
									type: 'string'
								},
								username: {
									type: 'string'
								},
								profile_picture: {
									type: 'string'
								}
							}
						},
						category: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									_id: {
										type: 'string',
										pattern: '[0-9a-z]{24}'
									},
									name: {
										type: 'string'
									}
								}
							}
						},
						tags: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									_id: {
										type: 'string',
										pattern: '[0-9a-z]{24}'
									},
									name: {
										type: 'string'
									}
								}
							}
						}
					}
				},
				PostsWithDataArray: {
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
								type: 'string',
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
							category_id: {
								type: 'string',
								pattern: '[0-9a-z]{24}'
							},
							tags_id: {
								type: 'array',
								items: {
									type: 'string',
									pattern: '[0-9a-z]{24}'
								},
								required: false
							},
							media: {
								type: 'string',
								required: false
							},
							User: {
								type: 'object',
								properties: {
									_id: {
										type: 'string'
									},
									username: {
										type: 'string'
									},
									profile_picture: {
										type: 'string'
									}
								}
							},
							category: {
								type: 'object',
								properties: {
									_id: {
										type: 'string',
										pattern: '[0-9a-z]{24}'
									},
									name: {
										type: 'string'
									}
								}
							},
							tags: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										_id: {
											type: 'string',
											pattern: '[0-9a-z]{24}'
										},
										name: {
											type: 'string'
										}
									}
								}
							}
						}
					}
				},
				PostCreate: {
					type: 'object',
					properties: {
						post: {
							type: 'object',
							required: true,
							properties: {
								title: {
									type: 'string',
									required: true
								},
								content: {
									type: 'string',
									required: true
								},
								category_id: {
									type: 'string',
									pattern: '[0-9a-z]{24}'
								},
								tags_id: {
									type: 'array',
									items: {
										type: 'string',
										pattern: '[0-9a-z]{24}'
									},
									required: false
								},
								media: {
									type: 'string',
									required: false
								}
							}
						}
					}
				},
				PostUpdate: {
					type: 'object',
					properties: {
						post: {
							type: 'object',
							required: true,
							properties: {
								title: {
									type: 'string',
									required: false
								},
								content: {
									type: 'string',
									required: false
								},
								category_id: {
									type: 'string',
									pattern: '[0-9a-z]{24}'
								},
								tags_id: {
									type: 'array',
									items: {
										type: 'string',
										pattern: '[0-9a-z]{24}'
									},
									required: false
								},
								media: {
									type: 'string',
									required: false
								}
							}
						}
					}
				},
				Category: {
					type: 'object',
					properties: {
						_id: {
							type: 'string',
							pattern: '[0-9a-z]{24}',
							required: true
						},
						name: {
							type: 'string',
							required: true
						},
						description: {
							type: 'string',
							required: true
						}
					}
				},
				CategoriesArray: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							_id: {
								type: 'string',
								pattern: '[0-9a-z]{24}',
								required: true
							},
							name: {
								type: 'string',
								required: true
							},
							description: {
								type: 'string',
								required: true
							}
						}
					}
				},
				SearchCategories: {
					type: 'object',
					properties: {
						search: {
							type: 'object',
							properties: {
								name: {
									type: 'string',
									required: false
								},
								description: {
									type: 'string',
									required: false
								}
							}
						}
					}
				},
				CategoryCreate: {
					type: 'object',
					properties: {
						category: {
							type: 'object',
							required: true,
							properties: {
								name: {
									type: 'string',
									required: true
								},
								description: {
									type: 'string',
									required: true
								}
							}
						}
					}
				},
				CategoryUpdate: {
					type: 'object',
					properties: {
						category: {
							type: 'object',
							required: true,
							properties: {
								name: {
									type: 'string',
									required: false
								},
								description: {
									type: 'string',
									required: false
								}
							}
						}
					}
				},
				Tag: {
					type: 'object',
					properties: {
						_id: {
							type: 'string',
							pattern: '[0-9a-z]{24}',
							required: true
						},
						name: {
							type: 'string',
							required: true
						}
					}
				},
				TagsArray: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							_id: {
								type: 'string',
								pattern: '[0-9a-z]{24}',
								required: true
							},
							name: {
								type: 'string',
								required: true
							}
						}
					}
				},
				SearchTags: {
					type: 'object',
					properties: {
						search: {
							type: 'object',
							properties: {
								name: {
									type: 'string',
									required: false
								}
							}
						}
					}
				},
				TagCreate: {
					type: 'object',
					properties: {
						tag: {
							type: 'object',
							required: true,
							properties: {
								name: {
									type: 'string',
									required: true
								}
							}
						}
					}
				},
				TagUpdate: {
					type: 'object',
					properties: {
						tag: {
							type: 'object',
							required: true,
							properties: {
								name: {
									type: 'string',
									required: false
								}
							}
						}
					}
				},
				SearchPosts: {
					type: 'object',
					properties: {
						search: {
							type: 'object',
							required: true,
							properties: {
								title: {
									type: 'string',
									required: false
								},
								content: {
									type: 'string',
									required: false
								},
								user_id: {
									type: 'string',
									pattern: '[0-9a-z]{24}',
									required: false
								},
								category_id: {
									type: 'string',
									pattern: '[0-9a-z]{24}'
								},
								tags_id: {
									type: 'array',
									items: {
										type: 'string',
										pattern: '[0-9a-z]{24}'
									},
									required: false
								},
								media: {
									type: 'string',
									required: false
								}
							}
						}
					}
				},
				SearchUsers: {
					type: 'object',
					properties: {
						search: {
							type: 'object',
							required: true,
							properties: {
								username: {
									type: 'string',
									required: false
								},
								email: {
									type: 'string',
									required: false
								},
								profile_picture: {
									type: 'string',
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
		].sort((a) => {
			if (process.env.NODE_ENV === 'production') {
				return a.url.includes('8080') ? 1 : -1;
			}
			return a.url.includes('5001') ? 1 : -1;
		})
	};
	const options = {
		swaggerDefinition,
		apis: ['src/routes/*.ts']
	};

	const swaggerSpec = swaggerJsDoc(options);
	return swaggerSpec;
};
