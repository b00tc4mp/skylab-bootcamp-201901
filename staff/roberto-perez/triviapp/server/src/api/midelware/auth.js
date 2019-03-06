'use strict';

const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
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




exports.authorize = (req, res, next) => {
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
		req.userId = id;
		console.log(req.userId);
	} catch ({ message }) {
		return res.status(httpStatus.UNAUTHORIZED).json({ error: message });
	}

	next();
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
