'use strict';

const mongoose = require('mongoose');
const httpStatus = require('http-status');

const answerSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			maxlength: 128,
			trim: true,
		},
		success: {
			type: Boolean,
		}
	},
	{ timestamps: true },
);

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

answerSchema.statics = {

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


module.exports = {
	Answer: mongoose.model('Answer', answerSchema),
	answerSchema
};