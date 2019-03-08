import auth from '../services/auth';

const questionApi = {
	url: 'http://localhost:8000/v1',

	getQuestion(quizId, questionId) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/quiz/${quizId}/question/${questionId}`, {
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


	createQuestion(quizId, data) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/quiz/${quizId}/question`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.__userApiToken__}`,
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	editQuestion(quizId, questionId, data) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/quiz/${quizId}/question/${questionId}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.__userApiToken__}`,
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	deleteQuestion(quizId, questionId) {
		//VALIDACIONES DE TIPO
		return fetch(`${this.url}/quiz/${quizId}/question/${questionId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.__userApiToken__}`,
			}
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	
};

export default questionApi;
