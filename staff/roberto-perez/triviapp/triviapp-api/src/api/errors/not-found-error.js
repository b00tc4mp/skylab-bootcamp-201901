'use strict';

class NotFoundError extends Error {
	constructor(message, extra) {
		super();

		Error.captureStackTrace(this, this.constructor);

		this.name = 'NotFoundError';
		this.message = message;

		if (extra) this.extra = extra;
	}
}

module.exports = NotFoundError;
