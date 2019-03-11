'use sctric';

const httpStatus = require('http-status');
const { Game } = require('../models/game.model');
const gameLogic = require('../logic/game');
const { handleResponseError } = require('../routes/routes-helper');
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');
const { cloudName, apiKey, apiSecret, jwtSecret } = require('../../config/vars');

exports.join = async (req, res) => {
	const {
		headers: { authorization },
	} = req;

	try {
		
		const game = await gameLogic.joinGame(req.body);

		if (req.body.user) {
			res.status(httpStatus.CREATED).json({ game, user: req.body.user });
		} else {
			res.status(httpStatus.CREATED).json({ game });
		}
		
		return res.json(game);
	} catch (error) {
		handleResponseError(error, res);
	}
};
