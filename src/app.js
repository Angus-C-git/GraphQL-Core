const startServer = require('./server').startServer;

// ::::::::::::::::::::::::: SERVER RUNNER ::::::::::::::::::::::::: \\

startServer().then(() => {
	console.log("[>>] Startup Complete");
});