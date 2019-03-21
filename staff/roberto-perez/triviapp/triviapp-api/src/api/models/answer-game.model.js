'use strict';

const mongoose = require('mongoose');
const {
	SchemaTypes: { ObjectId },
} = mongoose;
const httpStatus = require('http-status');
const { NotFoundError } = require('../errors/index');

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

answerGameSchema.method({
	normalize() {
		const answer = {};
		const fields = ['id', 'game', 'question', 'answer', 'createdAt'];

		fields.forEach(field => (answer[field] = this[field]));

		return answer;
	},
});

answerGameSchema.statics = {

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

	list(options = {}) {
		return this.find(options)
			.populate('user')
			.populate('answer')
			.exec();
	},

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
