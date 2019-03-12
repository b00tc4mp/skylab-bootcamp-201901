const io = require('socket.io-client');

const socketApi = {
    
    socket: io.connect('http://localhost:8000'),

    joinGameHandler(onMessageReceived) {
        this.socket.on('JOIN_GAME', onMessageReceived);
    },
    
    unJoinGameHandler() {
        this.socket.off('JOIN_GAME');
    },

    startGameHandler(onMessageReceived) {
        this.socket.on('START_GAME', onMessageReceived);
    },

    createGame(data) {
        this.socket.emit('NEW_GAME', data);
    }

};

export default socketApi;
