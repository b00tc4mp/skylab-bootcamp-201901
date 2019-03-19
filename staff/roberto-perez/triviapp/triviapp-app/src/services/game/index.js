import gameApi from '../../api/game-api';
import auth from '../auth';
import State from '../state';

const game = {
	currentGame: null,
	storage: sessionStorage,
	state: new State(sessionStorage, 'game'),

	onPlayerJoinedRoom(cb) {
		gameApi.onEvent('playerJoinedRoom', cb);
	},

	onBeginNewGame(cb) {
		gameApi.onEvent('beginNewGame', cb);
	},

	onShowQuestion(cb) {
		gameApi.onEvent('showQuestion', cb);
	},

	onNextQuestion(cb) {
		gameApi.onEvent('nextQuestion', cb);
	},

	onAnswerQuestion(cb) {
		gameApi.onEvent('answerQuestion', cb);
	},

	onTimeOut(cb) {
		gameApi.onEvent('timeOut', cb);
	},

	onGameOver(cb) {
		gameApi.onEvent('gameOver', cb);
	},

	onReconect(data) {
		gameApi.emitReconect(data);
	},

	async create(quizId) {
		try {
			const game = await gameApi.createGame(auth.__userApiToken__, quizId);

			this.state.set(game);

			return game;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async getGameByID(gameID) {
		try {
			const game = await gameApi.getGameByID(auth.__userApiToken__, gameID);

			return game;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async joinGame(gameCode) {
		try {
			const game = await gameApi.joinGame(auth.__userApiToken__, gameCode);

			return game;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async leaveGame(gameID) {
		try {
			await gameApi.leaveGame(gameID);
			return true;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async startGame(gameID) {
		try {
			await gameApi.startGame(auth.__userApiToken__, gameID);

			return game;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async showQuestionToPlayer(gameID) {
		try {
			return await gameApi.emitNextQuestion(auth.__userApiToken__, gameID);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async showQuestionsResults(gameID, questionID) {
		try {
			return await gameApi.getQuestionsResults(auth.__userApiToken__, { gameID, questionID });
		} catch (error) {
			throw Error(error.message);
		}
	},

	async nextQuestion(gameID) {
		try {
			return await gameApi.setNxtQuestion(auth.__userApiToken__, gameID);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async gameOver(gameID) {
		try {
			return await gameApi.gameOver(auth.__userApiToken__, gameID);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async getPodium(gameID) {
		try {
			return await gameApi.getPodium(auth.__userApiToken__, gameID);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async showTimeOutScreen(gameID) {
		try {
			return await gameApi.emitTimeOutScreen(auth.__userApiToken__, gameID);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async answeQuestion(gameId, questionId, answerId) {
		try {
			return await gameApi.answeQuestion(auth.__userApiToken__, { gameId, questionId, answerId });
		} catch (error) {
			throw Error(error.message);
		}
	},

	async getScore(gameId) {
		try {
			return await gameApi.getScore(auth.__userApiToken__, gameId);
		} catch (error) {
			throw Error(error.message);
		}
	},
};

export default game;
