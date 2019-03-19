import auth from '../../services/auth';
const io = require('socket.io-client');
const validate = require('triviapp-validation');
// import socketApi from '../../services/socket';

const gameApi = {
	url: 'NO_URL',
	baseUrl: 'NO_URL',
	socket: io.connect('http://192.168.0.54:8000'),

	onEvent(event, cb) {
		this.socket.on(event, cb);
	},

	emitReconect(data) {
		this.socket.emit('NEW_GAME', `game-${data}`);
	},

	emitCreateGame(data) {
		this.socket.emit('NEW_GAME', data);
	},

	emitLeaveGame(data) {
		this.socket.emit('LEAVE_GAME', data);
	},

	createGame(token, quizId) {
		validate([
			{ key: 'Token', value: token, type: String },
			{ key: 'Quiz ID', value: quizId, type: String },
		]);

		return fetch(`${this.url}/game`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
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

	getGameByID(token, gameID) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/game/${gameID}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	joinGame(token, gameCode) {
		
		validate([
			{ key: 'Token', value: token, type: String },
			{ key: 'Game code', value: gameCode, type: Number },
		]);

		return fetch(`${this.url}/game/join`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
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

	startGame(token, gameID) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/game/${gameID}/start`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	emitNextQuestion(token, gameID) {
		return fetch(`${this.url}/game/${gameID}/emit-question`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				// this.emitCreateGame(`game-${response.id}`);
				return response;
			});
	},

	getQuestionsResults(token, data) {
		console.log(token, data)
		return fetch(`${this.url}/game/${data.gameID}/question/results`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ questionId: data.questionID }),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	setNxtQuestion(token, gameID) {
		return fetch(`${this.url}/game/${gameID}/next-question`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
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

	gameOver(token, gameID) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/game/${gameID}/game-over`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	getPodium(token, gameId) {
		return fetch(`${this.url}/game/${gameId}/podium`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	emitTimeOutScreen(token, gameId) {
		return fetch(`${this.url}/game/${gameId}/time-out-question`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				this.emitCreateGame(`game-${response.id}`);
				return response;
			});
	},

	answeQuestion(token, data) {
		return fetch(`${this.url}/game/${data.gameId}/answer`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
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

	getScore(token, gameId) {
		return fetch(`${this.url}/game/${gameId}/score`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
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
