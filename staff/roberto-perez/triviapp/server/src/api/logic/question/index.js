const { Quiz } = require('../../models/quiz.model');
const { Question } = require('../../models/question.model');
const validate = require('../../utils/validate');
const { AlreadyExistsError, UnauthorizedError } = require('../../errors');

/**
 * Abstraction of auth logic.
 */
module.exports = {
	// listQuizzes(data) {
	// 	return (async data => {
	// 		const quizzes = await Quiz.list(data);
	// 		const transformedQuiz = quizzes.map(quiz => quiz.normalize());
	// 		return transformedQuiz;
	// 	})(data);
	// },

	createQuestion(quizId, data) {
		const { title, time } = data;

		validate([
			{ key: 'title', value: title, type: String },
			{ key: 'time', value: time, type: String },
		]);

		return (async data => {
			data.quiz = quizId;
			const question = new Question(data);
			const savedQuestion = await question.save();
			return savedQuestion.normalize();

			// const quiz = await Quiz.get(quizId);
			// quiz.questions.push(question);
			// await quiz.save();
			// return quiz.normalize();
		})(data);
	},

	updateQuestion(question, data) {
		return (async (question, data) => {
			const questionUpdated = Object.assign(question, data);
			const savedQuestion = await questionUpdated.save();
			return savedQuestion.normalize();
		})(question, data);
	},

	deleteQuestion(question) {
		return (async question => {
			return question.remove();
		})(question);
	},
};
