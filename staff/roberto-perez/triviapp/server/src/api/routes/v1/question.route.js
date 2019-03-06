const express = require('express');

const controller = require('../../controllers/question.controller');

const { authorize, isAuthor } = require('../../midelware/auth');

const router = express.Router({ mergeParams: true });

/**
 * Load quiz when API with quizId route parameter is hit
 */
router.param('questionId', controller.load);

router.route('/').post(authorize, controller.create);
// 	.post(authorize, controller.create);

router
	.route('/:questionId')
	.get(controller.get)
	// .patch(authorize, isAuthor, controller.update)
	.patch(authorize, controller.update)
	// 	.delete(authorize, isAuthor, controller.remove);
	.delete(authorize, controller.remove);

module.exports = router;
