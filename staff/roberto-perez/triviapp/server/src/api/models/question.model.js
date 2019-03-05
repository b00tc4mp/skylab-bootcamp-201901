'use strict';

const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { answerSchema } = require('./answer.model');

/**
 * Question Schema
 * @private
 */
const questionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 128,
			trim: true,
		},
		picture: {
			type: String,
			trim: true,
		},
		time: {
			type: String,
			trim: true,
		},
		success: {
			type: Number,
			default: 0,
		},
		fails: {
			type: Number,
			default: 0,
		},
		answers: [answerSchema],
	},
	{ timestamps: true },
);

/**
 * Methods
 */
questionSchema.method({
	normalize() {
		const question = {};
		const fields = [
			'id',
			'title',
			'picture',
			'time',
			'success',
			'fails',
			'answers',
			'createdAt',
		];

		fields.forEach(field => (question[field] = this[field]));

		return question;
	},
});

/**
 * Statics
 */
questionSchema.statics = {
	/**
	 * Get question
	 *
	 * @param {ObjectId} id - The objectId of question.
	 * @returns {Promise<Question, Error>}
	 */
	async get(id) {
		try {
			let question = await this.findById(id).exec();

			if (question) {
				return question;
			}

			throw new Error({
				message: 'Question does not exist',
				status: httpStatus.NOT_FOUND,
			});
		} catch (error) {
			throw error;
		}
	},
};

/**
 * @typedef Question
 */

module.exports = {
	Question: mongoose.model('Question', questionSchema),
	questionSchema,
};
