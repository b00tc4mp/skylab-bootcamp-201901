const express = require('express');

const controller = require('../../controllers/quiz.controller');

const { authorize } = require('../../midelware/auth');

const router = express.Router();

/**
 * Load quiz when API with quizId route parameter is hit
 */
router.param('quizId', controller.load);

router
	.route('/')
	.get(controller.list)
	.post(authorize, controller.create);

router.route('/:quizId').get(controller.get);
// .put(controller.replace);
module.exports = router;
