const express = require('express');

const controller = require('../../controllers/join.controller');

const { authorize, isAuthor } = require('../../midelware/auth');

const router = express.Router();


router
	.route('/')
	.patch(controller.join);




module.exports = router;
