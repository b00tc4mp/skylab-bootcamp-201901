import quizApi from '../../quiz-api';
import validate from '../../utils/validate';

const quiz = {

	async get(quizId) {

		validate([
			{ key: 'quizId', value: quizId, type: String }
		]);

		try {
			return await quizApi.getQuiz(quizId);
		} catch (error) {
			throw Error(error.message);
		}

	},

	async list() {

		try {
			return await quizApi.listQuizzes();
		} catch (error) {
			throw Error(error.message);
		}

	},

	async create(data) {

		const { title, description } = data;

		validate([
			{ key: 'title', value: title, type: String },
			{ key: 'description', value: description, type: String }
		]);

		try {
			return await quizApi.createQuiz(data);
		} catch (error) {
			throw Error(error.message);
		}

	},
};

export default quiz;
