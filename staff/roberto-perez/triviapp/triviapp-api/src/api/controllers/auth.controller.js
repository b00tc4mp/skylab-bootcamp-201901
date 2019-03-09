'use sctric';

const httpStatus = require('http-status');
const { User } = require('../models/user.model');
const auth = require('../logic/auth');
const { jwtExpirationInterval } = require('../../config/vars');
const { handleResponseError } = require('../routes/routes-helper');

/**
 * Register new user
 * @public
 */
exports.signup = async (req, res, next) => {
	try {
		const id = await auth.signupUser(req.body);
        res.status(httpStatus.CREATED);
		return res.json(id);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Login user
 * @public
 */
exports.login = async (req, res, next) => {
	try {
		const { user, token } = await auth.loginUser(req.body);
		return res.json({ token, user });
	} catch (error) {
		handleResponseError(error, res);
	}
};
