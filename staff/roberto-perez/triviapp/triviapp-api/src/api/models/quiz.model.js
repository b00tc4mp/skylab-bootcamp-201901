'use strict';

const mongoose = require('mongoose');
const {
	SchemaTypes: { ObjectId },
} = mongoose;
const httpStatus = require('http-status');
const { questionSchema } = require('./question.model');
const { NotFoundError } = require('../errors/index');
const { Game } = require('./game.model');


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

quizSchema.statics = {

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

	list({ page = 1, perPage = 9 }) {
		return this.find()
			.populate('author')
			.sort({ createdAt: -1 })
			.skip(perPage * (page - 1))
			.limit(perPage)
			.exec();
	},


	listByAuthor({ page = 1, perPage = 9, author }) {
		return this.find({ author })
			.populate('author')
			.sort({ createdAt: -1 })
			.skip(perPage * (page - 1))
			.limit(perPage)
			.exec();
	},

	search(query) {
		return this.find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
			.sort({
				score: { $meta: 'textScore' },
			})
			.populate('author');
	},
};

module.exports = {
	Quiz: mongoose.model('Quiz', quizSchema),
	quizSchema,
};
