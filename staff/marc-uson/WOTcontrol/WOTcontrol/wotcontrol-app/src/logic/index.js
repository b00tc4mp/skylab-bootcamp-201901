const validate = require ('wotcontrol-validate')
const restApi = require ('../rest-api')
const { LogicError } = require('wotcontrol-errors')

const logic = {

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return sessionStorage.userToken
    },

    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    registerUser(name, surname, email, password, admin = false) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'admin', value: admin, type: 'boolean', optional: true }
        ])
        email = email.toLowerCase()
        validate.email(email)

        return (async () => {
            try {
                await restApi.registerUser(name, surname, email, password, admin)
            } catch (error) {
                throw new LogicError(error)
            }

        })()
    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])
        let _email = email.toLowerCase()
        validate.email(_email)

        return (async () => {
            try {
                const { token } = await restApi.authenticateUser(email, password)
                this.__userToken__ = token
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    logoutUser(){
        sessionStorage.clear()
    },

    retrieveUser() {

        return (async () => {
            try {
                const {name, surname, email, devices} = await restApi.retrieveUser(this.__userToken__)
                return {name, surname, email, devices}
            } catch (error) {
                throw new LogicError(error)
            }

        })()
    },

    updateUser(data) {
        validate.arguments([
            { name: 'data', value: data, type: 'object'}
        ])

        return (async () => {
            try {
                await restApi.updateUser(this.__userToken__, data)
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    deleteUser() {

        return (async () => {
            try {
                await restApi.deleteUser(this.__userToken__)
                sessionStorage.clear()
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    checkDevice(deviceIp, devicePort){
        validate.arguments([
            { name: 'deviceIp', value: deviceIp, type: 'string', notEmpty: true },
            { name: 'devicePort', value: devicePort, type: 'number', notEmpty: true }
        ])

        return (async () => {
            try {
                const response = await restApi.checkDevice(this.__userToken__, deviceIp, devicePort)
                return response
            } catch (error) {
                if ((error == 'Connection refused') || (error.message == 'Connection timed out')||(error.includes('ENOTFOUND')))
                throw new LogicError(`Can't find any device with ip: ${deviceIp} and port: ${devicePort}`)
                else {console.log(error)
                throw new LogicError(error)}
            }
        })()
    },

    addDevice(deviceName, deviceIp, devicePort, timeInterval){
        validate.arguments([
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'deviceIp', value: deviceIp, type: 'string', notEmpty: true },
            { name: 'devicePort', value: devicePort, type: 'number', notEmpty: true },
            { name: 'timeInterval', value: timeInterval, type: 'number', notEmpty: true }
        ])

        if(deviceName.includes(' ')) throw new LogicError('The device name can not include spaces')

        return (async () => {
            try {
                const response = await restApi.addDevice(this.__userToken__, deviceName, deviceIp, devicePort)
                if (response.error) throw Error('NOT FOUND')

                for (let i = 1; i < 3; i++) {
                    await restApi.addOutput(this.__userToken__, deviceName, 'digital', i)
                }
                for (let i = 1; i < 4; i++) {
                    await restApi.addOutput(this.__userToken__, deviceName, 'servo', i)
                }
                for (let i = 1; i < 3; i++) {
                    await restApi.addOutput(this.__userToken__, deviceName, 'motor', i)
                }
                for (let i = 1; i < 3; i++) {
                    await restApi.addInput(this.__userToken__, deviceName, 'digital', i)
                }
                await restApi.addInput(this.__userToken__, deviceName, 'analog', 1)
                await restApi.changeDeviceId(this.__userToken__, deviceName, deviceName)
                await restApi.activateDevice(this.__userToken__, deviceName, timeInterval)
                return 'Device created'
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    deleteDevice(deviceName){
        validate.arguments([
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
        ])

        return (async () => {
            try {
                await restApi.deleteDevice(this.__userToken__, deviceName)
                return 'Device deleted'
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    retrieveDevice(deviceName){
        validate.arguments([
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
        ])

        return (async () => {
            try {
                const device = await restApi.retrieveDevice(this.__userToken__, deviceName)
                return device
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    renameDevice(deviceName, newDeviceName){
        validate.arguments([
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'newDeviceName', value: newDeviceName, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {
                await restApi.changeDeviceId(this.__userToken__, deviceName, newDeviceName)
                return 'Device name changed'
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    changeDeviceTime(deviceName, timeInterval){
        validate.arguments([
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'timeInterval', value: timeInterval, type: 'number', notEmpty: true }
        ])

        return (async () => {
            try {
                await restApi.activateDevice(this.__userToken__, deviceName, timeInterval)
                return 'Device refresh time updated'
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    toggleDigitalOutput(deviceName, pinNumber){
        validate.arguments([
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'pinNumber', value: pinNumber, type: 'number', notEmpty: true },
        ])

        return (async () => {
            try {
                const response = await restApi.toggleDigitalOutput(this.__userToken__,deviceName, pinNumber)
                if(response.status) return response.status
                else return 'no response'
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    setServo(deviceName, pinNumber, angle){
        validate.arguments([
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'pinNumber', value: pinNumber, type: 'number', notEmpty: true },
            { name: 'angle', value: angle, type: 'number', notEmpty: true }
        ])
        return (async () => {
            try {
                const response = await restApi.setServoPosition(this.__userToken__,deviceName, pinNumber,angle)
                return response.status
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    setMotor(deviceName, pinNumber, speed){
        validate.arguments([
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'pinNumber', value: pinNumber, type: 'number', notEmpty: true },
            { name: 'speed', value: speed, type: 'number', notEmpty: true }
        ])
        return (async () => {
            try {
                const response = await restApi.setMotorSpeed(this.__userToken__,deviceName, pinNumber,speed)
                return Math.round(response.status)
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    retrieveAnalog(deviceName){
        validate.arguments([
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true }
        ])
        let resultsArr = []

        return (async () => {
            try {
                const response = await restApi.retrieveAnalog(this.__userToken__,deviceName)
                response.map(element => {
                    const { value, date } = element
                    resultsArr.push({
                        value,
                        date
                    })
                })
                return resultsArr
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    retrieveDigital(deviceName, pinNumber){
        validate.arguments([
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'pinNumber', value: pinNumber, type: 'number', notEmpty: true }
        ])
        let resultsArr = []

        return (async () => {
            try {
                const response = await restApi.retrieveDigital(this.__userToken__,deviceName, pinNumber)
                response.map(element => {
                    const { value, date } = element
                    resultsArr.push({
                        value,
                        date
                    })
                })
                return resultsArr
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },
}

//TESTING
// module.exports = logic

//REACT
 export default logic