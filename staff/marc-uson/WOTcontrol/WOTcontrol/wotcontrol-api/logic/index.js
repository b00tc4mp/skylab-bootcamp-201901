const validate = require('wotcontrol-validate')
const { LogicError } = require('wotcontrol-errors')
const { models } = require('wotcontrol-data')
const call = require('wotcontrol-call')
const bcrypt = require('bcrypt')

const { Users, Devices, Inputs, Outputs } = models

const logic = {

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

        const encryptedPass = bcrypt.hashSync(password, 10)

        return (async () => {
            const user = await Users.findOne({ email })

            if (user) throw new LogicError(`user with email "${email}" already exists`)

            try {
                await Users.create({ name, surname, email, password: encryptedPass, admin })
            } catch (error) {
                throw new Error(error)
            }


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
        let _email = email.toLowerCase()
        validate.email(_email)

        return (async () => {
            const user = await Users.findOne({email: _email})

            if (!user) throw new LogicError(`user with email "${email}" does not exist`)

            const pass = bcrypt.compareSync(password, user.password)

            if(!pass) throw new LogicError('wrong credentials')

            return user.id
        })()
    },

    /** retrieves the name, surname, email and list of devices of the user asociated with the passed id
     *
     * @param {string} id unique id of the user
     */
    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await Users.findById(id)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            const { name, surname, email, devices } = user

            return { name, surname, email, devices }
        })()
    },

    /** Updates the information of the current user with the information given in the data object. The data object must contain the keys named the same as the parameters of the registerUser function
     *
     * @param {string} id unique id of the user
     * @param {object} data contains the data to be updated. the data to be updated must have the key identical to the parameters of the registerUser function
     */
    updateUser(id, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object'}

        ])

        let _email

        return (async () => {

            if(data.email){
                _email = data.email.toLowerCase()
                const _user = await Users.findOne({_email})
                if (_user) throw new LogicError(`user with email "${_email}" already exists`)
            }

            const user = await Users.findById(id)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            const { admin, name, surname, email, password } = user

            await Users.findByIdAndUpdate(id,{
                admin: data.admin || admin,
                name: data.name || name,
                surname: data.surname || surname,
                email: _email || email,
                password: data.password ? bcrypt.hashSync(data.password, 10) : password
            })

            return `User succesfully updated`
        })()
    },

    /** deletes the user asociated to the id passed
     *
     * @param {string} id unique id of the user
     */
    deleteUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {

            const user = await Users.findById(id)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            await Users.findByIdAndDelete(id)

            return `User succesfully deleted`
        })()
    },

    /** 
     *
     * @param {string} id unique id of the user
     * @param {string} deviceIp your device IP
     * @param {number} devicePort your device Port
     */
    checkDevice(id, deviceIp, devicePort){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceIp', value: deviceIp, type: 'string', notEmpty: true },
            { name: 'devicePort', value: devicePort, type: 'number', notEmpty: true }
        ])

        return (async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                const url = `http://${deviceIp}:${devicePort}/info`
                debugger
                const response = await call(url)

                return response
            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },
 
    addDevice(id, deviceName, deviceIp, devicePort){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'deviceIp', value: deviceIp, type: 'string', notEmpty: true },
            { name: 'devicePort', value: devicePort, type: 'number', notEmpty: true }
        ])

        return(async () => {

            try {

                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let users = await Users.find({$and:[{_id: id},{'devices.name': deviceName}]})
                if (users.length > 0 ) throw new LogicError(`A device named ${deviceName} is already in your collection`)

                users = await Users.find({$and:[{_id: id},{'devices.ip': deviceIp}]})
                if (users.length > 0 ) throw new LogicError(`A device with ip ${deviceIp} is already in your collection`)

                user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                await Users.findByIdAndUpdate(id, user)

            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    deleteDevice(id, deviceName){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true }
        ])

        return(async () => {

            try {

                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)
                let users = await Users.find({'devices.name': deviceName})
                if (users.length == 0 ) throw new LogicError(`A device named ${deviceName} does not exist`)

                const devices = user.devices.filter(({ name }) => name != deviceName)
                user.devices = devices

                await Users.findByIdAndUpdate(id, user)

            } catch (error) {
                throw new LogicError(error.message)
            }

        })()
    },

    retrieveDevice(id, deviceName){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true }
        ])

        return(async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                if (users.length == 0) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                const device = users[0].devices.filter(({name}) => name == deviceName)

                return device[0]
            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    activateDevice(id, deviceName, timeInterval){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'timeInterval', value: timeInterval, type: 'number', notEmpty: true }
        ])

        if(timeInterval < 1000) throw new LogicError(`time interval ${timeInterval} is too low. must be at least 1000`)

        return(async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                if (users.length == 0) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                const device = users[0].devices.filter(({name}) => name == deviceName)

                const url = `http://${device[0].ip}:${device[0].port}/active?status=on&interval=${timeInterval}`

                const response = await call(url)

                return response
            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    changeDeviceId(id, deviceName, newDeviceName){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'newDeviceName', value: newDeviceName, type: 'string', notEmpty: true }
        ])

        return(async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                if (users.length == 0) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                const device = users[0].devices.filter(({name}) => name == deviceName)
                const url = `http://${device[0].ip}:${device[0].port}/new?deviceid=${newDeviceName}&userid=${id}`

                const response = await call(url)
                debugger
                if(response.status == 'OK'){
                    device[0].name = response.deviceid
                    const index = users[0].devices.findIndex(({name}) => name == deviceName)
                    users[0].devices[index] = device[0]
                    await Users.findByIdAndUpdate(id, users[0])
                }
                return response
            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    addInput(id, deviceName, type, direction){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'type', value: type, type: 'string', notEmpty: true },
            { name: 'direction', value: direction, type: 'number', notEmpty: true }
        ])

        if(type != 'digital' && type != 'analog') throw new LogicError(`${type} is not a valid input type`)
        if(type == 'digital' && (direction < 1 || direction > 2)) throw new LogicError(`${direction} is not a valid direction for a digital input`)
        if(type == 'analog' && (direction != 1)) throw new LogicError(`${direction} is not a valid direction for a analog input`)

        return(async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let _user = await Users.findOne({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                if (!_user) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                let deviceIndex = _user.devices.findIndex(device => device.name == deviceName)
                let inputs = _user.devices[deviceIndex].inputs
                filteredInputs = inputs.filter(element => element.type == type)

                if ((filteredInputs.length == 1 && type == 'analog') || (filteredInputs.length == 2 && type == 'digital')) {
                    throw new LogicError(`The device ${deviceName} could not have more ${type} inputs`)
                }

                user.devices[deviceIndex].inputs.push(new Inputs({ type, direction }))

                await Users.findByIdAndUpdate(id, user)


            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    deleteInput(id, deviceName, type, direction){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'type', value: type, type: 'string', notEmpty: true },
            { name: 'direction', value: direction, type: 'number', notEmpty: true }
        ])

        if(type != 'digital' && type != 'analog') throw new LogicError(`${type} is not a valid input type`)
        if(type == 'digital' && (direction < 1 || direction > 2)) throw new LogicError(`${direction} is not a valid direction for a digital input`)
        if(type == 'analog' && (direction != 1)) throw new LogicError(`${direction} is not a valid direction for a analog input`)

        return(async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let _user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})
                if (!_user) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                _user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}, {'devices.inputs.type': type}]})
                if (!_user) throw new LogicError(`The device ${deviceName} don't have any ${type} input`)

                _user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}, {'devices.inputs.type': type}, {'devices.inputs.direction': direction} ]})
                if (!_user) throw new LogicError(`The device ${deviceName} don't have any ${type} input asigned to ${direction} direction`)

                const device = user.devices.filter(({ name }) => name == deviceName)
                const inputs = device[0].inputs.filter(({ type: _type, direction: _direction }) => (_type != type)||((_type == type)&&(_direction != direction)) )
                const deviceIndex = user.devices.findIndex(({ name }) => name == deviceName)
                user.devices[deviceIndex].inputs = inputs
                await Users.findByIdAndUpdate(id, user)

            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    addOutput(id, deviceName, type, direction){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'type', value: type, type: 'string', notEmpty: true },
            { name: 'direction', value: direction, type: 'number', notEmpty: true }
        ])

        if(type != 'digital' && type != 'motor' && type != 'servo') throw new LogicError(`${type} is not a valid output type`)
        if(type == 'digital' && (direction < 1 || direction > 2)) throw new LogicError(`${direction} is not a valid direction for a digital output`)
        if(type == 'motor' && (direction < 1 || direction > 2)) throw new LogicError(`${direction} is not a valid direction for a motor output`)
        if(type == 'servo' && (direction < 1 || direction > 3)) throw new LogicError(`${direction} is not a valid direction for a servo output`)

        return(async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let _user = await Users.findOne({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                if (!user) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                let deviceIndex = _user.devices.findIndex(device => device.name == deviceName)
                let outputs = _user.devices[deviceIndex].outputs
                let filteredOutputs = outputs.filter(element => element.type == type)

                if ((filteredOutputs.length == 3 && type == 'servo') || (filteredOutputs.length == 2 && type == 'motor') || (filteredOutputs.length == 2 && type == 'digital'))
                    throw new LogicError(`The device ${deviceName} could not have more ${type} outputs`)

                user.devices[deviceIndex].outputs.push(new Outputs({ type, direction }))
                await Users.findByIdAndUpdate(id, user)

            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    deleteOutput(id, deviceName, type, direction){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'type', value: type, type: 'string', notEmpty: true },
            { name: 'direction', value: direction, type: 'number', notEmpty: true }
        ])

        if(type != 'digital' && type != 'motor' && type != 'servo') throw new LogicError(`${type} is not a valid output type`)
        if(type == 'digital' && (direction < 1 || direction > 2)) throw new LogicError(`${direction} is not a valid direction for a digital output`)
        if(type == 'motor' && (direction < 1 || direction > 2)) throw new LogicError(`${direction} is not a valid direction for a motor output`)
        if(type == 'servo' && (direction < 1 || direction > 3)) throw new LogicError(`${direction} is not a valid direction for a servo output`)

        return(async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let _user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})
                if (!_user) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                _user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}, {'devices.outputs.type': type}]})
                if (!_user) throw new LogicError(`The device ${deviceName} don't have any ${type} output`)

                _user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}, {'devices.outputs.type': type}, {'devices.outputs.direction': direction} ]})
                if (!_user) throw new LogicError(`The device ${deviceName} don't have any ${type} output asigned to ${direction} direction`)

                const device = user.devices.filter(({ name }) => name == deviceName)
                const outputs = device[0].outputs.filter(({ type: _type, direction: _direction }) => (_type != type)||((_type == type)&&(_direction != direction)) )
                const deviceIndex = user.devices.findIndex(({ name }) => name == deviceName)
                user.devices[deviceIndex].outputs = outputs
                await Users.findByIdAndUpdate(id, user)

            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    toggleDigitalOutput(id, deviceName, pinNumber){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'pinNumber', value: pinNumber, type: 'number', notEmpty: true }
        ])
        debugger
        let toggleOnOff='off'

        if((pinNumber > 2)||(pinNumber < 1)) throw new LogicError(`${pinNumber} is not a valid digital pinNumber`)

        return(async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                if (users.length == 0) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                const device = users[0].devices.filter(({ name }) => name == deviceName)

                const outputIndex = device[0].outputs.findIndex(({direction, type }) => (direction == pinNumber) && (type == 'digital'))

                if(outputIndex == -1) throw new LogicError(`no output declared with pin number ${pinNumber}`)

                if(device[0].outputs[outputIndex].value == 0) toggleOnOff = 'on'
                else toggleOnOff = 'off'

                const url = `http://${device[0].ip}:${device[0].port}/d${toggleOnOff}?pin=${pinNumber}`

                let response
                try {
                    response = await call(url)
                } catch (error) {
                    if(error.status == 404) throw new LogicError('Not Found', status=404)
                }

                const deviceIndex = user.devices.findIndex(({ name }) => name == deviceName)
                response.status == 'ON' ? user.devices[deviceIndex].outputs[outputIndex].value = 1 : user.devices[deviceIndex].outputs[outputIndex].value = 0

                await Users.findByIdAndUpdate(id, user)

                return response
            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    setServoPosition(id, deviceName, servoNumber, angle) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'servoNumber', value: servoNumber, type: 'number', notEmpty: true },
            { name: 'angle', value: angle, type: 'number', notEmpty: true }
        ])

        if ((servoNumber > 3) || (servoNumber < 1)) throw new LogicError(`${servoNumber} is not a valid servo direction`)

        if ((angle > 180) || (angle < 0)) throw new LogicError(`${angle} is not a valid angle`)

        return (async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                if (users.length == 0) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                const device = users[0].devices.filter(({ name }) => name == deviceName)

                const outputIndex = device[0].outputs.findIndex(({direction, type }) => (direction == servoNumber) && (type == 'servo'))

                if (outputIndex == -1) throw new LogicError(`no servo declared with direction ${servoNumber}`)

                const url = `http://${device[0].ip}:${device[0].port}/servo${servoNumber}?val=${angle}`

                let response
                try {
                    response = await call(url)
                } catch (error) {
                    if(error.status == 404) throw new LogicError('Not Found', status=404)
                }

                response.status = Number(response.status)
                const deviceIndex = user.devices.findIndex(({ name }) => name == deviceName)

                user.devices[deviceIndex].outputs[outputIndex].value = response.status

                await Users.findByIdAndUpdate(id, user)

                return response
            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    setMotorSpeed(id, deviceName, motorNumber, speed){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'motorNumber', value: motorNumber, type: 'number', notEmpty: true },
            { name: 'speed', value: speed, type: 'number', notEmpty: true }
        ])

        if ((motorNumber > 2) || (motorNumber < 1)) throw new LogicError(`${motorNumber} is not a valid motor direction`)

        if ((speed > 100) || (speed < 0)) throw new LogicError(`${speed} is not a valid speed`)

        return (async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                if (users.length == 0) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                const device = users[0].devices.filter(({ name }) => name == deviceName)

                const outputIndex = device[0].outputs.findIndex(({direction, type }) => (direction == motorNumber) && (type == 'motor'))

                if (outputIndex == -1) throw new LogicError(`no motor declared with direction ${motorNumber}`)

                const url = `http://${device[0].ip}:${device[0].port}/motor${motorNumber}?val=${speed}`

                let response
                try {
                    response = await call(url)
                } catch (error) {
                    if(error.status == 404) throw new LogicError('Not Found', status=404)
                }

                response.status = response.status/2.54

                const deviceIndex = user.devices.findIndex(({ name }) => name == deviceName)

                user.devices[deviceIndex].outputs[outputIndex].value = response.status

                await Users.findByIdAndUpdate(id, user)

                return response
            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    saveAnalogInput(id, deviceName, value){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'value', value: value, type: 'number', notEmpty: true }
        ])

        return (async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                if (users.length == 0) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                const device = user.devices.filter(({ name }) => name == deviceName)

                const inputIndex = device[0].inputs.findIndex(({ type }) => (type == 'analog'))

                if (inputIndex == -1) throw new LogicError(`no analog input declared in the WOTdevice ${deviceName}`)

                const deviceIndex = user.devices.findIndex(({ name }) => name == deviceName)

                let saveValue = (value/10.23).toFixed(2)

                if(user.devices[deviceIndex].inputs[inputIndex].values.length >= 10) user.devices[deviceIndex].inputs[inputIndex].values.shift()

                user.devices[deviceIndex].inputs[inputIndex].values.push({value: saveValue, date: Date.now()})

                await Users.findByIdAndUpdate(id, user)

            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    saveDigitalInput(id, deviceName, value, pinNumber){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'value', value: value, type: 'number', notEmpty: true },
            { name: 'pinNumber', value: pinNumber, type: 'number', notEmpty: true }
        ])

            if(pinNumber<1 || pinNumber>2) throw new LogicError(`${direction} is not a valid direction for a digital input`)
        return (async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                if (users.length == 0) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                const device = user.devices.filter(({ name }) => name == deviceName)

                const inputIndex = device[0].inputs.findIndex(({ type, direction }) => (type == 'digital') && (direction == pinNumber))

                if (inputIndex == -1) throw new LogicError(`no digital input declared in the WOTdevice ${deviceName}`)

                const deviceIndex = user.devices.findIndex(({ name }) => name == deviceName)

                if(user.devices[deviceIndex].inputs[inputIndex].values.length >= 10) user.devices[deviceIndex].inputs[inputIndex].values.shift()

                user.devices[deviceIndex].inputs[inputIndex].values.push({value, date: Date.now()})

                await Users.findByIdAndUpdate(id, user)

            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    retrieveAnalog(id, deviceName){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true }
        ])

        return (async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                if (users.length == 0) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                const device = user.devices.filter(({ name }) => name == deviceName)

                const inputIndex = device[0].inputs.findIndex(({ type }) => (type == 'analog'))

                if (inputIndex == -1) throw new LogicError(`no analog input declared in the WOTdevice ${deviceName}`)

                const deviceIndex = user.devices.findIndex(({ name }) => name == deviceName)

                return user.devices[deviceIndex].inputs[inputIndex].values
            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    },

    retrieveDigital(id, deviceName, pinNumber){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'deviceName', value: deviceName, type: 'string', notEmpty: true },
            { name: 'pinNumber', value: pinNumber, type: 'number', notEmpty: true }
        ])

        return (async () => {

            try {
                const user = await Users.findById(id)
                if (!user) throw new LogicError(`user with id: ${id} does not exist`)

                let users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                if (users.length == 0) throw new LogicError(`A device named ${deviceName} does not exist in your collection`)

                const device = users[0].devices.filter(({ name }) => name == deviceName)

                const inputIndex = device[0].inputs.findIndex(({ type, direction }) => (type == 'digital') && (direction == pinNumber))

                if (inputIndex == -1) throw new LogicError(`no digital input declared in the WOTdevice ${deviceName}`)

                const deviceIndex = user.devices.findIndex(({ name }) => name == deviceName)

                return user.devices[deviceIndex].inputs[inputIndex].values
            } catch (error) {
                throw new LogicError(error.message)
            }
        })()
    }

}

module.exports = logic