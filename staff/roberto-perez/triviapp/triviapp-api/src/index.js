const { port, env } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const socket = require('./api/logic/socket');
// open mongoose connection
mongoose.connect();

// listen to requests
const server = app.listen(port, () =>
	console.log('\x1b[32m', `Server started on port ${port} (${env})`),
);

const io = require('socket.io')(server);

io.sockets.on('connection', socket => {
	// console.log(`Socket ${socket.id} connected.`);

	socket.on('disconnect', () => {
		// console.log(`Socket ${socket.id} disconnected.`);
		// console.log(io.sockets.adapter.rooms)
	});

	socket.on('NEW_GAME', room => {
		// console.log(io.sockets.adapter.rooms)
		console.log('joining room', room);
		socket.join(room);
	});

	socket.on('LEAVE_GAME', room => {
		console.log('Leaving room', room);
		socket.leave(room);
	});
});

app.io = io;

process.on('SIGINT', async () => {
	await mongoose.disconnect();
	console.log('\x1b[31m', `\n Server stopped`);
	process.exit(0);
});

/**
 * Exports express
 * @public
 */
module.exports = { app };
