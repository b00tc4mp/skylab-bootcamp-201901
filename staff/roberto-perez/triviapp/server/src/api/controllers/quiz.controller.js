'use sctric';

const httpStatus = require('http-status');
const { Quiz } = require('../models/quiz.model');
const quiz = require('../logic/quiz');
const { handleResponseError } = require('../routes/routes-helper');
const { UnauthorizedError } = require('../errors');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	try {
		const quiz = await Quiz.get(id);
		req.locals = { quiz };
		return next();
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Get quiz
 * @public
 */
exports.get = (req, res) => res.json(req.locals.quiz.normalize());

/**
 * Get quiz list
 * @public
 */
exports.list = async (req, res) => {
	try {
		const quizzes = await quiz.listQuizzes(req.body);
		return res.json(quizzes);
	} catch (error) {
		handleResponseError(error, res);
	}
};

exports.create = async (req, res) => {
	try {
		req.body.author = req.userId;
		const quizAdd = await quiz.createQuiz(req.body);
		res.status(httpStatus.CREATED);
		return res.json(quizAdd);
	} catch (error) {
		handleResponseError(error, res);
	}
};

exports.update = async (req, res) => {
	try {
		const quizUpdated = await quiz.updateQuiz(req.locals.quiz, req.body);
		res.status(httpStatus.OK);
		return res.json(quizUpdated);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Delete user
 * @public
 */
exports.remove = async (req, res, next) => {
	try {
		const { quiz: quizToDelete } = req.locals;
		await quiz.deleteQuiz(quizToDelete);
		res.status(httpStatus.NO_CONTENT).end()
	} catch (error) {
		handleResponseError(error, res);
	}
  };
