'use strict';

import questionApi from '.';
import quizApi from '../quiz-api';
import userApi from '../user-api';
const { mongoose, Quiz, User, Question, Answer } = require('triviapp-data');
const {
	AlreadyExistsError,
	UnauthorizedError,
	NotFoundError,
} = require('triviapp-errors');

const { MONGO_URI, REACT_APP_BASE_URL_API } = process.env;

quizApi.url = REACT_APP_BASE_URL_API;
userApi.url = REACT_APP_BASE_URL_API;
questionApi.url = REACT_APP_BASE_URL_API;

describe('User API', () => {
	beforeAll(() => mongoose.connect(MONGO_URI, { useNewUrlParser: true }));

	beforeEach(() =>
		Promise.all([
			User.deleteMany(),
			Quiz.deleteMany(),
			Question.deleteMany(),
			Answer.deleteMany(),
		]),
	);

	describe('Create questin', () => {
		let dataUser = {};
		let dataQuiz = {};
		let data = {};
		let author;
		let quizId;

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

			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const { id } = await quizApi.createQuiz(token, dataQuiz);
			quizId = id;

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
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const { id } = await questionApi.createQuestion(
				token,
				quizId.toString(),
				data,
			);

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

		it('should fail when title is empty', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				delete data.title;
				questionApi.createQuestion(token, quizId, data);
			} catch (err) {
				expect(err.message).toEqual('Title is empty or blank');
			}
		});

		it('should fail when Quiz ID is not provided', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				delete data.quiz;
				questionApi.createQuestion(token, '', data);
			} catch (err) {
				expect(err.message).toEqual('Quiz ID is empty or blank');
			}
		});

		it('should fail when time is empty', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				delete data.time;
				questionApi.createQuestion(token, quizId, data);
			} catch (err) {
				expect(err.message).toEqual('Time is empty or blank');
			}
		});

		it('should fail when Answer 1 is empty', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				delete data.answers[0].title;
				questionApi.createQuestion(token, quizId, data);
			} catch (err) {
				expect(err.message).toEqual('Answer 1 is empty or blank');
			}
		});

		it('should fail when Answer 2 is empty', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				delete data.answers[1].title;
				questionApi.createQuestion(token, quizId, data);
			} catch (err) {
				expect(err.message).toEqual('Answer 2 is empty or blank');
			}
		});

		it('should fail when all checkbox are off', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				data.answers[0].success = false;
				questionApi.createQuestion(token, quizId, data);
			} catch (err) {
				expect(err.message).toEqual(
					'Please choose at least one correct answer before continuing.',
				);
			}
		});

		it('should succeed with checkbox from answer 3 off', async () => {
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			data.answers[2].success = true;
			const { id } = await questionApi.createQuestion(token, quizId, data);
			let question = await Question.get(id);
			expect(question.answers[2].success).toBe(false);
		});

		it('should succeed with checkbox from answer 4 off', async () => {
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			data.answers[3].success = true;

			const { id } = await questionApi.createQuestion(token, quizId, data);

			let question = await Question.get(id);

			expect(question.answers[3].success).toBe(false);
		});

		it('should succeed and return two questions', async () => {
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const { id: id1 } = await questionApi.createQuestion(token, quizId, data);
			let question1 = await Question.get(id1);

			const { id: id2 } = await questionApi.createQuestion(token, quizId, data);
			let question2 = await Question.get(id2);

			const quizModel = await Quiz.get(data.quiz);
			const quiz = quizModel.normalize();

			expect(quiz.questions.length).toBe(2);
		});
	});

	describe('Edit quetion', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;
		let question;
		let quizId;

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

			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const { id } = await quizApi.createQuiz(token, dataQuiz);
			quizId = id;

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

			const { id: idQuestion } = await questionApi.createQuestion(
				token,
				quizId,
				data,
			);

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

			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const questionUpdated = await questionApi.editQuestion(
				token,
				quizId,
				question.id,
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

		it('should fail when title is not a string', async () => {
			try {
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

				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				dataToUpdate.answers[0].success = false;
				questionApi.editQuestion(
					token,
					quizId,
					question.id,
					dataToUpdate,
					dataToUpdate,
				);
			} catch (err) {
				expect(err.message).toEqual('123 is not a string');
			}
		});

		it('should fail when time is not a string', async () => {
			try {
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

				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				dataToUpdate.answers[0].success = false;
				questionApi.editQuestion(
					token,
					quizId,
					question.id,
					dataToUpdate,
					dataToUpdate,
				);
			} catch (err) {
				expect(err.message).toEqual('30 is not a string');
			}
		});

		it('should fail when Answer 1 is empty', async () => {
			try {
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

				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				dataToUpdate.answers[0].success = false;
				questionApi.editQuestion(
					token,
					quizId,
					question.id,
					dataToUpdate,
					dataToUpdate,
				);
			} catch (err) {
				expect(err.message).toEqual('Answer 1 is empty or blank');
			}
		});

		it('should fail when Answer 2 is empty', async () => {
			try {
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

				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				dataToUpdate.answers[0].success = false;
				questionApi.editQuestion(
					token,
					quizId,
					question.id,
					dataToUpdate,
					dataToUpdate,
				);
			} catch (err) {
				expect(err.message).toEqual('Answer 2 is empty or blank');
			}
		});

		it('should fail when all checkbox are off', async () => {
			try {
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

				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				dataToUpdate.answers[0].success = false;
				questionApi.editQuestion(
					token,
					quizId,
					question.id,
					dataToUpdate,
					dataToUpdate,
				);
			} catch (err) {
				expect(err.message).toEqual(
					'Please choose at least one correct answer before continuing.',
				);
			}
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

			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const { id } = await questionApi.editQuestion(
				token,
				quizId,
				question.id,
				dataToUpdate,
				dataToUpdate,
			);

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

			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const { id } = await questionApi.editQuestion(
				token,
				quizId,
				question.id,
				dataToUpdate,
				dataToUpdate,
			);

			let questionUpdate = await Question.get(id);

			expect(questionUpdate.answers[3].success).toBeFalsy();
		});
	});

	describe('Delete question', () => {
		let dataUser = {};
		let dataQuiz = {};
		let dataQuestion = {};
		let author;
		let quizAdded;
		let questionAdded;
		let quizId;
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
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const { id } = await quizApi.createQuiz(token, dataQuiz);
			quizId = id;

			dataQuestion = {
				quiz: id.toString(),
				title: 'Question 1',
				time: '25',
				answers: [
					{ title: 'Answer 11', success: false },
					{ title: 'Answer 22', success: false },
					{ title: 'Answer 33', success: true },
					{ title: 'Answer 44', success: true },
				],
			};

			questionAdded = await questionApi.createQuestion(token, quizId, dataQuestion);
		});
		it('should succeed on valid data', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
                });
				const currentQuestion = await Question.get(questionAdded.id);
				await questionApi.deleteQuestion(token, quizId, currentQuestion.id);
				const deletedQuiz = await Question.get(questionAdded.id);
			} catch (err) {
				// expect(err).toBeInstanceOf(NotFoundError);
				expect(err.message).toEqual(`Question does not exist`);
			}
        });
        
		it('should not delete Question with bad ID', async () => {
			try {
				const currentQuestion = await Question.get('123');
			} catch (err) {
				expect(err.message).toEqual(`Cast to ObjectId failed for value "123" at path "_id" for model "Question"`);
			}
		});
    });
    


    describe('Get question', () => {
		let dataUser = {};
		let dataQuiz = {};
		let dataQuestion = {};
		let author;
		let quizAdded;
		let questionAdded;
		let quizId;
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
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const { id } = await quizApi.createQuiz(token, dataQuiz);
			quizId = id;

			dataQuestion = {
				quiz: id.toString(),
				title: 'Question 1',
				time: '25',
				answers: [
					{ title: 'Answer 11', success: false },
					{ title: 'Answer 22', success: false },
					{ title: 'Answer 33', success: true },
					{ title: 'Answer 44', success: true },
				],
			};

			questionAdded = await questionApi.createQuestion(token, quizId, dataQuestion);
		});
		it('should succeed on valid data', async () => {
				const currentQuestion = await Question.get(questionAdded.id);
                const questionToGet = await questionApi.getQuestion(quizId, currentQuestion.id);
                expect(questionToGet).toBeDefined();
        });
    });
    

	afterAll(() =>
		Promise.all([
			User.deleteMany(),
			Quiz.deleteMany(),
			Question.deleteMany(),
			Answer.deleteMany(),
		]).then(() => mongoose.disconnect()),
	);
});
