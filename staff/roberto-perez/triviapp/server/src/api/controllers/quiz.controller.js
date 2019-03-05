'use sctric';

const httpStatus = require('http-status');
const { Quiz } = require('../models/quiz.model');
const quiz = require('../logic/quiz');
const { handleResponseError } = require('../routes/routes-helper');

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
		return next(error);
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
        const quizAdd = await quiz.createQuiz(req.body);
        res.status(httpStatus.CREATED);
        return res.json(quizAdd);
	} catch (error) {
		handleResponseError(error, res);
	}
};


// exports.replace = async (req, res) => {
//     try {
//         const quizUpdated = await quiz.updateQuiz(req.body);
//         res.status(httpStatus.CREATED);
//         return res.json(quizUpdated);
// 	} catch (error) {
// 		handleResponseError(error, res);
// 	}
// };