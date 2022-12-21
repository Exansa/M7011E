'use strict';

import { Collection, MongoClient, ServerApiVersion } from 'mongodb';

const DB_SERVER_URI = `mongodb+srv://admin:admin@cluster0.jdbug59.mongodb.net/?retryWrites=true&w=majority`;

export default class DB {
	private performQuery = async (
		dbName: string,
		collectionName: string,
		query: (collection: Collection) => Promise<any>
	): Promise<any> => {
		const client = new MongoClient(DB_SERVER_URI, {
			serverApi: ServerApiVersion.v1
		});
		const collection = client.db(dbName).collection(collectionName);
		const result = await query(collection);
		client.close();
		return result;
	};

	findAll = async (
		dbName: string,
		collectionName: string,
		projection?: Object
	): Promise<any> =>
		await this.performQuery(
			dbName,
			collectionName,
			async (collection) =>
				await collection.find({}, { projection }).toArray()
		);

	findOne = async (
		dbName: string,
		collectionName: string,
		query: Object,
		projection?: Object
	): Promise<any> =>
		this.performQuery(
			dbName,
			collectionName,
			async (collection) =>
				await collection.findOne(query, { projection })
		);

	find = async (
		dbName: string,
		collectionName: string,
		query: Object,
		projection?: Object
	): Promise<any> =>
		this.performQuery(
			dbName,
			collectionName,
			async (collection) =>
				await collection.find(query, { projection }).toArray()
		);

	insertOne = async (
		dbName: string,
		collectionName: string,
		data: Object
	): Promise<any> =>
		this.performQuery(
			dbName,
			collectionName,
			async (collection) => await collection.insertOne(data)
		);

	updateOne = async (
		dbName: string,
		collectionName: string,
		id: string,
		data: Object
	): Promise<any> =>
		this.performQuery(
			dbName,
			collectionName,
			async (collection) =>
				await collection.updateOne({ _id: id }, { $set: data })
		);
}
