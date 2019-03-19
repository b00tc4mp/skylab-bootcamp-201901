import quizApi from '../../api/quiz-api';
import validate from '../../utils/validate';
import auth from '../auth';

const quiz = {
	async get(quizId) {
		validate([{ key: 'Quiz ID', value: quizId, type: String }]);

		try {
			return await quizApi.getQuiz(quizId);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async editQuizPicture(quizId, picture) {
		try {
			const data = {
				picture
			}
			return await quizApi.editQuiz(auth.__userApiToken__, quizId, data);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async edit(quizId, data) {
		const { title, description } = data;

		validate([
			{ key: 'Quiz ID', value: quizId, type: String },
			{ key: 'Title', value: title, type: String },
			{ key: 'Description', value: description, type: String },
		]);

		try {
			return await quizApi.editQuiz(auth.__userApiToken__, quizId, data);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async list(offset) {
		try {
			return await quizApi.listQuizzes(offset);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async search(search, offset) {
		try {
			return await quizApi.searchQuizzes(search, offset);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async myQuizzes(offset = 1) {
		try {
			return await quizApi.myListQuizzes(auth.__userApiToken__, offset);
		} catch (error) {
			throw Error(error.message);
		}
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
		validate([
			{ key: 'Quiz ID', value: quizId, type: String }
		]);
		
		try {
			return await quizApi.deleteQuiz(auth.__userApiToken__, quizId);
		} catch (error) {
			throw Error(error.message);
		}
	},

	
};

export default quiz;
