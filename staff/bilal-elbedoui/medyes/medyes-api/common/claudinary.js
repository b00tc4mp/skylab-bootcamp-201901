var cloudinary = require('cloudinary').v2;
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})



cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });



//   cloudinary.config({

//     cloud_name: CLOUDINARY_CLOUD_NAME,

//     api_key: CLOUDINARY_API_KEY,

//     api_secret: CLOUDINARY_API_SECRET

// })


const upload = cloudinary.uploader.upload_stream({

    public_id: 'my-images/my-smiley' // OPTION

}, (error, result) => {

        if (error) throw error

        console.log(result)

    })