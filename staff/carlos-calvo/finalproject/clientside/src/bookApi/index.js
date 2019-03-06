'use strict'

const axios = require('axios')


const bookApi ={

    url : 'http://localhost:8000/api',
    url_cloudinary:'https://api.cloudinary.com/v1_1/ccl1986/upload',
    url_cloudinary_upload_preset :'v7oaakma',
    /**
     * Add a book to the server
     * 
     * @param {String} title 
     * @param {String} content 
     * @param {String} coverphoto 
     * @param {Array} images 
     * @param {Array} parameters 
     * @param {String} userId 
     */
    addBook(title, content, coverphoto, parameters, images, userId) {
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw new Error('title  is empty')
        if (typeof content !== 'string') throw TypeError(`${content} is not a string`)
        if (!content.trim().length) throw new Error('content  is empty')
        if (!(images instanceof Array)) throw TypeError(`${images} is not a array`)
        if (!(parameters instanceof Array)) throw TypeError(`${parameters} is not a array`)
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new Error('userId  is empty')

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
            return fetch(`${this.url}/book/add`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ title, content, 'coverphoto' : secure_url, images, parameters, userId })
                })
                .then(response => response.json())
        
        })
    },
    
    /**
     * Retrieves a list of books from server, using token as middleware
     * @param {String} token 
     */
    retrieveBooks(token){
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token  is empty')

        return fetch(`${this.url}/books/retrieve`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
    },


    /**
     * 
     * Retrieves a book and all its fields
     * 
     * @param {String} token 
     * @param {String} id 
     */
    retrieveBook(token, id){
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token  is empty')
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id  is empty')

        return fetch(`${this.url}/book/retrieve/${id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            },
        })
        .then(response => response.json())
    },


    deleteBook(token, id){
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token  is empty')
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id  is empty')

        return fetch(`${this.url}/book/delete`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
    }
}


export default bookApi;