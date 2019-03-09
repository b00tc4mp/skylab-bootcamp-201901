'use sctric';

const httpStatus = require('http-status');
var Busboy = require('busboy');
const { Quiz } = require('../models/quiz.model');
const quiz = require('../logic/quiz');
const { handleResponseError } = require('../routes/routes-helper');
const { UnauthorizedError } = require('../errors');
const { cloudName, apiKey, apiSecret } = require('../../config/vars');

// const cloudinary = require('cloudinary');
// cloudinary.config({
// 	cloud_name: cloudName,
// 	api_key: apiKey,
// 	api_secret: apiSecret,
// });


exports.upload = (req, res) => {
	return new Promise((resolve, reject) => {
        const busboy = new Busboy({ headers: req.headers })

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log(file)
            // logic.savePageAudio(pageId, storyId, file)
        })

        busboy.on('finish', () => resolve())

        busboy.on('error', err => reject(err))

        req.pipe(busboy)
    })
        .then((imageUrl) => {
            
            console.log(imageUrl);

        }).catch(error => console.log(error));
	// try {
	// 	req.body.author = req.userId;
	// 	const quizAdd = await quiz.createQuiz(req.body);
	// 	res.status(httpStatus.CREATED);
	// 	return res.json(quizAdd);
	// } catch (error) {
	// 	handleResponseError(error, res);
	// }
};
