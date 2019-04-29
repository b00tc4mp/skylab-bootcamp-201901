'use sctric';

const { Quiz, Question } = require('triviapp-data');
const validate = require('triviapp-validation');
const { AlreadyExistsError, UnauthorizedError } = require('triviapp-errors');

module.exports = {
	
	/**
	 *
	 * @param {Object} data
	 *
	 * @throws {TypeError} on non-string quiz id, title, time, answer 1, answer 2, answer 3, answer 4
	 * @throws {ValueError} on empty or blank quiz id, title, time, answer 1, answer 2
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
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
			{ key: 'Answer 3', value: title3, type: String, optional: true },
			{ key: 'Answer 4', value: title4, type: String, optional: true },
		]);

		if (
			(!success1 && !success2 && !success3 && !success4) ||
			(title3 === '' && title4 === '' && !success1 && !success2)
		) {
			throw new Error(
				'Please choose at least one correct answer before continuing.',
			);
		}

		if (title3 === '') data.answers[2].success = false;
		if (title4 === '') data.answers[3].success = false;

		return (async data => {
			const questionModel = new Question(data);
			const question = await questionModel.save();

			const currentQuiz = await Quiz.get(quiz);
			currentQuiz.questions.push(question);
			await currentQuiz.save();

			return question.normalize();
		})(data);
	},

	/**
	 * @param {Object} question
	 *
	 * @param {Object} data
	 *
	 * @throws {TypeError} on non-string quiz id, title, time, answer 1, answer 2, answer 3, answer 4
	 * @throws {ValueError} on empty or blank quiz id, title, time, answer 1, answer 2
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
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
			{ key: 'Answer 3', value: title3, type: String, optional: true },
			{ key: 'Answer 4', value: title4, type: String, optional: true },
		]);

		if (
			(!success1 && !success2 && !success3 && !success4) ||
			(title3 === '' && title4 === '' && !success1 && !success2)
		) {
			throw new Error(
				'Please choose at least one correct answer before continuing.',
			);
		}

		if (title3 === '') data.answers[2].success = false;
		if (title4 === '') data.answers[3].success = false;

		return (async (question, data) => {
			const questionUpdated = Object.assign(question, data);
			const savedQuestion = await questionUpdated.save();
			return savedQuestion.normalize();
		})(question, data);
	},

	/**
	 * @param {Object} question
	 *
	 * @throws {TypeError} on non-object question
	 * @throws {ValueError} on empty or blank question
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	deleteQuestion(question) {
		validate([{ key: 'Question', value: question, type: Object }]);

		return (async () => {
			return question.remove();
		})();
	},
};
