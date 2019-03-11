'use strict';

const mongoose = require('mongoose');
const httpStatus = require('http-status');

/**
 * Answer Schema
 * @private
 */
const answerGameSchema = new mongoose.Schema(
	{
		answer: {
			type: ObjectId,
			ref: 'Answer',
		},
	},
	{ timestamps: true },
);

/**
 * Methods
 */
answerGameSchema.method({
	normalize() {
		const answer = {};
		const fields = [
			'id',
			'answer',
			'createdAt',
		];

		fields.forEach(field => (answer[field] = this[field]));

		return answer;
	},
});

/**
 * Statics
 */
answerGameSchema.statics = {
	/**
	 * Get answer
	 *
	 * @param {ObjectId} id - The objectId of answer.
	 * @returns {Promise<Answer, Error>}
	 */
	async get(id) {
		try {
			let answerGame = await this.findById(id).exec();

			if (answerGame) {
				return answer;
			}

			throw new Error({
				message: 'Answer does not exist',
				status: httpStatus.NOT_FOUND,
			});
		} catch (error) {
			throw error;
		}
	},
};

/**
 * @typedef AnswerGame
 */
module.exports = {
	answerGame: mongoose.model('answerGame', answerGameSchema),
	answerGameSchema
};