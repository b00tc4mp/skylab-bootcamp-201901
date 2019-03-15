import auth from '../../services/auth';
const io = require('socket.io-client');
// import socketApi from '../../services/socket';

const gameApi = {
	url: 'http://localhost:8000/v1',
	socket: io.connect('http://localhost:8000'),

	onEvent(event, cb) {
		this.socket.on(event, cb);
	},
	
	emitCreateGame(data) {
		this.socket.emit('NEW_GAME', data);
	},

	getGame(gameId) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/game/${gameId}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
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

	startGame(gameId) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/game/${gameId}/start`, {
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

	joinGame(code) {
		//VALIDACIONES DE TIPO

		const toke = auth.token;

		const headers = {
			'content-type': 'application/json',
		};

		if (toke) {
			headers.authorization = `Bearer ${auth.token}`;
		}

		return fetch(`${this.url}/game/join`, {
			method: 'PATCH',
			headers,
			body: JSON.stringify({ code }),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				this.emitCreateGame(`game-${response.game.id}`);
				return response;
			});
	},

	answeQuestion(data) {
		return fetch(`${this.url}/game/answer`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	getQuestionsResults(data) {
		return fetch(`${this.url}/game/question/results`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	getLastAnswer(gameId) {
		debugger
		return fetch(`${this.url}/game/${gameId}/answer/last`, {
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

	emitNextQuestion(gameId) {
		return fetch(`${this.url}/game/emit-question`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
			body: JSON.stringify({ id: gameId }),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				this.emitCreateGame(`game-${response.id}`);
				return response;
			});
	},

	emitTimeOutScreen(gameId) {
		return fetch(`${this.url}/game/time-out-question`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
			body: JSON.stringify({ id: gameId }),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				this.emitCreateGame(`game-${response.id}`);
				return response;
			});
	},
	
	setNxtQuestion(gameId) {
		return fetch(`${this.url}/game/${gameId}/next-question`, {
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
