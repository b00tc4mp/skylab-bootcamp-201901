'use sctric';

const { Quiz } = require('triviapp-data');
const validate = require('triviapp-validation');
const { AlreadyExistsError, UnauthorizedError } = require('triviapp-errors');
const { cloudName, apiKey, apiSecret } = require('../../../config/vars');


module.exports = {

	/**
	 *
	 * @param {Object} data
	 *
	 * @throws {TypeError} on non-string Offset
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	listQuizzes(data = {}) {
		const { offset } = data;

		validate([
			{ key: 'Offset', value: offset, type: Number, optional: true },
		]);
		return (async () => {
			const quizzes = await Quiz.list(data);
			const transformedQuiz = quizzes.map(quiz => quiz.normalize());
			return transformedQuiz;
		})();
	},

	/**
	 *
	 * @param {Object} data
	 *
	 * @throws {TypeError} on non-string Offset
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
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

	/**
	 *
	 * @param {Object} data
	 *
	 * @throws {TypeError} on non-string query, offset
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	searchQuizzesByQuery(data) {
		const { query, offset } = data;

		validate([
			{ key: 'Query', value: query, type: String, optional: true },
			{ key: 'Offset', value: offset, type: Number, optional: true },
		]);

		return (async () => {
			const quizzes = await Quiz.search(data);
			const transformedQuiz = quizzes.map(quiz => quiz.normalize());
			return transformedQuiz;
		})();
	},

	/**
	 *
	 * @param {Object} data
	 *
	 * @throws {TypeError} on non-string title, description
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
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

	/**
	 *
	 * @param {Object} quiz
	 * @param {Object} data
	 *
	 * @throws {TypeError} on non-string title, description
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
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

	/**
	 *
	 * @param {Object} quiz
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	deleteQuiz(quiz) {
		return (async () => {
			return quiz.remove();
		})();
	},

	/**
	 *
	 * @param {Object} quiz
	 *
	 * @throws {Error} on non exist quiz
	 * 
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	addGame(quiz) {
		if(!quiz) throw Error('The quiz has not been declared');
		this.updateQuiz(quiz, { games: quiz.games + 1 });
	},
};
