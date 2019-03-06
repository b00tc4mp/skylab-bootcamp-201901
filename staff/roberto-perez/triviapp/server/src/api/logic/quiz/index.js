const { Quiz } = require('../../models/quiz.model');
const validate = require('../../utils/validate');
const { AlreadyExistsError, UnauthorizedError } = require('../../errors');

/**
 * Abstraction of auth logic.
 */
module.exports = {
	listQuizzes(data) {
		return (async data => {
			const quizzes = await Quiz.list(data);
			const transformedQuiz = quizzes.map(quiz => quiz.normalize());
			return transformedQuiz;
		})(data);
	},

	createQuiz(data) {
		const { title, description } = data;

		validate([
			{ key: 'title', value: title, type: String },
			{ key: 'description', value: description, type: String },
		]);

		return (async data => {
			const quiz = new Quiz(data);
			const savedQuiz = await quiz.save();
			return savedQuiz.normalize();
		})(data);
	},

	updateQuiz(quiz, data) {
		return (async (quiz, data) => {
			const quizUpdated = Object.assign(quiz, data);
			const savedQuiz = await quizUpdated.save();
			return savedQuiz.normalize();
		})(quiz, data);
	},

	deleteQuiz(quiz) {
		return (async quiz => {
			return quiz.remove();
		})(quiz);
	},
};
