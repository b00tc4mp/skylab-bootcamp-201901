'use strict';

const mongoose = require('mongoose');
const {
	SchemaTypes: { ObjectId },
} = mongoose;
const httpStatus = require('http-status');
const { NotFoundError } = require('../errors/index');

/**
 * Quiz Schema
 * @private
 */
const gameSchema = new mongoose.Schema(
	{
		code: {
			type: Number,
			required: true,
		},
		users: [
			{
				type: ObjectId,
				ref: 'User',
			},
		],
		start: {
			type: Boolean,
			default: false,
		},
		end: {
			type: Boolean,
			default: false,
		},
		quiz: {
			type: ObjectId,
			required: true,
			ref: 'Quiz',
		},
		currentQuestion: {
			type: ObjectId,
			ref: 'Question',
		},
		host: {
			type: ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true },
);

/**
 * Methods
 */
gameSchema.method({
	normalize() {
		const quiz = {};
		const fields = [
			'id',
			'code',
			'users',
			'quiz',
			'currentQuestion',
			'host',
			'start',
			'end',
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
gameSchema.statics = {
	/**
	 * Get quiz
	 *
	 * @param {ObjectId} id - The objectId of quiz.
	 * @returns {Promise<Quiz, Error>}
	 */
	async get(id) {
		try {
			let game = await this.findById(id)
				.populate({
					path: 'users',
					select: 'name surname email',
				})
				.populate({
					path: 'quiz',
					model: 'Quiz',
					populate: {
						path: 'questions',
						model: 'Question',
					},
				})
				.populate({
					path: 'currentQuestion',
				})
				.exec();

			if (game) {
				return game;
			}

			throw new NotFoundError('Game does not exist');
		} catch (error) {
			throw error;
		}
	},

	/**
	 * List quizzes in descending order of 'createdAt' timestamp.
	 *
	 * @returns {Promise<Quiz[]>}
	 */
	async getByCode(gameCode) {
		try {
			let game = this.findOne({ code: gameCode });

			if (game) {
				return game;
			}

			throw new NotFoundError('Game does not exist');
		} catch (error) {
			throw error;
		}
	},

	async getBy(options) {
		return this.find(options)
			.populate('quiz')
			.exec();
	},
};

/**
 * @typedef Game
 */
module.exports = {
	Game: mongoose.model('Game', gameSchema),
	gameSchema,
};
