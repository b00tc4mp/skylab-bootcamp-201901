import questionApi from '../../question-api';
import validate from '../../utils/validate';

const question = {

	async get(quizId, questionId) {

		validate([
			{ key: 'quizId', value: quizId, type: String },
			{ key: 'questionId', value: questionId, type: String }
		]);

		try {
			return await questionApi.getQuestion(quizId, questionId);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async create(quizId, data) {
		const { title, time, answers: 
			[{title: title1}, {title: title2}]
		 } = data;
		

		validate([
			{ key: 'quizId', value: quizId, type: String },
			{ key: 'title', value: title, type: String },
			{ key: 'time', value: time, type: String },
			{ key: 'title1', value: title1, type: String },
			{ key: 'title2', value: title2, type: String },
		]);

		try {
			return await questionApi.createQuestion(quizId, data);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async edit(quizId, questionId, data) {
		
		const { title, time, answers: 
			[{title: title1}, {title: title2}, {title: title3}, {title: title4}]
		 } = data;
		

		validate([
			{ key: 'quizId', value: quizId, type: String },
			{ key: 'questionId', value: quizId, type: String },
			{ key: 'title', value: title, type: String },
			{ key: 'time', value: time, type: String },
			{ key: 'title1', value: title1, type: String },
			{ key: 'title2', value: title2, type: String },
		]);

		try {
			return await questionApi.editQuestion(quizId, questionId, data);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async delete(quizId, questionId) {
		validate([
			{ key: 'quizId', value: quizId, type: String },
			{ key: 'questionId', value: questionId, type: String }
		]);
		
		try {
			return await questionApi.deleteQuestion(quizId,questionId);
		} catch (error) {
			throw Error(error.message);
		}
	},

	
};

export default question;
