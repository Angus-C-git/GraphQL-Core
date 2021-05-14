const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const path = require('path');


const dotenv = require('dotenv');       						// Environment variables

const resolvers = require('../src/reslovers/resolvers');				// Resolvers


dotenv.config();


/*
* ::::::::::::::::::::::::::::::: TEST SERVER INIT :::::::::::::::::::::::::::::::
* */

const startTestServer = async () => {
	const options = {
		port: 8080
	}


	/*
	* ::::::::::::::::::::::::::::::: TEST DB INIT :::::::::::::::::::::::::::::::
	* */




	// Import Schema has relative pathing issues use(path)
	const typeDefs = importSchema(path.join(__dirname, "../src/schemas/schema.graphql"));
	const server = new GraphQLServer({typeDefs, resolvers});

	await server.start(options, ({port}) => {
		console.log(`[>>] Test Server is live on localhost port :: ${port}`);
	});
}



module.exports = startTestServer;

/* APOLLO CONFIG */

// const server = new ApolloServer({ typeDefs, resolvers });
// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
// 	console.log(`🚀 Server ready at ${url}`);
// });