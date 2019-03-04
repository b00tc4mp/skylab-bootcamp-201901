'use strict'


const bookApi ={

    url : 'http://localhost:8000/api',

    addBook(title, content, coverphoto, images, parameters, userId) {
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw new Error('title  is empty')
        if (typeof content !== 'string') throw TypeError(`${content} is not a string`)
        if (!content.trim().length) throw new Error('content  is empty')
        if (typeof coverphoto !== 'string') throw TypeError(`${coverphoto} is not a string`)
        if (!coverphoto.trim().length) throw new Error('coverphoto  is empty')
        if (!(images instanceof Array)) throw TypeError(`${images} is not a array`)
        if (!(parameters instanceof Array)) throw TypeError(`${parameters} is not a array`)
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new Error('userId  is empty')

        return fetch(`${this.url}/book/add`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ title, content, coverphoto, images, parameters, userId })
        })
        .then(response => response.json())
    }
}


export default bookApi;