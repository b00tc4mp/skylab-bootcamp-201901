const io = require('socket.io-client');

const socket = io.connect('http://localhost:8000');

function votingHandler(onMessageReceived) {
	socket.on('voting', onMessageReceived);
}

function unvotingHandler() {
	socket.off('voting');
}

socket.on('error', function(err) {
	console.log('received socket error:');
	console.log(err);
});

function voting(data) {
	socket.emit('voting', data);
}

export {
    votingHandler,
    unvotingHandler,
    voting
}