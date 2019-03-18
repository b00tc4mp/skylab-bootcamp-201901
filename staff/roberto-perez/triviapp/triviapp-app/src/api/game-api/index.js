import auth from '../../services/auth';
const io = require('socket.io-client');
// import socketApi from '../../services/socket';

const gameApi = {
	url: 'NO_URL',
	baseUrl: 'NO_URL',
	socket: io.connect('http://192.168.0.54:8000'),

	onEvent(event, cb) {
		this.socket.on(event, cb);
	},

	emitReconect(data) {
		console.log("RECONECT")
		this.socket.emit('NEW_GAME', `game-${data}`);
	},

	emitCreateGame(data) {
		console.log("CREATE")
		console.log(this.socket)
		this.socket.emit('NEW_GAME', data);
	},

	emitLeaveGame(data) {
		this.socket.emit('LEAVE_GAME', data);
	},

	createGame(quizId) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/game`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
			body: JSON.stringify({ quiz: quizId }),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				this.emitCreateGame(`game-${response.id}`);
				return response;
			});
	},

	getGameByID(gameID) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/game/${gameID}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	joinGame(gameCode) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/game/join`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
			body: JSON.stringify({ gameCode }),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				this.emitCreateGame(`game-${response.game.id}`);
				return response;
			});
	},

	startGame(gameID) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/game/${gameID}/start`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	emitNextQuestion(gameID) {
		console.log(gameID);
		return fetch(`${this.url}/game/${gameID}/emit-question`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				// this.emitCreateGame(`game-${response.id}`);
				return response;
			});
	},

	getQuestionsResults(data) {
		return fetch(`${this.url}/game/${data.gameID}/question/results`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
			body: JSON.stringify({ questionId: data.questionID }),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	setNxtQuestion(gameID) {
		return fetch(`${this.url}/game/${gameID}/next-question`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	leaveGame(gameID) {
		this.emitLeaveGame(`game-${gameID}`);
	},

	gameOver(gameID) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/game/${gameID}/game-over`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	getPodium(gameId) {
		return fetch(`${this.url}/game/${gameId}/podium`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	emitTimeOutScreen(gameId) {
		return fetch(`${this.url}/game/${gameId}/time-out-question`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				this.emitCreateGame(`game-${response.id}`);
				return response;
			});
	},

	answeQuestion(data) {
		return fetch(`${this.url}/game/${data.gameId}/answer`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
			body: JSON.stringify({
				questionId: data.questionId,
				answerId: data.answerId,
			}),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	getScore(gameId) {
		return fetch(`${this.url}/game/${gameId}/score`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},
};

export default gameApi;
