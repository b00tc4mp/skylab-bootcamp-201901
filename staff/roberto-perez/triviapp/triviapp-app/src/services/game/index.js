import gameApi from '../../game-api';
import validate from '../../utils/validate';

const game = {

	async create(quizId) {
		try {
			return await gameApi.createGame(quizId);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async get(gameId) {
		try {
			return await gameApi.getGame(gameId);
		} catch (error) {
			throw Error(error.message);
		}
	}
	
};

export default game;
