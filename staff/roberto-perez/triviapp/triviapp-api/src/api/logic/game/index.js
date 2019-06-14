'use sctric';

const { Game, Question, Quiz, AnswerGame, mongoose } = require('triviapp-data');
const validate = require('triviapp-validation');
const {
	Types: { ObjectId },
} = mongoose;
const {
	AlreadyExistsError,
	UnauthorizedError,
	NotFoundError,
} = require('triviapp-errors');
const { cloudName, apiKey, apiSecret } = require('../../../config/vars');
var randomize = require('randomatic');


module.exports = {

	/**
	 *
	 * @param {Object} data
	 *
	 * @throws {TypeError} on non-string quiz id, host game
	 * @throws {ValueError} on empty or blank quiz id, host game
	 * @throws {Error} on non defined host game or quiz
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	createGame(data) {
		
		const { host, quiz } = data;

		if(!host) {
			throw new Error('Host game is not defined')
		}

		if(!quiz) {
			throw new Error('Quiz is not defined')
		}

		validate([
			{ key: 'Quiz ID', value: quiz, type: String },
			{ key: 'Host game', value: host, type: String },
		]);

		return (async () => {
			data.code = randomize('0', 6);

			const quiz = await Quiz.get(data.quiz);

			if(quiz.questions.length <= 0) throw new Error('To play a quiz you need to have at least one question')

			data.currentQuestion = quiz.questions[0].id;

			const gameModel = new Game(data);

			const game = await gameModel.save();

			return game.normalize();
		})();
	},

	/**
	 *
	 * @param {Object} data
	 *
	 * @throws {TypeError} on non-number game code
	 * @throws {ValueError} on empty or blank game code
	 * @throws {NotFoundError} on unexisting game
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	joinGame(data) {
		const { user, gameCode } = data;

		validate([
			{ key: 'Game code', value: gameCode, type: Number },
		]);

		return (async () => {
			const game = await Game.getByCode(gameCode);

			if (!game) {
				throw new NotFoundError(
					`We couldn't get you into the game. Please try again`,
				);
			}

			if (user && !game.users.some(userGame => userGame.toString() === user)) {
				game.users.push(user);
				await game.save();
			}

			return game.normalize();
		})();
	},

	/**
	 *
	 * @param {Object} gamme
	 *
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	startGame(game) {
		return (async () => {
			game.start = true;
			await game.save();
			return game.normalize();
		})();
	},

	/**
	 *
	 * @param {Object} game
	 *
	 * @throws {Error} on quiz not has yet started
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	gameOver(game) {

		if(!game.start) {
			throw new Error('The quiz has not yet started')
		}

		return (async () => {
			game.end = true;
			await game.save();
			return game.normalize();
		})();
	},

	/**
	 *
	 * @param {Object} game
	 * @param {Object} data
	 *
	 * @throws {TypeError} on non-number game code
	 * @throws {ValueError} on empty or blank game code
	 * @throws {NotFoundError} on unexisting game
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	questionResults(game, data) {
		return (async () => {
			const { questionId } = data;
			
			const currentGame = await Game.getBy({ _id: game.id });

			let currentQuestionID;

			currentGame[0].quiz.questions.forEach(_id => {
				if (_id.toString() === questionId) {
					currentQuestionID = _id;
				}
			});

			const currentQuestion = await Question.get(currentQuestionID);

			let totalAnswers = 0;

			const promises = currentQuestion.answers.map(async _answer => {
				const usersAnswers = await AnswerGame.list({
					game: game.id,
					answer: _answer.id,
				});

				totalAnswers += usersAnswers.length;

				return {
					answer: _answer,
					total: usersAnswers.length,
				};
			});

			return Promise.all(promises).then(results => {
				return results.map(res => {
					res.percent = Math.ceil(((res.total / totalAnswers) * 100) / 10) * 10;
					return res;
				});
			});

		})();
	},

	/**
	 *
	 * @param {Object} data
	 *
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	setNextQuestion(data) {
		return (async ({ game }) => {
			currentQuestionIndex = game.quiz.questions.findIndex(
				question => question.id === game.currentQuestion.id,
			);

			const nextQuestion = game.quiz.questions[currentQuestionIndex + 1];

			if (nextQuestion) {
				game.currentQuestion = nextQuestion;
			}

			await game.save();
			return game.normalize();
		})(data);
	},

	/**
	 *
	 * @param {Object} data
	 *
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	getPodium(data) {
		return (async data => {
			const answers = await AnswerGame.list({ game: data.game.id });

			return answers.reduce((accum, answer) => {
				const user = accum[answer.user._id] || { user: answer.user, score: 0 };

				user.score += answer.score;

				accum[answer.user._id] = user;

				return accum;
			}, {});
		})(data);
	},

	/**
	 *
	 * @param {Object} data
	 *
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	answerQuestion(data) {
		return (async data => {
			const { user, gameId, questionId: question, answerId: answer } = data;

			let score = 0;

			if (answer.success) {
				score = 100;
			}

			const allAnswerGame = await AnswerGame.getBy({
				game: gameId,
				answer: answer._id,
			});
			if (!allAnswerGame && answer.success) {
				score += 50;
			}

			const answerGameModel = new AnswerGame({
				game: gameId,
				question,
				user,
				answer,
				score,
			});
			const answerGame = await answerGameModel.save();
			return answerGame.normalize();
		})(data);
	},

	/**
	 *
	 * @param {Object} data
	 *
	 * @throws {UnauthorizedError} on access denied due to invalid credentials
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	getScore(data) {
		return (async data => {
			const answers = await AnswerGame.list({
				game: data.game.id,
				user: data.user,
			});

			return answers.reduce((accum, answer) => {
				const user = accum[answer.user._id] || { user: answer.user, score: 0 };

				user.score += answer.score;

				accum[answer.user._id] = user;

				return accum;
			}, {});
		})(data);
	},

};
