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

    /** Autenticates the user to the application
     * 
     * @param {string} email email defined by the user in registration process
     * @param {string} password password defined from the user in registration process
     */
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

    /** retrieves the name, surname, email and list of devices of the user asociated with the passed id
     *
     */
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

    /** Updates the information of the current user with the information given in the data object. The data object must contain the keys named the same as the parameters of the registerUser function
     *
     * @param {object} data contains the data to be updated. the data to be updated must have the key identical to the parameters of the registerUser function
     * @return {string} 'User succesfully updated'
     */
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

    /** deletes the user asociated to the token passed
     *
     * @return {string} 'User succesfully deleted'
     */
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

    /** check if there's a device connected on the ip given.
     *
     * @param {string} deviceIp your device IP
     * @param {number} devicePort your device Port
     * @return {Object} object containing the status and the time interval
     */
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
                if ((error === 'Connection refused') || (error.message === 'Connection timed out')||(error.includes('ENOTFOUND')))
                throw new LogicError(`Can't find any device with ip: ${deviceIp} and port: ${devicePort}`)
                else throw new LogicError(error)
            }
        })()
    },

    /** Adds a new device into the users database, and creates all his inputs and outputs
     *
     * @param {string} deviceName name of the device, must be unique in users database and not containing spaces
     * @param {string} deviceIp unique ip of the device
     * @param {number} devicePort port defined in to device
     * @param {number} timeInterval desired time interval in miliseconds
     */
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

    /** Deletes the selected device in the users database.
     *
     * @param {string} deviceName name of the device, must be unique in users database and not containing spaces
     */
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

     /** retrieves the selected device of the users database.
     *
     * @param {string} deviceName name of the device, must be unique in users database and not containing spaces
     */
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

    /** changes de name of the selected device in the users database.
     *
     * @param {string} deviceName name of the device
     * @param {string} deviceName new name of the device, must be unique in users database and not containing spaces
     */
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

    /** changes the time interval of the selected device in the users database.
     *
     * @param {string} deviceName name of the device
     * @param {number} timeInterval desired time interval in miliseconds
     */
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

    /** toggles the selected digital output to the selected device in the users database.
     *
     * @param {string} deviceName name of the device
     * @param {number} pinNumber pin of the output to add, see the documentation about pinNumbers in diferent device types
     */
    toggleDigitalOutput(deviceName, pinNumber){
        validate.arguments([
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'pinNumber', value: pinNumber, type: 'number', notEmpty: true },
        ])

        return (async () => {
            try {
                const response = await restApi.toggleDigitalOutput(this.__userToken__,deviceName, pinNumber)
                if(response.status) return response.status
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    /** selected servo output to the selected device in the users database.
     *
     * @param {string} deviceName name of the device
     * @param {number} servoNumber pin of the output to add, see the documentation about pinNumbers in diferent device types
     * @param {number} angle the angle to set to the servo 5º-175º
     */
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

    /** toggles the selected motor output to the selected device in the users database.
     *
     * @param {string} deviceName name of the device
     * @param {number} motorNumber pin of the output to add, see the documentation about pinNumbers in diferent device types
     * @param {number} speed percentage of speed to set to the motor 0-100%
     */
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

    /** retrieves the analog input values from the selected device in the users database.
     *
     * @param {string} deviceName name of the device
     */
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

    /** retrieves the analog input values from the selected device in the users database.
     *
     * @param {string} deviceName name of the device
     * @param {string} pinNumber pin of the desired input, must be 1 or 2
     */
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