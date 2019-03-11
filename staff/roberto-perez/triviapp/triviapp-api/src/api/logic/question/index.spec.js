'use strict';

require('dotenv').config();
const mongoose = require('../../../config/mongoose');
const { MongooseError } = mongoose;
const httpStatus = require('http-status');
const expect = require('expect');
const { Quiz } = require('../../models/quiz.model');
const { Question } = require('../../models/question.model');
const { User } = require('../../models/user.model');
const logicQuestion = require('.');
const logicQuiz = require('../quiz');
const { AlreadyExistsError, UnauthorizedError, NotFoundError } = require('../../errors');

describe('Question', () => {
	before(() => mongoose.connect('mongodb://localhost:27017/quiz-test'));

	beforeEach(() =>
		Promise.all([User.deleteMany(), Quiz.deleteMany(), Question.deleteMany()]),
	);

	describe('POST /v1/quiz/:quizId/question', () => {
		let dataUser = {};
		let dataQuiz = {};
		let data = {};
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

			const { id } = await logicQuiz.createQuiz(dataQuiz);

			data = {
				quiz: id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};
		});

		it('should succeed on valid data', async () => {
			const { id } = await logicQuestion.createQuestion(data);

			let question = await Question.get(id);

			expect(id).toBeDefined();
			expect(typeof id).toBe('string');
			expect(question.title).toBe(data.title);
			expect(question.description).toBe(data.description);
			expect(question.picture).toBe(data.picture);
			expect(question.answers[0].title).toBe(data.answers[0].title);
			expect(question.answers[1].title).toBe(data.answers[1].title);
			expect(question.answers[0].success).toBe(data.answers[0].success);
			expect(question.answers[1].success).toBe(data.answers[1].success);
		});

		it('should fail when title is empty', () => {
			delete data.title;

			expect(() => {
				logicQuestion.createQuestion(data);
			}).toThrow(TypeError('Title is empty or blank'));
		});

		it('should fail when Quiz ID is not provided', () => {
			delete data.quiz;

			expect(() => {
				logicQuestion.createQuestion(data);
			}).toThrow(TypeError('Quiz ID is empty or blank'));
		});

		it('should fail when time is empty', () => {
			delete data.time;

			expect(() => {
				logicQuestion.createQuestion(data);
			}).toThrow(TypeError('Time is empty or blank'));
		});

		it('should fail when Answer 1 is empty', () => {
			delete data.answers[0].title;

			expect(() => {
				logicQuestion.createQuestion(data);
			}).toThrow(TypeError('Answer 1 is empty or blank'));
		});

		it('should fail when Answer 2 is empty', () => {
			delete data.answers[1].title;

			expect(() => {
				logicQuestion.createQuestion(data);
			}).toThrow(TypeError('Answer 2 is empty or blank'));
		});

		it('should fail when all checkbox are off', () => {
			data.answers[0].success = false;

			expect(() => {
				logicQuestion.createQuestion(data);
			}).toThrow(
				Error('Please choose at least one correct answer before continuing.'),
			);
		});

		it('should succeed with checkbox from answer 3 off', async () => {
			data.answers[2].success = true;

			const { id } = await logicQuestion.createQuestion(data);

			let question = await Question.get(id);

			expect(question.answers[2].success).toBeFalsy();
		});

		it('should succeed with checkbox from answer 4 off', async () => {
			data.answers[3].success = true;

			const { id } = await logicQuestion.createQuestion(data);

			let question = await Question.get(id);

			expect(question.answers[3].success).toBeFalsy();
		});

		it('should succeed and return two questions', async () => {
			const { id: id1 } = await logicQuestion.createQuestion(data);
			let question1 = await Question.get(id1);

			const { id: id2 } = await logicQuestion.createQuestion(data);
			let question2 = await Question.get(id2);

			const quizModel = await Quiz.get(data.quiz);
			const quiz = quizModel.normalize();

			expect(quiz.questions.length).toBe(2);
		});
	});

	describe('PATCH /v1/quiz/:id', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;
		let question;

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

			const data = {
				quiz: id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			const { id: idQuestion } = await logicQuestion.createQuestion(data);

			question = await Question.get(idQuestion);
		});

		it('should succeed on valid data', async () => {
			const dataToUpdate = {
				title: 'Question 2',
				time: '25',
				answers: [
					{ title: 'Answer 11', success: false },
					{ title: 'Answer 22', success: false },
					{ title: 'Answer 33', success: true },
					{ title: 'Answer 44', success: true },
				],
			};

			const questionUpdated = await logicQuestion.updateQuestion(
				question,
				dataToUpdate,
			);

			expect(questionUpdated.title).toBe(dataToUpdate.title);
			expect(questionUpdated.description).toBe(dataToUpdate.description);
			expect(questionUpdated.picture).toBe(dataToUpdate.picture);
			expect(questionUpdated.answers[0].title).toBe(dataToUpdate.answers[0].title);
			expect(questionUpdated.answers[1].title).toBe(dataToUpdate.answers[1].title);
			expect(questionUpdated.answers[0].success).toBe(
				dataToUpdate.answers[0].success,
			);
			expect(questionUpdated.answers[1].success).toBe(
				dataToUpdate.answers[1].success,
			);
		});

		it('should fail when title is not a string', () => {
			const dataToUpdate = {
				title: 123,
				time: '25',
				answers: [
					{ title: 'Answer 11', success: false },
					{ title: 'Answer 22', success: false },
					{ title: 'Answer 33', success: true },
					{ title: 'Answer 44', success: true },
				],
			};

			expect(() => {
				logicQuestion.updateQuestion(question, dataToUpdate);
			}).toThrow(TypeError('123 is not a string'));
		});

		it('should fail when time is not a string', () => {
			const dataToUpdate = {
				title: 'Question 2',
				time: 30,
				answers: [
					{ title: 'Answer 11', success: false },
					{ title: 'Answer 22', success: false },
					{ title: 'Answer 33', success: true },
					{ title: 'Answer 44', success: true },
				],
			};

			expect(() => {
				logicQuestion.updateQuestion(question, dataToUpdate);
			}).toThrow(TypeError('30 is not a string'));
		});

		it('should fail when Answer 1 is empty', () => {
			const dataToUpdate = {
				title: 'Question 2',
				time: '25',
				answers: [
					{ title: '', success: false },
					{ title: 'Answer 22', success: false },
					{ title: 'Answer 33', success: true },
					{ title: 'Answer 44', success: true },
				],
			};

			expect(() => {
				logicQuestion.updateQuestion(question, dataToUpdate);
			}).toThrow(TypeError('Answer 1 is empty or blank'));
		});

		it('should fail when Answer 2 is empty', () => {
			const dataToUpdate = {
				title: 'Question 2',
				time: '25',
				answers: [
					{ title: 'Answer 11', success: false },
					{ title: '', success: false },
					{ title: 'Answer 33', success: true },
					{ title: 'Answer 44', success: true },
				],
			};

			expect(() => {
				logicQuestion.updateQuestion(question, dataToUpdate);
			}).toThrow(TypeError('Answer 2 is empty or blank'));
		});

		it('should fail when all checkbox are off', () => {
			const dataToUpdate = {
				title: 'Question 2',
				time: '25',
				answers: [
					{ title: 'Answer 11', success: false },
					{ title: 'Answer 22', success: false },
					{ title: 'Answer 33', success: false },
					{ title: 'Answer 44', success: false },
				],
			};

			expect(() => {
				logicQuestion.updateQuestion(question, dataToUpdate);
			}).toThrow(
				Error('Please choose at least one correct answer before continuing.'),
			);
		});

		it('should succeed with checkbox from answer 3 off', async () => {
			const dataToUpdate = {
				title: 'Question 2',
				time: '25',
				answers: [
					{ title: 'Answer 11', success: false },
					{ title: 'Answer 22', success: false },
					{ title: '', success: true },
					{ title: 'Answer 44', success: true },
				],
			};

			const { id } = await logicQuestion.updateQuestion(question, dataToUpdate);

			let questionUpdate = await Question.get(id);

			expect(questionUpdate.answers[2].success).toBeFalsy();
		});

		it('should succeed with checkbox from answer 4 off', async () => {
			const dataToUpdate = {
				title: 'Question 2',
				time: '25',
				answers: [
					{ title: 'Answer 11', success: false },
					{ title: 'Answer 22', success: false },
					{ title: 'Answer 33', success: true },
					{ title: '', success: true },
				],
			};

			const { id } = await logicQuestion.updateQuestion(question, dataToUpdate);

			let questionUpdate = await Question.get(id);

			expect(questionUpdate.answers[3].success).toBeFalsy();
		});

		
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
		Promise.all([User.deleteMany(), Quiz.deleteMany(), Question.deleteMany()]).then(
			() => mongoose.disconnect(),
		),
	);
});
