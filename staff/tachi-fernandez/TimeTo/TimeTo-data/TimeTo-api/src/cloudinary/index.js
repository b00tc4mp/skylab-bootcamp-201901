'use strict';

require("dotenv").config();


// const {
//     env: {
//         CLOUDINARY_API_KEY ,
//         CLOUDINARY_API_SECRET,
//         CLOUDINARY_NAME
//     },
//   } = process;

  
const CLOUDINARY_API_KEY = '416138157273549'

const CLOUDINARY_API_SECRET = 'AqsYCgsc3Ju2OWvCx-v4Mjlc9t8'	

const CLOUDINARY_NAME = 'dj6yymmpj'

const cloudinary = require('cloudinary').v2;

function cloudinaryUploader(req, res, next) {
	cloudinary.config({
		cloud_name: CLOUDINARY_NAME,
		api_key: CLOUDINARY_API_KEY,
		api_secret: CLOUDINARY_API_SECRET,
	});

	const path = req.file.path;

	try {
		cloudinary.uploader.upload(path, { width: 360, height: 360, gravity: "east", crop: "fill" }, function(err, image) {
			if (err) return req.send(err);
			console.log('file uploaded to Cloudinary');
			// remove file from server
			const fs = require('fs');
			fs.unlinkSync(path);
			// return image details
			req.image = image;
			next();
		});
	} catch ({ message }) {
		return res.status(401).json({ error: message });
	}
}

module.exports = cloudinaryUploader;