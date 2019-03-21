'use sctric';

const httpStatus = require('http-status');
const { User } = require('triviapp-data');
const auth = require('../logic/auth');
const { jwtExpirationInterval } = require('../../config/vars');
const { handleResponseError } = require('../routes/routes-helper');

exports.signup = async (req, res, next) => {
	try {
		const id = await auth.signupUser(req.body);
        res.status(httpStatus.CREATED);
		return res.json(id);
	} catch (error) {
		handleResponseError(error, res);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { user, token } = await auth.loginUser(req.body);
		return res.json({ token, user });
	} catch (error) {
		handleResponseError(error, res);
	}
};

exports.retrieve = async (req, res, next) => {
	try {
		const user = await auth.retrieveUser(req.userId);
		return res.json(user);
	} catch (error) {
		handleResponseError(error, res);
	}
};

exports.update = async (req, res, next) => {
	try {
		const user = await auth.updateUser(req.userId, req.body);
		return res.json(user);
	} catch (error) {
		handleResponseError(error, res);
	}
};
