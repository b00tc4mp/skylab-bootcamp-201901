const {models, mongoose} = require('wotcontrol-data')
const { expect } =  require ('chai')
const bcrypt = require('bcrypt')
const {  ValueError, RequirementError, FormatError, Error, LogicError } = require('wotcontrol-errors')
const logic = require('.')
const restApi = require('../rest-api')
require('dotenv').config()

const { env: { MONGO_URL_API_TEST: url } } = process

const { Users, Devices } = models

const arduinoIp = `192.168.0.59`

describe('Logic', () => {

    before(async () => {
        await mongoose.connect(url, { useNewUrlParser: true })
    })

    const name = 'Marc'
    const surname = 'Uson'
    let email
    let password = '123'
    let isAdmin = true;
    let deviceName
    let deviceIp
    const devicePort = 80
    let timeInterval = 5000


    beforeEach(async () => {
        await Users.deleteMany()

        email = `marcusontest-${Math.random()}@gmail.com`
    })

    describe('users', () => {
        describe('register user', () => {
            it('should succeed on correct user data', async () => {

                const res = await logic.registerUser(name, surname, email, password)
                expect(res).to.not.exist

                const _user = await Users.find({ email })
                expect(_user).to.exist
                expect(_user).to.be.an.instanceOf(Array)
                expect(_user[0].name).to.equal(name)
                expect(_user[0].surname).to.equal(surname)
                expect(_user[0].email).to.equal(email)
                expect(_user[0].admin).to.be.false
            })

            it('should succeed on correct admin user data', async () => {

                const res = await logic.registerUser(name, surname, email, password, isAdmin)
                expect(res).to.not.exist

                const _user = await Users.find({ email })

                expect(_user).to.exist
                expect(_user).to.be.an.instanceOf(Array)
                expect(_user[0].admin).to.be.true
            })

            it('should succeed on registering email in lower case', async () => {

                const uperCaseEmail = email.toUpperCase()

                const res = await logic.registerUser(name, surname, uperCaseEmail, password)
                expect(res).to.not.exist

                const _user = await Users.find({ email })

                expect(_user).to.exist
                expect(_user).to.be.an.instanceOf(Array)
                expect(_user[0].admin).to.be.false
            })

            describe('on already existing user', () => {
                beforeEach(async () => {
                    await Users.create({ name, surname, email, password})
                })

                it('should fail on retrying to register', async () => {
                    try {
                        await logic.registerUser(name, surname, email, password)

                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(LogicError)
                        expect(error.message).to.equal(`user with email "${email}" already exists`)
                    }
                })
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password)).to.throw(FormatError, `${nonEmail} is not an e-mail`)
            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).to.throw(ValueError, 'password is empty')
            })

        })

        describe('login user', () => {

            beforeEach(async () => {
                _password = bcrypt.hashSync(password, 10)
                await Users.create({ name, surname, email, password: _password })
            })

            it('should succeed on correct user credential', async () => {

                await logic.loginUser(email, password)

                expect(logic.__userToken__).to.be.a('string')
                expect(logic.__userToken__.length).to.be.greaterThan(0)
            })

            it('should fail on wrong password', async () => {
                try {
                    await logic.loginUser(email, password='000')

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`wrong credentials`)
                }
            })

            it('should fail on non-existing user', async () => {
                try {
                    await logic.loginUser(email = 'unexisting-user@mail.com', password)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with email "${email}" does not exist`)
                }
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.loginUser( email, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.loginUser( email, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.loginUser( email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.loginUser( email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.loginUser( nonEmail, password)).to.throw(FormatError, `${nonEmail} is not an e-mail`)
            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => logic.loginUser( email, password)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => logic.loginUser( email, password)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.loginUser( email, password)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.loginUser( email, password)).to.throw(ValueError, 'password is empty')
            })
        })

        describe('retrieve user', () => {
            let _password

            beforeEach(async () => {
                _password = bcrypt.hashSync(password, 10)
                await Users.create({ name, surname, email, password: _password })

                const { token:_token } = await restApi.authenticateUser(email,password)
                logic.__userToken__ = _token
            })

            it('should succeed on correct user token from existing user', async () => {
                const user = await logic.retrieveUser()

                expect(user.token).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.not.exist
            })
        })

        describe('update user', () => {
            let _password

            beforeEach(async () => {
                _password = bcrypt.hashSync(password, 10)
                await Users.create({ name, surname, email, password: _password })

                const { token: _token } = await restApi.authenticateUser(email,password)
                logic.__userToken__ = _token
            })

            it('should succeed on updating user name', async () => {
                let newName = 'newName'
                const response = await logic.updateUser({ name: newName })

                expect(response).to.not.exist

                const user = await restApi.retrieveUser(logic.__userToken__)

                expect(user.token).to.not.exist
                expect(user.name).to.equal(newName)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.not.exist
            })

            it('should succeed on updating user surname', async () => {
                let newSurname = 'newSurname'
                const response = await logic.updateUser({ surname: newSurname })

                expect(response).to.not.exist

                const user = await restApi.retrieveUser(logic.__userToken__)

                expect(user.token).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(newSurname)
                expect(user.email).to.equal(email)
                expect(user.password).to.not.exist
            })

            it('should succeed on updating user email', async () => {
                let newEmail = 'newemail@mail.com'

                const response = await logic.updateUser({ email: newEmail })

                expect(response).to.not.exist

                const user = await restApi.retrieveUser(logic.__userToken__)

                expect(user.token).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(newEmail)
                expect(user.password).to.not.exist
            })

            it('should succeed on updating user password', async () => {
                let newPassword = 'newpassword'

                const response = await logic.updateUser({ password: newPassword })

                expect(response).to.not.exist

                const user = await restApi.retrieveUser(logic.__userToken__)

                expect(user.token).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.not.exist

                const {token: _token} = await restApi.authenticateUser(email, newPassword)

                expect(_token).to.be.a('string')
                expect(_token.length).to.be.greaterThan(0)
            })


            it('should fail on undefined data', () => {
                const data = undefined

                expect(() => logic.updateUser(data)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on null data', () => {
                const data = null

                expect(() => logic.updateUser(data)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on empty data', () => {
                const data = ''

                expect(() => logic.updateUser(data)).to.throw(TypeError, 'data  is not a object')
            })

            it('should fail on blank data', () => {
                const data = ' \t    \n'

                expect(() => logic.updateUser(data)).to.throw(TypeError, `data ${data} is not a object`)
            })
        })

        describe('delete user', () => {
            let _password

            beforeEach(async () => {

                _password = bcrypt.hashSync(password, 10)
                await Users.create({ name, surname, email, password: _password })

                const { token: _token } = await restApi.authenticateUser(email,password)
                logic.__userToken__ = _token
            })

            it('should succeed on deleting', async () => {
                const response = await logic.deleteUser()

                try {
                    await restApi.retrieveUser(logic.__userToken__)

                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                }
            })

        })
    })

    describe('devices', ()=> {
        let _password
        deviceName = 'newWOTDevice'
        deviceIp = arduinoIp

        beforeEach(async () => {
            _password = bcrypt.hashSync(password, 10)
            await Users.create({ name, surname, email, password: _password, admin: isAdmin })

            const { token: _token } = await restApi.authenticateUser(email, password)
            logic.__userToken__ = _token
        })

        describe('check if WOTdevice exists', () => {
            it('should succed on checking the selected WOTdevice', async () => {
                const response = await logic.checkDevice(deviceIp, devicePort)

                expect(response).to.exist
                expect(response).to.be.instanceof(Object)
                expect(response.HELLO).to.equal("WORLD!")
                expect(response.userid).to.exist
                expect(response.status).to.exist
            })

            it('should fail on checking a unexisting WOTdevice ip', async () => {
                const _deviceIp = '99.99.99.99'

                try {
                    await logic.checkDevice(_deviceIp, devicePort)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`Can't find any device with ip: ${_deviceIp} and port: ${devicePort}`)
                }
            })

            it('should fail on checking a wrong WOTdevice port', async () => {
                let _devicePort = 90

                try {
                    await logic.checkDevice(deviceIp, _devicePort)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`Can't find any device with ip: ${deviceIp} and port: ${_devicePort}`)
                }
            })

            it('should fail on undefined deviceIp', () => {
                const deviceIp = undefined

                expect(() => logic.checkDevice(deviceIp, devicePort).to.throw(RequirementError, `deviceIp is not optional`))
            })

            it('should fail on null deviceIp', () => {
                const deviceIp = null

                expect(() => logic.checkDevice(deviceIp, devicePort).to.throw(RequirementError, `deviceIp is not optional`))
            })

            it('should fail on empty deviceIp', () => {
                const deviceIp = ''

                expect(() => logic.checkDevice(deviceIp, devicePort).to.throw(ValueError, 'deviceIp is empty'))
            })

            it('should fail on blank deviceIp', () => {
                const deviceIp = ' \t    \n'
                expect(() => logic.checkDevice(deviceIp, devicePort).to.throw(ValueError, 'deviceIp is empty'))
            })

            it('should fail on undefined devicePort', () => {
                const devicePort = undefined

                expect(() => logic.checkDevice(deviceIp, devicePort).to.throw(RequirementError, `devicePort is not optional`))
            })

            it('should fail on null devicePort', () => {
                const devicePort = null

                expect(() => logic.checkDevice(deviceIp, devicePort).to.throw(RequirementError, `devicePort is not optional`))
            })

            it('should fail on empty devicePort', () => {
                const devicePort = ''

                expect(() => logic.checkDevice(deviceIp, devicePort).to.throw(ValueError, `devicePort is empty`))
            })

            it('should fail on blank devicePort', () => {
                const devicePort = ' \t    \n'
                expect(() => logic.checkDevice(deviceIp, devicePort).to.throw(ValueError, `devicePort is empty`))
            })
        })

        describe('add device', () => {
            it('should succed on adding a device to user devices', async () => {
                const response = await logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)

                expect(response).to.exist
                expect(response).to.equal('Device created')
                const user = await Users.findOne({email})
                expect(user).to.exist
                expect(user.devices).to.exist
                expect(user.devices).to.have.lengthOf(1)
                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].ip).to.equal(deviceIp)
                expect(user.devices[0].port).to.equal(devicePort)
                expect(user.devices[0].inputs).to.have.lengthOf(3)
                expect(user.devices[0].inputs[0].type).to.equal('digital')
                expect(user.devices[0].inputs[0].direction).to.equal(1)
                expect(user.devices[0].inputs[1].type).to.equal('digital')
                expect(user.devices[0].inputs[1].direction).to.equal(2)
                expect(user.devices[0].inputs[2].type).to.equal('analog')
                expect(user.devices[0].inputs[2].direction).to.equal(1)
                expect(user.devices[0].outputs).to.have.lengthOf(7)
                expect(user.devices[0].outputs[0].type).to.equal('digital')
                expect(user.devices[0].outputs[0].direction).to.equal(1)
                expect(user.devices[0].outputs[1].type).to.equal('digital')
                expect(user.devices[0].outputs[1].direction).to.equal(2)
                expect(user.devices[0].outputs[2].type).to.equal('servo')
                expect(user.devices[0].outputs[2].direction).to.equal(1)
                expect(user.devices[0].outputs[3].type).to.equal('servo')
                expect(user.devices[0].outputs[3].direction).to.equal(2)
                expect(user.devices[0].outputs[4].type).to.equal('servo')
                expect(user.devices[0].outputs[4].direction).to.equal(3)
                expect(user.devices[0].outputs[5].type).to.equal('motor')
                expect(user.devices[0].outputs[5].direction).to.equal(1)
                expect(user.devices[0].outputs[6].type).to.equal('motor')
                expect(user.devices[0].outputs[6].direction).to.equal(2)
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on undefined deviceIp', () => {
                const deviceIp = undefined

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(RequirementError, `deviceIp is not optional`)
            })

            it('should fail on null deviceIp', () => {
                const deviceIp = null

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(RequirementError, `deviceIp is not optional`)
            })

            it('should fail on empty deviceIp', () => {
                const deviceIp = ''

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(ValueError, 'deviceIp is empty')
            })

            it('should fail on blank deviceIp', () => {
                const deviceIp = ' \t    \n'

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(ValueError, 'deviceIp is empty')
            })
            it('should fail on undefined devicePort', () => {
                const devicePort = undefined

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(RequirementError, `devicePort is not optional`)
            })

            it('should fail on null devicePort', () => {
                const devicePort = null

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(RequirementError, `devicePort is not optional`)
            })

            it('should fail on empty devicePort', () => {
                const devicePort = ''

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(TypeError, `devicePort ${devicePort} is not a number`)
            })

            it('should fail on blank devicePort', () => {
                const devicePort = ' \t    \n'

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(TypeError, `devicePort ${devicePort} is not a number`)
            })

            it('should fail on undefined timeInterval', () => {
                const timeInterval = undefined

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(RequirementError, `timeInterval is not optional`)
            })

            it('should fail on null timeInterval', () => {
                const timeInterval = null

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(RequirementError, `timeInterval is not optional`)
            })

            it('should fail on empty timeInterval', () => {
                const timeInterval = ''

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(TypeError, `timeInterval ${timeInterval} is not a number`)
            })

            it('should fail on blank timeInterval', () => {
                const timeInterval = ' \t    \n'

                expect(() => logic.addDevice(deviceName, deviceIp, devicePort, timeInterval)).to.throw(TypeError, `timeInterval ${timeInterval} is not a number`)
            })
        })

        describe('delete device', () => {
            it('should succed on deleting a device', async () => {
                await restApi.addDevice(logic.__userToken__, deviceName, deviceIp, devicePort)
                const response = await logic.deleteDevice(deviceName)

                expect(response).to.exist
                expect(response).to.equal('Device deleted')
                const user = await Users.findOne({email})
                expect(user).to.exist
                expect(user.devices).to.exist
                expect(user.devices).to.have.lengthOf(0)
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.deleteDevice(deviceName)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.deleteDevice(deviceName)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.deleteDevice(deviceName)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() => logic.deleteDevice(deviceName)).to.throw(ValueError, 'deviceName is empty')
            })
        })

        describe('retrieve device', () => {
            it('should succed on retrieving a device', async () => {
                await restApi.addDevice(logic.__userToken__, deviceName, deviceIp, devicePort)
                const device = await logic.retrieveDevice(deviceName)

                expect(device).to.exist

                const user = await Users.findOne({email})
                expect(user).to.exist
                expect(user.devices).to.exist
                expect(user.devices).to.have.lengthOf(1)
                expect(user.devices[0].ip).to.equal(device.ip)
                expect(user.devices[0].name).to.equal(device.name)
                expect(user.devices[0].port).to.equal(device.port)
                expect(user.devices[0].inputs).to.exist
                expect(user.devices[0].outputs).to.exist
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.retrieveDevice(deviceName)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.retrieveDevice(deviceName)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.retrieveDevice(deviceName)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() => logic.retrieveDevice(deviceName)).to.throw(ValueError, 'deviceName is empty')
            })
        })

        describe('rename device', () => {
            let newDeviceName = 'newDeviceName'

            it('should succed on renaming a device', async () => {
                await restApi.addDevice(logic.__userToken__, deviceName, deviceIp, devicePort)
                const device = await logic.renameDevice(deviceName, newDeviceName)

                expect(device).to.exist

                const user = await Users.findOne({email})
                expect(user).to.exist
                expect(user.devices).to.exist
                expect(user.devices).to.have.lengthOf(1)
                expect(user.devices[0].name).to.equal(newDeviceName)
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.renameDevice(deviceName, newDeviceName)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.renameDevice(deviceName, newDeviceName)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.renameDevice(deviceName, newDeviceName)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() => logic.renameDevice(deviceName, newDeviceName)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on undefined newDeviceName', () => {
                const newDeviceName = undefined

                expect(() => logic.renameDevice(deviceName, newDeviceName)).to.throw(RequirementError, `newDeviceName is not optional`)
            })

            it('should fail on null newDeviceName', () => {
                const newDeviceName = null

                expect(() => logic.renameDevice(deviceName, newDeviceName)).to.throw(RequirementError, `newDeviceName is not optional`)
            })

            it('should fail on empty newDeviceName', () => {
                const newDeviceName = ''

                expect(() => logic.renameDevice(deviceName, newDeviceName)).to.throw(ValueError, 'newDeviceName is empty')
            })

            it('should fail on blank newDeviceName', () => {
                const newDeviceName = ' \t    \n'

                expect(() => logic.renameDevice(deviceName, newDeviceName)).to.throw(ValueError, 'newDeviceName is empty')
            })
        })

        describe('change device time', () => {
            let timeInterval = 10000

            it('should succed on changing device time interval', async () => {
                await restApi.addDevice(logic.__userToken__, deviceName, deviceIp, devicePort)
                const response = await logic.changeDeviceTime(deviceName, timeInterval)

                expect(response).to.exist
                expect(response).to.equal('Device refresh time updated')

            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.changeDeviceTime(deviceName, timeInterval)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.changeDeviceTime(deviceName, timeInterval)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.changeDeviceTime(deviceName, timeInterval)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() => logic.changeDeviceTime(deviceName, timeInterval)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on undefined timeInterval', () => {
                const timeInterval = undefined

                expect(() => logic.changeDeviceTime(deviceName, timeInterval)).to.throw(RequirementError, `timeInterval is not optional`)
            })

            it('should fail on null timeInterval', () => {
                const timeInterval = null

                expect(() => logic.changeDeviceTime(deviceName, timeInterval)).to.throw(RequirementError, `timeInterval is not optional`)
            })

            it('should fail on empty timeInterval', () => {
                const timeInterval = ''

                expect(() => logic.changeDeviceTime(deviceName, timeInterval)).to.throw(TypeError, `timeInterval ${timeInterval} is not a number`)
            })

            it('should fail on blank timeInterval', () => {
                const timeInterval = ' \t    \n'

                expect(() => logic.changeDeviceTime(deviceName, timeInterval)).to.throw(TypeError, `timeInterval ${timeInterval} is not a number`)
            })
        })

        describe('toggle device digital output', () => {
            let pinNumber= 1
            it('should succed on toggling a device digital output', async () => {
                await restApi.addDevice(logic.__userToken__, deviceName, deviceIp, devicePort)
                await restApi.changeDeviceId(logic.__userToken__, deviceName, deviceName)
                await restApi.addOutput(logic.__userToken__, deviceName, 'digital', pinNumber)
                const response = await logic.toggleDigitalOutput(deviceName, pinNumber)

                expect(response).to.exist
                expect(response).to.equal('ON')

                const _response = await logic.toggleDigitalOutput(deviceName, pinNumber)

                expect(_response).to.exist
                expect(_response).to.equal('OFF')
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.toggleDigitalOutput(deviceName, pinNumber)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.toggleDigitalOutput(deviceName, pinNumber)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.toggleDigitalOutput(deviceName, pinNumber)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() => logic.toggleDigitalOutput(deviceName, pinNumber)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on undefined pinNumber', () => {
                const pinNumber = undefined

                expect(() => logic.toggleDigitalOutput(deviceName, pinNumber)).to.throw(RequirementError, `pinNumber is not optional`)
            })

            it('should fail on null pinNumber', () => {
                const pinNumber = null

                expect(() => logic.toggleDigitalOutput(deviceName, pinNumber)).to.throw(RequirementError, `pinNumber is not optional`)
            })

            it('should fail on empty pinNumber', () => {
                const pinNumber = ''

                expect(() => logic.toggleDigitalOutput(deviceName, pinNumber)).to.throw(TypeError, `pinNumber ${pinNumber} is not a number`)
            })

            it('should fail on blank pinNumber', () => {
                const pinNumber = ' \t    \n'

                expect(() => logic.toggleDigitalOutput(deviceName, pinNumber)).to.throw(TypeError, `pinNumber ${pinNumber} is not a number`)
            })
        })

        describe('set device servo output', () => {
            let pinNumber= 1
            let angle = 90
            it('should succed seting a device servo output', async () => {
                await restApi.addDevice(logic.__userToken__, deviceName, deviceIp, devicePort)
                await restApi.changeDeviceId(logic.__userToken__, deviceName, deviceName)
                await restApi.addOutput(logic.__userToken__, deviceName, 'servo', pinNumber)
                const response = await logic.setServo(deviceName, pinNumber, angle)

                expect(response).to.exist
                expect(response).to.equal(90)
                angle = 15
                const _response = await logic.setServo(deviceName, pinNumber, angle)

                expect(_response).to.exist
                expect(_response).to.equal(15)
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.setServo(deviceName, pinNumber, angle)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.setServo(deviceName, pinNumber, angle)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.setServo(deviceName, pinNumber, angle)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() => logic.setServo(deviceName, pinNumber, angle)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on undefined pinNumber', () => {
                const pinNumber = undefined

                expect(() => logic.setServo(deviceName, pinNumber, angle)).to.throw(RequirementError, `pinNumber is not optional`)
            })

            it('should fail on null pinNumber', () => {
                const pinNumber = null

                expect(() => logic.setServo(deviceName, pinNumber, angle)).to.throw(RequirementError, `pinNumber is not optional`)
            })

            it('should fail on empty pinNumber', () => {
                const pinNumber = ''

                expect(() => logic.setServo(deviceName, pinNumber, angle)).to.throw(TypeError, `pinNumber ${pinNumber} is not a number`)
            })

            it('should fail on blank pinNumber', () => {
                const pinNumber = ' \t    \n'

                expect(() => logic.setServo(deviceName, pinNumber, angle)).to.throw(TypeError, `pinNumber ${pinNumber} is not a number`)
            })

            it('should fail on undefined angle', () => {
                const angle = undefined

                expect(() => logic.setServo(deviceName, pinNumber, angle)).to.throw(RequirementError, `angle is not optional`)
            })

            it('should fail on null angle', () => {
                const angle = null

                expect(() => logic.setServo(deviceName, pinNumber, angle)).to.throw(RequirementError, `angle is not optional`)
            })

            it('should fail on empty angle', () => {
                const angle = ''

                expect(() => logic.setServo(deviceName, pinNumber, angle)).to.throw(TypeError, `angle ${angle} is not a number`)
            })

            it('should fail on blank angle', () => {
                const angle = ' \t    \n'

                expect(() => logic.setServo(deviceName, pinNumber, angle)).to.throw(TypeError, `angle ${angle} is not a number`)
            })
        })

        describe('set device motor output', () => {
            let pinNumber= 1
            let speed = 90
            it('should succed seting a device motor output', async () => {
                await restApi.addDevice(logic.__userToken__, deviceName, deviceIp, devicePort)
                await restApi.changeDeviceId(logic.__userToken__, deviceName, deviceName)
                await restApi.addOutput(logic.__userToken__, deviceName, 'motor', pinNumber)
                const response = await logic.setMotor(deviceName, pinNumber, speed)

                expect(response).to.exist
                expect(response).to.equal(90)
                speed = 15
                const _response = await logic.setMotor(deviceName, pinNumber, speed)

                expect(_response).to.exist
                expect(_response).to.equal(15)
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.setMotor(deviceName, pinNumber, speed)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.setMotor(deviceName, pinNumber, speed)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.setMotor(deviceName, pinNumber, speed)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() => logic.setMotor(deviceName, pinNumber, speed)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on undefined pinNumber', () => {
                const pinNumber = undefined

                expect(() => logic.setMotor(deviceName, pinNumber, speed)).to.throw(RequirementError, `pinNumber is not optional`)
            })

            it('should fail on null pinNumber', () => {
                const pinNumber = null

                expect(() => logic.setMotor(deviceName, pinNumber, speed)).to.throw(RequirementError, `pinNumber is not optional`)
            })

            it('should fail on empty pinNumber', () => {
                const pinNumber = ''

                expect(() => logic.setMotor(deviceName, pinNumber, speed)).to.throw(TypeError, `pinNumber ${pinNumber} is not a number`)
            })

            it('should fail on blank pinNumber', () => {
                const pinNumber = ' \t    \n'

                expect(() => logic.setMotor(deviceName, pinNumber, speed)).to.throw(TypeError, `pinNumber ${pinNumber} is not a number`)
            })

            it('should fail on undefined speed', () => {
                const speed = undefined

                expect(() => logic.setMotor(deviceName, pinNumber, speed)).to.throw(RequirementError, `speed is not optional`)
            })

            it('should fail on null speed', () => {
                const speed = null

                expect(() => logic.setMotor(deviceName, pinNumber, speed)).to.throw(RequirementError, `speed is not optional`)
            })

            it('should fail on empty speed', () => {
                const speed = ''

                expect(() => logic.setMotor(deviceName, pinNumber, speed)).to.throw(TypeError, `speed ${speed} is not a number`)
            })

            it('should fail on blank speed', () => {
                const speed = ' \t    \n'

                expect(() => logic.setMotor(deviceName, pinNumber, speed)).to.throw(TypeError, `speed ${speed} is not a number`)
            })
        })

        describe('set device analog input', () => {
            let pinNumber= 1
            let value = 0
            it('should succed retrieving a analog input', async () => {
                await restApi.addDevice(logic.__userToken__, deviceName, deviceIp, devicePort)
                await restApi.changeDeviceId(logic.__userToken__, deviceName, deviceName)
                await restApi.addInput(logic.__userToken__, deviceName, 'analog', pinNumber)
                user = await Users.findOne({ email })
                user.devices[0].inputs[0].values.push({ value, date: Date.now() })
                value = Math.floor(Math.random() * 100)
                user.devices[0].inputs[0].values.push({ value, date: Date.now() })
                value = Math.floor(Math.random() * 100)
                user.devices[0].inputs[0].values.push({ value, date: Date.now() })
                await user.save()
                const response = await logic.retrieveAnalog(deviceName)

                expect(response).to.exist
                expect(response).to.have.lengthOf(3)
                expect(response[0].value).to.exist
                expect(response[0].date).to.exist
                expect(response[0]._id).to.not.exist
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() =>logic.retrieveAnalog(deviceName)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() =>logic.retrieveAnalog(deviceName)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() =>logic.retrieveAnalog(deviceName)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() =>logic.retrieveAnalog(deviceName)).to.throw(ValueError, 'deviceName is empty')
            })
        })

        describe('set device digital input', () => {
            let pinNumber= 1
            let value = 0
            it('should succed retrieving a digital input', async () => {
                await restApi.addDevice(logic.__userToken__, deviceName, deviceIp, devicePort)
                await restApi.changeDeviceId(logic.__userToken__, deviceName, deviceName)
                await restApi.addInput(logic.__userToken__, deviceName, 'digital', pinNumber)
                user = await Users.findOne({ email })
                user.devices[0].inputs[0].values.push({ value, date: Date.now() })
                value = Math.floor(Math.random() * 2)
                user.devices[0].inputs[0].values.push({ value, date: Date.now() })
                value = Math.floor(Math.random() * 2)
                user.devices[0].inputs[0].values.push({ value, date: Date.now() })
                await user.save()
                const response = await logic.retrieveDigital(deviceName, pinNumber)

                expect(response).to.exist
                expect(response).to.have.lengthOf(3)
                expect(response[0].value).to.exist
                expect(response[0].date).to.exist
                expect(response[0]._id).to.not.exist
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() =>logic.retrieveDigital(deviceName, pinNumber)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() =>logic.retrieveDigital(deviceName, pinNumber)).to.throw(RequirementError, `deviceName is not optional`)
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() =>logic.retrieveDigital(deviceName, pinNumber)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() =>logic.retrieveDigital(deviceName, pinNumber)).to.throw(ValueError, 'deviceName is empty')
            })

            it('should fail on undefined pinNumber', () => {
                const pinNumber = undefined

                expect(() => logic.retrieveDigital(deviceName, pinNumber)).to.throw(RequirementError, `pinNumber is not optional`)
            })

            it('should fail on null pinNumber', () => {
                const pinNumber = null

                expect(() => logic.retrieveDigital(deviceName, pinNumber)).to.throw(RequirementError, `pinNumber is not optional`)
            })

            it('should fail on empty pinNumber', () => {
                const pinNumber = ''

                expect(() => logic.retrieveDigital(deviceName, pinNumber)).to.throw(TypeError, `pinNumber ${pinNumber} is not a number`)
            })

            it('should fail on blank pinNumber', () => {
                const pinNumber = ' \t    \n'

                expect(() => logic.retrieveDigital(deviceName, pinNumber)).to.throw(TypeError, `pinNumber ${pinNumber} is not a number`)
            })
        })

    })
    after(async () => {
        mongoose.disconnect()
    })
})