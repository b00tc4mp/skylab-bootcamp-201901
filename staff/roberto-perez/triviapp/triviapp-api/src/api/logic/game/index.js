const mongoose = require('mongoose');
const {
	Types: { ObjectId },
} = mongoose;
const { Game } = require('../../models/game.model');
const { Question } = require('../../models/question.model');
const { Quiz } = require('../../models/quiz.model');
const { AnswerGame } = require('../../models/answer-game.model');
const validate = require('../../utils/validate');
const { AlreadyExistsError, UnauthorizedError, NotFoundError } = require('../../errors');
const { cloudName, apiKey, apiSecret } = require('../../../config/vars');
var randomize = require('randomatic');

/**
 * Abstraction of auth logic.
 */
module.exports = {
	createGame(data) {
		return (async data => {
			data.code = randomize('0', 6);
			const quiz = await Quiz.get(data.quiz);
			data.currentQuestion = quiz.questions[0].id;
			const gameModel = new Game(data);
			const game = await gameModel.save();
			return game.normalize();
		})(data);
	},

	startGame(game) {
		return (async game => {
			game.start = true;
			await game.save();
			return game.normalize();
		})(game);
	},

	endGame(game) {
		return (async game => {
			game.start = false;
			await game.save();
			return game.normalize();
		})(game);
	},

	joinGame(data) {
		const { user, code } = data;

		return (async (user, code) => {
			const gameModel = await Game.getByCode(code);

			if (!gameModel) {
				throw new NotFoundError(
					`We couldn't get you into the game. Please try again`,
				);
			}

			if (user && !gameModel.users.some(userGame => userGame.toString() === user)) {
				gameModel.users.push(user);
				await gameModel.save();
			}

			return gameModel.normalize();
		})(user, code);
	},

	answerQuestion(data) {
		return (async data => {
			const { user, gameId: game, questionId: question, answerId: answer } = data;

			let score = 0;

			if (answer.success) {
				score = 100;
			}

			const allAnswerGame = await AnswerGame.getBy({
				game: game,
				answer: answer._id,
			});
			if (!allAnswerGame && answer.success) {
				score += 50;
			}

			const answerGameModel = new AnswerGame({
				game,
				question,
				user,
				answer,
				score,
			});
			const answerGame = await answerGameModel.save();
			return answerGame.normalize();
		})(data);
	},

	questionResults(data) {
		return (async data => {
			const { questionId, gameId } = data;

			const currentGame = await Game.getBy({ _id: gameId });

			let currentQuestionID;

			currentGame[0].quiz.questions.forEach(_id => {
				if (_id.toString() === questionId) {
					currentQuestionID = _id;
				}
			});

			const currentQuestion = await Question.get(currentQuestionID);

			const results = currentQuestion.answers.map(async _answer => {
				return await AnswerGame.list({
					game: gameId,
					answer: _answer.id,
				});
			});

			return Promise.all(results).then(answers => {
				let totalAnswers = 0;

				const results = answers.map(answer => {
					if (answer.length > 0) {
						totalAnswers += answer.length;
						return { total: answer.length, success: answer.success };
					}

					return { total: 0, success: false, percent: 0 };
				});

				return results.map(res => {
					res.percent = Math.ceil(((res.total / totalAnswers) * 100) / 10) * 10;

					return res;
				});
			});
		})(data);
	},

	getPodium(data) {
		return (async data => {
			const answers = await AnswerGame.list({ game: data.game.id });

			return answers.reduce((accum, answer) => {
				const user = accum[answer.user._id] || { user: answer.user, score: 0 }
			
				user.score += answer.score
			
				accum[answer.user._id] = user
			
				return accum
			}, {})
		})(data);
	},

	getScore(data) {
		return (async data => {
			const answers = await AnswerGame.list({ game: data.game.id, user: data.user });

			return answers.reduce((accum, answer) => {
				const user = accum[answer.user._id] || { user: answer.user, score: 0 }
			
				user.score += answer.score
			
				accum[answer.user._id] = user
			
				return accum
			}, {})
		})(data);
	},

	getLastAnswer(data) {
		return (async data => {
			const answers = await AnswerGame.getBy(data);
			return answers.normalize();
		})(data);
	},

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
};
