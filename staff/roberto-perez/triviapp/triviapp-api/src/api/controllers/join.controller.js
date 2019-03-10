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
		if (authorization) {
			const token = authorization.substring(7);

			const { sub } = jwt.verify(token, jwtSecret);

			if (sub) req.body.user = sub;
		}

		const game = await gameLogic.joinGame(req.body);
		res.status(httpStatus.CREATED);
		return res.json(game);
	} catch (error) {
		handleResponseError(error, res);
	}
};
