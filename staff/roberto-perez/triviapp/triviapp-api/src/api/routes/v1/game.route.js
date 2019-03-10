const express = require('express');

const controller = require('../../controllers/game.controller');

const { authorize, isAuthor } = require('../../midelware/auth');

const router = express.Router();

/**
 * Load quiz when API with quizId route parameter is hit
 */
router.param('quizId', controller.load);

router
	.route('/')
	.post(authorize, controller.create)
	.get(controller.get);




module.exports = router;
