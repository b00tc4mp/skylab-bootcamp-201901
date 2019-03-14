const mongoose = require('mongoose');
const {
	Types: { ObjectId },
} = mongoose;
const { Game } = require('../../models/game.model');
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
		return (async (data) => {
			const {
				user,
				gameId:game,
				questionId:question,
				answerId:answer
			} = data;

			let score = 0;

			if(answer.success) {
				score = 100;
			}

			const allAnswerGame = await AnswerGame.getBy({ game: game, answer: answer._id });
			if(!allAnswerGame && answer.success) {
				score += 50;
			}


			const answerGameModel = new AnswerGame({game, question, user, answer, score});
			const answerGame = await answerGameModel.save();
			return answerGame.normalize();
		})(data);
	},

	questionResults(data) {
		return (async (data) => {

			const {
				questionId:question,
				gameId:game
			} = data;

			const questionResults = await AnswerGame.getAnswersQuestion(game, question);
			// const questionResults = await AnswerGame.getAnswersQuestion({game, question});

			if(!questionResults) return [];

			return questionResults;
		})(data);
	},

	getLastAnswer(data) {
		return (async (data) => {
			debugger
			const answers = await AnswerGame.getBy(data);
			return answers.normalize();
		})(data);
	},


	setNextQuestion(data) {
		return (async ({game}) => {
debugger
			currentQuestionIndex = game.quiz.questions.findIndex(question => question.id === game.currentQuestion.id)

			const nextQuestion = game.quiz.questions[currentQuestionIndex + 1];

			if(nextQuestion) {
				game.currentQuestion = nextQuestion;
			}

			await game.save();
			return game.normalize();
		})(data);
	}

	
};
