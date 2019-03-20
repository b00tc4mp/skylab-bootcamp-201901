'use strict';

const httpStatus = require('http-status');

const { AlreadyExistsError, UnauthorizedError, NotFoundError } = require('../../errors');

module.exports = {
	handleResponseError(error, res) {
		let status = 400;

		if (error instanceof NotFoundError) status = httpStatus.NOT_FOUND;
		else if (error instanceof UnauthorizedError) status = httpStatus.UNAUTHORIZED;
		else if (error instanceof AlreadyExistsError) status = httpStatus.CONFLICT;
		else status = 500;

		res.status(status).json({
			error: error.message,
		});
	},
};
