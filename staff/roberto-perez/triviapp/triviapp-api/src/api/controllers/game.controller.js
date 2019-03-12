'use sctric';

const httpStatus = require('http-status');
const { Game } = require('../models/game.model');
const gameLogic = require('../logic/game');
const { handleResponseError } = require('../routes/routes-helper');
const { UnauthorizedError } = require('../errors');
const { cloudName, apiKey, apiSecret } = require('../../config/vars');
const socket = require('../logic/socket');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	try {
		const game = await Game.get(id);
		req.locals = { game };
		return next();
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Get game
 * @public
 */
exports.get = (req, res) => res.json(req.locals.game.normalize());

exports.create = async (req, res) => {
	try {
		req.body.host = req.userId;
		const game = await gameLogic.createGame(req.body);
		res.status(httpStatus.CREATED);
		return res.json(game);
	} catch (error) {
		handleResponseError(error, res);
	}
};

exports.start = async (req, res) => {
	try {
		const game = await gameLogic.startGame(req.locals.game);
		req.app.io.in(`game-${game.id}`).emit('START_GAME', true)
		res.status(httpStatus.CREATED);
		return res.json(game);
	} catch (error) {
		handleResponseError(error, res);
	}
};
