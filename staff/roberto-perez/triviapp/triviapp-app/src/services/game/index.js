import gameApi from '../../game-api';
import validate from '../../utils/validate';
import Xtorage from '../xtorage';

const game = {
	currentGame: null,
	storage: sessionStorage,
	state: new State(sessionStorage, '__state__'),

	async create(quizId) {
		try {
			const game = await gameApi.createGame(quizId);

			const xtorage = new Xtorage(this.storage);

			xtorage.set('game', game);

			// this.state.set({ game })

			return game;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async get(gameId) {
		try {
			const game = await gameApi.getGame(gameId);
			const xtorage = new Xtorage(this.storage);
			xtorage.set('game', game);
			const gameStorage = xtorage.get('game');
			// this.state.set({ game })

			return gameStorage;
			// return game
		} catch (error) {
			throw Error(error.message);
		}
	},

	async start(gameId) {
		try {
			const xtorage = new Xtorage(this.storage);
			let gameStorage = xtorage.get('game');
			// let { game } = this.state.get()
			gameStorage.gameStarted = true;
			xtorage.set('game', gameStorage);
			return gameStorage;
			// return await gameApi.startGame(gameId);
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

	async next() {
		const xtorage = new Xtorage(this.storage);
		const questionStorage = this.currentQuestion;
		questionStorage.questionAnswered = true;

		const game = xtorage.get('game');

		game.quiz.questions.map(_question => {
			return (_question._id === questionStorage._id)
				? Object.assign(_question, questionStorage)
				: _question;
		});

		xtorage.set('game', game);
		return game;
	},

	/**
	 * Return game code.
	 */
	get code() {
		const xtorage = new Xtorage(this.storage);
		const game = xtorage.get('game');
		return game.code;
	},

	get currentQuestion() {
		const xtorage = new Xtorage(this.storage);
		const game = xtorage.get('game');

		return game.quiz.questions.find(_questions => !_questions.questionAnswered);
	},
};

export default game;
