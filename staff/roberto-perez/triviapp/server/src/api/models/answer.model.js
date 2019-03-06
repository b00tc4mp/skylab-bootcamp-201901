'use strict';

const mongoose = require('mongoose');
const httpStatus = require('http-status');

/**
 * Answer Schema
 * @private
 */
const answerSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 128,
			trim: true,
		},
		success: {
			type: Boolean,
			required: true,
		}
	},
	{ timestamps: true },
);

/**
 * Methods
 */
answerSchema.method({
	normalize() {
		const answer = {};
		const fields = [
			'id',
			'title',
			'success',
			'color',
			'createdAt',
		];

		fields.forEach(field => (answer[field] = this[field]));

		return answer;
	},
});

/**
 * Statics
 */
answerSchema.statics = {
	/**
	 * Get answer
	 *
	 * @param {ObjectId} id - The objectId of answer.
	 * @returns {Promise<Answer, Error>}
	 */
	async get(id) {
		try {
			let answer = await this.findById(id).exec();

			if (answer) {
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
 * @typedef Answer
 */
module.exports = {
	Answer: mongoose.model('Answer', answerSchema),
	answerSchema
};