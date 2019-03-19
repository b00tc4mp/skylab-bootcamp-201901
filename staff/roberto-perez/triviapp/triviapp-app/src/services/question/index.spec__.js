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
				
				question.create(quizId, data);
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
				question.create(quizId, data);
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
				
				question.create(quizId, data);
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
				question.create(quizId, data);
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
				question.create(quizId, data);
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

	afterAll(() =>
		Promise.all([
			auth.logOutUser(),
			User.deleteMany(),
			Quiz.deleteMany(),
			Question.deleteMany(),
		]).then(() => mongoose.disconnect()),
	);
});
