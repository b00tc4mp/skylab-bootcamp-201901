const uploadImage = require('../../src/cloudinary')

module.exports = (req, res) => {
    console.log('El file' ,req.body, req.file, req.data, req.body.data)
    if (req.coverphoto) { /* Check if there is an image */
        uploadImage(req.coverphoto) /* If there is an image, upload it */
          .then((result) => { /* If the upload is successful */
            res.status(201).json({ /* Send back a success response */
              status: 'success',
              imageCloudData: result
            });
          })
          .catch((error) => { /* If there is an error uploading the image */
            res.status(400).json({ /* Send back an error response */
              status: 'error',
              message: error.message
            });
          });
      } else { /* If there is no image  */
        res.status(400).json({ /* Send back a failure message */
          status: 'failed',
          message: 'No image file was uploaded'
        });
      }
}