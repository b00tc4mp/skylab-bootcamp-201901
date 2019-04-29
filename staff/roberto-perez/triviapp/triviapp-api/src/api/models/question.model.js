'use strict';

const mongoose = require('mongoose');
const {
	SchemaTypes: { ObjectId },
} = mongoose;
const httpStatus = require('http-status');
const { answerSchema } = require('./answer.model');
const { quizSchema } = require('./quiz.model');
const { NotFoundError } = require('../errors/index');

const questionSchema = new mongoose.Schema(
	{
		quiz: {
			type: ObjectId,
			required: true,
			ref: 'Quiz',
		},
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

questionSchema.statics = {

	async get(id) {
		try {
			let question = await this.findById(id).populate('quiz').exec();

			if (question) {
				return question;
			}

			throw new NotFoundError('Question does not exist');
		} catch (error) {
			throw error;
		}
	},
};

module.exports = {
	Question: mongoose.model('Question', questionSchema),
	questionSchema,
};
