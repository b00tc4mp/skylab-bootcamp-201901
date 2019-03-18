import gameApi from '../../api/game-api';
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
			const game = await gameApi.createGame(quizId);

			this.state.set(game);

			return game;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async getGameByID(gameID) {
		try {
			const game = await gameApi.getGameByID(gameID);

			return game;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async joinGame(gameCode) {
		try {
			const game = await gameApi.joinGame(gameCode);

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
			await gameApi.startGame(gameID);

			return game;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async showQuestionToPlayer(gameID) {
		try {
			return await gameApi.emitNextQuestion(gameID);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async showQuestionsResults(gameID, questionID) {
		try {
			return await gameApi.getQuestionsResults({ gameID, questionID });
		} catch (error) {
			throw Error(error.message);
		}
	},

	async nextQuestion(gameID) {
		try {
			return await gameApi.setNxtQuestion(gameID);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async gameOver(gameID) {
		try {
			return await gameApi.gameOver(gameID);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async getPodium(gameID) {
		try {
			return await gameApi.getPodium(gameID);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async showTimeOutScreen(gameID) {
		try {
			return await gameApi.emitTimeOutScreen(gameID);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async answeQuestion(gameId, questionId, answerId) {
		try {
			return await gameApi.answeQuestion({ gameId, questionId, answerId });
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
};

export default game;
