'use strict';

require('dotenv').config();
const mongoose = require('../../../config/mongoose');
const { MongooseError } = mongoose;
const httpStatus = require('http-status');
const expect = require('expect');
const { User, Quiz, Question } = require('triviapp-data');
const logicQuestion = require('.');
const logicQuiz = require('../quiz');
const { AlreadyExistsError, UnauthorizedError, NotFoundError } = require('../../errors');

describe('Question', () => {
	before(() => mongoose.connect('mongodb://localhost:27017/quiz-test'));

	beforeEach(() => Promise.all([User.deleteMany(), Quiz.deleteMany()]));

	describe('POST /v1/quiz/:quizId/question', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;
		let quizAdded;

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

			const { id } = await logicQuiz.createQuiz(dataQuiz);

			quizAdded = id.toString();
		});

		it('should succeed on valid data', async () => {

						
			const data = {
				quiz: quizAdded.id,
				title: 'Enquesta numero 3312 22',
				description: 'Lorem ipsum dolor i2s am 123123 et numero 1223 2',
				picture:
					'https://assets.awwwards.com/awards/media/cache/optimize/submissions/2019/02/5c5f0480554d4130295365.jpg',
			};

			const { id } = await logicQuestion.createQuestion(data);

			let question = await Question.get(question);

			expect(id).toBeDefined();
			expect(typeof id).toBe('string');
			expect(question.title).toBe(data.title);
			expect(question.description).toBe(data.description);
			expect(question.picture).toBe(data.picture);
		});

		// it('should fail when title is not a string', () => {
		// 	dataQuiz.title = undefined;
		// 	expect(() => {
		// 		quiz.createQuiz(dataQuiz);
		// 	}).toThrow(TypeError(undefined + ' is not a string'));
		// });

		// it('should fail when description is not a string', () => {
		// 	dataQuiz.description = undefined;
		// 	expect(() => {
		// 		quiz.createQuiz(dataQuiz);
		// 	}).toThrow(TypeError(undefined + ' is not a string'));
		// });

		// it('should report error when author ID is not provided', async () => {
		// 	try {
		// 		delete dataQuiz.author;
		// 		await quiz.createQuiz(dataQuiz);
		// 	} catch (err) {
		// 		expect(err.name).toBe('ValidationError');
		// 		expect(err.message).toEqual(
		// 			`Quiz validation failed: author: Path \`author\` is required.`,
		// 		);
		// 	}
		// });

		// it('should report error when author is not the owner', async () => {
		// 	try {
		// 		dataUser = {
		// 			name: `n-${Math.random()}`,
		// 			surname: `s-${Math.random()}`,
		// 			email: `john-doe2${Math.random()}@gmail.com`,
		// 			password: `p-${Math.random()}`,
		// 		};

		// 		const user = new User(dataUser);
		// 		const savedUser = await user.save();
		// 		author = savedUser.normalize();

		// 		dataQuiz.author = author.id;

		// 		await quiz.createQuiz(dataQuiz);
		// 	} catch (err) {
		// 		expect(err.name).toBe('ValidationError');
		// 		expect(err.message).toEqual(
		// 			`Quiz validation failed: author: Path \`author\` is required.`,
		// 		);
		// 	}
		// });
	});

	describe('PATCH /v1/quiz/:id', () => {
		// let dataUser = {};
		// let dataQuiz = {};
		// let author;
		// let quizAdded;
		// beforeEach(async () => {
		// 	dataUser = {
		// 		name: `n-${Math.random()}`,
		// 		surname: `s-${Math.random()}`,
		// 		email: `john-doe${Math.random()}@gmail.com`,
		// 		password: `p-${Math.random()}`,
		// 	};
		// 	const user = new User(dataUser);
		// 	const savedUser = await user.save();
		// 	author = savedUser.normalize();
		// 	dataQuiz = {
		// 		author: author.id,
		// 		title: `Quiz title-${Math.random()}`,
		// 		description: `Quiz description-${Math.random()}`,
		// 		picture: `Quiz image-${Math.random()}`,
		// 		questions: [],
		// 	};
		// 	quizAdded = await quiz.createQuiz(dataQuiz);
		// });
		// it('should succeed on valid data', async () => {
		// 	let data = {
		// 		title: 'Enquesta numero 2',
		// 		description: 'Lorem ipsum dolor is amet....',
		// 	};
		// 	const currentQUiz = await Quiz.get(quizAdded.id);
		// 	const quizUpdated = await quiz.updateQuiz(currentQUiz, data);
		// 	expect(quizUpdated.title).toBe(data.title);
		// 	expect(quizUpdated.description).toBe(data.description);
		// });
		// it('should return the same Quiz if we pass a empty object', async () => {
		// 	let data = {};
		// 	const currentQUiz = await Quiz.get(quizAdded.id);
		// 	const quizUpdated = await quiz.updateQuiz(currentQUiz, data);
		// 	expect(quizUpdated.title).toBe(dataQuiz.title);
		// 	expect(quizUpdated.description).toBe(dataQuiz.description);
		// });
	});

	describe('DELETE /v1/quiz/:id', () => {
		// let dataUser = {};
		// let dataQuiz = {};
		// let author;
		// let quizAdded;
		// beforeEach(async () => {
		// 	dataUser = {
		// 		name: `n-${Math.random()}`,
		// 		surname: `s-${Math.random()}`,
		// 		email: `john-doe${Math.random()}@gmail.com`,
		// 		password: `p-${Math.random()}`,
		// 	};
		// 	const user = new User(dataUser);
		// 	const savedUser = await user.save();
		// 	author = savedUser.normalize();
		// 	dataQuiz = {
		// 		author: author.id,
		// 		title: `Quiz title-${Math.random()}`,
		// 		description: `Quiz description-${Math.random()}`,
		// 		picture: `Quiz image-${Math.random()}`,
		// 		questions: [],
		// 	};
		// 	quizAdded = await quiz.createQuiz(dataQuiz);
		// });
		// it('should succeed on valid data', async () => {
		// 	try {
		// 		const currentQUiz = await Quiz.get(quizAdded.id);
		// 		await quiz.deleteQuiz(currentQUiz);
		//         const deletedQuiz = await Quiz.get(quizAdded.id);
		//         expect(deletedQuiz).toBeUndefined();
		// 	} catch (err) {
		// 		expect(err).toBeInstanceOf(NotFoundError);
		// 		expect(err.message).toEqual(`Quiz does not exist`);
		// 	}
		// });
		// it('should not delete Quiz with bad ID', async () => {
		// 	try {
		// 		const currentQUiz = await Quiz.get('123');
		// 		await quiz.deleteQuiz(currentQUiz);
		// 	} catch (err) {
		// 		// expect(err).toBeInstanceOf(MongooseError);
		// 		expect(err.message).toEqual(`Cast to ObjectId failed for value "123" at path "_id" for model "Quiz"`);
		// 	}
		// });
	});

	describe('GET /v1/question', () => {
		//TODO
	});

	after(() =>
		Promise.all([User.deleteMany(), Quiz.deleteMany()]).then(() =>
			mongoose.disconnect(),
		),
	);
});
