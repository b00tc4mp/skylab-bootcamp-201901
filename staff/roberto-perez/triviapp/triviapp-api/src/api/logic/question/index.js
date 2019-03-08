const { Quiz, Question } = require('triviapp-data');
const validate = require('../../utils/validate');
const { AlreadyExistsError, UnauthorizedError } = require('../../errors');

/**
 * Abstraction of auth logic.
 */
module.exports = {

	createQuestion(data) {
		const { quiz, title, time } = data;

		validate([
			{ key: 'quiz ID', value: quiz, type: String },
			{ key: 'Title', value: title, type: String },
			{ key: 'Time', value: time, type: String },
		]);
		
		return (async data => {
			const question = new Question(data);
			await question.save();

			const currentQuiz = await Quiz.get(quiz);
			currentQuiz.questions.push(question);
			await currentQuiz.save();

			return currentQuiz.normalize();
		})(data);
	},

	updateQuestion(question, data) {
		return (async (question, data) => {

			// const { title, time, answers } = data;

			const questionUpdated = Object.assign(question, data);
			const savedQuestion = await questionUpdated.save();
			return savedQuestion.normalize();



			// if(answers) {
			// 	const questionUpdated = await Question.findOneAndUpdate(
			// 		{ _id: question.id },
			// 		{
			// 			$set: {
			// 				'answers.$': answers,
			// 			},
			// 		}
			// 	);
			// }
			
			// return questionUpdated;


			// const { title, time, answers } = data;

			// const quiz = await Quiz.findOneAndUpdate(
			// 	{ _id: quizId, 'questions._id': question.id },
			// 	{
			// 		$set: {
			// 			'questions.$': { title, time },
			// 		},
			// 		$set: {
			// 			'questions.$.answers': answers,
			// 		},
			// 	},
			// 	{"multi": true}
			// );
			// return quiz;
			// quiz.questions;

			// const questionUpdated = Object.assign(question, data);
			// const savedQuestion = await questionUpdated.save();
			// return savedQuestion.normalize();
		})(question, data);
	},

	deleteQuestion(question) {
		return (async question => {
			return question.remove();
			// const quiz = await Quiz.get(quizId);
			// quiz.questions.pull(question);

			// return quiz.save();
		})(question);
	},
};
