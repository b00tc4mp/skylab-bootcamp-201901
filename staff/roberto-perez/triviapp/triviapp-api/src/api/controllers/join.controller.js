'use sctric';

const httpStatus = require('http-status');
const { Game } = require('triviapp-data');
const gameLogic = require('../logic/game');
const { handleResponseError } = require('../routes/routes-helper');

/**
 * Join game
 */
exports.join = async (req, res) => {
	const {
		headers: { authorization },
	} = req;

	try {
		const game = await gameLogic.joinGame(req.body);

		req.app.io.in(`game-${game.id}`).emit('JOIN_GAME', true);

		if (req.body.user) {
			return res.status(httpStatus.CREATED).json({ game, user: req.body.user });
		} else {
			return res.status(httpStatus.CREATED).json({ game });
		}
	} catch (error) {
		handleResponseError(error, res);
	}
};
