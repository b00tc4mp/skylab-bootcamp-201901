'use strict'


const bookApi = {

    url : 'http://localhost:8000/api',
    /**
     * Add a book to the server
     * 
     * @param {String} title 
     * @param {String} content 
     * @param {String} coverphoto 
     * @param {Array} images 
     * @param {Object} parameters 
     * @param {String} token 
     */
    addBook(title, content, coverphoto, parameters, images, token) {
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw new Error('title  is empty')
        if (typeof content !== 'string') throw TypeError(`${content} is not a string`)
        if (!content.trim().length) throw new Error('content  is empty')
        if (!(images instanceof Array)) throw TypeError(`${images} is not a array`)
        if (!(parameters instanceof Object)) throw TypeError(`${parameters} is not a Object`)
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token  is empty')

        
            return fetch(`${this.url}/book/add`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title, content, coverphoto, images, parameters })
            })
            .then(response => {
                return response.json()}
            )
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

    /**
     * deletes a book by id
     * @param {String} token 
     * @param {String} id 
     */
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
    },

    /**
     * 
     * Updates book by id, it only updates title and parameters
     * 
     * @param {String} id 
     * @param {String} title 
     * @param {Object} parameters 
     * @param {String} token 
     */
    updateBook(id, title, parameters, token) {

        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw new Error('title  is empty')
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id  is empty')
        if (!(parameters instanceof Object)) throw TypeError(`${parameters} is not a Object`)
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token  is empty')

        return fetch(`${this.url}/book/update`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ title, id, parameters })
        })
        .then(response => response.json())

    },

    /**
     * Calls APi and retrieve all template books
     */
    retrieveTemplateBooks(){
        if(arguments.length !== 0) throw new Error ('Too many args')

        return fetch(`${this.url}/book/retrieveTemplates`, {
            method: 'GET'
        })
        .then(books => books.json())
    },


    retrieveTemplateBook(id){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id  is empty')
        return fetch(`${this.url}/book/retrieveTemplate/${id}`, {
            method: 'GET'
        })
        .then(books => books.json())
    },


    /**
     * 
     * Add a book to templates book
     * @param {String} id 
     */
    addBookToTemplates(id){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id  is empty')

        return fetch(`${this.url}/book/addBookToTemplates`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())

    },


    addTemplateToUserBooks (id, token){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id  is empty')
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token  is empty')

        return fetch(`${this.url}/book/addTemplateToUserBooks`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
    },


    downloadEpub(id, token){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id  is empty')
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token  is empty')
        return fetch(`${this.url}/book/getEpub/${id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response)

    }
}
module.exports = bookApi