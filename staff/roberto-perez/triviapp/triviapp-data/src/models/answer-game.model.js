'use strict';

const mongoose = require('mongoose');
const {
	SchemaTypes: { ObjectId },
} = mongoose;
const httpStatus = require('http-status');
const { NotFoundError } = require('triviapp-errors');

/**
 * Answer Schema
 * @private
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
	 * Get answer
	 *
	 * @param {ObjectId} id - The objectId of answer.
	 * @returns {Promise<Answer, Error>}
	 */
	async get(id) {
		try {
			let answerGame = await this.findById(id).exec();

			if (answerGame) {
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

	/**
	 * Get answers game by gameID & answerID
	 *
	 * @returns {Promise<Quiz[]>}
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
	 * Get answers game by gameID & answerID
	 *
	 * @returns {Promise<Quiz[]>}
	 */
	list(options = {}) {
		return this.find(options)
			.populate('user')
			.populate('question')
			.exec();
	},

	/**
	 * Get answers game by gameID & answerID
	 *
	 * @returns {Promise<Quiz[]>}
	 */
	// async getAnswersQuestion(option) {
	// 	return await this.find(option)
	// 		.populate('user')
	// 		.populate({
	// 			path: 'question',
	// 			model: 'Question',
	// 			populate: {
	// 				path: 'answer',
	// 				model: 'Answer',
	// 			},
	// 		})
	// 		.sort({ createdAt: -1 });
	// },

	/**
	 * Get answers game by gameID & answerID
	 *
	 * @returns {Promise<Quiz[]>}
	 */
	async getAnswersQuestion(gameId, questionId) {
		debugger;

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

		// 	// return this.aggregate([
		// 	// 	{ $match: { 'game': gameId, 'question': questionId } },
		// 	// 	{
		// 	// 		$group: {
		// 	// 			_id: '$answer',
		// 	// 			count: {
		// 	// 				$sum: 1,
		// 	// 			},
		// 	// 		},
		// 	// 	},
		// 	// ]);
	},
};

/**
 * @typedef AnswerGame
 */
module.exports = {
	AnswerGame: mongoose.model('answerGame', answerGameSchema),
	answerGameSchema,
};
