import userApi from '../api/user-api'

const logic = {

    /**
     * register an user
     * 
     * @param {string} name 
     * @param {string} username 
     * @param {string} email 
     * @param {string} emailConfirm 
     * @param {string} password 
     * @param {string} passwordConfirm 
     * 
     * @throws {Error} - on non valid input parameters
     * 
     * 
     */
    registerUser(name, username, email, emailConfirm, password, passwordConfirm) {

        if (typeof name !== 'string') throw TypeError(`name is not a string`)
        if (!name.trim().length) throw Error(`name is empty`)

        if (typeof username !== 'string') throw TypeError(`username is not a string`)
        if (!username.trim().length) throw Error(`username is empty`)

        if (typeof email !== 'string') throw TypeError(`email is not a string`)
        if (!email.trim().length) throw Error(`email is empty`)

        if (typeof emailConfirm !== 'string') throw TypeError(`emailConfirm is not a string`)
        if (!emailConfirm.trim().length) throw Error(`emailConfirm is empty`)

        if (email !== emailConfirm) throw Error(`email and emailConfirm are diferent`)

        if (typeof password !== 'string') throw TypeError(`password is not a string`)
        if (!password.trim().length) throw Error(`password is empty`)

        if (typeof passwordConfirm !== 'string') throw TypeError(`passwordConfirm is not a string`)
        if (!passwordConfirm.trim().length) throw Error(`passwordConfirm is empty`)

        if (password !== passwordConfirm) throw Error(`password and passwordConfirm are diferent`)

        return userApi.registerUser(name, username, email, password)

    },

    /**
     * login user
     * 
     * @param {String} email 
     * @param {String} password 
     * 
     * @throws {Error} - on non valid input parameters
     * 
     * @return {??????}
     */

    loginUser(email, password) {

        if (typeof email !== 'string') throw Error(`email is not a string`)
        if (!email.trim().length) throw Error(`email is empty`)

        if (typeof password !== 'string') throw Error(`password is not a string`)
        if (!password.trim().length) throw Error(`password is empty`)

        return userApi.loginUser(email, password)
            .then(data => {

                sessionStorage.userToken = data.token
            })
    },


    /**
     * ?????????
     */
    get isUserLoggedIn() {

        return (sessionStorage.userToken !== undefined)
    },

    /**
     * ??????????
     */
    logOutUser() {
        sessionStorage.clear()
    },

    /**
     * ?????????
     */
    retrieveUser() {

        const userToken = sessionStorage.userToken

        return userApi.retrieveUser(userToken)
    },

    /**
     * update user through his userData
     * 
     * @param {Object} userData 
     * 
     * @throws {TypeError} - on non valid input parameters
     * 
     * @param {????????} - 
     * 
     */
    updateUser(userData) {

        if (userData.constructor !== Object) throw TypeError(`userData is not an Object`)


        const userToken = sessionStorage.userToken

        return userApi.updateUser(userToken, userData)
    },


    /**
     * look for congresses
     * 
     * @param {String} query 
     * 
     * @throws {Error} - when the query is not correct
     * 
     * @param {??????????}
     */
    searchCongresses(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return userApi.searchCongresses(query)

    },

    /**
     * look for artist
     * 
     * @param {String} query 
     * 
     * @throws {Error} - when the query is not correct
     * 
     * @param {???????}
     */
    searchArtist(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return userApi.searchArtist(query)
    },

    /**
     * look for congresses or artists
     * 
     * @param {String} query 
     * 
     * @throws {Error} - when the query is not correct
     * 
     * @param {????????????} 
     */
    searchItems(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return userApi.searchItems(query)
    },

     /**
     * create a artist with the user's credentials
     * 
     * @param {Object} artistData 
     * 
     * @throws {TypeError} - on non valid artistData parameters
     * 
     * @param {???????????}
     */
    createArtist(artistData) {

        if (artistData.constructor !== Object) throw TypeError(`artistData is not an Object`)

        const userToken = sessionStorage.userToken
        return userApi.createArtist(artistData, userToken)
    },

    retrieveArtists() {
        return userApi.retrieveArtists()
            .then(response => response)
    },

    /**
     * create a congress with the user's credentials
     * 
     * @param {Object} data 
     * 
     * @throws {TypeError} - on non valid congressData parameters
     * 
     * @param {?????????????} 
     */
    createCongress(data) {

        if (data.constructor !== Object) throw TypeError(`data is not an Object`)

        const token = sessionStorage.userToken

        return userApi.createCongress(data, token)

    },

    /**
    * Add or remove favorite artists
    * 
    * @param {String} itemId 
    * 
    * @throws {Error} - when the invalid parameters
    * 
    * @param {??????????????} 
    * 
    */ 
    toggleFavorites(itemId) {

        if (typeof itemId !== 'string') throw Error(`itemId is not a string`)
        if (!itemId.trim().length) throw Error(`itemId is empty`)

        return userApi.toggleFavorites(itemId, sessionStorage.userToken)
    },

     /**
     * look for the detail of artist or congress by the itemId
     * 
     * @param {String} id 
     * 
     * @throws {Error} - on non valid id parameters
     * 
     * @param {??????} 
     * 
     */
    itemDetail(itemId) {

        if (typeof itemId !== 'string') throw Error(`itemId is not a string`)
        if (!itemId.trim().length) throw Error(`itemId is empty`)
        
        return userApi.itemDetail(itemId)
    }
}

export default logic