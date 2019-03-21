'use sctric';

const socketIo = require('socket.io');

class Socket {
	constructor() {
		this.io = null;
	}

	connect(server) {
		this.io = socketIo(server);
		this.io.sockets.on('connection', socket => {
			
		});
	}
}

module.exports = new Socket();
