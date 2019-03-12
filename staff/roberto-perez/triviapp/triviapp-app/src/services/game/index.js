import gameApi from '../../game-api';
import validate from '../../utils/validate';
import Xtorage from '../xtorage';
import State from '../state';

const game = {
	currentGame: null,
	storage: sessionStorage,
	state: new State(sessionStorage, 'game'),

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
			// const { game } = this.state.get();

			// if (!game) {
				const game = await gameApi.getGame(gameId);
				this.state.set(game);
			// }

			return game;
		} catch (error) {
			throw Error(error.message);
		}
	},

	async start(gameId) {
		try {
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

	async next() {
		const questionStorage = this.currentQuestion;
		questionStorage.questionAnswered = true;

		const { game } = this.state.get();

		game.quiz.questions.map(_question => {
			return _question._id === questionStorage._id
				? Object.assign(_question, questionStorage)
				: _question;
		});

		this.state.set(game);
		return game;
	},

	/**
	 * Return game code.
	 */
	get code() {
		const { game } = this.state.get();
		return game.code;
	},

	get currentQuestion() {
		const { game } = this.state.get();

		return game.quiz.questions.find(_questions => !_questions.questionAnswered);
	},
};

export default game;
