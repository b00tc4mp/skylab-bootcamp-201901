const cloudinary = require('cloudinary')
const dotEnv = require('dotenv').config()

cloudinary.config({
  cloud_name: 'ccl1986',
  api_key: '183589818635475',
  api_secret: 'npgL3E9wt1izB-hyc9AIJ9sG6iI'
})


const uploadImage = (image) => {
    const cloudinaryOptions = {
      resource_type: 'raw'
    }
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(cloudinaryOptions, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }).end(image.buffer);
    })
}

module.exports = uploadImage