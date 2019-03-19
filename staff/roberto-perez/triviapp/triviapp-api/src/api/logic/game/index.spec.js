'use strict';

require('dotenv').config();
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const expect = require('expect');
const { User, Game, Quiz, Question, AnswerGame } = require('triviapp-data');
const mongoose = require('../../../config/mongoose');
const game = require('.');
const auth = require('../auth');
const quiz = require('../quiz');
const question = require('../question');
const { AlreadyExistsError, UnauthorizedError } = require('triviapp-errors');

describe('Game', () => {
	before(() => mongoose.connect());

	beforeEach(() =>
		Promise.all([
			User.deleteMany(),
			Game.deleteMany(),
			Quiz.deleteMany(),
			Question.deleteMany(),
			AnswerGame.deleteMany(),
		]),
	);

	describe('POST /v1/game', () => {
		let dataUser = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let currentQuestion;

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

			const quizAdded = await quiz.createQuiz(dataQuiz);

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

			currentQuestion = await question.createQuestion(dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};
		});

		it('should succeed on valid data', async () => {
			const { id } = await game.createGame(dataGame);

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
			delete dataGame.host;

			try {
				await game.createGame(dataGame);
			} catch (err) {
				expect(err.message).toEqual(`Host game is not defined`);
			}
		});

		it('should fail when Quiz is not defined', async () => {
			delete dataGame.quiz;

			try {
				await game.createGame(dataGame);
			} catch (err) {
				expect(err.message).toEqual(`Quiz is not defined`);
			}
		});

		it('should fail when description is not a string', async () => {
			try {
				const q = await Question.get(currentQuestion.id);
				await question.deleteQuestion(q);
				await game.createGame(dataGame);
			} catch (err) {
				expect(err.message).toEqual(
					`To play a quiz you need to have at least one question`,
				);
			}
		});
	});

	describe('PATCH /v1/game/join', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;

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

			const quizAdded = await quiz.createQuiz(dataQuiz);

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

			currentQuestion = await question.createQuestion(dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await game.createGame(dataGame);
		});

		it('should succeed on valid data', async () => {
			const gameWithUser = await game.joinGame({
				user: player.id,
				gameCode: newGame.code,
			});
			expect(gameWithUser.users.length).toEqual(1);
			expect(gameWithUser.users[0].toString()).toEqual(player.id);
		});

		it('should fail with invalid game code', async () => {
			try {
				const gameWithUser = await game.joinGame({
					user: player,
					gameCode: 11111,
				});
			} catch (err) {
				expect(err.message).toEqual(
					`We couldn't get you into the game. Please try again`,
				);
			}
		});

		it('should fail with if game code is not a number', async () => {
			try {
				const gameWithUser = await game.joinGame({
					user: player.id,
					gameCode: 'qweqwe',
				});
			} catch (err) {
				expect(err.message).toEqual(`qweqwe is not a number`);
			}
		});

		it('should fail with user id is not an Object', async () => {
			try {
				await game.joinGame({
					user: 'kwerwkerjhegwhrkj9763',
					gameCode: newGame.code,
				});
			} catch (err) {
				expect(err.message).toEqual(
					`Cast to ObjectId failed for value "kwerwkerjhegwhrkj9763" at path "users"`,
				);
			}
		});
	});

	describe('PATCH /v1/game/:gameId/start', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;

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

			const quizAdded = await quiz.createQuiz(dataQuiz);

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

			currentQuestion = await question.createQuestion(dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await game.createGame(dataGame);
		});

		it('should succeed on valid data', async () => {
			const gameToStarted = await Game.get(newGame.id);
			const isgameStarted = await game.startGame(gameToStarted);
			expect(isgameStarted.start).toBeTruthy();
			expect(isgameStarted.end).toBeFalsy();
		});
	});

	describe('PATCH /v1/game/:gameId/game-over', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;

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

			const quizAdded = await quiz.createQuiz(dataQuiz);

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

			currentQuestion = await question.createQuestion(dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await game.createGame(dataGame);
		});

		it('should succeed on valid data', async () => {
			const gameToEnded = await Game.get(newGame.id);
			gameToEnded.start = true;
			const gameSaved = await gameToEnded.save();
			const isgameEnded = await game.gameOver(gameSaved);
			expect(isgameEnded.start).toBeTruthy();
			expect(isgameEnded.end).toBeTruthy();
		});

		it('should fail if quiz has not yet started', async () => {
			try {
				const gameToEnded = await Game.get(newGame.id);
				await game.gameOver(gameToEnded);
			} catch (err) {
				expect(err.message).toEqual(`The quiz has not yet started`);
			}
		});
	});

	describe('POST /v1/game/:gameId/answer', () => {
		let dataUser = {};
		let dataUserPlayer = {};
		let dataQuiz = {};
		let dataQuestionn = {};
		let dataGame = {};
		let author;
		let player;
		let newGame;
		let currentQuestion;

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

			const quizAdded = await quiz.createQuiz(dataQuiz);

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

			currentQuestion = await question.createQuestion(dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await game.createGame(dataGame);
		});

		it('should succeed on valid data', async () => {
			const dataAnswer = {
				user: player,
				gameId: newGame.id,
				questionId: currentQuestion.id,
				answerId: currentQuestion.answers[0],
			};

			const { id } = await game.answerQuestion(dataAnswer);

			let answerAdded = await AnswerGame.get(id);

			expect(id).toBeDefined();
			expect(typeof id).toBe('string');
			expect(answerAdded.score).toEqual(150);
			expect(answerAdded.game.toString()).toBe(newGame.id.toString());
			expect(answerAdded.question.toString()).toBe(currentQuestion.id.toString());
			expect(answerAdded.user.toString()).toBe(player.id.toString());
			expect(answerAdded.answer.toString()).toBe(
				currentQuestion.answers[0]._id.toString(),
			);
		});
	});

	describe('GET /v1/game/:gameId/score', () => {
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

			const quizAdded = await quiz.createQuiz(dataQuiz);

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

			currentQuestion = await question.createQuestion(dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await game.createGame(dataGame);

			dataAnswer = {
				user: player,
				gameId: newGame.id,
				questionId: currentQuestion.id,
				answerId: currentQuestion.answers[0],
			};

			game.answerQuestion(dataAnswer);
		});

		it('should succeed on valid data', async () => {
			const gameToExec = await Game.get(newGame.id);

			const dataScore = {
				game: gameToExec,
				user: player._id,
			};
			const score = await game.getScore(dataScore);

			expect(score[player.id].score).toEqual(150);
		});
	});

	describe('GET /v1/game/:gameId/podium', () => {
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

			const quizAdded = await quiz.createQuiz(dataQuiz);

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

			currentQuestion = await question.createQuestion(dataQuestionn);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await game.createGame(dataGame);

			dataAnswer = {
				user: player,
				gameId: newGame.id,
				questionId: currentQuestion.id,
				answerId: currentQuestion.answers[0],
			};

			game.answerQuestion(dataAnswer);
		});

		it('should succeed on valid data', async () => {
			const gameToExec = await Game.get(newGame.id);

			const dataScore = {
				game: gameToExec,
			};
			const podium = await game.getPodium(dataScore);

			expect(podium[player.id].score).toEqual(150);
		});
	});

	describe('PATCH /v1/game/:gameId/next-question', () => {
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
		let currentQuestion2;

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

			const quizAdded = await quiz.createQuiz(dataQuiz);

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

			currentQuestion = await question.createQuestion(dataQuestionn);

			dataQuestionn = {
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

			const { id } = await question.createQuestion(dataQuestionn);

			currentQuestion2 = await Question.get(id);

			dataGame = {
				host: author.id,
				quiz: quizAdded.id,
			};

			newGame = await game.createGame(dataGame);
		});

		it('should succeed on valid data', async () => {
			//setNextQuestion
			const gameToExec = await Game.get(newGame.id);

			const dataScore = {
				game: gameToExec,
			};
			const _game = await game.setNextQuestion(dataScore);
			expect(_game.currentQuestion._id).toEqual(currentQuestion2._id);
		});
	});

	after(() =>
		Promise.all([
			User.deleteMany(),
			Game.deleteMany(),
			Quiz.deleteMany(),
			Question.deleteMany(),
			AnswerGame.deleteMany(),
		]).then(() => mongoose.disconnect()),
	);
});
