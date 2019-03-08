'use strict';

class UnauthorizedError extends Error {
	constructor(message, extra) {
		super();

		Error.captureStackTrace(this, this.constructor);

		this.name = 'UnauthorizedError';
		this.message = message;

		if (extra) this.extra = extra;
	}
}

module.exports = UnauthorizedError;
