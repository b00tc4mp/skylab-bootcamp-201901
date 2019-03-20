import auth from '../../services/auth';
const validate = require('triviapp-validation');

const questionApi = {
	url: 'NO_URL',

	getQuestion(quizId, questionId) {

		validate([
			{ key: 'Quiz ID', value: quizId, type: String },
			{ key: 'Question ID', value: questionId, type: String },
		]);

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


	createQuestion(token, quizId, data) {
		const {
			title = '',
			time = '',
			answers: [
				{ title: title1 = '', success: success1 = false },
				{ title: title2 = '', success: success2 = false },
				{ title: title3 = '', success: success3 = false },
				{ title: title4 = '', success: success4 = false },
			],
		} = data;

		validate([
			{ key: 'Token', value: token, type: String },
			{ key: 'Quiz ID', value: quizId, type: String },
			{ key: 'Title', value: title, type: String },
			{ key: 'Time', value: time, type: String },
			{ key: 'Answer 1', value: title1, type: String },
			{ key: 'Answer 2', value: title2, type: String },
			{ key: 'Answer 3', value: title3, type: String, optional: true},
			{ key: 'Answer 4', value: title4, type: String, optional: true },
		]);

		if(
			(!success1 && !success2 && !success3 && !success4) || 
			(title3 === '' && title4 === '' && !success1 && !success2)
		) {
			throw new Error('Please choose at least one correct answer before continuing.');
		}

		if(title3 === '') data.answers[2].success = false;
		if(title4 === '') data.answers[3].success = false;

		return fetch(`${this.url}/quiz/${quizId}/question`, {
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

	editQuestion(token, quizId, questionId, data) {
		console.log(token, quizId, questionId, data)
		const {
			title = '',
			time = '',
			answers: [
				{ title: title1 = '', success: success1 = false },
				{ title: title2 = '', success: success2 = false },
				{ title: title3 = '', success: success3 = false },
				{ title: title4 = '', success: success4 = false },
			],
		} = data;

		validate([
			{ key: 'Token', value: token, type: String },
			{ key: 'Quiz ID', value: quizId, type: String },
			{ key: 'Question ID', value: questionId, type: String },
			{ key: 'Title', value: title, type: String },
			{ key: 'Time', value: time, type: String },
			{ key: 'Answer 1', value: title1, type: String },
			{ key: 'Answer 2', value: title2, type: String },
			{ key: 'Answer 3', value: title3, type: String, optional: true},
			{ key: 'Answer 4', value: title4, type: String, optional: true },
		]);

		if(
			(!success1 && !success2 && !success3 && !success4) || 
			(title3 === '' && title4 === '' && !success1 && !success2)
		) {
			throw new Error('Please choose at least one correct answer before continuing.');
		}

		if(title3 === '') data.answers[2].success = false;
		if(title4 === '') data.answers[3].success = false;
		return fetch(`${this.url}/quiz/${quizId}/question/${questionId}`, {
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

	deleteQuestion(token, quizId, questionId) {
		validate([
			{ key: 'Token', value: token, type: String },
			{ key: 'Quiz ID', value: quizId, type: String },
			{ key: 'Question ID', value: questionId, type: String },
		]);
		return fetch(`${this.url}/quiz/${quizId}/question/${questionId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
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
