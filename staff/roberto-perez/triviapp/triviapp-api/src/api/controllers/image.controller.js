'use sctric';

const httpStatus = require('http-status');
const { Quiz } = require('triviapp-data');
const quiz = require('../logic/quiz');
const { handleResponseError } = require('../routes/routes-helper');
const { UnauthorizedError } = require('../errors');
const { cloudName, apiKey, apiSecret } = require('../../config/vars');

const cloudinary = require('cloudinary').v2;

var fs = require('fs');

// const cloudinary = require('cloudinary');
// cloudinary.config({
// 	cloud_name: cloudName,
// 	api_key: apiKey,
// 	api_secret: apiSecret,
// });

exports.upload = (req, res) => {
	res.status(httpStatus.OK);
	return res.json(req.image);
};
