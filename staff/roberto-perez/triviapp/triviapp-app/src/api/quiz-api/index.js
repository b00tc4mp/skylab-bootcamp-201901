import auth from '../../services/auth';
const validate = require('triviapp-validation');

const quizApi = {
	url: 'NO_URL',

	getQuiz(quizId) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/quiz/${quizId}`, {
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

	createQuiz(token, data) {
		const { title, description } = data;

		validate([
			{ key: 'title', value: title, type: String },
			{ key: 'description', value: description, type: String },
		]);

		return fetch(`${this.url}/quiz`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	editQuiz(token, quizId, data) {
		const { title, description } = data;

		validate([
			{ key: 'title', value: title, type: String, optional: true },
			{ key: 'description', value: description, type: String, optional: true },
		]);

		return fetch(`${this.url}/quiz/${quizId}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	deleteQuiz(token, quizId) {
		return fetch(`${this.url}/quiz/${quizId}`, {
			method: 'DELETE',
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

	searchQuizzes(query, offset) {
		return fetch(`${this.url}/quiz/page/${offset}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({query}),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	listQuizzes(offset) {

		validate([
			{ key: 'Offset', value: offset, type: Number, optional: true },
		]);

		return fetch(`${this.url}/quiz/page/${offset}`, {
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

	myListQuizzes(token, offset) {
		
		return fetch(`${this.url}/quiz/page/${offset}/author`, {
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

export default quizApi;
