const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const path = require('path');


const mongoose = require('mongoose');
const dotenv = require('dotenv');       						// Environment variables

const resolvers = require('./reslovers/resolvers');				// Resolvers


dotenv.config();
/*
* :::::::::::::::::::::::::::::::: DB CONFIG ::::::::::::::::::::::::::::::::
* */

const dbConnect = (process.env.NODE_ENV === "test") ?
	process.env.TEST_DATABASE_CONNECT : process.env.DEV_DATABASE_CONNECT;


/*
* ::::::::::::::::::::::::::::::: SERVER INIT :::::::::::::::::::::::::::::::
* */

// Import Schema has relative pathing issues use(path)
const typeDefs = importSchema(path.join(__dirname, "./schemas/schema.graphql"));
const server = new GraphQLServer({typeDefs, resolvers});

const startServer = async () => {

	await mongoose.connect(dbConnect, {useNewUrlParser: true, useUnifiedTopology: true}).then(r => {
		console.log('[>>] Database Connected :::', r.connections[0].name);
	});

	await server.start( () => {
		console.log(`[>>] Server is live on localhost port :: 4000`);
	});
}

module.exports = {
	startServer,
	mongoose
};


/* APOLLO CONFIG */

// const server = new ApolloServer({ typeDefs, resolvers });
// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
// 	console.log(`🚀 Server ready at ${url}`);
// });