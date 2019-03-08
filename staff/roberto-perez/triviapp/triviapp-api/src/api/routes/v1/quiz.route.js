const express = require('express');

const controller = require('../../controllers/quiz.controller');

const { authorize, isAuthor } = require('../../midelware/auth');

const router = express.Router();

/**
 * Load quiz when API with quizId route parameter is hit
 */
router.param('quizId', controller.load);

router
	.route('/')
	.get(controller.list)
	.post(authorize, controller.create);

router
	.route('/:quizId')
	.get(controller.get)
	.patch(authorize, isAuthor, controller.update)
	.delete(authorize, isAuthor, controller.remove);

module.exports = router;
