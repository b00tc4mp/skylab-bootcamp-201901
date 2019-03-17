const { Game, Question, Quiz, AnswerGame, mongoose } = require('triviapp-data');
const {
	Types: { ObjectId },
} = mongoose;
const validate = require('triviapp-data');
const {
	AlreadyExistsError,
	UnauthorizedError,
	NotFoundError,
} = require('triviapp-errors');
const { cloudName, apiKey, apiSecret } = require('../../../config/vars');
var randomize = require('randomatic');

/**
 * Abstraction of auth logic.
 */
module.exports = {
	createGame(data) {
		return (async () => {
			data.code = randomize('0', 6);

			const quiz = await Quiz.get(data.quiz);

			data.currentQuestion = quiz.questions[0].id;

			const gameModel = new Game(data);

			const game = await gameModel.save();

			return game.normalize();
		})();
	},

	joinGame(data) {
		const { user, gameCode } = data;

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

	startGame(game) {
		return (async () => {
			game.start = true;
			await game.save();
			return game.normalize();
		})();
	},

	gameOver(game) {
		return (async () => {
			game.end = true;
			await game.save();
			return game.normalize();
		})();
	},

	questionResults(game, data) {
		return (async () => {
			const { questionId } = data;
			debugger;
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

			// return Promise.all(results).then(answers => {

			// 	let totalAnswers = 0;

			// 	const results = answers.map(answer => {
			// 		if (answer.length > 0) {

			// 			let currentAnswer = answer[0].question.answers.find(_answer => {
			// 				return answer[0].question.answers.answer === _answer.answer;
			// 			})

			// 			totalAnswers += answer.length;
			// 			return { total: answer.length, success: currentAnswer.success };
			// 		}

			// 		return { total: 0, success: false, percent: 0 };
			// 	});

			// 	return results.map(res => {
			// 		res.percent = Math.ceil(((res.total / totalAnswers) * 100) / 10) * 10;

			// 		return res;
			// 	});
			// });
		})();
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

	// endGame(game) {
	// 	return (async game => {
	// 		game.start = false;
	// 		await game.save();
	// 		return game.normalize();
	// 	})(game);
	// },

	// questionResults(data) {
	// 	return (async data => {
	// 		const { questionId, gameId } = data;

	// 		const currentGame = await Game.getBy({ _id: gameId });

	// 		let currentQuestionID;

	// 		currentGame[0].quiz.questions.forEach(_id => {
	// 			if (_id.toString() === questionId) {
	// 				currentQuestionID = _id;
	// 			}
	// 		});

	// 		const currentQuestion = await Question.get(currentQuestionID);

	// 		const results = currentQuestion.answers.map(async _answer => {
	// 			return await AnswerGame.list({
	// 				game: gameId,
	// 				answer: _answer.id,
	// 			});
	// 		});

	// 		return Promise.all(results).then(answers => {
	// 			let totalAnswers = 0;

	// 			const results = answers.map(answer => {
	// 				if (answer.length > 0) {
	// 					totalAnswers += answer.length;
	// 					return { total: answer.length, success: answer.success };
	// 				}

	// 				return { total: 0, success: false, percent: 0 };
	// 			});

	// 			return results.map(res => {
	// 				res.percent = Math.ceil(((res.total / totalAnswers) * 100) / 10) * 10;

	// 				return res;
	// 			});
	// 		});
	// 	})(data);
	// },

	// getPodium(data) {
	// 	return (async data => {
	// 		const answers = await AnswerGame.list({ game: data.game.id });

	// 		return answers.reduce((accum, answer) => {
	// 			const user = accum[answer.user._id] || { user: answer.user, score: 0 }

	// 			user.score += answer.score

	// 			accum[answer.user._id] = user

	// 			return accum
	// 		}, {})
	// 	})(data);
	// },

	// getScore(data) {
	// 	return (async data => {
	// 		const answers = await AnswerGame.list({ game: data.game.id, user: data.user });

	// 		return answers.reduce((accum, answer) => {
	// 			const user = accum[answer.user._id] || { user: answer.user, score: 0 }

	// 			user.score += answer.score

	// 			accum[answer.user._id] = user

	// 			return accum
	// 		}, {})
	// 	})(data);
	// },

	// getLastAnswer(data) {
	// 	return (async data => {
	// 		const answers = await AnswerGame.getBy(data);
	// 		return answers.normalize();
	// 	})(data);
	// },

	// setNextQuestion(data) {
	// 	return (async ({ game }) => {
	// 		currentQuestionIndex = game.quiz.questions.findIndex(
	// 			question => question.id === game.currentQuestion.id,
	// 		);

	// 		const nextQuestion = game.quiz.questions[currentQuestionIndex + 1];

	// 		if (nextQuestion) {
	// 			game.currentQuestion = nextQuestion;
	// 		}

	// 		await game.save();
	// 		return game.normalize();
	// 	})(data);
	// },

	// currentQuestion(game) {
	// 	return (async (game) => {
	// 		const question = await Game.getCurrentQuestion(game.id);
	// 		debugger
	// 		return question;
	// 	})(game);
	// },
};
