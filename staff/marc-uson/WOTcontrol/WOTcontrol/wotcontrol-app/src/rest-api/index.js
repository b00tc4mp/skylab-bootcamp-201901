const validate = require('wotcontrol-validate')
const call = require('wotcontrol-call')
require('dotenv').config()

// const url = process.env.REACT_APP_URL_SERVER
//const { env: { MONGO_URL_API_TEST: url}} = process
const { REACT_APP_URL_SERVER: url } = process.env


const restApi = {

    __url__ : url,

    /** Creates a new user on the DB with the given data
     *
     * @param {string} name first name of the user
     * @param {string} surname second name or surname of the user
     * @param {string} email email direction of the user, will be used to login in the application
     * @param {string} password password used for sign in
     * @param {boolean} admin if true, save the user as admin user to have more privileges (not yet implemented). By default, admin is false
     */
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

    /** Autenticates the user to the application
     * 
     * @param {string} email email defined by the user in registration process
     * @param {string} password password defined from the user in registration process
     */
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

    /** retrieves the name, surname, email and list of devices of the user asociated with the passed id
     *
     * @param {string} token unique token of the user
     */
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

    /** Updates the information of the current user with the information given in the data object. The data object must contain the keys named the same as the parameters of the registerUser function
     *
     * @param {string} token unique token of the user
     * @param {object} data contains the data to be updated. the data to be updated must have the key identical to the parameters of the registerUser function
     * @return {string} 'User succesfully updated'
     */
    updateUser(token, data) {
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

    /** deletes the user asociated to the token passed
     *
     * @param {string} token unique token of the user
     * @return {string} 'User succesfully deleted'
     */
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

    /** check if there's a device connected on the ip given.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceIp your device IP
     * @param {number} devicePort your device Port
     * @return {Object} object containing the status and the time interval
     */
    checkDevice(token, deviceIp, devicePort){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'deviceIp', value: deviceIp, type: 'string', notEmpty: true },
            { name: 'devicePort', value: devicePort, type: 'number', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/devices/check/${deviceIp}/${devicePort}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            return response
        })()
    },

    /** Adds a new device into the users database.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device, must be unique in users database and not containing spaces
     * @param {string} deviceIp unique ip of the device
     * @param {number} devicePort port defined in to device
     */
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

    /** Deletes the selected device in the users database.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device, must be unique in users database and not containing spaces
     */
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

    /** retrieves the selected device of the users database.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device, must be unique in users database and not containing spaces
     */
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

    /** Activates the selected device in the users database.
     * 
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device
     * @param {number} timeInterval time interval you want the device sends you the inputs data.
     */
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

    /** changes de name of the selected device in the users database.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device
     * @param {string} deviceName new name of the device, must be unique in users database and not containing spaces
     */
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

    /** adds a new input to the selected device in the users database.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device
     * @param {string} type the type of the devvice input to add. should be 'analog' or 'digital
     * @param {number} direction pin of the input to add, see the documentation about pinNumbers in diferent device types
     */
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

    /** deletes a input on the selected device in the users database.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device
     * @param {string} type the type of the devvice input to add. should be 'analog' or 'digital
     * @param {number} direction pin of the input to delete, see the documentation about pinNumbers in diferent device types
     */
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

    /** adds a new output to the selected device in the users database.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device
     * @param {string} type the type of the devvice input to add. should be 'servo', 'motor' or 'digital
     * @param {number} direction pin of the output to add, see the documentation about pinNumbers in diferent device types
     */
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

    /** deletes a output on the selected device in the users database.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device
     * @param {string} type the type of the devvice input to add. should be 'servo', 'motor' or 'digital
     * @param {number} direction pin of the output to delete, see the documentation about pinNumbers in diferent device types
     */
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

    /** toggles the selected digital output to the selected device in the users database.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device
     * @param {number} pinNumber pin of the output to add, see the documentation about pinNumbers in diferent device types
     */
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

    /** selected servo output to the selected device in the users database.
     *
     * @param {string} id unique id of the user
     * @param {string} deviceName name of the device
     * @param {number} servoNumber pin of the output to add, see the documentation about pinNumbers in diferent device types
     * @param {number} angle the angle to set to the servo 5º-175º
     */
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

    /** toggles the selected motor output to the selected device in the users database.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device
     * @param {number} motorNumber pin of the output to add, see the documentation about pinNumbers in diferent device types
     * @param {number} speed percentage of speed to set to the motor 0-100%
     */
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

    /** retrieves the analog input values from the selected device in the users database.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device
     */
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

    /** retrieves the analog input values from the selected device in the users database.
     *
     * @param {string} token unique token of the user
     * @param {string} deviceName name of the device
     * @param {string} pinNumber pin of the desired input, must be 1 or 2
     */
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

// module.exports = restApi

export default restApi