'use strict'

import validate from 'coworking-validation'

const coworkingApi = {
    url: 'http://localhost:8000/api',

    registerUser(name, surname, email, password, passwordConfirm) {
        validate([{key: 'name', value: name, type: String},
        {key: 'surname', value: surname, type: String},
        {key: 'email', value: email, type: String},
        {key: 'password', value: password, type: String},
        {key: 'passwordConfirm', value: passwordConfirm, type: String}])

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(response => {

                if (response.error) throw Error(response.error)

                return response.id
            })
    },

    authenticateUser(email, password) {
        validate([{key: 'email', value: email, type: String},
        {key: 'password', value: password, type: String}])

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
        validate([{key: 'token', value: token, type: String}])

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

    removeUser(token, email, password) {
        validate([{key: 'token', value: token, type: String},
        {key: 'email', value: email, type: String},
        {key: 'password', value: password, type: String}])

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
        validate([{key: 'name', value: name, type: String},
        {key: 'token', value: token, type: String}])

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

                return response
            })
    },

    createNewUserLink(token) {
        validate([{key: 'token', value: token, type: String}])

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
        validate([{key: 'token', value: token, type: String},
        {key: 'link', value: link, type: String}])

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
        validate([{key: 'token', value: token, type: String},
        {key: 'workspaceId', value: workspaceId, type: String}])

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
        validate([{key: 'token', value: token, type: String},
        {key: 'title', value: title, type: String},
        {key: 'description', value: description, type: String},
        {key: 'maxUsers', value: maxUsers, type: Number},
        {key: 'place', value: place, type: String},
        {key: 'time', value: time, type: Number}])

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

                return response.serviceId
            })
    },

    retrieveWorkspaceServices(token, workspaceId) {
        validate([{key: 'token', value: token, type: String},
        {key: 'workspaceId', value: workspaceId, type: String}])

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

    retrieveService(token, serviceId) {
        validate([{key: 'token', value: token, type: String},
        {key: 'serviceId', value: serviceId, type: String}])

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

    addUserToService(token, serviceId) {
        validate([{key: 'token', value: token, type: String},
        {key: 'serviceId', value: serviceId, type: String}])

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
        validate([{key: 'token', value: token, type: String},
        {key: 'serviceId', value: serviceId, type: String}])

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

        validate([{key: 'token', value: token, type: String},
        {key: 'serviceId', value: serviceId, type: String},
        {key: 'text', value: text, type: String}])

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
                return
            })
    },

    retrieveWorkspaceComments(token, serviceId) {
        validate([{key: 'token', value: token, type: String},
        {key: 'serviceId', value: serviceId, type: String}])

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
        validate([{key: 'token', value: token, type: String},
        {key: 'serviceId', value: serviceId, type: String},
        {key: 'commentId', value: commentId, type: String}])

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
    }
}

export default coworkingApi