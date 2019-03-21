'use sctric';

const httpStatus = require('http-status');
const { Game } = require('triviapp-data');
const gameLogic = require('../logic/game');
const quizLogic = require('../logic/quiz');
const { handleResponseError } = require('../routes/routes-helper');
const { UnauthorizedError } = require('../errors');
const { cloudName, apiKey, apiSecret } = require('../../config/vars');
const socket = require('../logic/socket');

/**
 * Load game
 */
exports.load = async (req, res, next, id) => {
	try {
		const game = await Game.get(id);
		req.locals = { game };
		return next();
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Get game
 */
exports.get = (req, res) => res.json(req.locals.game.normalize());

/**
 * Create game
 */
exports.create = async (req, res) => {
	try {
		req.body.host = req.userId;
		const game = await gameLogic.createGame(req.body);
		res.status(httpStatus.CREATED);
		return res.json(game);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Join game
 */
exports.joinGame = async (req, res) => {
	try {
		const game = await gameLogic.joinGame(req.body);

		req.app.io.in(`game-${game.id}`).emit('playerJoinedRoom', true);

		return res.status(httpStatus.OK).json({ game });
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Start game
 */
exports.startGame = async (req, res) => {
	try {
		const game = await gameLogic.startGame(req.locals.game);

		await quizLogic.addGame(game.quiz);

		req.app.io.in(`game-${game.id}`).emit('beginNewGame', true);

		res.status(httpStatus.OK);

		return res.json(game);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Game over
 */
exports.gameOver = async (req, res) => {
	try {
		const game = await gameLogic.gameOver(req.locals.game);

		res.status(httpStatus.OK);

		return res.json(game);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Emit question
 */
exports.emitQuestion = async (req, res) => {
	req.app.io.in(`game-${req.locals.game.id}`).emit('showQuestion', true);
	res.status(httpStatus.OK);
	return res.json(req.locals.game.id);
};

/**
 * Get question results
 */
exports.questionResults = async (req, res) => {
	try {
		const questionResult = await gameLogic.questionResults(req.locals.game, req.body);
		res.status(httpStatus.OK);

		return res.json(questionResult);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Nex question
 */
exports.setNextQuestion = async (req, res) => {
	try {
		const question = await gameLogic.setNextQuestion({ game: req.locals.game });

		req.app.io.in(`game-${req.locals.game.id}`).emit('nextQuestion', true);

		res.status(httpStatus.OK);

		return res.json(question);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Get podium results
 */
exports.podium = async (req, res) => {
	try {
		const podium = await gameLogic.getPodium({ game: req.locals.game });

		req.app.io.in(`game-${req.locals.game.id}`).emit('gameOver', true);

		res.status(httpStatus.OK);

		return res.json(podium);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Emit time out
 */
exports.emitTimeOut = async (req, res) => {
	req.app.io.in(`game-${req.locals.game.id}`).emit('timeOut', true);
	res.status(httpStatus.OK);
	return res.json(req.locals.game.id);
};

/**
 * Answer question
 */
exports.answerQuestion = async (req, res) => {
	try {
		req.body.user = req.userId;

		req.body.gameId = req.locals.game.id;

		const answerGame = await gameLogic.answerQuestion(req.body);

		req.app.io.in(`game-${req.locals.game.id}`).emit('answerQuestion', true);

		res.status(httpStatus.OK);

		return res.json(answerGame);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Get score
 */
exports.score = async (req, res) => {
	try {
		req.body.user = req.userId;

		const score = await gameLogic.getScore({
			game: req.locals.game,
			user: req.userId,
		});

		res.status(httpStatus.OK);

		return res.json(score);
	} catch (error) {
		handleResponseError(error, res);
	}
};
