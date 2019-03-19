'use strict';

import gameApi from '.';
import questionApi from '../question-api';
import quizApi from '../quiz-api';
import userApi from '../user-api';
const { mongoose, Quiz, User, Question, Answer, Game, AnswerGame } = require('triviapp-data');
const {
	AlreadyExistsError,
	UnauthorizedError,
	NotFoundError,
} = require('triviapp-errors');

const { MONGO_URI, REACT_APP_BASE_URL_API } = process.env;

quizApi.url = REACT_APP_BASE_URL_API;
userApi.url = REACT_APP_BASE_URL_API;
questionApi.url = REACT_APP_BASE_URL_API;
gameApi.url = REACT_APP_BASE_URL_API;

describe('Game API', () => {
	beforeAll(() => mongoose.connect(MONGO_URI, { useNewUrlParser: true }));

	beforeEach(() =>
		Promise.all([
			User.deleteMany(),
			Quiz.deleteMany(),
			Question.deleteMany(),
			Answer.deleteMany(),
			Game.deleteMany(),
			AnswerGame.deleteMany(),
		]),
	);

	
	describe('Create game', () => {
		let dataUser = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let currentQuestion;
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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};
		});

		it('should succeed on valid data', async () => {
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const { id } = await gameApi.createGame(token, quizId);

			let gameAdded = await Game.get(id);

			expect(id).toBeDefined();
			expect(typeof id).toBe('string');
			expect(gameAdded.start).toBeFalsy();
			expect(gameAdded.end).toBeFalsy();
			expect(gameAdded.code).toBeDefined();
			expect(gameAdded.currentQuestion).toBeDefined();
			expect(gameAdded.quiz).toBeDefined();
			expect(gameAdded.users.length).toEqual(0);
		});

		it('should fail when host is not defined', async () => {
			
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});
	
				await gameApi.createGame('', quizId);
			} catch (err) {
				expect(err.message).toEqual(`Token is empty or blank`);
			}
		});

		it('should fail when Quiz is not defined', async () => {
			
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});
				await gameApi.createGame(token, '');
			} catch (err) {
				expect(err.message).toEqual(`Quiz ID is empty or blank`);
			}
		});

	});
    



	describe('Join game', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;
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

			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userPlayer = new User(dataUserPlayer);
			const savedUserPlayer = await userPlayer.save();
			player = savedUserPlayer;

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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			
			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);


			newGame = await gameApi.createGame(token, quizId);
		});

		it('should succeed on valid data', async () => {
			const { token } = await userApi.login({
				email: dataUserPlayer.email,
				password: dataUserPlayer.password,
			});
			const gameWithUser = await gameApi.joinGame(token, Number(newGame.code));
			
			expect(gameWithUser.game.users.length).toEqual(1);
			expect(gameWithUser.game.users[0].toString()).toEqual(player.id);
		});

		it('should fail with invalid game code', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUserPlayer.email,
					password: dataUserPlayer.password,
				});
				const gameWithUser = await gameApi.joinGame(token, 11111);
			} catch (err) {
				expect(err.message).toEqual(
					`We couldn't get you into the game. Please try again`,
				);
			}
		});

		it('should fail with if game code is not a number', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUserPlayer.email,
					password: dataUserPlayer.password,
				});
				const gameWithUser = await gameApi.joinGame(token, 'qweqwe');
			} catch (err) {
				expect(err.message).toEqual(`qweqwe is not a number`);
			}
		});

	});




	describe('Start game', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;
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

			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userPlayer = new User(dataUserPlayer);
			const savedUserPlayer = await userPlayer.save();
			player = savedUserPlayer;

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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await gameApi.createGame(token, quizId);
		});

		it('should succeed on valid data', async () => {
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});
			const gameToStarted = await Game.get(newGame.id);
			const isgameStarted = await gameApi.startGame(token, newGame.id);
			expect(isgameStarted.start).toBeTruthy();
			expect(isgameStarted.end).toBeFalsy();
		});
	});





	describe('Game over', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;
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

			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userPlayer = new User(dataUserPlayer);
			const savedUserPlayer = await userPlayer.save();
			player = savedUserPlayer;

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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await gameApi.createGame(token, quizId);
		});

		it('should succeed on valid data', async () => {
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});
			const gameToEnded = await Game.get(newGame.id);
			gameToEnded.start = true;
			const gameSaved = await gameToEnded.save();
			const isgameEnded = await gameApi.gameOver(token, gameSaved.id);
			expect(isgameEnded.start).toBeTruthy();
			expect(isgameEnded.end).toBeTruthy();
		});

		it('should fail if quiz has not yet started', async () => {
			try {
				const { token } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});
				const gameToEnded = await Game.get(newGame.id);
				await gameApi.gameOver(token, gameToEnded.id);
			} catch (err) {
				expect(err.message).toEqual(`The quiz has not yet started`);
			}
		});
	});



	describe('Answer', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;
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

			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userPlayer = new User(dataUserPlayer);
			const savedUserPlayer = await userPlayer.save();
			player = savedUserPlayer;

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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await gameApi.createGame(token, quizId);
		});

		it('should succeed on valid data', async () => {
			const dataAnswer = {
				gameId: newGame.id,
				questionId: currentQuestion.id,
				answerId: currentQuestion.answers[0],
			};

			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const { id } = await gameApi.answeQuestion(token, dataAnswer);

			let answerAdded = await AnswerGame.get(id);

			expect(id).toBeDefined();
			expect(typeof id).toBe('string');
			expect(answerAdded.score).toEqual(150);
			expect(answerAdded.game.toString()).toBe(newGame.id.toString());
			expect(answerAdded.question.toString()).toBe(currentQuestion.id.toString());
			expect(answerAdded.answer.toString()).toBe(
				currentQuestion.answers[0]._id.toString(),
			);
		});
	});




	describe('Get game score', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let dataAnswer = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;
		let quizId;
		let newAnser;

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

			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userPlayer = new User(dataUserPlayer);
			const savedUserPlayer = await userPlayer.save();
			player = savedUserPlayer;

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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await gameApi.createGame(token, quizId);


			dataAnswer = {
				gameId: newGame.id,
				questionId: currentQuestion.id,
				answerId: currentQuestion.answers[0],
			};

			newAnser = await gameApi.answeQuestion(token, dataAnswer);
		});

		// it('should succeed on valid data', async () => {

		// 	const { token } = await userApi.login({
		// 		email: dataUser.email,
		// 		password: dataUser.password,
		// 	});

		// 	const gameToExec = await Game.get(newGame.id);

		// 	const dataScore = {
		// 		gameId: gameToExec.id,
		// 		questionId: currentQuestion.id,
		// 		answerId: newAnser._id
		// 	};
			
		// 	const score = await gameApi.getScore(token, dataScore);

		// 	// expect(score[player.id].score).toEqual(150);
		// });
	});





	describe('Get game by ID', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let dataAnswer = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;
		let quizId;
		let newAnser;

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

			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userPlayer = new User(dataUserPlayer);
			const savedUserPlayer = await userPlayer.save();
			player = savedUserPlayer;

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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await gameApi.createGame(token, quizId);


			dataAnswer = {
				gameId: newGame.id,
				questionId: currentQuestion.id,
				answerId: currentQuestion.answers[0],
			};

			newAnser = await gameApi.answeQuestion(token, dataAnswer);
		});

		it('should succeed on valid data', async () => {

			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const gameToExec = await Game.get(newGame.id);

			const dataScore = {
				gameId: gameToExec.id,
				questionId: currentQuestion.id,
				answerId: newAnser._id
			};
			
			const _game = await gameApi.getGameByID(token, newGame.id);

			expect(_game).toBeDefined();
		});
		
	});

	

	describe('Get question results', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;
		let quizId;
		let token;

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

			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userPlayer = new User(dataUserPlayer);
			const savedUserPlayer = await userPlayer.save();
			player = savedUserPlayer;

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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await gameApi.createGame(token, quizId);

			const dataAnswer = {
				gameId: newGame.id,
				questionId: currentQuestion.id,
				answerId: currentQuestion.answers[0],
			};


			const { id } = await gameApi.answeQuestion(token, dataAnswer);

		});

		it('should succeed on valid data', async () => {
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const results = await gameApi.getQuestionsResults(token, {gameID:newGame.id ,questionID: currentQuestion.id});
			expect(results).toBeDefined();
			expect(results[0].total).toEqual(1);
			expect(results[0].percent).toEqual(100);

		});
	});

	
	describe('Emit next questin', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;
		let quizId;
		let token;
		let dataQuestion2;
		let secondQuestion;

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

			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userPlayer = new User(dataUserPlayer);
			const savedUserPlayer = await userPlayer.save();
			player = savedUserPlayer;

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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);


			dataQuestion2 = {
				quiz: quizAdded.id.toString(),
				title: 'Question 2',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			secondQuestion = await questionApi.createQuestion(token, quizId, dataQuestion2);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};
			
			newGame = await gameApi.createGame(token, quizId);

		});

		it('should succeed on valid data', async () => {
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});
			const nextQurrentQuestion = await gameApi.emitNextQuestion(token, newGame.id);
			const gameQithNewCurrentQuestion = await gameApi.getGameByID(token, newGame.id);

			expect(nextQurrentQuestion).toBeDefined();
			expect(nextQurrentQuestion).toEqual(gameQithNewCurrentQuestion.id);

		});
	});



	describe('Next questin', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;
		let quizId;
		let token;
		let dataQuestion2;
		let secondQuestion;

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

			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userPlayer = new User(dataUserPlayer);
			const savedUserPlayer = await userPlayer.save();
			player = savedUserPlayer;

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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);


			dataQuestion2 = {
				quiz: quizAdded.id.toString(),
				title: 'Question 2',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			secondQuestion = await questionApi.createQuestion(token, quizId, dataQuestion2);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};
			
			newGame = await gameApi.createGame(token, quizId);

		});

		it('should succeed on valid data', async () => {
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});
			const nextQurrentQuestion = await gameApi.setNxtQuestion(token, newGame.id);
			// const gameQithNewCurrentQuestion = await gameApi.getGameByID(token, newGame.id);

			expect(nextQurrentQuestion).toBeDefined();
			expect(nextQurrentQuestion.currentQuestion._id).toEqual(secondQuestion.id);

		});
	});



	describe('Emit timeout', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;
		let quizId;
		let token;
		let dataQuestion2;
		let secondQuestion;

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

			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userPlayer = new User(dataUserPlayer);
			const savedUserPlayer = await userPlayer.save();
			player = savedUserPlayer;

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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);


			dataQuestion2 = {
				quiz: quizAdded.id.toString(),
				title: 'Question 2',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			secondQuestion = await questionApi.createQuestion(token, quizId, dataQuestion2);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};
			
			newGame = await gameApi.createGame(token, quizId);

		});

		it('should succeed on valid data', async () => {
			const { token } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});
			const nextQurrentQuestion = await gameApi.emitTimeOutScreen(token, newGame.id);
			const gameQithNewCurrentQuestion = await gameApi.getGameByID(token, newGame.id);

			expect(nextQurrentQuestion).toBeDefined();
			expect(nextQurrentQuestion).toEqual(gameQithNewCurrentQuestion.id);

		});
	});

	describe('Get podium', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;
		let quizId;
		let token;

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

			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userPlayer = new User(dataUserPlayer);
			const savedUserPlayer = await userPlayer.save();
			player = savedUserPlayer;

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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await gameApi.createGame(token, quizId);

			const dataAnswer = {
				gameId: newGame.id,
				questionId: currentQuestion.id,
				answerId: currentQuestion.answers[0],
			};


			const { id } = await gameApi.answeQuestion(token, dataAnswer);

		});

		it('should succeed on valid data', async () => {
			const { token, user } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const results = await gameApi.getPodium(token, newGame.id);
			expect(results).toBeDefined();
			expect(results[user.id].score).toEqual(150);

		});
	});


	describe('Get score', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;
		let quizId;
		let token;

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

			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userPlayer = new User(dataUserPlayer);
			const savedUserPlayer = await userPlayer.save();
			player = savedUserPlayer;

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

			const quizAdded = await quizApi.createQuiz(token, dataQuiz);
			quizId = quizAdded.id;

			dataQuestionn = {
				quiz: quizAdded.id.toString(),
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await questionApi.createQuestion(token, quizId, dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await gameApi.createGame(token, quizId);

			const dataAnswer = {
				gameId: newGame.id,
				questionId: currentQuestion.id,
				answerId: currentQuestion.answers[0],
			};


			const { id } = await gameApi.answeQuestion(token, dataAnswer);

		});

		it('should succeed on valid data', async () => {
			const { token, user } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const results = await gameApi.getScore(token, newGame.id);
			
			// // expect(results).toBeDefined();
			// // expect(results[user.id].score).toEqual(150);

		});
	});

	
	

	describe('onEvent', () => {
		gameApi.onEvent('event', () => {
			expect().toBeTruthy();
		});
	});

	describe('emitReconect', () => {
		gameApi.emitReconect('adasdasdasd');
	});

	describe('emitLeaveGame', () => {
		gameApi.emitLeaveGame('adasdasdasd');
	});


	afterAll(() =>
		Promise.all([
			User.deleteMany(),
			Quiz.deleteMany(),
			Question.deleteMany(),
			Answer.deleteMany(),
			Game.deleteMany(),
			AnswerGame.deleteMany(),
		]).then(() => mongoose.disconnect()),
	);
});
