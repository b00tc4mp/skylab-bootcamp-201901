const validate = require('wotcontrol-validate')
const call = require('wotcontrol-call')
require('dotenv').config()

// const url = process.env.REACT_APP_URL_SERVER
//const { env: { MONGO_URL_API_TEST: url}} = process
const { env: { REACT_APP_URL_SERVER: url}} = process


const restApi = {

    __url__ : url,
    // __url__ : 'http://localhost:8080/api',

    registerUser(name, surname, email, password, admin = false) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'admin', value: admin, type: 'boolean', optional: true }
        ])

        validate.email(email)
        return (async () => {
            const response = await call(`${this.__url__}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { name, surname, email, password, admin }
            })
            return response
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const response = await call(`${this.__url__}/users/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { email, password }
            })

            return response
        })()
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        })()
    },

    updateUser(token, data) { // TODO refactor
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/users`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: { data }
            })
            return response
        })()
    },

    deleteUser(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true}
        ])

        return (async () => {
            await call(`${this.__url__}/users`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            })
        })()
    },

    addDevice(token, deviceName, deviceIp, devicePort){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'deviceIp', value: deviceIp, type: 'string', notEmpty: true },
            { name: 'devicePort', value: devicePort, type: 'number', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/devices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: { name: deviceName, ip: deviceIp, port: devicePort }
            })
            return response
        })()
    },

    deleteDevice(token, deviceName){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true }
        ])

        return (async () => {
            await call(`${this.__url__}/devices/${deviceName}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            })
        })()
    },

    retrieveDevice(token, deviceName){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const response = await call(`${this.__url__}/devices/${deviceName}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            return response
        })()
    },

    activateDevice(token, deviceName, timeInterval){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'timeInterval', value: timeInterval, type: 'number', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/devices/${deviceName}/activate/${timeInterval}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            return response
        })()
    },

    changeDeviceId(token, deviceName, newDeviceName){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'newDeviceName', value: newDeviceName, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/devices/${deviceName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: { newName: newDeviceName }
            })
            return response
        })()
    },

    addInput(token, deviceName, inputType, inputDirection){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'inputType', value: inputType, type: 'string', notEmpty: true },
            { name: 'inputDirection', value: inputDirection, type: 'number', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/devices/${deviceName}/inputs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: { type: inputType, direction: inputDirection }
            })
            return response
        })()
    },

    deleteInput(token, deviceName, inputType, inputDirection){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'inputType', value: inputType, type: 'string', notEmpty: true },
            { name: 'inputDirection', value: inputDirection, type: 'number', notEmpty: true }
        ])

        return (async () => {
            await call(`${this.__url__}/devices/${deviceName}/inputs/${inputType}/${inputDirection}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            })
        })()
    },

    addOutput(token, deviceName, outputType, outputDirection){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'outputType', value: outputType, type: 'string', notEmpty: true },
            { name: 'outputDirection', value: outputDirection, type: 'number', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/devices/${deviceName}/outputs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: { type: outputType, direction: outputDirection }
            })
            return response
        })()
    },

    deleteOutput(token, deviceName, outputType, outputDirection){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'outputType', value: outputType, type: 'string', notEmpty: true },
            { name: 'outputDirection', value: outputDirection, type: 'number', notEmpty: true }
        ])

        return (async () => {
            await call(`${this.__url__}/devices/${deviceName}/outputs/${outputType}/${outputDirection}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            })
        })()
    },

    toggleDigitalOutput(token, deviceName, pinNumber){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'pinNumber', value: pinNumber, type: 'number', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/devices/${deviceName}/outputs/digital/${pinNumber}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            return response
        })()
    },

    setServoPosition(token, deviceName, pinNumber, angle){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'pinNumber', value: pinNumber, type: 'number', notEmpty: true },
            { name: 'angle', value: angle, type: 'number', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/devices/${deviceName}/outputs/servo/${pinNumber}/${angle}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            return response
        })()
    },

    setMotorSpeed(token, deviceName, pinNumber, speed){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'pinNumber', value: pinNumber, type: 'number', notEmpty: true },
            { name: 'speed', value: speed, type: 'number', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/devices/${deviceName}/outputs/motor/${pinNumber}/${speed}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            return response
        })()
    },

    retrieveAnalog(token, deviceName){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const response = await call(`${this.__url__}/devices/${deviceName}/inputs/analog`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            return response
        })()
    },

    retrieveDigital(token, deviceName, pinNumber){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'pinNumber', value: pinNumber, type: 'number', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/devices/${deviceName}/inputs/digital/${pinNumber}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            return response
        })()
    }
}

module.exports = restApi