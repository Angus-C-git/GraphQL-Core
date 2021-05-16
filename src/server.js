const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const path = require('path');
const { mergeSchemas, makeExecutableSchema }  = require('graphql-tools');

const mongoose = require('mongoose');
const dotenv = require('dotenv');       						// Environment variables
const fs = require('fs');


dotenv.config();
/*
* :::::::::::::::::::::::::::::::: DB CONFIG ::::::::::::::::::::::::::::::::
* */

const dbConnect = (process.env.NODE_ENV === "test") ?
	process.env.TEST_DATABASE_CONNECT : process.env.DEV_DATABASE_CONNECT;


/*
* ::::::::::::::::::::::::::::::: SERVER INIT :::::::::::::::::::::::::::::::
* */

// Combines all module schemas into one
const schemas = [];
const folders = fs.readdirSync(path.join(__dirname, "./modules"));
folders.forEach(folder => {
	const resolvers = require(`./modules/${folder}/resolvers`);
	const typeDefs = importSchema(path.join(__dirname, `./modules/${folder}/schema.graphql`));

	schemas.push(makeExecutableSchema({
		resolvers,
		typeDefs
	}));
});


const server = new GraphQLServer({ schema: mergeSchemas({ schemas }) });

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