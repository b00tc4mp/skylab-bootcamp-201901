'use strict';

import quiz from '../quiz';
import auth from '../auth';
import question from '../question';
import quizApi from '../../api/quiz-api';
import userApi from '../../api/user-api';
import questionApi from '../../api/question-api';
const { mongoose, Quiz, User, Question } = require('triviapp-data');

const { MONGO_URI, REACT_APP_BASE_URL_API } = process.env;

quizApi.url = REACT_APP_BASE_URL_API;
userApi.url = REACT_APP_BASE_URL_API;
questionApi.url = REACT_APP_BASE_URL_API;

describe('Question', () => {
	beforeAll(() => mongoose.connect(MONGO_URI, { useNewUrlParser: true }));

	beforeEach(() =>
		Promise.all([User.deleteMany(), Quiz.deleteMany(), Question.deleteMany()]),
	);

	describe('Create question', () => {
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

			author = await userApi.signup(dataUser);

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

			auth.__userApiToken__ = token;

			const { id } = await quizApi.createQuiz(token, dataQuiz);
			quizId = id;

			data = {
				quiz: quizId.toString(),
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

			auth.__userApiToken__ = token;

			const { id } = await question.create(quizId.toString(), data);

			let questionCreated = await questionApi.getQuestion(quizId, id);

			expect(questionCreated.title).toBe(data.title);
			expect(questionCreated.description).toBe(data.description);
			expect(questionCreated.picture).toBe(data.picture);
			expect(questionCreated.answers[0].title).toBe(data.answers[0].title);
			expect(questionCreated.answers[1].title).toBe(data.answers[1].title);
			expect(questionCreated.answers[0].success).toBe(data.answers[0].success);
			expect(questionCreated.answers[1].success).toBe(data.answers[1].success);
		});

		it('should fail when title is empty', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				auth.__userApiToken__ = token;

				data = {
					quiz: quizId.toString(),
					title: '',
					time: '15',
					answers: [
						{ title: 'Answer 1', success: true },
						{ title: 'Answer 2', success: false },
						{ title: '', success: false },
						{ title: '', success: false },
					],
				};

				await question.create(quizId, data);
			} catch (err) {
				expect(err.message).toEqual('Title is empty or blank');
			}
		});

		it('should fail when time is empty', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				auth.__userApiToken__ = token;

				data = {
					quiz: quizId.toString(),
					title: 'Question 1',
					time: '',
					answers: [
						{ title: 'Answer 1', success: true },
						{ title: 'Answer 2', success: false },
						{ title: '', success: false },
						{ title: '', success: false },
					],
				};
				await question.create(quizId, data);
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

				auth.__userApiToken__ = token;

				data = {
					quiz: quizId.toString(),
					title: 'Question 1',
					time: '15',
					answers: [
						{ title: '', success: true },
						{ title: 'Answer 2', success: false },
						{ title: '', success: false },
						{ title: '', success: false },
					],
				};

				await question.create(quizId, data);
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

				auth.__userApiToken__ = token;

				data = {
					quiz: quizId.toString(),
					title: 'Question 1',
					time: '15',
					answers: [
						{ title: 'Answer 1', success: true },
						{ title: '', success: false },
						{ title: '', success: false },
						{ title: '', success: false },
					],
				};
				await question.create(quizId, data);
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

				auth.__userApiToken__ = token;

				data = {
					quiz: quizId.toString(),
					title: 'Question 1',
					time: '15',
					answers: [
						{ title: 'Answer 1', success: false },
						{ title: 'Answer 2', success: false },
						{ title: '', success: false },
						{ title: '', success: false },
					],
				};
				await question.create(quizId, data);
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

			auth.__userApiToken__ = token;

			data = {
				quiz: quizId.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: true },
					{ title: '', success: false },
				],
			};
			const { id } = await question.create(quizId, data);
			let _question = await Question.get(id);
			expect(_question.answers[2].success).toBe(false);
		});

		it('should succeed with checkbox from answer 4 off', async () => {
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			auth.__userApiToken__ = token;

			data = {
				quiz: quizId.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: true },
				],
			};

			const { id } = await question.create(quizId, data);

			let _question = await Question.get(id);

			expect(_question.answers[3].success).toBe(false);
		});

		it('should succeed and return two questions', async () => {
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			auth.__userApiToken__ = token;

			const { id: id1 } = await question.create(quizId, data);
			let question1 = await Question.get(id1);

			const { id: id2 } = await question.create(quizId, data);
			let question2 = await Question.get(id2);

			const quizModel = await Quiz.get(data.quiz);
			const quiz = quizModel.normalize();

			expect(quiz.questions.length).toBe(2);
		});
	});

	describe('Edit question', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;
		let _question;
		let quizId;

		beforeEach(async () => {
			dataUser = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			author = await userApi.signup(dataUser);

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

			auth.__userApiToken__ = token;

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

			_question = await question.create(quizId, data);
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

			const questionUpdated = await question.edit(
				quizId,
				_question.id,
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

			try {
				await question.edit(quizId, _question.id, dataToUpdate);
			} catch (err) {
				expect(err.message).toBe('123 is not a string');
			}
		});

		it('should fail when time is not a string', async () => {
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

			try {
				await question.edit(quizId, _question.id, dataToUpdate);
			} catch (err) {
				expect(err.message).toBe('30 is not a string');
			}
		});

		it('should fail when Answer 1 is empty', async () => {
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

			try {
				await question.edit(quizId, _question.id, dataToUpdate);
			} catch (err) {
				expect(err.message).toBe('title1 is empty or blank');
			}
		});

		it('should fail when Answer 2 is empty', async () => {
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

			try {
				await question.edit(quizId, _question.id, dataToUpdate);
			} catch (err) {
				expect(err.message).toBe('title2 is empty or blank');
			}
		});

		it('should fail when all checkbox are off', async () => {
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

			try {
				await question.edit(quizId, _question.id, dataToUpdate);
			} catch (err) {
				expect(err.message).toBe(
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

			const { id } = await question.edit(quizId, _question.id, dataToUpdate);

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

			const { id } = await question.edit(quizId, _question.id, dataToUpdate);

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
			
			author = await userApi.signup(dataUser);
			
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

			auth.__userApiToken__ = token;

			const { id } = await quizApi.createQuiz(token, dataQuiz);
			quizId = id;
			
			dataQuestion = {
				quiz: quizId,
				title: 'Question 1',
				time: '25',
				answers: [
					{ title: 'Answer 11', success: false },
					{ title: 'Answer 22', success: false },
					{ title: 'Answer 33', success: true },
					{ title: 'Answer 44', success: true },
				],
			};

			questionAdded = await question.create(quizId, dataQuestion);
		});
		it('should succeed on valid data', async () => {
			try {
				const currentQuestion = await Question.get(questionAdded.id);
				await question.delete(quizId, currentQuestion.id);
		        await Question.get(questionAdded.id);
			} catch (err) {
				expect(err.message).toEqual(`Question does not exist`);
			}
		});
		it('should not delete Question with bad ID', async () => {
			try {
				await Question.get('123');
			} catch (err) {
				expect(err.message).toEqual(`Cast to ObjectId failed for value "123" at path "_id" for model "Question"`);
			}
		});
	});




	afterAll(() =>
		Promise.all([
			auth.logOutUser(),
			User.deleteMany(),
			Quiz.deleteMany(),
			Question.deleteMany(),
		]).then(() => mongoose.disconnect()),
	);
});
