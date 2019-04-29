'use strict';

import quiz from '.';
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

describe('Quiz', () => {
	beforeAll(() => mongoose.connect(MONGO_URI, { useNewUrlParser: true }));

	beforeEach(() => Promise.all([User.deleteMany(), Quiz.deleteMany(), Question.deleteMany()]));

	describe('Create quiz', () => {
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

			author = await userApi.signup(dataUser);

			dataQuiz = {
				title: `Quiz title-${Math.random()}`,
				description: `Quiz description-${Math.random()}`,
				picture: `Quiz image-${Math.random()}`,
			};
		});

		it('should succeed on valid data', async () => {
			const { token, user } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

            auth.__userApiToken__ = token;

			const { id } = await quiz.create(dataQuiz);

			let quizAdded = await quizApi.getQuiz(id);

			expect(quizAdded.title).toBe(dataQuiz.title);
			expect(quizAdded.description).toBe(dataQuiz.description);
			expect(quizAdded.picture).toBe(dataQuiz.picture);
		});

		it('should fail when title is not a string', async () => {
			try {
				const { token, user } = await userApi.login({
                    email: dataUser.email,
                    password: dataUser.password,
                });
    
                auth.__userApiToken__ = token;

				dataQuiz.title = undefined;
				await quiz.create(dataQuiz);
			} catch (err) {
				expect(err.message).toEqual(undefined + ' is not a string');
			}
		});

		it('should fail when description is not a string', async () => {
			try {
				const { token, user } = await userApi.login({
                    email: dataUser.email,
                    password: dataUser.password,
                });
    
                auth.__userApiToken__ = token;

				dataQuiz.description = undefined;
				await quiz.create(dataQuiz);
			} catch (err) {
				expect(err.message).toEqual(undefined + ' is not a string');
			}
		});

		it('should report error when author ID is not provided', async () => {
			try {

                const { token, user } = await userApi.login({
                    email: dataUser.email,
                    password: dataUser.password,
                });
    
                auth.__userApiToken__ = token;
                
                let dataQuiz2 = {
                    title: `Quiz title-${Math.random()}`,
                    description: `Quiz description-${Math.random()}`,
                    picture: `Quiz image-${Math.random()}`,
                };
                
				await quiz.create(dataQuiz2);
			} catch (err) {
				expect(err.message).toEqual(
					`Access is denied due to invalid credentials.`,
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

				author = await userApi.signup(dataUser);

				await quiz.create(dataQuiz);
			} catch (err) {
				expect(err.message).toEqual(
					`Access is denied due to invalid credentials.`,
				);
			}
		});
	});

	describe('Edit quiz', () => {
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

            
			author = await userApi.signup(dataUser);

			dataQuiz = {
				author: author.id,
				title: `Quiz title-${Math.random()}`,
				description: `Quiz description-${Math.random()}`,
				picture: `Quiz image-${Math.random()}`,
				questions: [],
			};

			const { token, user } = await userApi.login({
                email: dataUser.email,
                password: dataUser.password,
            });

            auth.__userApiToken__ = token;

            quizAdded = await quizApi.createQuiz(token, dataQuiz);
		});

		it('should succeed on valid data', async () => {
			let data = {
				title: 'Enquesta numero 2',
				description: 'Lorem ipsum dolor is amet....',
			};
			

			const quizUpdated = await quiz.edit(quizAdded.id, data);
			expect(quizUpdated.title).toBe(data.title);
			expect(quizUpdated.description).toBe(data.description);
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

			author = await userApi.signup(dataUser);

			dataQuiz = {
				author: author.id,
				title: `Quiz title-${Math.random()}`,
				description: `Quiz description-${Math.random()}`,
				picture: `Quiz image-${Math.random()}`,
				questions: [],
			};

            const { token, user } = await userApi.login({
                email: dataUser.email,
                password: dataUser.password,
            });

            auth.__userApiToken__ = token;
            
			quizAdded = await quizApi.createQuiz(token, dataQuiz);
		});

		it('should succeed on valid data', async () => {
			try {
				await quiz.delete(quizAdded.id);
				const deletedQuiz = await quizApi.getQuiz(quizAdded.id);
			} catch (err) {
				expect(err.message).toEqual(`Quiz does not exist`);
			}
		});

    });
    




    describe('List quizzes', () => {
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

			author = await userApi.signup(dataUser);

            const { token, user } = await userApi.login({
                email: dataUser.email,
                password: dataUser.password,
            });

            auth.__userApiToken__ = token;

			for (let i = 0; i < 6; i++) {
				dataQuiz = {
					author: author.id,
					title: `Quiz title-${Math.random()}`,
					description: `Quiz description-${Math.random()}`,
					picture: `Quiz image-${Math.random()}`,
					questions: [],
				};

				quizAdded = await quizApi.createQuiz(token, dataQuiz);

				let dataQuestion = {
					quiz: quizAdded.id,
					title: `Question - ${Math.random()}`,
					time: '15',
					answers: [
						{ title: 'Answer 1', success: true },
						{ title: 'Answer 2', success: false },
						{ title: '', success: false },
						{ title: '', success: false },
					],
				};

				await questionApi.createQuestion(token, quizAdded.id, dataQuestion);
			}
		});

		it('should be list 6 quizzes when the arguments are empties', async () => {
			const listOfQuizz = await quiz.list();

			expect(listOfQuizz.length).toEqual(6);
		});

    });





    describe('list quizzes by author', () => {
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

			author = await userApi.signup(dataUser);

            const { token, user } = await userApi.login({
                email: dataUser.email,
                password: dataUser.password,
            });

            auth.__userApiToken__ = token;

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

            noAuthor = await userApi.signup(dataUserNoAuthor);

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
			const listOfQuizz = await quiz.myQuizzes(1);
			expect(listOfQuizz.length).toEqual(7);
		});

	});





	describe('Get quiz by ID', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;
		let currentQuiz;
        let quizAdded;
		beforeEach(async () => {
			dataUser = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			author = await userApi.signup(dataUser);

            const { token, user } = await userApi.login({
                email: dataUser.email,
                password: dataUser.password,
            });

            auth.__userApiToken__ = token;

			for (let i = 0; i < 6; i++) {
				dataQuiz = {
					author: author.id,
					title: `Quiz title-${Math.random()}`,
					description: `Quiz description-${Math.random()}`,
					picture: `Quiz image-${Math.random()}`,
					questions: [],
				};

				quizAdded = await quizApi.createQuiz(token, dataQuiz);

				let dataQuestion = {
					quiz: quizAdded.id,
					title: `Question - ${Math.random()}`,
					time: '15',
					answers: [
						{ title: 'Answer 1', success: true },
						{ title: 'Answer 2', success: false },
						{ title: '', success: false },
						{ title: '', success: false },
					],
				};

				await questionApi.createQuestion(token, quizAdded.id, dataQuestion);
			}
		});

		it('should be success with correct quiz ID', async () => {
			const getQuiz = await quiz.get(quizAdded.id);

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

			author = await userApi.signup(dataUser);

            const { token, user } = await userApi.login({
                email: dataUser.email,
                password: dataUser.password,
            });

            auth.__userApiToken__ = token;

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
			const getQuiz = await quiz.search('Question', 1);

			expect(getQuiz).toBeDefined();
		});

    });



	afterAll(() =>
		Promise.all([auth.logOutUser(), User.deleteMany(), Quiz.deleteMany(), Question.deleteMany()]).then(() =>
			mongoose.disconnect(),
		),
	);
});
