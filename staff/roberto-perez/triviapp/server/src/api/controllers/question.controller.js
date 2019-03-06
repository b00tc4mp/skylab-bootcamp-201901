'use sctric';

const httpStatus = require('http-status');
const { Question } = require('../models/question.model');
const question = require('../logic/question');
const { handleResponseError } = require('../routes/routes-helper');
const { UnauthorizedError } = require('../errors');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	try {
		const question = await Question.get(id);
		
		req.locals = { question };
		return next();
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Get quiz
 * @public
 */
exports.get = (req, res) => res.json(req.locals.question.normalize());

exports.create = async (req, res, next) => {
	const {
		params: { quizId },
	} = req;
	
	try {
		const questionAdd = await question.createQuestion(quizId, req.body);
		res.status(httpStatus.CREATED);
		return res.json(questionAdd);
	} catch (error) {
		handleResponseError(error, res);
	}
};

exports.update = async (req, res) => {
	const {
		params: { quizId },
	} = req;

	try {
		const questionUpdated = await question.updateQuestion(req.locals.question, req.body);
		res.status(httpStatus.OK);
		return res.json(questionUpdated);
	} catch (error) {
		handleResponseError(error, res);
	}
};


exports.remove = async (req, res, next) => {
	const {
		params: { quizId },
	} = req;
	
	try {
		const { question: questioToDelete } = req.locals;
		await question.deleteQuestion(questioToDelete);
		res.status(httpStatus.NO_CONTENT).end()
	} catch (error) {
		handleResponseError(error, res);
	}
  };
