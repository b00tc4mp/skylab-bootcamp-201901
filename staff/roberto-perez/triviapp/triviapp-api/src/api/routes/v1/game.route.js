const express = require('express');

const controller = require('../../controllers/game.controller');

const { authorize, isAuthor, userLogedIn } = require('../../midelware/auth');

const router = express.Router();

/**
 * Load quiz when API with quizId route parameter is hit
 */
router.param('gameId', controller.load);

router.route('/').post(authorize, controller.create);

router.route('/:gameId/start').patch(authorize, controller.start);

router.route('/:gameId/question').get(authorize, controller.currentQuestion);

router.route('/:gameId').get(controller.get);

router.route('/:gameId/podium').get(authorize, controller.podium);

router.route('/:gameId/score').get(authorize, controller.score);

router.route('/emit-question').post(authorize, controller.emitQuestion);

router.route('/time-out-question').post(authorize, controller.emitTimeOut);

router.route('/:gameId/next-question').get(authorize, controller.setNextQuestion);

router.route('/answer').post(authorize, controller.answer);

router.route('/question/results').post(authorize, controller.questionResults);

router.route('/:gameId/answer/last').get(authorize, controller.lastAnswer);

router
	.route('/join')
	.patch(userLogedIn, controller.join);

module.exports = router;
