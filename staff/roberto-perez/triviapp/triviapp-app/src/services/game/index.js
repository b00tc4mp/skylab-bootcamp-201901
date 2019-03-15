import gameApi from '../../api/game-api';
import State from '../state';

const game = {
	currentGame: null,
	storage: sessionStorage,
	state: new State(sessionStorage, 'game'),

	onPlayerJoinedRoom(cb) {
		gameApi.onEvent('playerJoinedRoom', cb)
	},

	onBeginNewGame(cb) {
		gameApi.onEvent('beginNewGame', cb)
	},

	onShowQuestion(cb) {
		gameApi.onEvent('showQuestion', cb)
	},

	onNextQuestion(cb) {
		gameApi.onEvent('nextQuestion', cb)
	},
	
	onAnswerQuestion(cb) {
		gameApi.onEvent('answerQuestion', cb)
	},
	
	onTimeOut(cb) {
		gameApi.onEvent('timeOut', cb)
	},
	
	onGameOver(cb) {
		gameApi.onEvent('gameOver', cb)
	},

	


	
	
	
	async create(quizId) {
		try {
			const game = await gameApi.createGame(quizId);

			this.state.set(game);

			return game;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async get(gameId) {
		try {
			const game = await gameApi.getGame(gameId);
			return game;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async start(gameId) {
		try {
			await gameApi.startGame(gameId);

			let { game } = this.state.get();

			game.gameStarted = true;

			this.state.set(game);

			return game;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async join(code) {
		try {
			return await gameApi.joinGame(code);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async answeQuestion(gameId, questionId, answerId) {
		try {
			return await gameApi.answeQuestion({gameId, questionId, answerId});
		} catch (error) {
			throw Error(error.message);
		}
	},

	async showQuestionsResults(questionId, gameId) {
		try {
			return await gameApi.getQuestionsResults({questionId, gameId});
		} catch (error) {
			throw Error(error.message);
		}
	},

	async getLastAnswer(gameId) {
		try {
			return await gameApi.getLastAnswer(gameId);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async getCurrentQuestion(gameId) {
		debugger
		try {
			return await gameApi.getCurrentQuestion(gameId);
		} catch (error) {
			throw Error(error.message);
		}
	},
	


	async getPodium(gameId) {
		try {
			return await gameApi.getPodium(gameId);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async getScore(gameId) {
		try {
			return await gameApi.getScore(gameId);
		} catch (error) {
			throw Error(error.message);
		}
	},


	





	async showQuestionToPlayer(gameId) {
		try {
			return await gameApi.emitNextQuestion(gameId);
		} catch (error) {
			throw Error(error.message);
		}
	},


	async next(gameId) {
		try {
			return await gameApi.setNxtQuestion(gameId);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async showTimeOutScreen(gameId) {
		try {
			return await gameApi.emitTimeOutScreen(gameId);
		} catch (error) {
			throw Error(error.message);
		}
	},

	/**
	 * Return game code.
	 */
	get code() {
		const { game } = this.state.get();

		return game.code;
	},

	/**
	 * Return current question.
	 */
	get currentQuestion() {
		const { game } = this.state.get();

		return game.quiz.questions.find(_questions => !_questions.questionAnswered);
	},
};

export default game;
