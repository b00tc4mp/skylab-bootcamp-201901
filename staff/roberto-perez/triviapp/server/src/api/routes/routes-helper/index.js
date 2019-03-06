'use strict';

const httpStatus = require('http-status');
// AuthError,
// 	DuplicateError,
// 	EmptyError,
// 	MatchingError,
//     NotFoundError,
const {
	AlreadyExistsError,
	UnauthorizedError,
	NotFoundError
} = require('../../errors');

module.exports = {
	handleResponseError(error, res) {

        let status = 400;

		// if (error instanceof NotFoundError) status = 404;
		// else if (
		// 	error instanceof TypeError ||
		// 	error instanceof EmptyError ||
		// 	error instanceof MatchingError
		// )
		// 	status = 412;
		
		if (error instanceof NotFoundError) status = httpStatus.NOT_FOUND;
		else if (error instanceof UnauthorizedError) status = httpStatus.UNAUTHORIZED;
		else if (error instanceof AlreadyExistsError) status = httpStatus.CONFLICT;
		else status = 500;

		res.status(status).json({
			error: error.message,
        });
        
		// let status = 400;

		// if (error instanceof NotFoundError) status = 404;
		// else if (
		// 	error instanceof TypeError ||
		// 	error instanceof EmptyError ||
		// 	error instanceof MatchingError
		// )
		// 	status = 412;
		// else if (error instanceof AuthError) status = 401;
		// else if (error instanceof DuplicateError) status = 409;
		// else status = 500;

		// res.status(status).json({
		// 	error: error.message,
		// });
	},
};
