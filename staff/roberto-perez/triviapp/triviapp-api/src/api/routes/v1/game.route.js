const express = require('express');

const controller = require('../../controllers/game.controller');

const { authorize, isAuthor } = require('../../midelware/auth');

const router = express.Router();

/**
 * Load quiz when API with quizId route parameter is hit
 */
router.param('gameId', controller.load);

router.route('/').post(authorize, controller.create);

router.route('/:gameId/start').patch(authorize, controller.start);

router.route('/:gameId').get(controller.get);

module.exports = router;
