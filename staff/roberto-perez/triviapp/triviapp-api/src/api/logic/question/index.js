const { Quiz, Question } = require('triviapp-data');
const validate = require('triviapp-validation');
const { AlreadyExistsError, UnauthorizedError } = require('triviapp-errors');

/**
 * Abstraction of auth logic.
 */
module.exports = {

	createQuestion(data) {
		
		const {
			quiz = '',
			title = '',
			time = '',
			answers: [
				{ title: title1 = '', success: success1 = false },
				{ title: title2 = '', success: success2 = false },
				{ title: title3 = '', success: success3 = false },
				{ title: title4 = '', success: success4 = false },
			],
		} = data;

		validate([
			{ key: 'Quiz ID', value: quiz, type: String },
			{ key: 'Title', value: title, type: String },
			{ key: 'Time', value: time, type: String },
			{ key: 'Answer 1', value: title1, type: String },
			{ key: 'Answer 2', value: title2, type: String },
			{ key: 'Answer 3', value: title3, type: String, optional: true},
			{ key: 'Answer 4', value: title4, type: String, optional: true },
		]);

		if(
			(!success1 && !success2 && !success3 && !success4) || 
			(title3 === '' && title4 === '' && !success1 && !success2)
		) {
			throw new Error('Please choose at least one correct answer before continuing.');
		}

		if(title3 === '') data.answers[2].success = false;
		if(title4 === '') data.answers[3].success = false;
		
		return (async data => {
			const questionModel = new Question(data);
			const question = await questionModel.save();

			const currentQuiz = await Quiz.get(quiz);
			currentQuiz.questions.push(question);
			await currentQuiz.save();
			
			return question.normalize();
		})(data);
	},

	updateQuestion(question, data) {
		
		const {
			title = '',
			time = '',
			answers: [
				{ title: title1 = '', success: success1 = false },
				{ title: title2 = '', success: success2 = false },
				{ title: title3 = '', success: success3 = false },
				{ title: title4 = '', success: success4 = false },
			],
		} = data;

		validate([
			{ key: 'Title', value: title, type: String },
			{ key: 'Time', value: time, type: String },
			{ key: 'Answer 1', value: title1, type: String },
			{ key: 'Answer 2', value: title2, type: String },
			{ key: 'Answer 3', value: title3, type: String, optional: true},
			{ key: 'Answer 4', value: title4, type: String, optional: true },
		]);

		if(
			(!success1 && !success2 && !success3 && !success4) || 
			(title3 === '' && title4 === '' && !success1 && !success2)
		) {
			throw new Error('Please choose at least one correct answer before continuing.');
		}

		if(title3 === '') data.answers[2].success = false;
		if(title4 === '') data.answers[3].success = false;


		return (async (question, data) => {
			const questionUpdated = Object.assign(question, data);
			const savedQuestion = await questionUpdated.save();
			return savedQuestion.normalize();
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
