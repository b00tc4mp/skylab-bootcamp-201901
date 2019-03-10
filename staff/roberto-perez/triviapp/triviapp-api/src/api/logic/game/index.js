const mongoose = require('mongoose');
const {
	Types: { ObjectId },
} = mongoose;
const { Game } = require('../../models/game.model');
const validate = require('../../utils/validate');
const { AlreadyExistsError, UnauthorizedError } = require('../../errors');
const { cloudName, apiKey, apiSecret } = require('../../../config/vars');
var randomize = require('randomatic');


/**
 * Abstraction of auth logic.
 */
module.exports = {
	

	createGame(data) {
		return (async data => {
            data.code = randomize('0', 6);
			const gameModel = new Game(data);
			const game = await gameModel.save();
			return game.normalize();
		})(data);
    },
    
    joinGame(data) {
        const { user, code } = data;

        return (async (user, code) => {
            const gameModel = await Game.getByCode(code);

            if(user && !gameModel.users.some(userGame => userGame.toString() === user)) {
                gameModel.users.push(user);
                await gameModel.save();
            }

			return gameModel.normalize();
		})(user, code);
    }

	
};
