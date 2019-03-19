const validate = require('flyme-validation')

const flymeApi = {
    url: 'http://localhost:8000/api',

    registerUser(name, surname, email, password, passwordConfirm) {
        validate([{ key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }, { key: 'passwordConfirm', value: passwordConfirm, type: String }])

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(res => res)
    },

    authenticateUser(email, password) {
        validate([{ key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }])

        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveUser(token) {
        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/user`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => res)
    },

    updateUser(token, data) {
        validate([{ key: 'token', value: token, type: String }, { key: 'data', value: data, type: Object }])

        return fetch(`${this.url}/user/update`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res)
    },

    updateUserImage(token, image) {
        validate([{ key: 'token', value: token, type: String }])

        // if (!image) throw Error('image is empty')
        // if (image.constructor !== Object) throw TypeError(`${image} is not an object`)

        let formData = new FormData()
        formData.append('image', image)

        return fetch(`${this.url}/user/photo`, {
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

    startDrone(token, droneId) {
        validate([{ key: 'token', value: token, type: String }, { key: 'droneId', value: droneId, type: String }])

        return fetch(`${this.url}/drone/start`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ droneId })
        })
            .then(res => res.json())
            .then(res => res)
    },

    stopDrone(token, droneId) {
        validate([{ key: 'token', value: token, type: String }, { key: 'droneId', value: droneId, type: String }])

        return fetch(`${this.url}/drone/stop`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ droneId })
        })
            .then(res => res.json())
            .then(res => res)
    },


    // getHistory(token) {
    //     if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
    //     if (!token.trim().length) throw Error('token is empty')

    //     //TODO droneId
    //     const droneId = '5c80f001cdda345041068f1c'

    //     return fetch(`${this.url}/drone/history`, {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //             authorization: `Bearer ${token}`
    //         },
    //         body: JSON.stringify({ droneId })
    //     })
    //         .then(res => res.json())
    //         .then(res => res)

    // },

    sendCommand(token, command, droneId) {
        validate([{ key: 'token', value: token, type: String }, { key: 'command', value: command, type: String }, { key: 'droneId', value: droneId, type: String }])

        return fetch(`${this.url}/drone/command`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ droneId, command })
        })
            .then(res => res.json())
            .then(res => res)
    },

    addDrone(token, data) {
        validate([{ key: 'token', value: token, type: String }, { key: 'data', value: data, type: Object }])

        return fetch(`${this.url}/drone`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveDrone(token, droneId) {
        validate([{ key: 'token', value: token, type: String }, { key: 'droneId', value: droneId, type: String }])

        return fetch(`${this.url}/drone/${droneId}`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveDronesFromUser(token, userId) {
        validate([{ key: 'token', value: token, type: String }, { key: 'userId', value: userId, type: String }])

        return fetch(`${this.url}/user/${userId}/drones`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },

    updateDrone(token, data) {
        validate([{ key: 'token', value: token, type: String }, { key: 'data', value: data, type: Object }])

        return fetch(`${this.url}/drone/update`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res)
    },

    deleteDrone(token, droneId) {
        validate([{ key: 'token', value: token, type: String }, { key: 'droneId', value: droneId, type: String }])

        return fetch(`${this.url}/drone`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ droneId })
        })
            .then(res => res.json())
            .then(res => res)
    },

    createProgram(token, name, orders) {
        validate([{ key: 'token', value: token, type: String }, { key: 'name', value: name, type: String }])

        return fetch(`${this.url}/program`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, orders })
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveAllFlights(token) {
        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/flights`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveFlightsFromUser(token, userId) {
        validate([{ key: 'token', value: token, type: String }, { key: 'userId', value: userId, type: String }])

        return fetch(`${this.url}/user/${userId}/flights`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveFlight(token, flightId) {
        validate([{ key: 'token', value: token, type: String }, { key: 'flightId', value: flightId, type: String }])

        return fetch(`${this.url}/flight/${flightId}`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveAllPrograms(token) {
        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/programs`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveProgram(token, programId) {
        validate([{ key: 'token', value: token, type: String }, { key: 'programId', value: programId, type: String }])

        return fetch(`${this.url}/program/${programId}`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },


    retrieveUserPrograms(token, userId) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')


        return fetch(`${this.url}/user/${userId}/programs`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },

    playProgram(token, droneId, orders) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof droneId !== 'string') throw TypeError(`${droneId} is not a string`)
        if (!droneId.trim().length) throw Error('droneId is empty')

        return fetch(`${this.url}/program/play`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ droneId, orders })
        })
            .then(res => res.json())
            .then(res => res)
    },

    sendEmail(token, data) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/sendemail`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res)
    }

}

export default flymeApi