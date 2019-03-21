'use strict';

const mongoose = require('mongoose');
const {
	SchemaTypes: { ObjectId },
} = mongoose;
const httpStatus = require('http-status');
const { questionSchema } = require('./question.model');
const { NotFoundError } = require('triviapp-errors');
const { Game } = require('./game.model');

/**
 * Quiz Schema
 */
const quizSchema = new mongoose.Schema(
	{
		author: {
			type: ObjectId,
			required: true,
			ref: 'User',
		},
		title: {
			type: String,
			required: true,
			maxlength: 128,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		picture: {
			type: String,
			trim: true,
		},
		questions: [
			{
				type: ObjectId,
				ref: 'Question',
			},
		],
		games: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

/**
 * Methods
 */
quizSchema.method({
	normalize() {
		const quiz = {};
		const fields = [
			'id',
			'author',
			'title',
			'description',
			'questions',
			'picture',
			'games',
			'createdAt',
		];

		fields.forEach(field => (quiz[field] = this[field]));

		return quiz;
	},
});

/**
 * Statics
 */
quizSchema.statics = {
	/**
	 * Get quiz
	 *
	 * @param {ObjectId} id
	 * @returns {Promise}
	 */
	async get(id) {
		try {
			let quiz = await this.findById(id)
				.populate('author')
				.populate('questions')
				.exec();

			if (quiz) {
				return quiz;
			}

			throw new NotFoundError('Quiz does not exist');
		} catch (error) {
			throw error;
		}
	},

	/**
	 * List quizzes in descending order of 'createdAt' timestamp.
	 *
	 * @param {Object} options
	 *
	 * @returns {Promise}
	 */
	list({ page = 1, perPage = 9 }) {
		return this.find({ 'questions.0': { $exists: true } })
			.populate('author')
			.sort({ createdAt: -1 })
			.skip(perPage * (page - 1))
			.limit(perPage)
			.exec();
	},

	/**
	 * List quizzes by author in descending order of 'createdAt' timestamp
	 *
	 * @param {Object} options
	 *
	 * @returns {Promise>}
	 */
	listByAuthor({ page = 1, perPage = 9, authorID }) {
		return this.find({ author: authorID })
			.populate('author')
			.sort({ createdAt: -1 })
			.skip(perPage * (page - 1))
			.limit(perPage)
			.exec();
	},

	/**
	 * List quizzes in descending order of 'createdAt' timestamp.
	 *
	 * @param {Object} options
	 *
	 * @returns {Promise}
	 */
	search({ page = 1, perPage = 9, query }) {
		return this.find({ $text: { $search: query }, 'questions.0': { $exists: true } }, { score: { $meta: 'textScore' } })
			.sort({
				score: { $meta: 'textScore' },
			})
			.populate('author')
			.skip(perPage * (page - 1))
			.limit(perPage)
			.exec();
	},
};

module.exports = {
	Quiz: mongoose.model('Quiz', quizSchema),
	quizSchema,
};
