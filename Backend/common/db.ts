'use strict';

import { Collection, MongoClient, ServerApiVersion } from 'mongodb';

const DB_SERVER_URI = `mongodb+srv://backend:backend@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority`;

export default class DB {
	private client?: MongoClient;

	private connect = (): void => {
		this.client = new MongoClient(DB_SERVER_URI, {
			serverApi: ServerApiVersion.v1
		});
	};

	/**
	 * Get a database collection. Automatically connects the client if it is not connected. However, don't forget to disconnect the client when you are done.
	 *
	 * @param db The name of the database
	 * @param collection The name of the collection
	 * @returns The collection
	 */
	collection = (db: string, collection: string): Collection => {
		if (!this.client) {
			this.connect();
		}
		return this.client!.db(db).collection(collection);
	};

	/**
	 * Disconnect the client.
	 */
	disconnect = async (): Promise<void> => {
		if (this.client) {
			await this.client.close();
		}
	};

	/**
	 * Make a quick query to the database. Automatically connects and disconnects the client for each query.
	 *
	 * @param db The name of the database
	 * @param collection The name of the collection
	 * @param callback The callback method to be executed on the collection
	 * @returns
	 */
	static performQuery = async (
		db: string,
		collection: string,
		callback: (collection: Collection) => Promise<any>
	): Promise<any> => {
		try {
			const client = new MongoClient(DB_SERVER_URI, {
				serverApi: ServerApiVersion.v1
			});
			const _collection = client.db(db).collection(collection);
			const result = await callback(_collection);
			client.close();
			return result;
		} catch (error) {
			console.error(error);
			return error;
		}
	};
}
