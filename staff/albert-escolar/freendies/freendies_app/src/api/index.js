
const { REACT_APP_FREENDIES_API_URL } = process.env

const freendiesApi = {
    url: REACT_APP_FREENDIES_API_URL,

    registerUser(username, email, password, passwordConfirmation) {

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(`${passwordConfirmation} is not a string`)

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return fetch(`${this.url}user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, passwordConfirmation })
        })

            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })

    },

    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        return fetch(`${this.url}user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response.token
            })
    },


    retrieveUser(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error(`${token} cannot be empty`)

        return fetch(`${this.url}user`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    updateUserEmail(email, token) {
        if (typeof email !== 'string') throw TypeError(`email is not a string`)
        if (!email.trim().length) throw Error('email cannot be empty')

        return fetch(`${this.url}user/update`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email })
        })

            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    retrieveGameByQuery(genre, title) {
        if (typeof genre !== 'string') throw TypeError('genre is not a string')
        if (!genre.trim().length) throw Error('genre cannot be empty')

        return fetch(`${this.url}search/${genre}/${title}`, {
            headers: {
                'content-type': 'application/json'

            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })

    },

    retrieveGameByGenre(genre) {
        if (typeof genre !== 'string') throw TypeError('genre is not a string')
        if (!genre.trim().length) throw Error('genre cannot be empty')

        return fetch(`${this.url}genre/${genre}`, {
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    retrieveGameByID(id){
        if(typeof id !=='string') throw TypeError('id is not a string')
        if(!id.trim().length) throw Error('genre cannot be empty')

        return fetch(`${this.url}game/${id}`,{
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(response =>{
            if(response.error) throw Error(response.error)

            return response
        })
    },


    uploadGame(token, title, genre, description, images, gameFile) {
        //todo verification
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw Error(`${title} cannot be empty`)
        if (typeof genre !== 'string') throw TypeError(`${genre} is not a string`)
        if (!genre.trim().length) throw Error(`${genre}cannot be empty`)
        if (typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (!description.trim().length) throw Error(`${description} cannot be empty`)
        //if (typeof images !== 'string') throw TypeError(`${images} is not a string`)
        //if (!images.trim().length) throw Error(`${images} cannot be empty`)
        //if (typeof gameFile !== 'string') throw TypeError(`${gameFile} is not a string`)
        //if (!gameFile.trim().length) throw Error(`${gameFile} cannot be empty`)

        let formData = new FormData()
        formData.append('title', title)
        formData.append('genre', genre)
        formData.append('description', description)
        formData.append('images', images)
        formData.append('gameFile', gameFile)


        return fetch(`${this.url}user/game`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    }
}

export default freendiesApi