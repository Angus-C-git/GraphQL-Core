/**
 * :::::::::::::::::::::::::::::::::::::::::: DRIVER FOR TESTS ::::::::::::::::::::::::::::::::::::::::::
 *
 *  -> Configures server instance and connection to TEST database.
 *  -> Provides cleaning utilities for db
 * */


// Import Server Runner
const startTestServer = require('../../src/server').startServer;
const mongoose = require('../../src/server').mongoose;
const dotenv = require('dotenv');

mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;
dotenv.config();

async function removeAllCollections () {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		// noinspection JSUnresolvedFunction
		await collection.deleteMany();
	}
}

// Currently unused
// async function dropAllCollections () {
// 	const collections = Object.keys(mongoose.connection.collections);
// 	for (const collectionName of collections) {
// 		const collection = mongoose.connection.collections[collectionName];
// 		try {
// 			await collection.drop();
// 		} catch (error) {
// 			// Sometimes this error happens, but you can safely ignore it
// 			if (error.message === 'ns not found') return;
// 			// This error occurs when you use it.
// 			if (error.message.includes('a background operation is currently running')) return;
// 			console.log(error.message)
// 		}
// 	}
// }

module.exports = {
	async runSetup () {

		await startTestServer().then(() => {
			console.log("[>>] Test server setup completed");
		});

		console.log("[>>] Cleaning DB ... ");
		await removeAllCollections();


		// Connect to Mongoose
		// beforeAll(async () => {
		// 	console.log("HIT BEFORE");
		// 	await removeAllCollections();
		// });

		// // Cleans up database between each test
		// afterEach(async () => {
		// 	await removeAllCollections();
		// });

		// Disconnect Mongoose
		// afterAll(async () => {
		// 	await dropAllCollections();
		// 	await mongoose.connection.close();
		// });
	}
}
