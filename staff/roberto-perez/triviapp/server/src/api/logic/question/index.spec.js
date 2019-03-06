'use strict';

require('dotenv').config();
const mongoose = require('../../../config/mongoose');
const httpStatus = require('http-status');
const expect = require('expect');
const { Quiz } = require('../../models/quiz.model');
const { User } = require('../../models/user.model');
const quiz = require('.');
const { AlreadyExistsError, UnauthorizedError } = require('../../errors');

describe('Quiz', () => {

	before(() => mongoose.connect());

	beforeEach(() => Promise.all([User.deleteMany(), Quiz.deleteMany()]));

	describe('POST /v1/quiz', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;

		beforeEach(async () => {
			dataUser = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const user = new User(dataUser);
			const savedUser = await user.save();
			author = savedUser.normalize();

			dataQuiz = {
				author: author.id,
				title: `Quiz title-${Math.random()}`,
				description: `Quiz description-${Math.random()}`,
				picture: `Quiz image-${Math.random()}`,
				questions: [],
			};
		});

		it('should succeed on valid data', async () => {
			const { id } = await quiz.createQuiz(dataQuiz);

			const quizAdded = await Quiz.get(id);

			expect(id).toBeDefined();
			expect(typeof id).toBe('string');
			expect(quizAdded.author.id.toString()).toBe(dataQuiz.author);
			expect(quizAdded.title).toBe(dataQuiz.title);
			expect(quizAdded.description).toBe(dataQuiz.description);
			expect(quizAdded.picture).toBe(dataQuiz.picture);
		});


		it('should fail when title is not a string', () => {
			dataQuiz.title = undefined;
			expect(() => {
				quiz.createQuiz(dataQuiz);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});


		it('should fail when description is not a string', () => {
			dataQuiz.description = undefined;
			expect(() => {
				quiz.createQuiz(dataQuiz);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});

		it('should report error when author ID is not provided', async () => {
			try {
				delete dataQuiz.author;
				await quiz.createQuiz(dataQuiz);
			} catch (err) {
				expect(err.name).toBe('ValidationError');
				expect(err.message).toEqual(`Quiz validation failed: author: Path \`author\` is required.`);
			}
		});

		it('should report error when author is not the owner', async () => {
			try {

				dataUser = {
					name: `n-${Math.random()}`,
					surname: `s-${Math.random()}`,
					email: `john-doe2${Math.random()}@gmail.com`,
					password: `p-${Math.random()}`,
				};
	
				const user = new User(dataUser);
				const savedUser = await user.save();
				author = savedUser.normalize();

				dataQuiz.author = author.id;

				await quiz.createQuiz(dataQuiz);
			} catch (err) {
				expect(err.name).toBe('ValidationError');
				expect(err.message).toEqual(`Quiz validation failed: author: Path \`author\` is required.`);
			}
		});


	});

	describe('PATCH /v1/quiz/:id', () => {

	});

	after(() => Promise.all([User.deleteMany(), Quiz.deleteMany()]).then(() => mongoose.disconnect()));
});
