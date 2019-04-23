'use sctric';

const express = require('express');

const controller = require('../../controllers/game.controller');

const { authorize, isAuthor, userLogedIn } = require('../../midelware/auth');

const router = express.Router();

router.param('gameId', controller.load);

router.route('/').post(authorize, controller.create);

router.route('/:gameId').get(controller.get);

router.route('/join').patch(userLogedIn, controller.joinGame);

router.route('/:gameId/start').patch(authorize, controller.startGame);

router.route('/:gameId/emit-question').get(authorize, controller.emitQuestion);

router.route('/:gameId/question/results').post(authorize, controller.questionResults);

router.route('/:gameId/next-question').patch(authorize, controller.setNextQuestion);

router.route('/:gameId/game-over').patch(authorize, controller.gameOver);

router.route('/:gameId/podium').get(authorize, controller.podium);

router.route('/:gameId/time-out-question').get(authorize, controller.emitTimeOut);

router.route('/:gameId/answer').post(authorize, controller.answerQuestion);

router.route('/:gameId/score').get(authorize, controller.score);

module.exports = router;
