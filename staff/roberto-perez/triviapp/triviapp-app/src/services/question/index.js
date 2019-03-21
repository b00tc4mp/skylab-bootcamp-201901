import questionApi from '../../api/question-api';
import validate from '../../utils/validate';
import auth from '../auth';

const question = {
	async get(quizId, questionId) {
		validate([
			{ key: 'quizId', value: quizId, type: String },
			{ key: 'questionId', value: questionId, type: String },
		]);

		return await questionApi.getQuestion(quizId, questionId);
	},

	async create(quizId, data) {
		const {
			title,
			time,
			answers: [
				{ title: title1 = '', success: success1 = false },
				{ title: title2 = '', success: success2 = false },
				{ title: title3 = '', success: success3 = false },
				{ title: title4 = '', success: success4 = false },
			],
		} = data;

		validate([
			{ key: 'quiz ID', value: quizId, type: String },
			{ key: 'Title', value: title, type: String },
			{ key: 'Time', value: time, type: String },
			{ key: 'Answer 1', value: title1, type: String },
			{ key: 'Answer 2', value: title2, type: String },
			{ key: 'Answer 3', value: title3, type: String, optional: true },
			{ key: 'Answer 4', value: title4, type: String, optional: true },
		]);

		return await questionApi.createQuestion(auth.__userApiToken__, quizId, data);
	},

	async edit(quizId, questionId, data) {
		const {
			title,
			time,
			answers: [
				{ title: title1 },
				{ title: title2 },
				{ title: title3 },
				{ title: title4 },
			],
		} = data;

		validate([
			{ key: 'quizId', value: quizId, type: String },
			{ key: 'questionId', value: quizId, type: String },
			{ key: 'title', value: title, type: String },
			{ key: 'time', value: time, type: String },
			{ key: 'title1', value: title1, type: String },
			{ key: 'title2', value: title2, type: String },
		]);

		return await questionApi.editQuestion(
			auth.__userApiToken__,
			quizId,
			questionId,
			data,
		);
	},

	async delete(quizId, questionId) {
		validate([
			{ key: 'quizId', value: quizId, type: String },
			{ key: 'questionId', value: questionId, type: String },
		]);

		return await questionApi.deleteQuestion(
			auth.__userApiToken__,
			quizId,
			questionId,
		);
	},
};

export default question;
