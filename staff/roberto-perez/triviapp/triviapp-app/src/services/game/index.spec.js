'use strict';

import game from '../game';
import quiz from '../quiz';
import auth from '../auth';
import question from '../question';
import quizApi from '../../api/quiz-api';
import userApi from '../../api/user-api';
import questionApi from '../../api/question-api';
import gameApi from '../../api/game-api';
const {
	mongoose,
	Game,
	Quiz,
	User,
	Question,
	Answer,
	AnswerGame,
} = require('triviapp-data');

const { MONGO_URI, REACT_APP_BASE_URL_API } = process.env;

quizApi.url = REACT_APP_BASE_URL_API;
userApi.url = REACT_APP_BASE_URL_API;
questionApi.url = REACT_APP_BASE_URL_API;
gameApi.url = REACT_APP_BASE_URL_API;

describe('Game', () => {
	beforeAll(() => mongoose.connect(MONGO_URI, { useNewUrlParser: true }));

	beforeEach(() =>
		Promise.all([
			User.deleteMany(),
			Game.deleteMany(),
			Quiz.deleteMany(),
			Question.deleteMany(),
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

			currentQuestion = await question.create(quizId, data);

		});

		it('should succeed on valid data', async () => {
			const gameAdded = await game.create(quizId);


			expect(gameAdded.start).toBeFalsy();
			expect(gameAdded.end).toBeFalsy();
			expect(gameAdded.code).toBeDefined();
			expect(gameAdded.currentQuestion).toBeDefined();
			expect(gameAdded.quiz).toBeDefined();
			expect(gameAdded.users.length).toEqual(0);
		});

		it('should fail when host is not defined', async () => {
			try {
				auth.__userApiToken__ = null;
				await game.create(quizId);
			} catch (err) {
				expect(err.message).toEqual(`null is not a string`);
			}
		});

		it('should fail when Quiz is not defined', async () => {
			try {
				await game.create();
			} catch (err) {
				expect(err.message).toEqual(`undefined is not a string`);
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

			currentQuestion = await question.create(quizId, data);

			dataQuestionn = {
				quiz: quizId,
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await question.create(quizId, dataQuestionn);

			newGame = await game.create(quizId);
		});

		it('should succeed on valid data', async () => {
			const { token, user } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			const gameWithUser = await game.joinGame(newGame.code);
			
			expect(gameWithUser.game.users.length).toEqual(1);
			expect(gameWithUser.game.users[0].toString()).toEqual(user.id);
		});

		it('should fail with invalid game code', async () => {
			try {
				const { token, user } = await userApi.login({
					email: dataUser.email,
					password: dataUser.password,
				});
	
				const gameWithUser = await game.joinGame(1);
			} catch (err) {
				expect(err.message).toEqual(
					`We couldn't get you into the game. Please try again`,
				);
			}
		});

		it('should fail with if game code is not a number', async () => {
			try {
				const gameWithUser = await game.joinGame('qweqwe');
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

			currentQuestion = await question.create(quizId, data);

			dataQuestionn = {
				quiz: quizId,
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await question.create(quizId, dataQuestionn);

			newGame = await game.create(quizId);
		});

		it('should succeed on valid data', async () => {
			const isgameStarted = await game.startGame(newGame.id);
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

			currentQuestion = await question.create(quizId, data);

			dataQuestionn = {
				quiz: quizId,
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await question.create(quizId, dataQuestionn);

			newGame = await game.create(quizId);
		});

		it('should succeed on valid data', async () => {
			const gameToEnded = await Game.get(newGame.id);
			gameToEnded.start = true;
			const gameSaved = await gameToEnded.save();
			const isgameEnded = await game.gameOver(gameSaved.id);
			expect(isgameEnded.start).toBeTruthy();
			expect(isgameEnded.end).toBeTruthy();
		});

		it('should fail if quiz has not yet started', async () => {
			try {
				// const gameToEnded = await Game.get(newGame.id);
				await game.gameOver(newGame.id);
			} catch (err) {
				expect(err.message).toEqual(`The quiz has not yet started`);
			}
		});
	});


	describe('Answer question', () => {
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



			dataUserPlayer = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			author = await userApi.signup(dataUserPlayer);

			const { user } = await userApi.login({
				email: dataUserPlayer.email,
				password: dataUserPlayer.password,
			});
			player = user;

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

			currentQuestion = await question.create(quizId, data);

			dataQuestionn = {
				quiz: quizId,
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await question.create(quizId, dataQuestionn);

			newGame = await game.create(quizId);
		});

		it('should succeed on valid data', async () => {

			const { token } = await userApi.login({
				email: dataUserPlayer.email,
				password: dataUserPlayer.password,
			});

			auth.__userApiToken__ = token;


			const { id } = await game.answeQuestion(newGame.id, currentQuestion.id, currentQuestion.answers[0]);

			let answerAdded = await AnswerGame.get(id);

			expect(answerAdded.score).toEqual(150);
			expect(answerAdded.game.toString()).toBe(newGame.id.toString());
			expect(answerAdded.question.toString()).toBe(currentQuestion.id.toString());
			expect(answerAdded.user.toString()).toBe(player.id.toString());
			expect(answerAdded.answer.toString()).toBe(
				currentQuestion.answers[0]._id.toString(),
			);
		});
	});


	
	describe('Get score', () => {
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

			currentQuestion = await question.create(quizId, data);

			dataQuestionn = {
				quiz: quizId,
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await question.create(quizId, dataQuestionn);

			newGame = await game.create(quizId);

			dataAnswer = {
				gameId: newGame.id,
				questionId: currentQuestion.id,
				answerId: currentQuestion.answers[0],
			};

			const { token:tokenPlayer, user } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			player = user;

			auth.__userApiToken__ = tokenPlayer;

			await gameApi.answeQuestion(tokenPlayer, dataAnswer);
		});

		it('should succeed on valid data', async () => {

			const score = await game.getScore(newGame.id);

			expect(score[player.id].score).toEqual(150);
		});
	});



	describe('Get podium', () => {
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

			currentQuestion = await question.create(quizId, data);

			dataQuestionn = {
				quiz: quizId,
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await question.create(quizId, dataQuestionn);

			newGame = await game.create(quizId);

			dataAnswer = {
				gameId: newGame.id,
				questionId: currentQuestion.id,
				answerId: currentQuestion.answers[0],
			};

			const { token:tokenPlayer, user } = await userApi.login({
				email: dataUser.email,
				password: dataUser.password,
			});

			player = user;

			auth.__userApiToken__ = tokenPlayer;

			await gameApi.answeQuestion(tokenPlayer, dataAnswer);
		});

		it('should succeed on valid data', async () => {
			const podium = await game.getPodium(newGame.id);
			console.log(podium)

			expect(podium[player.id].score).toEqual(150);
		});
	});


	describe('Next quesion', () => {
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

			currentQuestion = await question.create(quizId, data);

			dataQuestionn = {
				quiz: quizId,
				title: 'Question 1',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			currentQuestion = await question.create(quizId, dataQuestionn);


			dataQuestionn = {
				quiz: quizId,
				title: 'Question 2',
				time: '15',
				answers: [
					{ title: 'Answer 1', success: true },
					{ title: 'Answer 2', success: false },
					{ title: '', success: false },
					{ title: '', success: false },
				],
			};

			let _question = await question.create(quizId, dataQuestionn);

			currentQuestion2 = await Question.get(_question.id);

			newGame = await game.create(quizId);
		});

		it('should succeed on valid data', async () => {
			//setNextQuestion
			const _game = await game.nextQuestion(newGame.id);
			expect(_game.currentQuestion._id !== currentQuestion2._id).toBeTruthy();
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

			auth.__userApiToken__ = token;

			const nextQurrentQuestion = await game.showTimeOutScreen(newGame.id);
			const gameQithNewCurrentQuestion = await gameApi.getGameByID(token, newGame.id);

			expect(nextQurrentQuestion).toBeDefined();
			expect(nextQurrentQuestion).toEqual(gameQithNewCurrentQuestion.id);

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
			auth.__userApiToken__ = token;

			const results = await game.showQuestionsResults(newGame.id, currentQuestion.id);
			expect(results).toBeDefined();
			expect(results[0].total).toEqual(1);
			expect(results[0].percent).toEqual(100);

		});
	});




	describe('onPlayerJoinedRoom', () => {
		game.onPlayerJoinedRoom(() => {
			expect().toBeTruthy();
		});
	});

	describe('onBeginNewGame', () => {
		game.onBeginNewGame(() => {
			expect().toBeTruthy();
		});
	});

	describe('onShowQuestion', () => {
		game.onShowQuestion(() => {
			expect().toBeTruthy();
		});
	});

	describe('onNextQuestion', () => {
		game.onNextQuestion(() => {
			expect().toBeTruthy();
		});
	});

	describe('onAnswerQuestion', () => {
		game.onAnswerQuestion(() => {
			expect().toBeTruthy();
		});
	});

	describe('onTimeOut', () => {
		game.onTimeOut(() => {
			expect().toBeTruthy();
		});
	});

	describe('onGameOver', () => {
		game.onGameOver(() => {
			expect().toBeTruthy();
		});
	});

	describe('onReconect', () => {
		game.onReconect(() => {
			expect().toBeTruthy();
		});
	});

	afterAll(() =>
		Promise.all([
			User.deleteMany(),
			Game.deleteMany(),
			Quiz.deleteMany(),
			Question.deleteMany(),
			AnswerGame.deleteMany(),
		]).then(() => mongoose.disconnect()),
	);
});
