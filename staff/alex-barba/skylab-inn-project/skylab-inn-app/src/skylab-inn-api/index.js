import validate from 'skylab-inn-validation'

const skylabInnApi = {
    // url: 'http://localhost:8000/api',
    url: 'https://fast-taiga-93895.herokuapp.com/api',

    /**
     * Registers a user.
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {String} passwordConfirm
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty, password and password confirm do not match or error is received from the fetch.
     *
     * @returns {String} - id. 
     */
    registerUser(name, surname, email, password, passwordConfirm) {

        validate([{ key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }, { key: 'passwordConfirm', value: passwordConfirm, type: String }])

        if (password !== passwordConfirm) throw new Error('passwords do not match')

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(({ id, error }) => {
                if (error) throw new Error(error)
                return id
            })
    },

    /**
     * Authenticates a user.
     * 
     * @param {String} email 
     * @param {String} password
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty, password and password confirm do not match or error is received from the fetch.
     *
     * @returns {String} - id.  
     */
    authenticateUser(email, password) {

        validate([{ key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }])

        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(({ token, error }) => {
                if (error) throw new Error(error)

                return token
            })
    },

    /**
     * Retrieves user information
     * 
     * @param {String} token 
     * 
     * @throws {TypeError} - if token is not a string.
     * @throws {Error} - if token is empty.
     *
     * @returns {Object} - user.  
     */
    retrieveUser(token) {

        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/user`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Updates user information
     * 
     * @param {String} token
     * @param {Object} data
     * 
     * @throws {TypeError} - if token is not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Object} - user.  
     */
    updateUser(token, data) {

        validate([{ key: 'token', value: token, type: String }, { key: 'data', value: data, type: Object }])

        return fetch(`${this.url}/user`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Updates user information
     * 
     * @param {String} token
     * @param {Blob} image
     * 
     * @throws {TypeError} - if token is not a string or blob is not a blob.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Object} - user.  
     */
    updateUserPhoto(token, image) {

        validate([{ key: 'token', value: token, type: String }, { key: 'image', value: image, type: Blob }])

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (!image) throw Error('image is empty')
        if (image instanceof Blob === false) throw TypeError(`${image} is not a blob`)

        let formData = new FormData()
        formData.append('image', image)

        return fetch(`${this.url}/user-photo`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Searches for a skylaber
     * 
     * @param {String} token
     * @param {String} query
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Object} - user matching query
     */
    searchSkylaber(token, query) {

        validate([{ key: 'token', value: token, type: String }, { key: 'query', value: query, type: String }])

        return fetch(`${this.url}/user/search`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ query })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Advanced search for a skylaber
     * 
     * @param {String} token
     * @param {Array} filters
     * 
     * @throws {TypeError} - if token is not a string or filters is not an array.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Object} - user matching query 
     */
    adSearchSkylaber(token, filters) {

        validate([{ key: 'token', value: token, type: String }, { key: 'filters', value: filters, type: Array }])

        return fetch(`${this.url}/user/advanced-search`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ filters })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Retrieves a skylaber information
     * 
     * @param {String} token 
     * @param {String} skylaberId 
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if param is empty.
     *
     * @returns {Object} - skylaber matching id.  
     */
    retrieveSkylaber(token, skylaberId) {

        validate([{ key: 'token', value: token, type: String }, { key: 'skylaberId', value: skylaberId, type: String }])

        return fetch(`${this.url}/skylaber/${skylaberId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Add work experience to a user
     * 
     * @param {String} token
     * @param {String} type
     * @param {Object} data
     * 
     * @throws {TypeError} - if token or type are not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {String} - added work id.  
     */
    addUserInformation(token, type, data) {

        validate([{ key: 'token', value: token, type: String }, { key: 'type', value: type, type: String }, { key: 'data', value: data, type: Object }])

        return fetch(`${this.url}/user/addInformation`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ type, data })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Update work experience from a user
     * 
     * @param {String} token
     * @param {String} infoId
     * @param {String} type 
     * @param {Object} data
     * 
     * @throws {TypeError} - if token, infoId or type are not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {String} - updated work id.  
     */
    updateUserInformation(token, infoId, type, data) {

        validate([{ key: 'token', value: token, type: String }, { key: 'infoId', value: infoId, type: String }, { key: 'type', value: type, type: String }, { key: 'data', value: data, type: Object }])

        return fetch(`${this.url}/user/updateInformation`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ infoId, type, data })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Remove work experience from a user
     * 
     * @param {String} token
     * @param {String} infoId
     * @param {String} type 
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Promise} resolves or rejects. 
     */
    removeUserInformation(token, infoId, type) {

        validate([{ key: 'token', value: token, type: String }, { key: 'infoId', value: infoId, type: String }, { key: 'type', value: type, type: String }])

        return fetch(`${this.url}/user/removeInformation`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ infoId, type })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Adds skylaber to the whitelist.
     * 
     * @param {String} token
     * @param {Object} data
     * 
     * @throws {TypeError} - if token is not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Promise} resolves or rejects.   
     */
    addSkylaber(token, data) {

        validate([{ key: 'token', value: token, type: String }, { key: 'data', value: data, type: Object }])


        return fetch(`${this.url}/add-skylaber`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Retrieve whitelist skylabers with pending status.
     * 
     * @param {String} token 
     * 
     * @throws {TypeError} - if token is not a string.
     * @throws {Error} - if token is empty.
     *
     * @returns {Object} - skylabers pending to sign up.  
     */
    retrievePendingSkylabers(token) {

        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/pending-skylabers`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Retrieve skylabers with unverified emails.
     * 
     * @param {String} token 
     * 
     * @throws {TypeError} - if token is not a string.
     * @throws {Error} - if token is empty.
     *
     * @returns {Object} - skylabers with unverified emails.  
     */
    retrieveUnverifiedEmails(token) {

        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/unverified-emails`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Create a hashed url with skylaberIds.
     * 
     * @param {String} token
     * @param {Array} skylaberIds
     * 
     * @throws {TypeError} - if token is not a string or skylaberIds is not an array.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Object} - hashed url with skylabers ids. 
     */
    shareResults(token, skylaberIds) {

        validate([{ key: 'token', value: token, type: String }, { key: 'skylaberIds', value: skylaberIds, type: Array }])

        return fetch(`${this.url}/admin/create-hashed-url`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ skylaberIds })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Retrieves encrypted skylabers.
     * 
     * @param {String} encryptedIds 
     * 
     * @throws {TypeError} - if encryptedIds is not a string.
     * @throws {Error} - if encryptedIds is empty.
     *
     * @returns {Array} - skylabers matching encrypted ids.  
     */
    retrieveEncryptedIds(encryptedIds) {

        validate([{ key: 'encryptedIds', value: encryptedIds, type: String }])

        return fetch(`${this.url}/retrieve-skylaber/${encryptedIds}`)
            .then(response => response.json())
            .then(response => {

                if (response.error) throw new Error(response.error)

                return response
            })
    },
}

export default skylabInnApi