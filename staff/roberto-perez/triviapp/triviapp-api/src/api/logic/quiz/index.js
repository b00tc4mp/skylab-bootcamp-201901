const { Quiz } = require('triviapp-data');
const validate = require('triviapp-validation');
const { AlreadyExistsError, UnauthorizedError } = require('triviapp-errors');
const { cloudName, apiKey, apiSecret } = require('../../../config/vars');

/**
 * Abstraction of auth logic.
 */
module.exports = {
	listQuizzes(data = {}) {
		return (async () => {
			const quizzes = await Quiz.list(data);
			const transformedQuiz = quizzes.map(quiz => quiz.normalize());
			return transformedQuiz;
		})();
	},

	listQuizzesByAuthor(data) {

		const { authorID } = data;

		if(!authorID) throw new UnauthorizedError('Access is denied due to invalid credentials.')

		validate([
			{ key: 'Author ID', value: authorID, type: String },
		]);

		return (async data => {
			const quizzes = await Quiz.listByAuthor(data);
			const transformedQuiz = quizzes.map(quiz => quiz.normalize());
			return transformedQuiz;
		})(data);
	},

	searchQuizzesByQuery(data) {
		return (async () => {
			const quizzes = await Quiz.search(data);
			const transformedQuiz = quizzes.map(quiz => quiz.normalize());
			return transformedQuiz;
		})();
	},

	createQuiz(data) {
		const { title, description } = data;

		validate([
			{ key: 'title', value: title, type: String },
			{ key: 'description', value: description, type: String },
		]);

		return (async () => {
			const quiz = new Quiz(data);
			const savedQuiz = await quiz.save();
			return savedQuiz.normalize();
		})();
	},

	updateQuiz(quiz, data) {
		const { title, description } = data;

		validate([
			{ key: 'title', value: title, type: String, optional: true },
			{ key: 'description', value: description, type: String, optional: true },
		]);

		return (async () => {
			const quizUpdated = Object.assign(quiz, data);
			const savedQuiz = await quizUpdated.save();
			return savedQuiz.normalize();
		})();
	},

	deleteQuiz(quiz) {
		return (async () => {
			return quiz.remove();
		})();
	},

	addGame(quiz) {
		this.updateQuiz(quiz, { games: quiz.games + 1 });
	},
};
