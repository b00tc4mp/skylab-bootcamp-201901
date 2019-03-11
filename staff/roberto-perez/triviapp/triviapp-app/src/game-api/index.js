import auth from '../services/auth';

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
				authorization: `Bearer ${auth.__userApiToken__}`,
			},
			body: JSON.stringify({ quiz: quizId }),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	startGame(gameId) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/game/${gameId}/start`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.__userApiToken__}`,
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

		const toke = auth.__userApiToken__;

		const headers = {
			'content-type': 'application/json',
		};

		if (toke) {
			headers.authorization = `Bearer ${auth.__userApiToken__}`;
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
