'use strict';

const mongoose = require('mongoose');
const {
	SchemaTypes: { ObjectId },
} = mongoose;
const httpStatus = require('http-status');
const { answerSchema } = require('./answer.model');
const { quizSchema } = require('./quiz.model');

/**
 * Question Schema
 * @private
 */
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
 * Pre middlewares
 */
// quizSchema.pre('save', async function(next, req) {

// 	if(!this.isModified() === true) {
// 	}

// 	// try {
// 	// 	if (!this.isModified()) return;
// 	// 	const hash = await bcrypt.hash(this.password, 10);
// 	// 	this.author = hash;
// 	// } catch (error) {
// 	// 	return new Error(error);
// 	// }
// });

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
			let question = await this.findById(id).populate('quiz').exec();

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
