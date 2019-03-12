const socketIo = require('socket.io');

class Socket {
	constructor() {
		this.io = null;
	}

	connect(server) {
		this.io = socketIo(server);
		this.io.sockets.on('connection', socket => {
			console.log('server connected');
		});
	}
}

module.exports = new Socket();
