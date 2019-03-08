const { port, env } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(port, () =>
	console.log('\x1b[32m', `Server started on port ${port} (${env})`),
);

process.on('SIGINT', async () => {
	await mongoose.disconnect();
	console.log('\x1b[31m', `\n Server stopped`);
	process.exit(0);
});

/**
 * Exports express
 * @public
 */
module.exports = app;
