'use strict'

import validate from 'coworking-validation'

const coworkingApi = {
    url: 'http://localhost:8000/api',

    registerUser(name, surname, userName, email, password, passwordConfirm) {
        validate([{ key: 'name', value: name, type: String },
        { key: 'surname', value: surname, type: String },
        { key: 'userName', value: userName, type: String },
        { key: 'email', value: email, type: String },
        { key: 'password', value: password, type: String },
        { key: 'passwordConfirm', value: passwordConfirm, type: String }])

        if (password !== passwordConfirm) throw Error('passwords do not match')

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, userName, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(response => {
                
                if (response.error) throw Error(response.error)

                return response.id
            })
    },

    authenticateUser(email, password) {
        validate([{ key: 'email', value: email, type: String },
        { key: 'password', value: password, type: String }])

        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    retrieveUser(token) {
        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/user`, {
            method: 'GET',
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

    retrieveUserProfile(token, userName) {
        validate([{ key: 'token', value: token, type: String },
        { key: 'userName', value: userName, type: String }])

        return fetch(`${this.url}/user/${userName}`, {
            method: 'GET',
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

    updateUser(token, data){
        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/user`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response
            })

    },

    removeUser(token, email, password) {
        validate([{ key: 'token', value: token, type: String },
        { key: 'email', value: email, type: String },
        { key: 'password', value: password, type: String }])

        return fetch(`${this.url}/user`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    createWorkspace(name, token) {
        validate([{ key: 'name', value: name, type: String },
        { key: 'token', value: token, type: String }])

        return fetch(`${this.url}/workspace`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response.id
            })
    },

    createNewUserLink(token) {
        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/workspace/link`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response.link
            })
    },

    verifyNewUserLink(token, link) {
        validate([{ key: 'token', value: token, type: String },
        { key: 'link', value: link, type: String }])

        return fetch(`${this.url}/workspace/link`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ invitationId: link })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response.workspaceId
            })
    },

    addUserToWorkspace(token, workspaceId) {
        validate([{ key: 'token', value: token, type: String },
        { key: 'workspaceId', value: workspaceId, type: String }])

        return fetch(`${this.url}/workspace/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ workspaceId })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                if (response.status === 'OK')
                    return response.status
            })
    },

    createService(token, title, description, maxUsers, place, time) {
        validate([{ key: 'token', value: token, type: String },
        { key: 'title', value: title, type: String },
        { key: 'description', value: description, type: String },
        { key: 'maxUsers', value: maxUsers, type: Number },
        { key: 'place', value: place, type: String },
        { key: 'time', value: time, type: Number }])

        return fetch(`${this.url}/service`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, maxUsers, place, time })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response.id
            })
    },

    retrieveWorkspaceServices(token, workspaceId) {
        validate([{ key: 'token', value: token, type: String },
        { key: 'workspaceId', value: workspaceId, type: String }])

        return fetch(`${this.url}/service/workspace/${workspaceId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response.services
            })
    },

    searchServices(token, query) {
        validate([{ key: 'token', value: token, type: String },
        { key: 'query', value: query, type: String }])

        return fetch(`${this.url}/services?q=${query}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response.services
            })
    },

    retrieveService(token, serviceId) {
        validate([{ key: 'token', value: token, type: String },
        { key: 'serviceId', value: serviceId, type: String }])

        return fetch(`${this.url}/service/${serviceId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response.service
            })
    },

    retrieveUserServices(token) {
        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/user/service`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response.services
            })
    },

    retrieveUserSubmitedServices(token) {
        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/user/service/submited`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response.services
            })
    },

    addUserToService(token, serviceId) {
        validate([{ key: 'token', value: token, type: String },
        { key: 'serviceId', value: serviceId, type: String }])

        return fetch(`${this.url}/service/${serviceId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response
            })
    },

    closeService(token, serviceId) {
        validate([{ key: 'token', value: token, type: String },
        { key: 'serviceId', value: serviceId, type: String }])

        return fetch(`${this.url}/closeservice/${serviceId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response
            })
    },

    createComment(token, serviceId, text) {

        validate([{ key: 'token', value: token, type: String },
        { key: 'serviceId', value: serviceId, type: String },
        { key: 'text', value: text, type: String }])

        return fetch(`${this.url}/comment/${serviceId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ text })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response
            })
    },

    retrieveWorkspaceComments(token, serviceId) {
        validate([{ key: 'token', value: token, type: String },
        { key: 'serviceId', value: serviceId, type: String }])

        return fetch(`${this.url}/comment/${serviceId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response.comments
            })
    },

    removeComment(token, serviceId, commentId) {
        validate([{ key: 'token', value: token, type: String },
        { key: 'serviceId', value: serviceId, type: String },
        { key: 'commentId', value: commentId, type: String }])

        return fetch(`${this.url}/comment/${serviceId}/${commentId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
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
        validate([{ key: 'token', value: token, type: String }])

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (!image) throw Error('image is empty')
        // if (image instanceof Blob === false) throw TypeError(`${image} is not a blob`)

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
}

export default coworkingApi