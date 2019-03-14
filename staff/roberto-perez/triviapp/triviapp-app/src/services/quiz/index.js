import quizApi from '../../quiz-api';
import validate from '../../utils/validate';

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
			return await quizApi.editQuiz(quizId, data);
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
			return await quizApi.editQuiz(quizId, data);
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

	async myQuizzes(offset = 1) {
		try {
			return await quizApi.myListQuizzes(offset);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async create(data) {
		const { title, description, picture } = data;

		validate([
			{ key: 'Title', value: title, type: String },
			{ key: 'Description', value: description, type: String },
			{ key: 'Image', value: picture, type: String },
		]);

		try {
			return await quizApi.createQuiz(data);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async delete(quizId) {
		validate([
			{ key: 'Quiz ID', value: quizId, type: String }
		]);
		
		try {
			return await quizApi.deleteQuiz(quizId);
		} catch (error) {
			throw Error(error.message);
		}
	},

	
};

export default quiz;
