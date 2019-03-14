import auth from '../services/auth';

const quizApi = {
	url: 'http://localhost:8000/v1',

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

	createQuiz(data) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/quiz`, {
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

	editQuiz(quizId, data) {
		//VALIDACIONES DE TIPO

		return fetch(`${this.url}/quiz/${quizId}`, {
			method: 'PATCH',
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

	deleteQuiz(quizId) {
		//VALIDACIONES DE TIPO

		return fetch(`${this.url}/quiz/${quizId}`, {
			method: 'DELETE',
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

	listQuizzes(offset) {
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

	myListQuizzes(offset) {
		return fetch(`${this.url}/quiz/page/${offset}`, {
			method: 'POST',
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

export default quizApi;
