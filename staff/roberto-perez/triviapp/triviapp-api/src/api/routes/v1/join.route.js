const express = require('express');

const controller = require('../../controllers/join.controller');

const { authorize, isAuthor, userLogedIn } = require('../../midelware/auth');

const router = express.Router();


router
	.route('/')
	.patch(userLogedIn, controller.join);




module.exports = router;
