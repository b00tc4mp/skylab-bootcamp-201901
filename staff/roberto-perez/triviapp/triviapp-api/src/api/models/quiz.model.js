'use strict';

const mongoose = require('mongoose');
const {
	SchemaTypes: { ObjectId },
} = mongoose;
const httpStatus = require('http-status');
const { questionSchema } = require('./question.model');
const { NotFoundError } = require('../errors/index');
const { Game } = require('./game.model');

/**
 * Quiz Schema
 * @private
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
			default: 0
		}
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
quizSchema.statics = {
	/**
	 * Get quiz
	 *
	 * @param {ObjectId} id - The objectId of quiz.
	 * @returns {Promise<Quiz, Error>}
	 */
	async get(id) {
		try {
			let quiz = await this.findById(id)
				.populate('author')
				.populate('questions')
				.exec();

			if (quiz) {
				// quiz.author = quiz.author.normalize();
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
	 * @returns {Promise<Quiz[]>}
	 */
	list({ page = 1, perPage = 9 }) {
		return this.find()
			.populate('author')
			.sort({ createdAt: -1 })
			.skip(perPage * (page - 1))
			.limit(perPage)
			.exec();
	},

	/**
	 * List quizzes in descending order of 'createdAt' timestamp by author
	 *
	 * @returns {Promise<Quiz[]>}
	 */
	listByAuthor({ page = 1, perPage = 9, author }) {
		return this.find({ author })
			.populate('author')
			.sort({ createdAt: -1 })
			.skip(perPage * (page - 1))
			.limit(perPage)
			.exec();
	},

	/**
	 * List quizzes in descending order of 'createdAt' timestamp.
	 *
	 * @returns {Promise<Quiz[]>}
	 */
	search(query) {
		return this.find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
			.sort({
				score: { $meta: 'textScore' },
			})
			.populate('author');
	},
};

/**
 * @typedef Quiz
 */
module.exports = {
	Quiz: mongoose.model('Quiz', quizSchema),
	quizSchema,
};
