'use strict';

const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');
const { jwtSecret } = require('../../config/vars');


const verifyToken = token => {
	const { sub } = jwt.verify(token, jwtSecret);

	if (!sub) throw new UnauthorizedError(`subject not present in token ${token}`);

	return sub;
};

exports.authorize = (req, res, next) => {
    debugger
	const {
		headers: { authorization },
	} = req;

    if(!authorization) return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Token is not defined' });

	const token = authorization.substring(7);

	try {
		const id = verifyToken(token);

		req.userId = id;
	} catch ({ message }) {
		return res.status(httpStatus.UNAUTHORIZED).json({ error: message });
	}

	next();
};
