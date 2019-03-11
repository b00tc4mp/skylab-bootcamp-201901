'use strict';

const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const { UnauthorizedError } = require('../errors');
const { jwtSecret } = require('../../config/vars');

const verifyToken = token => {
	const { sub } = jwt.verify(token, jwtSecret);

	if (!sub)
		return res
			.status(httpStatus.UNAUTHORIZED)
			.json({ error: `Subject not present in token ${token}` });



	return sub;
};

exports.authorize = async (req, res, next) => {
	const {
		headers: { authorization },
	} = req;

	if (!authorization)
		return res
			.status(httpStatus.UNAUTHORIZED)
			.json({ error: 'Token is not defined' });

	const token = authorization.substring(7);

	try {
		const id = verifyToken(token);

		const user = await User.get(id);

		req.userId = id;
	} catch ({ message }) {
		return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Access is denied due to invalid credentials.' });
	}

	next();
};

exports.userLogedIn = (req, res, next) => {

	const {
		headers: { authorization },
	} = req;

	if (authorization) {
		const token = authorization.substring(7);

		const { sub } = jwt.verify(token, jwtSecret);

		if (sub) req.body.user = sub;
	}

	next()
};

exports.isAuthor = (req, res, next) => {
	console.log('####', req.userId.toString(), req.locals.quiz.author._id.toString());

	if (req.userId.toString() !== req.locals.quiz.author._id.toString()) {
		return res
			.status(httpStatus.UNAUTHORIZED)
			.json({ error: 'You are unauthorized to access the requested resource.' });
	}

	next();
};
