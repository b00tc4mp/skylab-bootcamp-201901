
const { REACT_APP_FREENDIES_API_URL } = process.env

const freendiesApi = {
    url: REACT_APP_FREENDIES_API_URL,

    /**
     * Creates a User and encrypts the password before storing the User in DB
     * @param {String} username the name of the user to be stored in the DB
     * @param {String} email the email of the user to be stored in the DB
     * @param {String} password the password of the user to be stored in the DB
     * @param {String} passwordConfirmation the password confirmation to check that the password matches the confirmation
     */
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
/**
     * Authenticates the user if the email and password match the information stored in the DB
     * @param {String} email the email received to check and do the authentication
     * @param {String} password the password received to check and the authentication
     */
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

/**
     * Retrieves the user information on correct ID
     * @param {String} token used to extract the User ID to retrieve the user info
     */
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

    // updateUserEmail(email, token) {
    //     if (typeof email !== 'string') throw TypeError(`email is not a string`)
    //     if (!email.trim().length) throw Error('email cannot be empty')

    //     return fetch(`${this.url}user/update`, {
    //         method: 'PUT',
    //         headers: {
    //             authorization: `Bearer ${token}`,
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({ email })
    //     })

    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error)

    //             return response
    //         })
    // },

    /**
         * Retrieves a game by title.
         * Genre can be used to focus the search for the title on specific genres
         * If genre is "any"then it searches for the title in all genres.
         * @param {String} genre Genre used to search for the game
         * @param {String} query Title of the game used to search for the game
         */
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

     /**
        * Retrieves all games whith a specific genre
        * @param {String} genre used to search for the games that match the genre
        */
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

    /**
         * Retrieves a specific game and returns all its information
         * @param {String} id used to search for the specific game.
         */
    retrieveGameByID(id) {
        if (typeof id !== 'string') throw TypeError('id is not a string')
        if (!id.trim().length) throw Error('genre cannot be empty')

        return fetch(`${this.url}game/${id}`, {
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
/**
     * Adds or removes the game from the user favoriteGames list.
     * @param {String} id game id added or removed of the User favoriteGames list.
     */
    toggleFavs(token, id) {
        if (typeof token !== 'string') throw TypeError('token is not a string')
        if (!token.trim().length) throw Error('token cannot be empty')
        if (typeof id !== 'string') throw TypeError('id is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return fetch(`${this.url}user/toggleFavs`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })


    },
/**
        * Retrieves the favoriteGames list of the User
        */
    retrieveFavs(token) {
        if (typeof token !== 'string') throw TypeError('token is not a string')
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}user/retrieveFavs`, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },
 /**
         * Retrieves the uploads list of the User
         * 
         */
    retrieveUploads(token) {
        if (typeof token !== 'string') throw TypeError('token is not a string')
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}user/retrieveUploads`, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })

    },
/**
     * Retrieves all games found in the DB
     */
    retrieveAllGames() {
        
        return fetch(`${this.url}games`, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {return response.json()})
            .then(response => {
                if (response.error) throw Error(response.error)
                
                return response
            })
    },
/**
         * Uploads the gameFile and images to firebase.
         * Once is has been uploaded it saves the information and the gameFile and images
         * firebase url's to the DB
         * 
         * @param {String} title Title of the game being uploaded 
         * @param {String} genre Genre of the game being uploaded 
         * @param {String} description Description of the game being uploaded 
         * @param {File} images Images File of the game being uploaded
         * @param {File} gameFile File of the game being uploaded 
         */
    uploadGame(token, title, genre, description, images, gameFile) {
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw Error(`${title} cannot be empty`)
        if (typeof genre !== 'string') throw TypeError(`${genre} is not a string`)
        if (!genre.trim().length) throw Error(`${genre}cannot be empty`)
        if (typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (!description.trim().length) throw Error(`${description} cannot be empty`)

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