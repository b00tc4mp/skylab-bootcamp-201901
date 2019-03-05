import skylabApi from '../skylab-api'

/**
 * Abstraction of business logic.
 */
const logic = {
    __userApiToken__: null,
    __isAdmin__: null,

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')
        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')
        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')
        if (password !== passwordConfirmation) throw Error('passwords do not match')

        if (email.match(/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/) === null) throw Error(`${email} is not an email`)

        return skylabApi.registerUser(name, surname, email, password, passwordConfirmation)
            .then(() => { })
    },

    /**
     * Logs in the user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    logInUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        return skylabApi.authenticateUser(email, password)
            .then(response => {
                this.__userApiToken__ = response.token
                this.__isAdmin__ = response.isAdmin
            })
    },

    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__userApiToken__ = null
        this.__isAdmin__ = null
    },

    /**
     * Checks if an user is admin
     */
    get isAdmin() {
        return this.__isAdmin__=== 'true'
    },

    // checkIsAdmin() {
    //     if (!this.__userApiToken__) return false

    //     return skylabApi.isAdmin(this.__userApiToken__)
    //         .then(isAdmin => this.__isAdmin__ = isAdmin)
    // },

    exerciseList(){
        return skylabApi.exerciseList(this.__userApiToken__)
            .then(exercises => exercises)
    },

    deleteExercise(id){
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return skylabApi.deleteExercise(id, this.__userApiToken__)
    },

    retrieveExercise(id) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return skylabApi.retrieveExercise(id, this.__userApiToken__)
    },

    checkCode(code, test) {
        if (typeof code !== 'string') throw TypeError(code + ' is not a string')
        if (!code.trim().length) throw Error('code cannot be empty')

        if (typeof test !== 'string') throw TypeError(test + ' is not a string')
        if (!test.trim().length) throw Error('test cannot be empty')

        return skylabApi.checkCode(this.__userApiToken__, code, test)
    },

    // retrieveUser() {
    //     return userApi.retrieve(this.__userId__, this.__userApiToken__)
    //         .then(({ id, name, surname, username: email, favoriteArtists = [], favoriteAlbums = [], favoriteTracks = [] }) => ({
    //             id,
    //             name,
    //             surname,
    //             email,
    //             favoriteArtists,
    //             favoriteAlbums,
    //             favoriteTracks
    //         }))
    // }
}

export default logic