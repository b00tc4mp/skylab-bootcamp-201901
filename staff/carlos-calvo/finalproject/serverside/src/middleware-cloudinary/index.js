const multer = require('multer')

/* 
Initialize multer. 
You can also specify multer configuraitons here.
To limit filesize, you can do something like this:
NOTE: If you are going to add multer configurations 
that can lead to errors, ensure to handle the errors properly.
More details on multer configuration here: https://github.com/expressjs/multer
*/
const upload = multer();

multer({
    limits: {
        fileSize: 10 * 1024 * 1024    // Equivalent of 100MB
    }
})
/*
  This middleware would check the form-data coming from the client,
  if there is a single file named 'image', it would make the file 
  available in the server as req.file
  Consequently, (if there is an image uplaod) { req.file === <the image> }
  More details at https://github.com/expressjs/multer
*/


const parseImageUpload = (req, res) => {
  return upload.single('image');
}


module.exports = parseImageUpload()