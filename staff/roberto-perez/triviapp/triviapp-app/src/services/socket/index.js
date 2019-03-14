const io = require('socket.io-client');

const socketApi = {
	socket: io.connect('http://localhost:8000'),

	createGame(data) {
		this.socket.emit('NEW_GAME', data);
	},

	//HOST
	welcomeEvents(cb) {
		this.socket.on('playerJoinedRoom', cb );
		// this.socket.on('beginNewGame', cb );
	},


	//PLAYER
	youAreInEvents(cb) {
		this.socket.on('beginNewGame', cb );
	},

	getReadyEvents(cb) {
		this.socket.on('NEXT_QUESTION', cb );
	},


	
	// joinGameHandler(cb) {
	// 	this.socket.on('JOIN_GAME', cb);
	// },

	// startGameHandler(cb) {
	// 	this.socket.on('START_GAME', cb);
	// },
};

export default socketApi;
