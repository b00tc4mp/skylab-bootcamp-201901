const validate = require('../../common/validate')
const call = require('../../common/call')

const api = {
    /* __url__: 'http://localhost:8080/api', */
    __url__: 'https://polar-citadel-76140.herokuapp.com/api',
    __timeout__: 0,
    registerUser(name, surname, username, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => await call(`${this.__url__}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { name, surname, username, email, password }
        }))()
    },

    authenticateUser(username, password) {
        validate.arguments([
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const res = await call(`${this.__url__}/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: { username, password }
            })
            const { token } = res
            return token
        })()
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])
        return (async () => await call(`${this.__url__}/users`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))()
    },

    updateUser(token, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])
        return (async () => await call(`${this.__url__}/users`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        }))()
    },

    deleteUser(token, password) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return (async () => await call(`${this.__url__}/users`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { password }
        }))()
    },

    retrievePresentations(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])
        return (async () => await call(`${this.__url__}/users/presentations`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))()
    },

    createPresentation(token, title) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'title', value: title, type: 'string', notEmpty: true },
        ])
        return (async () => await call(`${this.__url__}/presentations`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { title }
        }))()
    },

    deletePresentation(token, presentationId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true }
        ])
        return (async () => await call(`${this.__url__}/presentations`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { presentationId }
        }))()
    },

    updatePresentationTitle(token, presentationId, title) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'title', value: title, type: 'string', notEmpty: true }
        ])
        return (async () => await call(`${this.__url__}/presentations`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { presentationId, title }
        }))()
    },

    updateSlideStyle(token, presentationId, slideId, style) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'slideId', value: slideId, type: 'string', notEmpty: true },
            { name: 'style', value: style, type: 'string', notEmpty: true }
        ])
        return (async () => await call(`${this.__url__}/presentations/slides/style`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { presentationId, slideId, style }
        }))()
    },

    updateSlide(token, presentationId, updateSlides, updateElements) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'updateSlides', value: updateSlides, type: 'object', notEmpty: true },
            { name: 'updateElements', value: updateElements, type: 'object', notEmpty: true }
        ])
        return (async () => await call(`${this.__url__}/presentations/slides`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { presentationId, updateSlides, updateElements }
        }))()
    },

    retrievePresentation(token, presentationId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true }
        ])
        return (async () => await call(`${this.__url__}/presentations/${presentationId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }))()
    },

    createSlide(token, presentationId, style) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'style', value: style, type: 'string', notEmpty: true },
        ])
        return (async () => await call(`${this.__url__}/presentations/slides`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { presentationId, style }
        }))()
    },

    deleteSlide(token, presentationId, slideId) {
        validate.arguments([
            { name: 'slideId', value: slideId, type: 'string', notEmpty: true },
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])
        return (async () => await call(`${this.__url__}/presentations/slides`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { presentationId, slideId }
        }))()
    },

    createElement(token, presentationId, slideId, style, type, content) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'slideId', value: slideId, type: 'string', notEmpty: true },
            { name: 'style', value: style, type: 'string', notEmpty: true },
            { name: 'type', value: type, type: 'string', notEmpty: true }
        ])
        return (async () => await call(`${this.__url__}/presentations/slides/element`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { presentationId, slideId, style, type, content }
        }))()
    },

    deleteElement(token, presentationId, slideId, elementId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'slideId', value: slideId, type: 'string', notEmpty: true },
            { name: 'elementId', value: elementId, type: 'string', notEmpty: true }
        ])
        return (async () => await call(`${this.__url__}/presentations/slides/element`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { presentationId, slideId, elementId }
        }))()
    }
}

module.exports = api
