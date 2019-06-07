const validate = require('photopin-validate')
const call = require('photopin-call')

const port = process.env.REACT_APP_APP_PORT

const photopinApi = {

    __url__: `http://localhost:${port}/api`,
    __timeout__: 0,

    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { name, surname, email, password }
        })
    },

    authenticateUser(email, password) {

        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { email, password }
        })
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    updateUser(token, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/user`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data
        })
    },

    removeUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },

    //--------------------------------------------------------------

    retrieveUserMaps(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user/maps`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    retrieveUserMap(token, mapId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'mapId', value: mapId, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/map/${mapId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },


    createMap(token, title, description, coverImage, tags) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'title', value: title, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'coverImage', value: coverImage, type: 'string', notEmpty: true },
            { name: 'tags', value: tags, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/map`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { title, description, coverImage, tags }
        })
    },


    createCollection(token, mapId, title) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'mapId', value: mapId, type: 'string', notEmpty: true },
            { name: 'title', value: title, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/map/${mapId}/collection`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { title }
        })
    },

    createPin(token, mapId, collectionTitle, newPin) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'mapId', value: mapId, type: 'string', notEmpty: true },
            { name: 'collectionTitle', value: collectionTitle, type: 'string', notEmpty: true },
            { name: 'newPin', value: newPin, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/map/${mapId}/pin`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { collectionTitle, newPin }
        })
    },


    updateMap(token, mapId, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'mapId', value: mapId, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/map/${mapId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data
        })
    },


    updateCollection(token, mapId, collectionTitle, newTitle) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'mapId', value: mapId, type: 'string', notEmpty: true },
            { name: 'collectionTitle', value: collectionTitle, type: 'string', notEmpty: true },
            { name: 'neTtitle', value: newTitle, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/map/${mapId}/collection/${collectionTitle}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { newTitle }
        })
    },


    updatePin(token, pinId, title, description, urlImage,
        bestTimeOfYear, bestTimeOfDay, photographyTips,
        travelInformation) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'pinId', value: pinId, type: 'string', notEmpty: true },
            { name: 'title', value: title, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: false },
            { name: 'urlImage', value: urlImage, type: 'string', notEmpty: false },
            { name: 'bestTimeOfYear', value: bestTimeOfYear, type: 'string', notEmpty: false },
            { name: 'bestTimeOfDay', value: bestTimeOfDay, type: 'string', notEmpty: false },
            { name: 'photographyTips', value: photographyTips, type: 'string', notEmpty: false },
            { name: 'travelInformation', value: travelInformation, type: 'string', notEmpty: false },
        ])

        return call(`${this.__url__}/pin/${pinId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                title, description, urlImage,
                bestTimeOfYear, bestTimeOfDay, photographyTips,
                travelInformation
            }
        })
    },

    removeMap(token, mapId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'mapId', value: mapId, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/map/${mapId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },

    removeCollection(token, mapId, collectionTitle) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'mapId', value: mapId, type: 'string', notEmpty: true },
            { name: 'collectionTitle', value: collectionTitle, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/map/${mapId}/collection/${collectionTitle}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },


    removePin(token, pinId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'pinId', value: pinId, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/pin/${pinId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }


}

module.exports = photopinApi
//export default photopinApi