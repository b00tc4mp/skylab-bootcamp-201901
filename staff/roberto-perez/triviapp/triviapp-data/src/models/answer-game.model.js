'use strict';

const mongoose = require('mongoose');
const {
	SchemaTypes: { ObjectId },
} = mongoose;
const httpStatus = require('http-status');
const { NotFoundError } = require('triviapp-errors');

/**
 * AnswerGame Schema
 */
const answerGameSchema = new mongoose.Schema(
	{
		user: {
			type: ObjectId,
			ref: 'User',
		},
		game: {
			type: ObjectId,
			ref: 'Game',
		},
		question: {
			type: ObjectId,
			ref: 'Question',
		},
		answer: {
			type: ObjectId,
			ref: 'Answer',
		},
		score: {
			type: Number,
			default: 0,
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
		const fields = ['id', 'game', 'question', 'answer', 'createdAt'];

		fields.forEach(field => (answer[field] = this[field]));

		return answer;
	},
});

/**
 * Statics
 */
answerGameSchema.statics = {
	/**
	 * Get answer game
	 *
	 * @param {ObjectId} id
	 * @returns {Promise}
	 */
	async get(id) {
		try {
			let answerGame = await this.findById(id).exec();

			if (answerGame) {
				return answerGame;
			}

			throw new Error({
				message: 'Answer does not exist',
				status: httpStatus.NOT_FOUND,
			});
		} catch (error) {
			throw error;
		}
	},

	/**
	 * Get answers game by ?
	 *
	 * @param {Object} options
	 *
	 * @returns {Promise}
	 */
	async getBy(option) {
		try {
			return await this.findOne(option)
				.populate('user')
				.populate('answer')
				.sort({ createdAt: -1 });
		} catch (error) {
			throw error;
		}
	},

	/**
	 * Get answers game
	 *
	 * @param {Object} options
	 *
	 * @returns {Promise}
	 */
	list(options = {}) {
		return this.find(options)
			.populate('user')
			.populate('question')
			.exec();
	},

	/**
	 * Get answers game by gameID & questionID
	 *
	 * @param {ObjectId} gameId
	 * @param {ObjectId} questionId
	 *
	 * @returns {Promise}
	 */
	async getAnswersQuestion(gameId, questionId) {
		return await this.aggregate([
			{ $match: { game: gameId, question: questionId } },
			{
				$group: {
					_id: '$question.answer',
					total: {
						$sum: 1,
					},
				},
			},
		]);
	},
};


module.exports = {
	AnswerGame: mongoose.model('answerGame', answerGameSchema),
	answerGameSchema,
};
