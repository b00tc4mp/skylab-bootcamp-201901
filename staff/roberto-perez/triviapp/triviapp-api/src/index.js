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
	console.log('client connected');

	socket.on('NEW_GAME', room => {
		console.log('joining room', room);
		socket.join(room);
	});
});

app.io = io;

// io.on('connection', socket => {
// 	socket.on('subscribe', function(room) {
// 		console.log('joining room', room);
// 		socket.join(room);
// 	});

// 	socket.on('unsubscribe', function(room) {
// 		console.log('leaving room', room);
// 		socket.leave(room);
// 	});

// 	socket.on('send', function(data) {
// 		console.log('sending message');
// 		io.sockets.in(data.room).emit('message', data);
// 	});
// });

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
