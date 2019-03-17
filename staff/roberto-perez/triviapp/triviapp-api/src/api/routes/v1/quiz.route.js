const express = require('express');

const controller = require('../../controllers/quiz.controller');

const { authorize, isAuthor } = require('../../midelware/auth');

const router = express.Router({ mergeParams: true });

/**
 * Load quiz when API with quizId route parameter is hit
 */
router.param('quizId', controller.load);

router.route('/page/:offset').get(controller.list);

router.route('/page/:offset/author').get(authorize, controller.listByAuthor);

router.route('/page/:offset').post(controller.search);

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
