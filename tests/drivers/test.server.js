const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const path = require('path');
const { mergeSchemas, makeExecutableSchema }  = require('graphql-tools');
const fs = require('fs');

const dotenv = require('dotenv');       						// Environment variables

dotenv.config();


/*
* ::::::::::::::::::::::::::::::: TEST SERVER INIT :::::::::::::::::::::::::::::::
* */

const startTestServer = async () => {
	const options = {
		port: 8080
	}

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

	/*
	* ::::::::::::::::::::::::::::::: TEST DB INIT :::::::::::::::::::::::::::::::
	* */


	const server = new GraphQLServer({ schema: mergeSchemas({ schemas }) });

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