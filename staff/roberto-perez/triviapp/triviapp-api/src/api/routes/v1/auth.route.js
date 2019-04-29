const express = require('express');

const controller = require('../../controllers/auth.controller');

const { authorize } = require('../../midelware/auth');

const router = express.Router();

router.route('/signup').post(controller.signup);

router.route('/login').post(controller.login);

router
	.route('/user')
	.get(authorize, controller.retrieve)
	.post(authorize, controller.update);

module.exports = router;
