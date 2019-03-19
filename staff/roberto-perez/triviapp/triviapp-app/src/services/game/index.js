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
		const game = await gameApi.createGame(auth.__userApiToken__, quizId);

		this.state.set(game);

		return game;
	},

	async getGameByID(gameID) {
		return await gameApi.getGameByID(auth.__userApiToken__, gameID);
	},

	async joinGame(gameCode) {
		return await gameApi.joinGame(auth.__userApiToken__, gameCode);
	},

	async leaveGame(gameID) {
		await gameApi.leaveGame(gameID);
		return true;
	},

	async startGame(gameID) {
		return await gameApi.startGame(auth.__userApiToken__, gameID);
	},

	async showQuestionToPlayer(gameID) {
		return await gameApi.emitNextQuestion(auth.__userApiToken__, gameID);
	},

	async showQuestionsResults(gameID, questionID) {
		return await gameApi.getQuestionsResults(auth.__userApiToken__, {
			gameID,
			questionID,
		});
	},

	async nextQuestion(gameID) {
		return await gameApi.setNxtQuestion(auth.__userApiToken__, gameID);
	},

	async gameOver(gameID) {
		return await gameApi.gameOver(auth.__userApiToken__, gameID);
	},

	async getPodium(gameID) {
		return await gameApi.getPodium(auth.__userApiToken__, gameID);
	},

	async showTimeOutScreen(gameID) {
		return await gameApi.emitTimeOutScreen(auth.__userApiToken__, gameID);
	},

	async answeQuestion(gameId, questionId, answerId) {
		return await gameApi.answeQuestion(auth.__userApiToken__, {
			gameId,
			questionId,
			answerId,
		});
	},

	async getScore(gameId) {
		return await gameApi.getScore(auth.__userApiToken__, gameId);
	},
};

export default game;
