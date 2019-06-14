
import freendiesApi from '../api'

const logic = {

    __userApiToken__: null,

    /**
     * Sets the user api token
     * @param {String} token user token
     */
    async setUserApiToken(token) {
        this.__userApiToken__ = token
        await sessionStorage.setItem('freendies-user-token', token)
        return this.__userApiToken__
    },
    /**
     * Deletes the user token
     */
    deleteUserApiToken() {
        this.__userApiToken__ = null
        sessionStorage.removeItem('freendies-user-token')
    },
    /**
     * gets the Token
     */
    getUserApiToken() {
        return this.__userApiToken__
    },

    /**
     * if true returns the token
     */
    get userLoggedIn() {
        return !!this.getUserApiToken()
    },

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

        return freendiesApi.registerUser(username, email, password, passwordConfirmation)
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

        return freendiesApi.authenticateUser(email, password)
            .then((token) => {
                return this.setUserApiToken(token)
                    .then(token => {
                        return token
                    })
            })
    },
    /**
     * Retrieves the user information on correct ID
     * @param {String} token used to extract the User ID to retrieve the user info
     */
    retrieveUser(token) {
        let new_token = token ? token : this.getUserApiToken()
        return freendiesApi.retrieveUser(new_token)
    },

    // updateUserEmail(email, token) {
    //     let new_token = token ? token : this.getUserApiToken()
    //     if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
    //     if (!email.trim().length) throw Error('email cannot be empty')

    //     return freendiesApi.updateUserEmail(email, new_token)
    // },
    /**
     * Logs out the user.
     * Deletes the token
     */
    logout() {
        this.deleteUserApiToken()
    },

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
        if (typeof title !== 'string') throw TypeError('title is not a string')
        if (!title.trim().length) throw Error('title cannot be empty')

        return freendiesApi.retrieveGameByQuery(genre, title)
    },
    /**
        * Retrieves all games whith a specific genre
        * @param {String} genre used to search for the games that match the genre
        */
    retrieveGameByGenre(genre) {
        if (typeof genre !== 'string') throw TypeError('genre is not a string')
        if (!genre.trim().length) throw Error('genre cannot be empty')

        return freendiesApi.retrieveGameByGenre(genre)
    },
    /**
         * Retrieves a specific game and returns all its information
         * @param {String} id used to search for the specific game.
         */
    retrieveGameById(id) {
        if (typeof id !== 'string') throw TypeError('id is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return freendiesApi.retrieveGameByID(id)
    },
    /**
     * Adds or removes the game from the user favoriteGames list.
     * @param {String} id game id added or removed of the User favoriteGames list.
     */
    toggleFavs(id) {
        if (typeof id !== 'string') throw TypeError('id is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return freendiesApi.toggleFavs(this.getUserApiToken(), id)
    },
    /**
        * Retrieves the favoriteGames list of the User
        */
    retrieveFavs() {
        return freendiesApi.retrieveFavs(this.__userApiToken__)
    },
    /**
         * Retrieves the uploads list of the User
         * 
         */
    retrieveUploads() {
        return freendiesApi.retrieveUploads(this.__userApiToken__)
    },

    /**
     * Retrieves all games found in the DB
     */
    retrieveAllGames() {
        return freendiesApi.retrieveAllGames()
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
    uploadGame(title, genre, description, images, gameFile) {

        let new_token = this.getUserApiToken()
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw Error('title cannot be empty')
        if (typeof genre !== 'string') throw TypeError(`${genre} is not a string`)
        if (!genre.trim().length) throw Error('genre cannot be empty')
        if (typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (!description.trim().length) throw Error('description cannot be empty')

        return freendiesApi.uploadGame(new_token, title, genre, description, images, gameFile)
    }
}

export default logic