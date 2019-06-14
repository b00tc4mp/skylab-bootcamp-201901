import quizApi from '../../api/quiz-api';
import validate from '../../utils/validate';
import auth from '../auth';

const quiz = {
	async get(quizId) {
		validate([{ key: 'Quiz ID', value: quizId, type: String }]);

		return await quizApi.getQuiz(quizId);
	},

	async editQuizPicture(quizId, picture) {
		const data = {
			picture,
		};
		return await quizApi.editQuiz(auth.__userApiToken__, quizId, data);
	},

	async edit(quizId, data) {
		const { title, description } = data;

		validate([
			{ key: 'Quiz ID', value: quizId, type: String },
			{ key: 'Title', value: title, type: String },
			{ key: 'Description', value: description, type: String },
		]);

		return await quizApi.editQuiz(auth.__userApiToken__, quizId, data);
	},

	async list(offset) {
		return await quizApi.listQuizzes(offset);
	},

	async search(search, offset) {
		return await quizApi.searchQuizzes(search, offset);
	},

	async myQuizzes(offset = 1) {
		return await quizApi.myListQuizzes(auth.__userApiToken__, offset);
	},

	async create(data) {
		const { title, description, picture } = data;

		validate([
			{ key: 'Title', value: title, type: String },
			{ key: 'Description', value: description, type: String },
			{ key: 'Image', value: picture, type: String, optional: true },
		]);

		return await quizApi.createQuiz(auth.__userApiToken__, data);
	},

	async delete(quizId) {
		validate([{ key: 'Quiz ID', value: quizId, type: String }]);

		return await quizApi.deleteQuiz(auth.__userApiToken__, quizId);
	},
};

export default quiz;
