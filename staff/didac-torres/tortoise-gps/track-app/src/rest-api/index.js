const { validate, call } = require('track-utils')

const restApi = {
    __url__: 'https://vast-gorge-68373.herokuapp.com/api',
    __timeout__: 0,

    registerUser(name, surname, email, password) {
	        validate.arguments([
	            { name: 'name', value: name, type: String, notEmpty: true },
	            { name: 'surname', value: surname, type: String, notEmpty: true },
	            { name: 'email', value: email, type: String, notEmpty: true },
	            { name: 'password', value: password, type: String, notEmpty: true }
	        ])

	        return call(`${this.__url__}/users`, {
	            method: 'POST',
	            headers: { 'Content-Type': 'application/json' },
	            data: { name, surname, email, password }
	        })
	    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { email, password },
        })
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    updateUser(token, data) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'data', value: data, type: Object, notEmpty: true }
        ])
        return call(`${this.__url__}/users/update`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data
        })
    },

    deleteUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/users/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

    },

    //POIS

    addPOI(token,title, color, latitude, longitude) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'title', value: title, type: String, notEmpty: true },
            { name: 'color', value: color, type: String, notEmpty: true },
            { name: 'latitude', value: latitude, type: Number, notEmpty: true },
            { name: 'longitude', value: longitude, type: Number, notEmpty: true }
        ])

        return call(`${this.__url__}/pois/add`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { title, color, latitude, longitude },
            timeout: this.__timeout__
        })
    },

    retrieveAllPOI(token) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/pois`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    retrieveOnePOI(token, id) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'id', value: id, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/pois/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    updatePOI(id, token, data) {
        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/pois/${id}/update`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data,
            timeout: this.__timeout__
        })
    },

    deletePOI(id, token) {
        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'token', value: token, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/pois/${id}/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: this.__timeout__
        })
    },

    //TRACKERS

    addTracker(token, serialNumber, licensePlate) {
        validate.arguments([
            { name: 'serialNumber', value: serialNumber, type: String, notEmpty: true },
            { name: 'licensePlate', value: licensePlate, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/trackers/add`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { serialNumber, licensePlate },
            timeout: this.__timeout__
        })
    },

    retrieveAllTrackers(token) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/trackers`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    retrieveTracker(token, id) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'id', value: id, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/trackers/id/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    retrieveTrackerByID(token, id) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'id', value: id, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/trackers/id/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    retrieveTrackerBySN(token, sn) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'sn', value: sn, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/trackers/sn/${sn}`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    retrieveTrackerByLicense(token, lp) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'lp', value: lp, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/trackers/lp/${lp}`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    updateTracker(id, token, data) {
        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/trackers/${id}/update`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data,
            timeout: this.__timeout__
        })
    },

    deleteTracker(id, token) {
        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'token', value: token, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/trackers/${id}/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: this.__timeout__
        })
    },

    //TRACKS

    addTrack(serialNumber, latitude, longitude, speed, status) {
        validate.arguments([
            { name: 'serialNumber', value: serialNumber, type: String, notEmpty: true },
            { name: 'latitude', value: latitude, type: Number, notEmpty: true },
            { name: 'longitude', value: longitude, type: Number, notEmpty: true },
            { name: 'speed', value: speed, type: Number, notEmpty: true, optinal: true},
            { name: 'status', value: status, type: String, notEmpty: true, optinal: true }
        ])

        return call(`${this.__url__}/tracks/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data:{ serialNumber, latitude, longitude, speed, status},
            timeout: this.__timeout__
        })
    },

    retrieveAllLastTracks(token) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/tracks`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    retrieveLastTrack(token, id) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'id', value: id, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/tracks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    retrieveRangeOfTracks(token, id, start, end) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'start', value: start, type: String, notEmpty: true },
            { name: 'end', value: end, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/tracks/${id}/from/${start}/to/${end}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: this.__timeout__
        })
    },

    // TODO
    // deleteRangeOfTracks(token, id, start, end) {
    //     validate.arguments([
    //         { name: 'token', value: token, type: String, notEmpty: true },
    //         { name: 'id', value: id, type: String, notEmpty: true },
    //         { name: 'start', value: start, type: String, notEmpty: true },
    //         { name: 'end', value: end, type: String, notEmpty: true }
    //     ])

    //     return call(`${this.__url__}/tracks/${id}/from/${start}/to/${end}/delete`, {
    //         headers: { Authorization: `Bearer ${token}` },
    //         timeout: this.__timeout__
    //     })
    // }
}


module.exports = restApi