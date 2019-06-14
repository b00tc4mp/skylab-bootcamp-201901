'use strict';

import quizApi from '.';
import userApi from '../user-api';
import questionApi from '..//question-api';
const { mongoose, Quiz, User, Question } = require('triviapp-data');
const apiQuestion = require('../question-api');
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

	beforeEach(() => Promise.all([User.deleteMany(), Quiz.deleteMany(), Question.deleteMany()]));

	describe('Create game', () => {
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
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const { id } = await quizApi.createQuiz(token, dataQuiz);

			let quizAdded = await Quiz.get(id);

			expect(id).toBeDefined();
			expect(typeof id).toBe('string');
			expect(quizAdded.author.id.toString()).toBe(dataQuiz.author);
			expect(quizAdded.title).toBe(dataQuiz.title);
			expect(quizAdded.description).toBe(dataQuiz.description);
			expect(quizAdded.picture).toBe(dataQuiz.picture);
		});

		it('should fail when title is not a string', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				dataQuiz.title = undefined;
				quizApi.createQuiz(token, dataQuiz);
			} catch (err) {
				expect(err.message).toEqual(undefined + ' is not a string');
			}
		});

		it('should fail when description is not a string', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				dataQuiz.description = undefined;
				quizApi.createQuiz(token, dataQuiz);
			} catch (err) {
				expect(err.message).toEqual(undefined + ' is not a string');
			}
		});

		it('should report error when author ID is not provided', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				delete dataQuiz.author;
				await quizApi.createQuiz(token, dataQuiz);
			} catch (err) {
				expect(err.name).toBe('ValidationError');
				expect(err.message).toEqual(
					`Quiz validation failed: author: Path \`author\` is required.`,
				);
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

				dataQuiz.author = 'qweqweqweqwe';

				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});

				await quizApi.createQuiz(token, dataQuiz);
			} catch (err) {
				expect(err.name).toBe('ValidationError');
				expect(err.message).toEqual(
					`Quiz validation failed: author: Path \`author\` is required.`,
				);
			}
		});
	});

	describe('PATCH /v1/quiz/:id', () => {
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

			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			quizAdded = await quizApi.createQuiz(token, dataQuiz);
		});

		it('should succeed on valid data', async () => {
			let data = {
				title: 'Enquesta numero 2',
				description: 'Lorem ipsum dolor is amet....',
			};
			//token, quizId, data
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const currentQUiz = await Quiz.get(quizAdded.id);
			const quizUpdated = await quizApi.editQuiz(token, currentQUiz._id, data);
			expect(quizUpdated.title).toBe(data.title);
			expect(quizUpdated.description).toBe(data.description);
		});

		it('should return the same Quiz if we pass a empty object', async () => {
			let data = {};

			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});
			const currentQUiz = await Quiz.get(quizAdded.id);
			const quizUpdated = await quizApi.editQuiz(token, currentQUiz._id, data);
			expect(quizUpdated.title).toBe(dataQuiz.title);
			expect(quizUpdated.description).toBe(dataQuiz.description);
		});
    });
    




    describe('Delete Quiz', () => {
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

            const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
            });
            
			quizAdded = await quizApi.createQuiz(token, dataQuiz);
		});

		it('should succeed on valid data', async () => {
			try {

                const { token } = await userApi.login({
                    email: dataUser.email,
                    password: dataUser.password,
                });
				const currentQUiz = await Quiz.get(quizAdded.id);
				await quizApi.deleteQuiz(token, currentQUiz._id);
				const deletedQuiz = await Quiz.get(quizAdded.id);
			} catch (err) {
				// expect(err).toBeInstanceOf(NotFoundError);
				expect(err.message).toEqual(`Quiz does not exist`);
			}
		});

    });
    




    describe('List quizzes', () => {
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

            const { token } = await userApi.login({
                email: dataUser.email,
                password: dataUser.password,
            });

			for (let i = 0; i < 6; i++) {
				dataQuiz = {
					author: author.id,
					title: `Quiz title-${Math.random()}`,
					description: `Quiz description-${Math.random()}`,
					picture: `Quiz image-${Math.random()}`,
					questions: [],
				};

                

				const { id } = await quizApi.createQuiz(token, dataQuiz);

				let dataQuestion = {
					quiz: id.toString(),
					title: `Question - ${Math.random()}`,
					time: '15',
					answers: [
						{ title: 'Answer 1', success: true },
						{ title: 'Answer 2', success: false },
						{ title: '', success: false },
						{ title: '', success: false },
					],
				};

				await questionApi.createQuestion(token, id, dataQuestion);
			}
		});

		it('should be list 6 quizzes when the arguments are empties', async () => {
			const listOfQuizz = await quizApi.listQuizzes();

			expect(listOfQuizz.length).toEqual(6);
		});

    });





    describe('GET /v1/quiz/page/:offset/author', () => {
		let dataUser = {};
		let dataUserNoAuthor = {};
		let dataQuiz = {};
		let dataQuizNoAuthor = {};
		let author;
		let noAuthor;

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

            const { token } = await userApi.login({
                email: dataUser.email,
                password: dataUser.password,
            });

			for (let i = 0; i < 6; i++) {
				dataQuiz = {
					author: author.id,
					title: `Quiz title-${Math.random()}`,
					description: `Quiz description-${Math.random()}`,
					picture: `Quiz image-${Math.random()}`,
					questions: [],
				};

				await quizApi.createQuiz(token, dataQuiz);
			}

			dataUserNoAuthor = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userNoAuthor = new User(dataUserNoAuthor);
			const savedUserNoAuthor = await userNoAuthor.save();
			noAuthor = savedUserNoAuthor.normalize();

			dataQuizNoAuthor = {
				author: noAuthor.id,
				title: `Quiz title-${Math.random()}`,
				description: `Quiz description-${Math.random()}`,
				picture: `Quiz image-${Math.random()}`,
				questions: [],
			};

			await quizApi.createQuiz(token, dataQuizNoAuthor);
		});

		it('should be list 7 quizzes when the arguments are empties', async () => {

            const { token } = await userApi.login({
                email: dataUser.email,
                password: dataUser.password,
            });

			const listOfQuizz = await quizApi.myListQuizzes(token, 1);
			expect(listOfQuizz.length).toEqual(7);
		});

	});





	describe('Get quiz by ID', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;
		let currentQuiz;

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

            const { token } = await userApi.login({
                email: dataUser.email,
                password: dataUser.password,
            });

				dataQuiz = {
					author: author.id,
					title: `Quiz title-${Math.random()}`,
					description: `Quiz description-${Math.random()}`,
					picture: `Quiz image-${Math.random()}`,
					questions: [],
				};

                

				const { id } = await quizApi.createQuiz(token, dataQuiz);
				currentQuiz = id;


				let dataQuestion = {
					quiz: id.toString(),
					title: `Question - ${Math.random()}`,
					time: '15',
					answers: [
						{ title: 'Answer 1', success: true },
						{ title: 'Answer 2', success: false },
						{ title: '', success: false },
						{ title: '', success: false },
					],
				};

				await questionApi.createQuestion(token, id, dataQuestion);
		});

		it('should be success with correct quiz ID', async () => {
			const getQuiz = await quizApi.getQuiz(currentQuiz);

			expect(getQuiz).toBeDefined();
		});

    });
	
	

	describe('Search quizz', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;
		let currentQuiz;

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

            const { token } = await userApi.login({
                email: dataUser.email,
                password: dataUser.password,
            });

				dataQuiz = {
					author: author.id,
					title: `Quiz title-${Math.random()}`,
					description: `Quiz description-${Math.random()}`,
					picture: `Quiz image-${Math.random()}`,
					questions: [],
				};

                

				const { id } = await quizApi.createQuiz(token, dataQuiz);
				currentQuiz = id;


				let dataQuestion = {
					quiz: id.toString(),
					title: `Question - ${Math.random()}`,
					time: '15',
					answers: [
						{ title: 'Answer 1', success: true },
						{ title: 'Answer 2', success: false },
						{ title: '', success: false },
						{ title: '', success: false },
					],
				};

				await questionApi.createQuestion(token, id, dataQuestion);
		});

		it('should be success with correct query', async () => {
			const getQuiz = await quizApi.searchQuizzes('Question', 1);

			expect(getQuiz).toBeDefined();
		});

    });



	afterAll(() =>
		Promise.all([User.deleteMany(), Quiz.deleteMany(), Question.deleteMany()]).then(() =>
			mongoose.disconnect(),
		),
	);
});
