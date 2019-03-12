import auth from '../services/auth';
import socketApi from '../services/socket';

const gameApi = {
	url: 'http://localhost:8000/v1',

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
				socketApi.createGame(`game-${response.id}`);
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

		return fetch(`${this.url}/join`, {
			method: 'PATCH',
			headers,
			body: JSON.stringify({ code }),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},
};

export default gameApi;
