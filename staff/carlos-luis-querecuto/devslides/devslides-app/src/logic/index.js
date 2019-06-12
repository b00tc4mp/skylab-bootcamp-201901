const validate = require('../common/validate')
const call = require('../common/call')
const api = require('../data/devslides-api')

const logic = {
    __url__: 'http://localhost:8080/api',
    __timeout__: 0,

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return sessionStorage.userToken
    },

    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    logoutUser() {
        sessionStorage.clear()
    },

    registerUser(name, surname, username, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            try {
                await api.registerUser(name, surname, username, email, password)
                return 'User registered!'
            }
            catch (error) {
                throw error
            }
        })()
    },

    updateUser(name, surname, username, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
        ])

        validate.email(email)

        return (async () => {
            try {
                await api.updateUser(this.__userToken__, {name, surname, username, email, password})
                return 'User Updated!'
            }
            catch (error) {
                throw error
            }
        })()
    },

    retrieveUser() {
        return (async () => {
            try {
                return await api.retrieveUser(this.__userToken__)
            }
            catch (error) {
                throw error
            }
        })()
    },

    deleteUser(password) {
        validate.arguments([
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {
                await api.deleteUser(this.__userToken__, password)
                return 'User Deleted!'
            }
            catch (error) {
                throw error
            }
        })()
    },

    authenticateUser(username, password) {
        validate.arguments([
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {
                this.__userToken__ = await api.authenticateUser(username, password)
            }
            catch (error) {
                throw error
            }
        })()
    },

    createPresentation(title) {
        validate.arguments([
            { name: 'title', value: title, type: 'string' }
        ])

        return (async () => {
            try {
                await api.createPresentation(this.__userToken__, title)
            }
            catch (error) {
                throw error
            }
        })()
    },

    deletePresentation(presentationId) {
        validate.arguments([
            { name: 'presentationId', value: presentationId, type: 'string' }
        ])

        return (async () => {
            try {
                await api.deletePresentation(this.__userToken__, presentationId)
            }
            catch (error) {
                throw error
            }
        })()
    },

    retrievePresentation(presentationId) {
        validate.arguments([
            { name: 'presentationId', value: presentationId, type: 'string' }
        ])

        return (async () => {
            try {
                const res = await api.retrievePresentation(this.__userToken__,presentationId)
                return res
            }
            catch (error) {
                throw error
            }
        })()
    },

    createSlide(presentationId, styles) {
        validate.arguments([
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'styles', value: styles, type: 'string', notEmpty: true },
        ])
        return (async () => {
            try {
                const res = await api.createSlide(this.__userToken__,presentationId, styles)
                return res
            }
            catch (error) {
                throw error
            }
        })()
    },

    deleteSlide(presentationId, slideId) {
        validate.arguments([
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'slideId', value: slideId, type: 'string', notEmpty: true },
        ])
        return (async () => {
            try {
                const res = await api.deleteSlide(this.__userToken__,presentationId, slideId)
                return res
            }
            catch (error) {
                throw error
            }
        })()
    },

    createElement(presentationId, slideId, style, type, content){
        validate.arguments([
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'slideId', value: slideId, type: 'string', notEmpty: true },
            { name: 'style', value: style, type: 'string', notEmpty: true },
            { name: 'type', value: type, type: 'string', notEmpty: true },
            { name: 'content', value: content, type: 'string', notEmpty: true },
        ])
        return (async () => {
            try {
                const res = await api.createElement(this.__userToken__, presentationId, slideId, style, type, content)
                return res
            }
            catch (error) {
                throw error
            }
        })()
    },

    deleteElement(presentationId, slideId, elementId){
        validate.arguments([
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'slideId', value: slideId, type: 'string', notEmpty: true },
            { name: 'elementId', value: elementId, type: 'string', notEmpty: true },
        ])
        return (async () => {
            try {
                const res = await api.deleteElement(this.__userToken__, presentationId, slideId, elementId)
                return res
            }
            catch (error) {
                throw error
            }
        })()
    },

    updateSlideStyles(presentationId, slideId, style){
        validate.arguments([
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'slideId', value: slideId, type: 'string', notEmpty: true },
            { name: 'style', value: style, type: 'string', notEmpty: true }
        ])
        return (async () => {
            try {
                const res = await api.updateSlideStyle(this.__userToken__, presentationId, slideId, style)
                return res
            }
            catch (error) {
                throw error
            }
        })()
    },

    updateSlideElement(presentationId, slideId, elementId, elementClass, elementContent){
        validate.arguments([
            { name: 'presentationId', value: presentationId, type: 'string', notEmpty: true },
            { name: 'slideId', value: slideId, type: 'string', notEmpty: true },
            { name: 'elementId', value: elementId, type: 'string', notEmpty: true },
            { name: 'elementClass', value: elementClass, type: 'string', notEmpty: true },
            { name: 'elementContent', value: elementContent, type: 'string', notEmpty: true }
        ])
        return (async () => {
            try {
                const res = await api.updateSlide(this.__userToken__, presentationId, [slideId], [{_id:elementId, type:elementClass,content:elementContent,style: "color: black"}])
                return res
            }
            catch (error) {
                throw error
            }
        })()
    },

    retrievePresentations() {
        return (async () => {
            try {
                const res = await api.retrievePresentations(this.__userToken__)
                return res
            }
            catch (error) {
                throw error
            }
        })()
    }
}

module.exports = logic
