'use strict';

const mongoose = require('mongoose');
const {
	SchemaTypes: { ObjectId },
} = mongoose;
const httpStatus = require('http-status');
const { NotFoundError } = require('triviapp-errors');

/**
 * Game Schema
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
 * Statics
 */
gameSchema.statics = {
	/**
	 * Get quiz
	 *
	 * @param {ObjectId} id
	 * @returns {Promise}
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
	 * Get game by code
	 *
	 * @param {Number} gameCode
	 * 
	 * @returns {Promise}
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

	/**
	 * Get game by ?
	 *
	 * @param {Object} options
	 * 
	 * @returns {Promise}
	 */
	async getBy(options) {
		return this.find(options)
			.populate('quiz')
			.populate('currentQuestion')
			.exec();
	},

	/**
	 * Get game current question
	 *
	 * @param {ObjectId} gameId
	 *
	 * @returns {Promise}
	 */
	async getCurrentQuestion(gameId) {
		return this.findOne({game: gameId}).select('currentQuestion')
			.populate('currentQuestion')
			.exec();
	},
};


module.exports = {
	Game: mongoose.model('Game', gameSchema),
	gameSchema,
};
