const express = require('express');

const controller = require('../../controllers/image.controller');

// var multer  = require('multer')

// var busboy = require('busboy');

// var storage = multer.memoryStorage()
// var upload = multer({ storage: storage })

const router = express.Router();

/**
 * Load quiz when API with quizId route parameter is hit
 */

router
	.route('/')
	.post(controller.upload);

module.exports = router;
