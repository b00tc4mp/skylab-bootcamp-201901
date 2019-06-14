'use strict'
const axios = require('axios')

const cloudinary = {

    url : 'http://localhost:8000/api',
    url_cloudinary:'https://api.cloudinary.com/v1_1/ccl1986/upload',
    url_cloudinary_upload_preset :'nbyfgfiw',
    
    addImage(coverphoto){
        var formData = new FormData()
        formData.append('file', coverphoto)
        formData.append('upload_preset', this.url_cloudinary_upload_preset)
        return axios({
            url: this.url_cloudinary,
            method: 'POST',
            header: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            data: formData
        }).then(res => {
            const { data : { secure_url } } = res
            return secure_url
        })
    }
}

module.exports = cloudinary
    