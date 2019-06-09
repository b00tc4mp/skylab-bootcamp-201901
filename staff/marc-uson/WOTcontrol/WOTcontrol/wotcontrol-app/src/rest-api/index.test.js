const {models, mongoose} = require('wotcontrol-data')
const { expect } =  require ('chai')
const bcrypt = require('bcrypt')
const {  ValueError, RequirementError, FormatError, Error } = require('wotcontrol-errors')
const restApi = require('.')
require('dotenv').config()

const { env: { MONGO_URL_API_TEST: url } } = process

const { Users, Devices } = models

const arduinoIp = `192.168.0.59`

describe('restApi', () => {

    before(async () => {
        await mongoose.connect(url, { useNewUrlParser: true })
    })

    const name = 'Marc'
    const surname = 'Uson'
    let email
    let password = '123'
    let isAdmin = true;
    let token
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

                const res = await restApi.registerUser(name, surname, email, password)

                expect(res).to.exist
                expect(res.message).to.equal('Ok, user registered.')

                const _user = await Users.find({ email })
                expect(_user).to.exist
                expect(_user).to.be.an.instanceOf(Array)
                expect(_user[0].name).to.equal(name)
                expect(_user[0].surname).to.equal(surname)
                expect(_user[0].email).to.equal(email)
                expect(_user[0].admin).to.be.false
            })

            it('should succeed on correct admin user data', async () => {

                const res = await restApi.registerUser(name, surname, email, password, isAdmin)

                expect(res).to.exist
                expect(res.message).to.equal('Ok, user registered.')

                const _user = await Users.find({ email })

                expect(_user).to.exist
                expect(_user).to.be.an.instanceOf(Array)
                expect(_user[0].admin).to.be.true
            })

            it('should succeed on registering email in lower case', async () => {

                const uperCaseEmail = email.toUpperCase()

                const res = await restApi.registerUser(name, surname, uperCaseEmail, password)

                expect(res).to.exist
                expect(res.message).to.equal('Ok, user registered.')

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
                        await restApi.registerUser(name, surname, email, password)

                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.equal(`user with email "${email}" already exists`)
                    }
                })
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => restApi.registerUser(name, surname, nonEmail, password)).to.throw(FormatError, `${nonEmail} is not an e-mail`)
            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => restApi.registerUser(name, surname, email, password)).to.throw(ValueError, 'password is empty')
            })

        })

        describe('authenticate user', () => {

            beforeEach(async () => {
                _password = bcrypt.hashSync(password, 10)
                await Users.create({ name, surname, email, password: _password })
            })

            it('should succeed on correct user credential', async () => {

                const { token } = await restApi.authenticateUser(email, password)

                expect(token).to.be.a('string')
                expect(token.length).to.be.greaterThan(0)
            })

            it('should fail on wrong password', async () => {
                try {
                    await restApi.authenticateUser(email, password='000')

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`wrong credentials`)
                }
            })

            it('should fail on non-existing user', async () => {
                try {
                    await restApi.authenticateUser(email = 'unexisting-user@mail.com', password)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`user with email "${email}" does not exist`)
                }
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => restApi.authenticateUser( email, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => restApi.authenticateUser( email, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => restApi.authenticateUser( email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => restApi.authenticateUser( email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => restApi.authenticateUser( nonEmail, password)).to.throw(FormatError, `${nonEmail} is not an e-mail`)
            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => restApi.authenticateUser( email, password)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => restApi.authenticateUser( email, password)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => restApi.authenticateUser( email, password)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => restApi.authenticateUser( email, password)).to.throw(ValueError, 'password is empty')
            })
        })

        describe('retrieve user', () => {
            let token
            let _password

            beforeEach(async () => {
                _password = bcrypt.hashSync(password, 10)
                await Users.create({ name, surname, email, password: _password })

                const { token:_token } = await restApi.authenticateUser(email,password)
                token = _token
            })

            it('should succeed on correct user token from existing user', async () => {
                const user = await restApi.retrieveUser(token)

                expect(user.token).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.not.exist
            })

            it('should fail on unexisting user token', async () => {
                token = '01234567890123456789abcd'

                try {
                    await restApi.retrieveUser(token)

                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`jwt malformed`)
                }
            })

            it('should fail on undefined token', () => {
                const token = undefined

                expect(() => restApi.retrieveUser(token)).to.throw(RequirementError, `token is not optional`)
            })

            it('should fail on null token', () => {
                const token = null

                expect(() => restApi.retrieveUser(token)).to.throw(RequirementError, `token is not optional`)
            })

            it('should fail on empty token', () => {
                const token = ''

                expect(() => restApi.retrieveUser(token)).to.throw(ValueError, 'token is empty')
            })

            it('should fail on blank token', () => {
                const token = ' \t    \n'

                expect(() => restApi.retrieveUser(token)).to.throw(ValueError, 'token is empty')
            })
        })

        describe('update user', () => {
            let token
            let _password

            beforeEach(async () => {
                _password = bcrypt.hashSync(password, 10)
                await Users.create({ name, surname, email, password: _password })

                const { token: _token } = await restApi.authenticateUser(email,password)
                token = _token
            })

            it('should succeed on updating user name', async () => {
                let newName = 'newName'
                const response = await restApi.updateUser(token, { name: newName })

                expect(response).to.exist
                expect(response.message).to.be.a('string')
                expect(response.message).to.equal('Ok, user data updated.')

                const user = await restApi.retrieveUser(token)

                expect(user.token).to.not.exist
                expect(user.name).to.equal(newName)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.not.exist
            })

            it('should succeed on updating user surname', async () => {
                let newSurname = 'newSurname'
                const response = await restApi.updateUser(token, { surname: newSurname })

                expect(response).to.exist
                expect(response.message).to.be.a('string')
                expect(response.message).to.equal('Ok, user data updated.')

                const user = await restApi.retrieveUser(token)

                expect(user.token).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(newSurname)
                expect(user.email).to.equal(email)
                expect(user.password).to.not.exist
            })

            it('should succeed on updating user email', async () => {
                let newEmail = 'newemail@mail.com'

                const response = await restApi.updateUser(token, {email: newEmail})

                expect(response).to.exist
                expect(response.message).to.be.a('string')
                expect(response.message).to.equal('Ok, user data updated.')

                const user = await restApi.retrieveUser(token)

                expect(user.token).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(newEmail)
                expect(user.password).to.not.exist
            })

            it('should succeed on updating user password', async () => {
                let newPassword = 'newpassword'

                const response = await restApi.updateUser(token, {password: newPassword})

                expect(response).to.exist
                expect(response.message).to.be.a('string')
                expect(response.message).to.equal('Ok, user data updated.')

                const user = await restApi.retrieveUser(token)

                expect(user.token).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.not.exist

                const {token: _token} = await restApi.authenticateUser(email, newPassword)

                expect(_token).to.be.a('string')
                expect(_token.length).to.be.greaterThan(0)
            })

            it('should fail on unexisting user token', async () => {
                token = '01234567890123456789abcd'

                try {
                    await restApi.updateUser(token, {email})

                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist

                    expect(error).to.equal(`jwt malformed`)
                }
            })
            it('should fail on undefined token', () => {
                const token = undefined

                expect(() => restApi.updateUser(token, {password: 'newPassword'})).to.throw(RequirementError, `token is not optional`)
            })

            it('should fail on null token', () => {
                const token = null

                expect(() => restApi.updateUser(token, {password: 'newPassword'})).to.throw(RequirementError, `token is not optional`)
            })

            it('should fail on empty token', () => {
                const token = ''

                expect(() => restApi.updateUser(token, {password: 'newPassword'})).to.throw(ValueError, 'token is empty')
            })

            it('should fail on blank token', () => {
                const token = ' \t    \n'

                expect(() => restApi.updateUser(token, {password: 'newPassword'})).to.throw(ValueError, 'token is empty')
            })

            it('should fail on undefined data', () => {
                const data = undefined

                expect(() => restApi.updateUser(token, data)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on null data', () => {
                const data = null

                expect(() => restApi.updateUser(token, data)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on empty data', () => {
                const data = ''

                expect(() => restApi.updateUser(token, data)).to.throw(TypeError, 'data  is not a object')
            })

            it('should fail on blank data', () => {
                const data = ' \t    \n'

                expect(() => restApi.updateUser(token, data)).to.throw(TypeError, `data ${data} is not a object`)
            })
        })

        describe('delete user', () => {
            let token
            let _password

            beforeEach(async () => {

                _password = bcrypt.hashSync(password, 10)
                await Users.create({ name, surname, email, password: _password })

                const { token: _token } = await restApi.authenticateUser(email,password)
                token = _token
            })

            it('should succeed on deleting', async () => {
                const response = await restApi.deleteUser(token)

                try {
                    await restApi.retrieveUser(token)

                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                }
            })

            it('should fail on unexisting user token', async () => {
                token = '01234567890123456789abcd'

                try {
                    await restApi.deleteUser(token)

                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`jwt malformed`)
                }
            })

            it('should fail on undefined token', () => {
                const token = undefined

                expect(() => restApi.deleteUser(token)).to.throw(RequirementError, `token is not optional`)
            })

            it('should fail on null token', () => {
                const token = null

                expect(() => restApi.deleteUser(token)).to.throw(RequirementError, `token is not optional`)
            })

            it('should fail on empty token', () => {
                const token = ''

                expect(() => restApi.deleteUser(token)).to.throw(ValueError, 'token is empty')
            })

            it('should fail on blank token', () => {
                const token = ' \t    \n'

                expect(() => restApi.deleteUser(token)).to.throw(ValueError, 'token is empty')
            })
        })
    })

    describe('WOTdevices', () => {

        describe('check if WOTdevice exists', () => {
            let token
            let _password
            deviceIp = arduinoIp
            let devicePort = 80

            beforeEach(async() =>{
                _password = bcrypt.hashSync(password, 10)
                email = `marcusontest-${Math.random()}@gmail.com`
                await Users.create({ name, surname, email, password: _password, admin: true })

                const { token: _token } = await restApi.authenticateUser(email,password)
                token = _token
            })

            it('should succed on checking the selected WOTdevice', async () => {
                const response = await restApi.checkDevice(token, deviceIp, devicePort)

                expect(response).to.exist
                expect(response.HELLO).to.equal('WORLD!')
                expect(response.userid).to.exist
                expect(response.deviceid).to.exist
                expect(response.status).to.exist
                expect(response.interval).to.exist
            })

            it('should fail on checking a WOTdevice from unexisting user', async () => {
                let _token = 'unexistingToken'

                try {
                    await restApi.checkDevice(_token, deviceIp,devicePort)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`jwt malformed`)
                }
            })

            it('should fail on checking a unexisting WOTdevice ip', async () => {
                const _deviceIp = '99.99.99.99'

                try {
                    await restApi.checkDevice(token, _deviceIp, devicePort)
                    throw Error('should not reach this point')
                } catch (error) {
                    debugger
                    expect(error).to.exist
                    expect(error.message).to.equal(`Connection timed out`)
                }
            })

            it('should fail on checking a wrong WOTdevice port', async () => {
                let _devicePort = 90

                try {
                    await restApi.checkDevice(token, deviceIp, _devicePort)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`Connection refused`)
                }
            })


            it('should fail on null token', () => {
                const token = null

                expect(() => restApi.checkDevice(token, deviceIp, devicePort).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on empty token', () => {
                const token = ''

                expect(() => restApi.checkDevice(token, deviceIp, devicePort).to.throw(ValueError, 'token is empty'))
            })

            it('should fail on blank token', () => {
                const token = ' \t    \n'

                expect(() => restApi.checkDevice(token, deviceIp, devicePort).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceIp', () => {
                const deviceIp = undefined

                expect(() => restApi.checkDevice(token, deviceIp, devicePort).to.throw(RequirementError, `deviceIp is not optional`))
            })

            it('should fail on null deviceIp', () => {
                const deviceIp = null

                expect(() => restApi.checkDevice(token, deviceIp, devicePort).to.throw(RequirementError, `deviceIp is not optional`))
            })

            it('should fail on empty deviceIp', () => {
                const deviceIp = ''

                expect(() => restApi.checkDevice(token, deviceIp, devicePort).to.throw(ValueError, 'deviceIp is empty'))
            })

            it('should fail on blank deviceIp', () => {
                const deviceIp = ' \t    \n'
                expect(() => restApi.checkDevice(token, deviceIp, devicePort).to.throw(ValueError, 'deviceIp is empty'))
            })

            it('should fail on undefined devicePort', () => {
                const devicePort = undefined

                expect(() => restApi.checkDevice(token, deviceIp, devicePort).to.throw(RequirementError, `devicePort is not optional`))
            })

            it('should fail on null devicePort', () => {
                const devicePort = null

                expect(() => restApi.checkDevice(token, deviceIp, devicePort).to.throw(RequirementError, `devicePort is not optional`))
            })

            it('should fail on empty devicePort', () => {
                const devicePort = ''

                expect(() => restApi.checkDevice(token, deviceIp, devicePort).to.throw(ValueError, `devicePort is empty`))
            })

            it('should fail on blank devicePort', () => {
                const devicePort = ' \t    \n'
                expect(() => restApi.checkDevice(token, deviceIp, devicePort).to.throw(ValueError, `devicePort is empty`))
            })
        })

        describe('register WOTdevice', () => {
            let token
            let _password
            deviceName = 'newWOTdevice'
            deviceIp = '192.168.0.59'

            beforeEach(async() =>{
                _password = bcrypt.hashSync(password, 10)
                email = `marcusontest-${Math.random()}@gmail.com`
                await Users.create({ name, surname, email, password: _password, admin: true })

                const { token: _token } = await restApi.authenticateUser(email,password)
                token = _token
            })

            it('should succeed on correct WOTdevice register', async () => {
                const response = await restApi.addDevice(token, deviceName, deviceIp, devicePort)

                expect(response).to.exist
                expect(response.message).to.equal(`Ok, new device added.`)

                const _users = await Users.find({email})
                const _user = _users[0]
                const { devices } = _user

                expect(devices).to.exist
                expect(devices).to.be.instanceOf(Array)
                expect(devices).to.have.length(1)
                expect(devices[0].name).to.equal(deviceName)
                expect(devices[0].port).to.equal(devicePort)
            })

            it('should succeed on two correct WOTdevices register', async () => {

                await restApi.addDevice(token, deviceName, deviceIp, devicePort)

                let _users = await Users.find({email})
                let _user = _users[0]
                let { devices } = _user

                expect(devices).to.have.length(1)
                expect(devices[0].name).to.equal(deviceName)
                expect(devices[0].port).to.equal(devicePort)

                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = `192.168.${String(Math.floor(Math.random()*100))}.${String(Math.floor(Math.random()*255))}`

                const response = await restApi.addDevice(token, deviceName, deviceIp, devicePort)

                expect(response).to.exist
                expect(response.message).to.equal(`Ok, new device added.`)

                _users = await Users.find({email})
                _user = _users[0]
                const { devices:_devices } = _user

                expect(_devices).to.exist
                expect(_devices).to.be.instanceOf(Array)
                expect(_devices).to.have.length(2)
                expect(_devices[1].name).to.equal(deviceName)
                expect(_devices[1].port).to.equal(devicePort)
            })

            it('should fail adding a new WOTdevice with an already used name', async () => {
                const _ip = '192.168.0.0'
                let _users = await Users.find({email})
                user = _users[0]

                user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                await user.save()

                try {
                    await restApi.addDevice(token, deviceName, _ip, devicePort)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`A device named ${deviceName} is already in your collection`)
                }
            })

            it('should fail adding a new WOTdevice with an already used ip', async () => {
                const _deviceName = 'newName'
                let _users = await Users.find({email})
                user = _users[0]

                user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                await user.save()

                try {
                    await restApi.addDevice(token, _deviceName, deviceIp, devicePort)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`A device with ip ${deviceIp} is already in your collection`)
                }
            })

            it('should fail adding a new WOTdevice to an unexisting user', async () => {
                let token = 'unexistingToken'
                try {
                    await restApi.addDevice(token, deviceName, deviceIp, devicePort)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`jwt malformed`)
                }
            })

            it('should fail on undefined device token', () => {
                const token = undefined

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on null token', () => {
                const token = null

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on empty token', () => {
                const token = ''

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(ValueError, 'token is empty'))
            })

            it('should fail on blank token', () => {
                const token = ' \t    \n'

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined device deviceName', () => {
                const deviceName = undefined

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined device deviceIp', () => {
                const deviceIp = undefined

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(RequirementError, `deviceIp is not optional`))
            })

            it('should fail on null deviceIp', () => {
                const deviceIp = null

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(RequirementError, `deviceIp is not optional`))
            })

            it('should fail on empty deviceIp', () => {
                const deviceIp = ''

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(ValueError, 'deviceIp is empty'))
            })

            it('should fail on blank deviceIp', () => {
                const deviceIp = ' \t    \n'

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(ValueError, 'deviceIp is empty'))
            })

            it('should fail on undefined device devicePort', () => {
                const devicePort = undefined

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(RequirementError, `devicePort is not optional`))
            })

            it('should fail on null devicePort', () => {
                const devicePort = null

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(RequirementError, `devicePort is not optional`))
            })

            it('should fail on empty devicePort', () => {
                const devicePort = ''

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(ValueError, `devicePort is empty`))
            })

            it('should fail on blank devicePort', () => {
                const devicePort = ' \t    \n'

                expect(() => restApi.addDevice(token, deviceName, deviceIp, devicePort).to.throw(ValueError, `devicePort is empty`))
            })
        })

        describe('delete WOTdevice', () => {

            beforeEach(async() =>{
                _password = bcrypt.hashSync(password, 10)
                email = `marcusontest-${Math.random()}@gmail.com`
                await Users.create({ name, surname, email, password: _password, admin: true })

                const { token: _token } = await restApi.authenticateUser(email,password)
                token = _token
            })

            it('should succeed on correct WOTdevice deletion', async () => {
                await restApi.addDevice(token, deviceName, deviceIp, devicePort)
                await restApi.deleteDevice(token, deviceName)

                let _users = await Users.find({email})
                let _user = _users[0]
                let { devices } = _user

                expect(devices).to.exist
                expect(devices).to.be.instanceOf(Array)
                expect(devices).to.have.length(0)
            })

            it('should fail on wrong token', async () => {
                await restApi.addDevice(token, deviceName, deviceIp, devicePort)

                let _token = 'unexistingToken'

                try {
                    await restApi.deleteDevice(_token, deviceName)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`jwt malformed`)
                }

            })

            it('should fail on unexisting device', async () => {
                await restApi.addDevice(token, deviceName, deviceIp, devicePort)

                deviceName = 'unexisting device'

                try {
                    await restApi.deleteDevice(token, deviceName)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`A device named ${deviceName} does not exist`)
                }

            })


            it('should fail on undefined token', () => {
                const token = undefined

                expect(() => restApi.deleteDevice(token, deviceName, deviceIp, devicePort).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on null token', () => {
                const token = null

                expect(() => restApi.deleteDevice(token, deviceName, deviceIp, devicePort).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on empty token', () => {
                const token = ''

                expect(() => restApi.deleteDevice(token, deviceName, deviceIp, devicePort).to.throw(ValueError, 'token is empty'))
            })

            it('should fail on blank token', () => {
                const token = ' \t    \n'

                expect(() => restApi.deleteDevice(token, deviceName).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined device deviceName', () => {
                const deviceName = undefined

                expect(() => restApi.deleteDevice(token, deviceName).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => restApi.deleteDevice(token, deviceName).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => restApi.deleteDevice(token, deviceName).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() => restApi.deleteDevice(token, deviceName).to.throw(ValueError, 'deviceName is empty'))
            })

        })
    })

    describe('manage WOTdevice inputs', () =>{
        let inputType = ''
        let inputDirection = 0

        describe('add inputs', () => {
            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                _password = bcrypt.hashSync(password, 10)
                await Users.create({ name, surname, email, password: _password, admin: true })
                const { token: _token } = await restApi.authenticateUser(email,password)
                token = _token
                user = await Users.findOne({email})
                user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                await user.save()
            })

            it('should succed adding a new WOTdevice digital input', async()=>{
                inputType = 'digital'
                inputDirection = 1
                const response = await restApi.addInput(token, deviceName, inputType, inputDirection)

                expect(response).to.exist
                expect(response.message).to.equal(`Ok, device input added.`)
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].inputs).to.exist
                expect(user.devices[0].inputs).to.be.instanceOf(Array)
                expect(user.devices[0].inputs).to.have.length(1)
                expect(user.devices[0].inputs[0].type).to.equal(inputType)
                expect(user.devices[0].inputs[0].direction).to.equal(inputDirection)
                expect(user.devices[0].inputs[0].values).to.be.instanceOf(Array)
            })

            it('should succed adding two new WOTdevice digital input', async()=>{
                inputType = 'digital'
                inputDirection = 1
                let _inputDirection = 2
                await restApi.addInput(token, deviceName, inputType, inputDirection)
                const response = await restApi.addInput(token, deviceName, inputType, _inputDirection)

                expect(response).to.exist
                expect(response.message).to.equal(`Ok, device input added.`)
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].inputs).to.exist
                expect(user.devices[0].inputs).to.be.instanceOf(Array)
                expect(user.devices[0].inputs).to.have.length(2)
                expect(user.devices[0].inputs[0].type).to.equal(inputType)
                expect(user.devices[0].inputs[0].direction).to.equal(inputDirection)
                expect(user.devices[0].inputs[0].values).to.be.instanceOf(Array)
                expect(user.devices[0].inputs[1].type).to.equal(inputType)
                expect(user.devices[0].inputs[1].direction).to.equal(_inputDirection)
                expect(user.devices[0].inputs[1].values).to.be.instanceOf(Array)

            })

            it('should succed adding a new WOTdevice analog input', async()=>{
                inputType = 'analog'
                inputDirection = 1
                const response = await restApi.addInput(token, deviceName, inputType, inputDirection)

                expect(response).to.exist
                expect(response.message).to.equal(`Ok, device input added.`)
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].inputs).to.exist
                expect(user.devices[0].inputs).to.be.instanceOf(Array)
                expect(user.devices[0].inputs).to.have.length(1)
                expect(user.devices[0].inputs[0].type).to.equal(inputType)
                expect(user.devices[0].inputs[0].direction).to.equal(inputDirection)
                expect(user.devices[0].inputs[0].values).to.be.instanceOf(Array)
            })

            it('should fail adding a input to a unexisting user', async()=>{
                inputType = 'digital'
                inputDirection = 1
                let _token = 'unexistingToken'

                try {
                    await restApi.addInput(_token, deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`jwt malformed`)
                }
            })

            it('should fail adding a input to a unexisting WOTdevice', async()=>{
                inputType = 'digital'
                inputDirection = 1
                let _deviceName = 'wrongName'

                try {
                    await restApi.addInput(token, _deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`A device named ${_deviceName} does not exist in your collection`)
                }
            })

            it('should fail adding three WOTdevice digital input', async()=>{
                inputType = 'digital'
                inputDirection = 1
                let _inputDirection = 2
                await restApi.addInput(token, deviceName, inputType, inputDirection)
                await restApi.addInput(token, deviceName, inputType, _inputDirection)

                try {
                    const response = await restApi.addInput(token, deviceName, inputType, _inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`The device ${deviceName} could not have more ${inputType} inputs`)
                }
            })

            it('should fail adding two WOTdevice analog input', async()=>{
                inputType = 'analog'
                inputDirection = 1
                await restApi.addInput(token, deviceName, inputType, inputDirection)

                try {
                    const response = await restApi.addInput(token, deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`The device ${deviceName} could not have more ${inputType} inputs`)
                }
            })

            it('should fail adding a WOTdevice digital input with wrong direction', async()=>{
                inputType = 'digital'
                inputDirection = 3

                try {
                    const response = await restApi.addInput(token, deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`${inputDirection} is not a valid direction for a ${inputType} input`)
                }
            })

            it('should fail adding a WOTdevice analog input with wrong direction', async()=>{
                inputType = 'analog'
                inputDirection = 2

                try {
                    const response = await restApi.addInput(token, deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`${inputDirection} is not a valid direction for a ${inputType} input`)
                }
            })

            it('should fail adding a WOTdevice with wrong type', async()=>{
                inputType = 'invalidType'
                inputDirection = 2

                try {
                    const response = await restApi.addInput(token, deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`${inputType} is not a valid input type`)
                }

            })

            it('should fail on undefined device token', () => {
                const token = undefined

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on null token', () => {
                const token = null

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on empty token', () => {
                const token = ''

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'token is empty'))
            })

            it('should fail on blank token', () => {
                const token = ' \t    \n'

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined inputType', () => {
                const inputType = undefined

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputType is not optional`))
            })

            it('should fail on null inputType', () => {
                const inputType = null

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputType is not optional`))
            })

            it('should fail on empty inputType', () => {
                const inputType = ''

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputType is empty'))
            })

            it('should fail on blank inputType', () => {
                const inputType = ' \t    \n'

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputType is empty'))
            })

            it('should fail on undefined inputDirection', () => {
                const inputDirection = undefined

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputDirection is not optional`))
            })

            it('should fail on null inputDirection', () => {
                const inputDirection = null

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputDirection is not optional`))
            })

            it('should fail on empty inputDirection', () => {
                const inputDirection = ''

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputDirection is empty'))
            })

            it('should fail on blank inputDirection', () => {
                const inputDirection = ' \t    \n'

                expect(() => restApi.addInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputDirection is empty'))
            })
        })

        describe('delete inputs', () => {
            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                _password = bcrypt.hashSync(password, 10)

                await Users.create({ name, surname, email, password: _password, isAdmin })
                const { token: _token } = await restApi.authenticateUser(email,password)
                token = _token
                user = await Users.findOne({email})
                user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                await user.save()
            })

            it('should succed deleting a WOTdevice digital input', async()=>{
                inputType = 'digital'
                inputDirection = 1
                await restApi.addInput(token, deviceName, inputType, inputDirection)
                inputDirection = 2
                await restApi.addInput(token, deviceName, inputType, inputDirection)
                const response = await restApi.deleteInput(token, deviceName, inputType, inputDirection)
                inputType = 'analog'
                inputDirection = 1
                await restApi.addInput(token, deviceName, inputType, inputDirection)

                expect(response).to.not.exist
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].inputs).to.exist
                expect(user.devices[0].inputs).to.be.instanceOf(Array)
                expect(user.devices[0].inputs).to.have.length(2)
            })

            it('should succed deleting two WOTdevice digital input', async()=>{
                inputType = 'digital'
                inputDirection = 1
                let _inputDirection = 2
                await restApi.addInput(token, deviceName, inputType, inputDirection)
                await restApi.addInput(token, deviceName, inputType, _inputDirection)

                await restApi.deleteInput(token, deviceName, inputType, inputDirection)
                const response = await restApi.deleteInput(token, deviceName, inputType, _inputDirection)

                expect(response).to.not.exist
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].inputs).to.exist
                expect(user.devices[0].inputs).to.be.instanceOf(Array)
                expect(user.devices[0].inputs).to.have.length(0)

            })

            it('should succed deleting a WOTdevice analog input', async()=>{
                inputType = 'digital'
                inputDirection = 1
                await restApi.addInput(token, deviceName, inputType, inputDirection)
                inputType = 'analog'
                inputDirection = 1
                await restApi.addInput(token, deviceName, inputType, inputDirection)
                const response = await restApi.deleteInput(token, deviceName, inputType, inputDirection)

                expect(response).to.not.exist
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].inputs).to.exist
                expect(user.devices[0].inputs).to.be.instanceOf(Array)
                expect(user.devices[0].inputs).to.have.length(1)
            })

            it('should fail deleting a input to a unexisting user', async()=>{
                inputType = 'digital'
                inputDirection = 1
                let token = 'unexistingToken'

                try {
                    await restApi.deleteInput(token, deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`jwt malformed`)
                }
            })

            it('should fail deleting a input to a unexisting WOTdevice', async()=>{
                inputType = 'digital'
                inputDirection = 1
                let _deviceName = 'wrongName'

                try {
                    await restApi.deleteInput(token, _deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`A device named ${_deviceName} does not exist in your collection`)
                }
            })

            it('should fail deleting unexisting WOTdevice digital input', async()=>{
                inputType = 'digital'
                inputDirection = 1

                try {
                    await restApi.deleteInput(token, deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`The device ${deviceName} don't have any ${inputType} input`)
                }
            })

            it('should fail deleting WOTdevice digital input in a undefined input direction', async()=>{
                inputType = 'digital'
                inputDirection = 1
                let _inputDirection = 2

                await restApi.addInput(token, deviceName, inputType, inputDirection)

                try {
                    await restApi.deleteInput(token, deviceName, inputType, _inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`The device ${deviceName} don't have any ${inputType} input asigned to ${_inputDirection} direction`)
                }
            })

            it('should fail deleting unexisting WOTdevice analog input', async()=>{
                inputType = 'analog'
                inputDirection = 1

                try {
                    await restApi.deleteInput(token, deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`The device ${deviceName} don't have any ${inputType} input`)
                }
            })

            it('should fail deleting a WOTdevice digital input with wrong direction', async()=>{
                inputType = 'digital'
                inputDirection = 3

                try {
                    await restApi.deleteInput(token, deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`${inputDirection} is not a valid direction for a ${inputType} input`)
                }
            })

            it('should fail deleting a WOTdevice analog input with wrong direction', async()=>{
                inputType = 'analog'
                inputDirection = 2

                try {
                    await restApi.deleteInput(token, deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`${inputDirection} is not a valid direction for a ${inputType} input`)
                }
            })

            it('should fail deleting a WOTdevice with wrong type', async()=>{
                inputType = 'invalidType'
                inputDirection = 2

                try {
                    await restApi.deleteInput(token, deviceName, inputType, inputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`${inputType} is not a valid input type`)
                }
            })

            it('should fail on undefined device token', () => {
                const token = undefined

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on null token', () => {
                const token = null

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on empty token', () => {
                const token = ''

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'token is empty'))
            })

            it('should fail on blank token', () => {
                const token = ' \t    \n'

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined inputType', () => {
                const inputType = undefined

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputType is not optional`))
            })

            it('should fail on null inputType', () => {
                const inputType = null

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputType is not optional`))
            })

            it('should fail on empty inputType', () => {
                const inputType = ''

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputType is empty'))
            })

            it('should fail on blank inputType', () => {
                const inputType = ' \t    \n'

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputType is empty'))
            })

            it('should fail on undefined inputDirection', () => {
                const inputDirection = undefined

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputDirection is not optional`))
            })

            it('should fail on null inputDirection', () => {
                const inputDirection = null

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputDirection is not optional`))
            })

            it('should fail on empty inputDirection', () => {
                const inputDirection = ''

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputDirection is empty'))
            })

            it('should fail on blank inputDirection', () => {
                const inputDirection = ' \t    \n'

                expect(() => restApi.deleteInput(token, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputDirection is empty'))
            })
        })
    })

    describe('manage WOTdevice outputs', () =>{
        let outputType = ''
        let outputDirection = 0

        describe('add outputs', () => {
            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                _password = bcrypt.hashSync(password, 10)
                await Users.create({ name, surname, email, password: _password, admin: true })
                const { token: _token } = await restApi.authenticateUser(email,password)
                token = _token
                user = await Users.findOne({email})
                user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                await user.save()
            })

            it('should succed adding a new WOTdevice digital output', async()=>{
                outputType = 'digital'
                outputDirection = 1
                const response = await restApi.addOutput(token, deviceName, outputType, outputDirection)

                expect(response).to.exist
                expect(response.message).to.equal(`Ok, device output added.`)
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].outputs).to.exist
                expect(user.devices[0].outputs).to.be.instanceOf(Array)
                expect(user.devices[0].outputs).to.have.length(1)
                expect(user.devices[0].outputs[0].type).to.equal(outputType)
                expect(user.devices[0].outputs[0].direction).to.equal(outputDirection)
                expect(user.devices[0].outputs[0].value).to.equal(0)
            })

            it('should succed adding two new WOTdevice digital output', async()=>{
                outputType = 'digital'
                outputDirection = 1
                let _outputDirection = 2
                await restApi.addOutput(token, deviceName, outputType, outputDirection)
                const response = await restApi.addOutput(token, deviceName, outputType, _outputDirection)

                expect(response).to.exist
                expect(response.message).to.equal(`Ok, device output added.`)
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].outputs).to.exist
                expect(user.devices[0].outputs).to.be.instanceOf(Array)
                expect(user.devices[0].outputs).to.have.length(2)
                expect(user.devices[0].outputs[0].type).to.equal(outputType)
                expect(user.devices[0].outputs[0].direction).to.equal(outputDirection)
                expect(user.devices[0].outputs[0].value).to.equal(0)
                expect(user.devices[0].outputs[1].type).to.equal(outputType)
                expect(user.devices[0].outputs[1].direction).to.equal(_outputDirection)
                expect(user.devices[0].outputs[1].value).to.equal(0)

            })

            it('should succed adding a new WOTdevice motor output', async()=>{
                outputType = 'motor'
                outputDirection = 1
                const response = await restApi.addOutput(token, deviceName, outputType, outputDirection)

                expect(response).to.exist
                expect(response.message).to.equal(`Ok, device output added.`)
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].outputs).to.exist
                expect(user.devices[0].outputs).to.be.instanceOf(Array)
                expect(user.devices[0].outputs).to.have.length(1)
                expect(user.devices[0].outputs[0].type).to.equal(outputType)
                expect(user.devices[0].outputs[0].direction).to.equal(outputDirection)
                expect(user.devices[0].outputs[0].value).to.equal(0)
            })

            it('should succed adding two WOTdevice motor output', async()=>{
                outputType = 'motor'
                outputDirection = 1
                let _outputDirection = 2
                await restApi.addOutput(token, deviceName, outputType, outputDirection)
                const response = await restApi.addOutput(token, deviceName, outputType, _outputDirection)

                expect(response).to.exist
                expect(response.message).to.equal(`Ok, device output added.`)
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].outputs).to.exist
                expect(user.devices[0].outputs).to.be.instanceOf(Array)
                expect(user.devices[0].outputs).to.have.length(2)
                expect(user.devices[0].outputs[0].type).to.equal(outputType)
                expect(user.devices[0].outputs[0].direction).to.equal(outputDirection)
                expect(user.devices[0].outputs[0].value).to.equal(0)
            })

            it('should succed adding a new WOTdevice motor output', async()=>{
                outputType = 'motor'
                outputDirection = 1
                const response = await restApi.addOutput(token, deviceName, outputType, outputDirection)

                expect(response).to.exist
                expect(response.message).to.equal(`Ok, device output added.`)
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].outputs).to.exist
                expect(user.devices[0].outputs).to.be.instanceOf(Array)
                expect(user.devices[0].outputs).to.have.length(1)
                expect(user.devices[0].outputs[0].type).to.equal(outputType)
                expect(user.devices[0].outputs[0].direction).to.equal(outputDirection)
                expect(user.devices[0].outputs[0].value).to.equal(0)
            })

            it('should succed adding two WOTdevice motor output', async()=>{
                outputType = 'motor'
                outputDirection = 1
                let _outputDirection = 2
                await restApi.addOutput(token, deviceName, outputType, outputDirection)
                const response = await restApi.addOutput(token, deviceName, outputType, _outputDirection)

                expect(response).to.exist
                expect(response.message).to.equal(`Ok, device output added.`)
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].outputs).to.exist
                expect(user.devices[0].outputs).to.be.instanceOf(Array)
                expect(user.devices[0].outputs).to.have.length(2)
                expect(user.devices[0].outputs[0].type).to.equal(outputType)
                expect(user.devices[0].outputs[0].direction).to.equal(outputDirection)
                expect(user.devices[0].outputs[0].value).to.equal(0)
            })

            it('should fail adding a output to a unexisting user', async()=>{
                outputType = 'digital'
                outputDirection = 1
                let _token = 'unexistingToken'

                try {
                    await restApi.addInput(_token, deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`jwt malformed`)
                }
            })

            it('should fail adding a output to a unexisting WOTdevice', async()=>{
                outputType = 'digital'
                outputDirection = 1
                let _deviceName = 'wrongName'

                try {
                    await restApi.addInput(token, _deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`A device named ${_deviceName} does not exist in your collection`)
                }
            })

            it('should fail adding three WOTdevice digital output', async()=>{
                outputType = 'digital'
                outputDirection = 1
                let _outputDirection = 2
                await restApi.addOutput(token, deviceName, outputType, outputDirection)
                await restApi.addOutput(token, deviceName, outputType, _outputDirection)

                try {
                    const response = await restApi.addOutput(token, deviceName, outputType, _outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`The device ${deviceName} could not have more ${outputType} outputs`)
                }
            })

            it('should fail adding three WOTdevice motor output', async()=>{
                outputType = 'motor'
                outputDirection = 1
                await restApi.addOutput(token, deviceName, outputType, outputDirection)
                let _outputDirection = 2
                await restApi.addOutput(token, deviceName, outputType, _outputDirection)

                try {
                    const response = await restApi.addOutput(token, deviceName, outputType, _outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`The device ${deviceName} could not have more ${outputType} outputs`)
                }
            })

            it('should fail adding a WOTdevice digital output with wrong direction', async()=>{
                outputType = 'digital'
                outputDirection = 3

                try {
                    const response = await restApi.addOutput(token, deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist

                    expect(error).to.equal(`${outputDirection} is not a valid direction for a ${outputType} output`)
                }
            })

            it('should fail adding a WOTdevice motor output with wrong direction', async()=>{
                outputType = 'motor'
                outputDirection = 3

                try {
                    const response = await restApi.addOutput(token, deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`${outputDirection} is not a valid direction for a ${outputType} output`)
                }
            })

            it('should fail adding a WOTdevice motor output with wrong direction', async()=>{
                outputType = 'servo'
                outputDirection = 4

                try {
                    const response = await restApi.addOutput(token, deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`${outputDirection} is not a valid direction for a ${outputType} output`)
                }
            })

            it('should fail adding a WOTdevice with wrong type', async()=>{
                outputType = 'invalidType'
                outputDirection = 2

                try {
                    const response = await restApi.addOutput(token, deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`${outputType} is not a valid output type`)
                }

            })

            it('should fail on undefined device token', () => {
                const token = undefined

                expect(() => restApi.addOutput(token, deviceName, inputType, inputDirection).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on null token', () => {
                const token = null

                expect(() => restApi.addOutput(token, deviceName, inputType, outputDirection).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on empty token', () => {
                const token = ''

                expect(() => restApi.addOutput(token, deviceName, inputType, outputDirection).to.throw(ValueError, 'token is empty'))
            })

            it('should fail on blank token', () => {
                const token = ' \t    \n'

                expect(() => restApi.addOutput(token, deviceName, inputType, outputDirection).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => restApi.addOutput(token, deviceName, inputType, outputDirection).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => restApi.addOutput(token, deviceName, inputType, outputDirection).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => restApi.addOutput(token, deviceName, inputType, outputDirection).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => restApi.addOutput(token, deviceName, inputType, outputDirection).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined outputType', () => {
                const outputType = undefined

                expect(() => restApi.addOutput(token, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputType is not optional`))
            })

            it('should fail on null outputType', () => {
                const outputType = null

                expect(() => restApi.addOutput(token, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputType is not optional`))
            })

            it('should fail on empty outputType', () => {
                const outputType = ''

                expect(() => restApi.addOutput(token, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputType is empty'))
            })

            it('should fail on blank outputType', () => {
                const outputType = ' \t    \n'

                expect(() => restApi.addOutput(token, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputType is empty'))
            })

            it('should fail on undefined outputDirection', () => {
                const outputDirection = undefined

                expect(() => restApi.addOutput(token, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputDirection is not optional`))
            })

            it('should fail on null outputDirection', () => {
                const outputDirection = null

                expect(() => restApi.addOutput(token, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputDirection is not optional`))
            })

            it('should fail on empty outputDirection', () => {
                const outputDirection = ''

                expect(() => restApi.addOutput(token, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputDirection is empty'))
            })

            it('should fail on blank outputDirection', () => {
                const outputDirection = ' \t    \n'

                expect(() => restApi.addOutput(token, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputDirection is empty'))
            })
        })

        describe('delete outputs', () => {
            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                _password = bcrypt.hashSync(password, 10)

                await Users.create({ name, surname, email, password: _password, isAdmin })
                const { token: _token } = await restApi.authenticateUser(email,password)
                token = _token
                user = await Users.findOne({email})
                user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                await user.save()
            })

            it('should succed deleting a WOTdevice digital output', async()=>{
                outputType = 'digital'
                outputDirection = 1
                await restApi.addOutput(token, deviceName, outputType, outputDirection)
                outputDirection = 2
                await restApi.addOutput(token, deviceName, outputType, outputDirection)
                const response = await restApi.deleteOutput(token, deviceName, outputType, outputDirection)
                outputType = 'motor'
                outputDirection = 1
                await restApi.addOutput(token, deviceName, outputType, outputDirection)

                expect(response).to.not.exist
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].outputs).to.exist
                expect(user.devices[0].outputs).to.be.instanceOf(Array)
                expect(user.devices[0].outputs).to.have.length(2)
            })

            it('should succed deleting two WOTdevice digital output', async()=>{
                outputType = 'digital'
                outputDirection = 1
                let _outputDirection = 2
                await restApi.addOutput(token, deviceName, outputType, outputDirection)
                await restApi.addOutput(token, deviceName, outputType, _outputDirection)

                await restApi.deleteOutput(token, deviceName, outputType, outputDirection)
                const response = await restApi.deleteOutput(token, deviceName, outputType, _outputDirection)

                expect(response).to.not.exist
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].outputs).to.exist
                expect(user.devices[0].outputs).to.be.instanceOf(Array)
                expect(user.devices[0].outputs).to.have.length(0)

            })

            it('should succed deleting a WOTdevice analog output', async()=>{
                outputType = 'digital'
                outputDirection = 1
                await restApi.addOutput(token, deviceName, outputType, outputDirection)
                outputType = 'servo'
                outputDirection = 1
                await restApi.addOutput(token, deviceName, outputType, outputDirection)
                const response = await restApi.deleteOutput(token, deviceName, outputType, outputDirection)

                expect(response).to.not.exist
                const user = await Users.findOne({$and:[{email}, {'devices.name': deviceName}]})

                expect(user.devices[0].name).to.equal(deviceName)
                expect(user.devices[0].outputs).to.exist
                expect(user.devices[0].outputs).to.be.instanceOf(Array)
                expect(user.devices[0].outputs).to.have.length(1)
            })

            it('should fail deleting a output to a unexisting user', async()=>{
                outputType = 'digital'
                outputDirection = 1
                let token = 'unexistingToken'

                try {
                    await restApi.deleteOutput(token, deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist

                    expect(error).to.equal(`jwt malformed`)
                }
            })

            it('should fail deleting a output to a unexisting WOTdevice', async()=>{
                outputType = 'digital'
                outputDirection = 1
                let _deviceName = 'wrongName'

                try {
                    await restApi.deleteOutput(token, _deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`A device named ${_deviceName} does not exist in your collection`)
                }
            })

            it('should fail deleting unexisting WOTdevice digital output', async()=>{
                outputType = 'digital'
                outputDirection = 1

                try {
                    await restApi.deleteOutput(token, deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`The device ${deviceName} don't have any ${outputType} output`)
                }
            })

            it('should fail deleting WOTdevice digital output in a undefined output direction', async()=>{
                outputType = 'digital'
                outputDirection = 1
                let _outputDirection = 2

                await restApi.addOutput(token, deviceName, outputType, outputDirection)

                try {
                    await restApi.deleteOutput(token, deviceName, outputType, _outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`The device ${deviceName} don't have any ${outputType} output asigned to ${_outputDirection} direction`)
                }
            })

            it('should fail deleting unexisting WOTdevice motor output', async()=>{
                outputType = 'motor'
                outputDirection = 1

                try {
                    await restApi.deleteOutput(token, deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist

                    expect(error).to.equal(`The device ${deviceName} don't have any ${outputType} output`)
                }
            })

            it('should fail deleting a WOTdevice digital output with wrong direction', async()=>{
                outputType = 'digital'
                outputDirection = 3

                try {
                    await restApi.deleteOutput(token, deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist

                    expect(error).to.equal(`${outputDirection} is not a valid direction for a ${outputType} output`)
                }
            })

            it('should fail deleting a WOTdevice motor output with wrong direction', async()=>{
                outputType = 'motor'
                outputDirection = 4

                try {
                    await restApi.deleteOutput(token, deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.equal(`${outputDirection} is not a valid direction for a ${outputType} output`)
                }
            })

            it('should fail deleting a WOTdevice with wrong type', async()=>{
                outputType = 'invalidType'
                outputDirection = 2

                try {
                    await restApi.deleteOutput(token, deviceName, outputType, outputDirection)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist

                    expect(error).to.equal(`${outputType} is not a valid output type`)
                }
            })

            it('should fail on undefined device token', () => {
                const token = undefined

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on null token', () => {
                const token = null

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(RequirementError, `token is not optional`))
            })

            it('should fail on empty token', () => {
                const token = ''

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(ValueError, 'token is empty'))
            })

            it('should fail on blank token', () => {
                const token = ' \t    \n'

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined outputType', () => {
                const outputType = undefined

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputType is not optional`))
            })

            it('should fail on null outputType', () => {
                const outputType = null

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputType is not optional`))
            })

            it('should fail on empty outputType', () => {
                const outputType = ''

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputType is empty'))
            })

            it('should fail on blank outputType', () => {
                const outputType = ' \t    \n'

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputType is empty'))
            })

            it('should fail on undefined outputDirection', () => {
                const outputDirection = undefined

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputDirection is not optional`))
            })

            it('should fail on null outputDirection', () => {
                const outputDirection = null

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputDirection is not optional`))
            })

            it('should fail on empty outputDirection', () => {
                const outputDirection = ''

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputDirection is empty'))
            })

            it('should fail on blank outputDirection', () => {
                const outputDirection = ' \t    \n'

                expect(() => restApi.deleteOutput(token, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputDirection is empty'))
            })
        })
    })

    describe('retrieve WOTdevice', () => {
        beforeEach(async () => {
            email = `marcusontest-${Math.random()}@gmail.com`
            _password = bcrypt.hashSync(password, 10)

            await Users.create({ name, surname, email, password: _password, isAdmin })
            const { token: _token } = await restApi.authenticateUser(email, password)
            token = _token
            user = await Users.findOne({ email })
            user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort }))
            await user.save()
        })

        it('should succes retrieving a WOTdevice', async () => {
            const response = await restApi.retrieveDevice(token, deviceName)

            expect(response).to.exist
            expect(response).to.be.instanceOf(Object)
            expect(response.name).to.equal(deviceName)
            expect(response.ip).to.equal(deviceIp)
            expect(response.port).to.equal(devicePort)
            expect(response.inputs).to.exist
            expect(response.outputs).to.exist

        })

        it('should fail retrieving a unexisting WOTdevice', async () => {
            deviceName = 'unexistingDevice'
            try {
                await restApi.retrieveDevice(token, deviceName)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`A device named ${deviceName} does not exist in your collection`)
            }
        })

        it('should fail retrieving a WOTdevice of a unexisting user', async () => {
            let token = 'unexistingToken'
            try {
                await restApi.retrieveDevice(token, deviceName)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`jwt malformed`)
            }
        })

        it('should fail on undefined device token', () => {
            const token = undefined

            expect(() => restApi.retrieveDevice(token, deviceName).to.throw(RequirementError, `token is not optional`))
        })

        it('should fail on null token', () => {
            const token = null

            expect(() => restApi.retrieveDevice(token, deviceName).to.throw(RequirementError, `token is not optional`))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => restApi.retrieveDevice(token, deviceName).to.throw(ValueError, 'token is empty'))
        })

        it('should fail on blank token', () => {
            const token = ' \t    \n'

            expect(() => restApi.retrieveDevice(token, deviceName).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined deviceName', () => {
            const deviceName = undefined

            expect(() => restApi.retrieveDevice(token, deviceName).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on null deviceName', () => {
            const deviceName = null

            expect(() => restApi.retrieveDevice(token, deviceName).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on empty deviceName', () => {
            const deviceName = ''

            expect(() => restApi.retrieveDevice(token, deviceName).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on blank deviceName', () => {
            const deviceName = ' \t    \n'
            expect(() => restApi.retrieveDevice(token, deviceName).to.throw(ValueError, 'deviceName is empty'))
        })
    })

    describe('activate WOTdevice', () => {
        beforeEach(async() =>{
            email = `marcusontest-${Math.random()}@gmail.com`
            deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
            deviceIp = arduinoIp
            email = `marcusontest-${Math.random()}@gmail.com`
            _password = bcrypt.hashSync(password, 10)

            await Users.create({ name, surname, email, password: _password, isAdmin })
            const { token: _token } = await restApi.authenticateUser(email, password)
            token = _token
            user = await Users.findOne({ email })
            user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort }))
            await user.save()
        })

        it('should succed on activating the selected WOTdevice', async () => {
            const response = await restApi.activateDevice(token, deviceName, timeInterval)

            expect(response).to.exist
            expect(response.deviceid).to.equal('newWOTDevice')
            expect(response.status).to.equal('ON')
            expect(response.interval).to.equal(timeInterval.toString())
        })

        it('should fail on activating a WOTdevice from unexisting user', async () => {
            let _token = 'unexistingToken'

            try {
                await restApi.activateDevice(_token, deviceName, timeInterval)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`jwt malformed`)
            }
        })

        it('should fail on activating a undefined WOTdevice', async () => {
            deviceName = 'undefinedWOTdevice'

            try {
                await restApi.activateDevice(token, deviceName, timeInterval)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`A device named ${deviceName} does not exist in your collection`)
            }
        })

        it('should fail on activating a WOTdevice witch time interval too low', async () => {
            timeInterval = 10

            try {
                await restApi.activateDevice(token, deviceName, timeInterval)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`time interval ${timeInterval} is too low. must be at least 1000`)
            }
        })

        it('should fail on null token', () => {
            const token = null

            expect(() => restApi.activateDevice(token, deviceName, timeInterval).to.throw(RequirementError, `token is not optional`))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => restApi.activateDevice(token, deviceName, timeInterval).to.throw(ValueError, 'token is empty'))
        })

        it('should fail on blank token', () => {
            const token = ' \t    \n'

            expect(() => restApi.activateDevice(token, deviceName, timeInterval).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined deviceName', () => {
            const deviceName = undefined

            expect(() => restApi.activateDevice(token, deviceName, timeInterval).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on null deviceName', () => {
            const deviceName = null

            expect(() => restApi.activateDevice(token, deviceName, timeInterval).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on empty deviceName', () => {
            const deviceName = ''

            expect(() => restApi.activateDevice(token, deviceName, timeInterval).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on blank deviceName', () => {
            const deviceName = ' \t    \n'
            expect(() => restApi.activateDevice(token, deviceName, timeInterval).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined timeInterval', () => {
            const timeInterval = undefined

            expect(() => restApi.activateDevice(token, deviceName, timeInterval).to.throw(RequirementError, `timeInterval is not optional`))
        })

        it('should fail on null timeInterval', () => {
            const timeInterval = null

            expect(() => restApi.activateDevice(token, deviceName, timeInterval).to.throw(RequirementError, `timeInterval is not optional`))
        })

        it('should fail on empty timeInterval', () => {
            const timeInterval = ''

            expect(() => restApi.activateDevice(token, deviceName, timeInterval).to.throw(ValueError, `timeInterval is empty`))
        })

        it('should fail on blank timeInterval', () => {
            const timeInterval = ' \t    \n'
            expect(() => restApi.activateDevice(token, deviceName, timeInterval).to.throw(ValueError, `timeInterval is empty`))
        })
    })

    describe('change WOTdevice name', () => {
        let deviceName = 'newWOTDevice'
        let newDeviceName

        beforeEach(async() =>{
            email = `marcusontest-${Math.random()}@gmail.com`
            newDeviceName = `WOTdevice${Math.floor(Math.random()*999)}`
            deviceIp = arduinoIp
            email = `marcusontest-${Math.random()}@gmail.com`
            _password = bcrypt.hashSync(password, 10)

            await Users.create({ name, surname, email, password: _password, isAdmin })
            const { token: _token } = await restApi.authenticateUser(email, password)
            token = _token
            user = await Users.findOne({ email })
            user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort }))
            await user.save()
        })

        it('should succed changing a WOTdevice name', async () => {
            const response = await restApi.changeDeviceId(token, deviceName, newDeviceName)

            expect(response).to.exist
            expect(response.deviceid).to.equal(newDeviceName)
            expect(response.status).to.equal('OK')

            const users = await Users.find({ $and: [{ email}, { 'devices.name': newDeviceName }] })
            expect(users).to.have.lengthOf(1)
            expect(users[0].devices).to.have.lengthOf(1)
            expect(users[0].devices[0].name).to.equal(newDeviceName)

            await restApi.changeDeviceId(token, newDeviceName, 'newWOTDevice')
        })

        it('should fail on unexisting user token', async () => {
            let _token = 'unexistingToken'

            try {
                await await restApi.changeDeviceId(_token, deviceName, newDeviceName)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`jwt malformed`)
            }
        })

        it('should fail on activating a undefined WOTdevice', async () => {
            deviceName = 'undefinedWOTdevice'

            try {
                await restApi.changeDeviceId(token, deviceName, newDeviceName)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`A device named ${deviceName} does not exist in your collection`)
            }
        })

        it('should fail on null token', () => {
            const token = null

            expect(() => restApi.changeDeviceId(token, deviceName, newDeviceName).to.throw(RequirementError, `token is not optional`))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => restApi.changeDeviceId(token, deviceName, newDeviceName).to.throw(ValueError, 'token is empty'))
        })

        it('should fail on blank token', () => {
            const token = ' \t    \n'

            expect(() => restApi.changeDeviceId(token, deviceName, newDeviceName).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined deviceName', () => {
            const deviceName = undefined

            expect(() => restApi.changeDeviceId(token, deviceName, newDeviceName).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on null deviceName', () => {
            const deviceName = null

            expect(() => restApi.changeDeviceId(token, deviceName, newDeviceName).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on empty deviceName', () => {
            const deviceName = ''

            expect(() => restApi.changeDeviceId(token, deviceName, newDeviceName).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on blank deviceName', () => {
            const deviceName = ' \t    \n'
            expect(() => restApi.changeDeviceId(token, deviceName, newDeviceName).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined newDeviceName', () => {
            const newDeviceName = undefined

            expect(() => restApi.changeDeviceId(token, deviceName, newDeviceName).to.throw(RequirementError, `newDeviceName is not optional`))
        })

        it('should fail on null newDeviceName', () => {
            const newDeviceName = null

            expect(() => restApi.changeDeviceId(token, deviceName, newDeviceName).to.throw(RequirementError, `newDeviceName is not optional`))
        })

        it('should fail on empty newDeviceName', () => {
            const newDeviceName = ''

            expect(() => restApi.changeDeviceId(token, deviceName, newDeviceName).to.throw(ValueError, `newDeviceName is empty`))
        })

        it('should fail on blank newDeviceName', () => {
            const newDeviceName = ' \t    \n'
            expect(() => restApi.changeDeviceId(token, deviceName, newDeviceName).to.throw(ValueError, `newDeviceName is empty`))
        })
    })

    describe('toggle WOTdevice digital output', () => {
        let pinNumber = 1

        beforeEach(async() =>{
            email = `marcusontest-${Math.random()}@gmail.com`
            deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
            deviceIp = arduinoIp
            email = `marcusontest-${Math.random()}@gmail.com`
            let type = 'digital'
            _password = bcrypt.hashSync(password, 10)

            await Users.create({ name, surname, email, password: _password, isAdmin })
            const { token: _token } = await restApi.authenticateUser(email, password)
            token = _token
            user = await Users.findOne({ email })
            user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort }))
            await user.save()
            await restApi.changeDeviceId(token, deviceName, deviceName)
            await restApi.addOutput(token, deviceName, type, pinNumber)
        })

        it('should succed toggling on and off a WOTdevice digital output', async () => {
            const response = await restApi.toggleDigitalOutput(token, deviceName, pinNumber)

            expect(response).to.exist
            expect(response.deviceid).to.equal(deviceName)
            expect(response.status).to.equal('ON')

            const response2 = await restApi.toggleDigitalOutput(token, deviceName, pinNumber)

            expect(response2).to.exist
            expect(response2.deviceid).to.equal(deviceName)
            expect(response2.status).to.equal('OFF')
        })

        it('should fail on unexisting user token', async () => {
            let _token = 'unexistingtoken'

            try {
                await await restApi.toggleDigitalOutput(_token, deviceName, pinNumber)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`jwt malformed`)
            }
        })

        it('should fail on activating a undefined WOTdevice', async () => {
            deviceName = 'undefinedWOTdevice'

            try {
                await restApi.toggleDigitalOutput(token, deviceName, pinNumber)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`A device named ${deviceName} does not exist in your collection`)
            }
        })

        it('should fail on null token', () => {
            const token = null

            expect(() => restApi.toggleDigitalOutput(token, deviceName, pinNumber).to.throw(RequirementError, `token is not optional`))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => restApi.toggleDigitalOutput(token, deviceName, pinNumber).to.throw(ValueError, 'token is empty'))
        })

        it('should fail on blank token', () => {
            const token = ' \t    \n'

            expect(() => restApi.toggleDigitalOutput(token, deviceName, pinNumber).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined deviceName', () => {
            const deviceName = undefined

            expect(() => restApi.toggleDigitalOutput(token, deviceName, pinNumber).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on null deviceName', () => {
            const deviceName = null

            expect(() => restApi.toggleDigitalOutput(token, deviceName, pinNumber).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on empty deviceName', () => {
            const deviceName = ''

            expect(() => restApi.toggleDigitalOutput(token, deviceName, pinNumber).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on blank deviceName', () => {
            const deviceName = ' \t    \n'
            expect(() => restApi.toggleDigitalOutput(token, deviceName, pinNumber).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined pinNumber', () => {
            const pinNumber = undefined

            expect(() => restApi.toggleDigitalOutput(token, deviceName, pinNumber).to.throw(RequirementError, `pinNumber is not optional`))
        })

        it('should fail on null pinNumber', () => {
            const pinNumber = null

            expect(() => restApi.toggleDigitalOutput(token, deviceName, pinNumber).to.throw(RequirementError, `pinNumber is not optional`))
        })

        it('should fail on empty pinNumber', () => {
            const pinNumber = ''

            expect(() => restApi.toggleDigitalOutput(token, deviceName, pinNumber).to.throw(ValueError, `pinNumber is empty`))
        })

        it('should fail on blank pinNumber', () => {
            const pinNumber = ' \t    \n'
            expect(() => restApi.toggleDigitalOutput(token, deviceName, pinNumber).to.throw(ValueError, `pinNumber is empty`))
        })
    })

    describe('moving a WOTdevice servo output', () => {
        let pinNumber = 1
        let angle = 0

        beforeEach(async() =>{
            email = `marcusontest-${Math.random()}@gmail.com`
            deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
            deviceIp = arduinoIp
            email = `marcusontest-${Math.random()}@gmail.com`
            let type = 'servo'
            _password = bcrypt.hashSync(password, 10)

            await Users.create({ name, surname, email, password: _password, isAdmin })
            const { token: _token } = await restApi.authenticateUser(email, password)
            token = _token
            user = await Users.findOne({ email })
            user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort }))
            await user.save()
            await restApi.changeDeviceId(token, deviceName, deviceName)
            await restApi.addOutput(token, deviceName, type, pinNumber)
        })

        it('should succed moving a WOTdevice servo output', async () => {
            const response = await restApi.setServoPosition(token, deviceName, pinNumber, angle)

            expect(response).to.exist
            expect(response.deviceid).to.equal(deviceName)
            expect(response.status).to.equal(5)
            angle = 120
            const response2 = await restApi.setServoPosition(token, deviceName, pinNumber, angle)

            expect(response2).to.exist
            expect(response2.deviceid).to.equal(deviceName)
            expect(response2.status).to.equal(120)
        })

        it('should fail on unexisting user token', async () => {
            let _token = 'unexistingToken'

            try {
                await await restApi.setServoPosition(_token, deviceName, pinNumber, angle)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`jwt malformed`)
            }
        })

        it('should fail on activating a undefined WOTdevice', async () => {
            deviceName = 'undefinedWOTdevice'

            try {
                await restApi.setServoPosition(token, deviceName, pinNumber, angle)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`A device named ${deviceName} does not exist in your collection`)
            }
        })

        it('should fail on null token', () => {
            const token = null

            expect(() => restApi.setServoPosition(token, deviceName, pinNumber, angle).to.throw(RequirementError, `token is not optional`))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => restApi.setServoPosition(token, deviceName, pinNumber, angle).to.throw(ValueError, 'token is empty'))
        })

        it('should fail on blank token', () => {
            const token = ' \t    \n'

            expect(() => restApi.setServoPosition(token, deviceName, pinNumber, angle).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined deviceName', () => {
            const deviceName = undefined

            expect(() => restApi.setServoPosition(token, deviceName, pinNumber, angle).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on null deviceName', () => {
            const deviceName = null

            expect(() => restApi.setServoPosition(token, deviceName, pinNumber, angle).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on empty deviceName', () => {
            const deviceName = ''

            expect(() => restApi.setServoPosition(token, deviceName, pinNumber, angle).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on blank deviceName', () => {
            const deviceName = ' \t    \n'
            expect(() => restApi.setServoPosition(token, deviceName, pinNumber, angle).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined pinNumber', () => {
            const pinNumber = undefined

            expect(() => restApi.setServoPosition(token, deviceName, pinNumber, angle).to.throw(RequirementError, `pinNumber is not optional`))
        })

        it('should fail on null pinNumber', () => {
            const pinNumber = null

            expect(() => restApi.setServoPosition(token, deviceName, pinNumber, angle).to.throw(RequirementError, `pinNumber is not optional`))
        })

        it('should fail on empty pinNumber', () => {
            const pinNumber = ''

            expect(() => restApi.setServoPosition(token, deviceName, pinNumber, angle).to.throw(ValueError, `pinNumber is empty`))
        })

        it('should fail on blank pinNumber', () => {
            const pinNumber = ' \t    \n'
            expect(() => restApi.setServoPosition(token, deviceName, pinNumber, angle).to.throw(ValueError, `pinNumber is empty`))
        })
    })

    describe('speeding a WOTdevice motor output', () => {
        let pinNumber = 1
        let speed = 100

        beforeEach(async() =>{
            email = `marcusontest-${Math.random()}@gmail.com`
            deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
            deviceIp = arduinoIp
            email = `marcusontest-${Math.random()}@gmail.com`
            let type = 'motor'
            _password = bcrypt.hashSync(password, 10)

            await Users.create({ name, surname, email, password: _password, isAdmin })
            const { token: _token } = await restApi.authenticateUser(email, password)
            token = _token
            user = await Users.findOne({ email })
            user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort }))
            await user.save()
            await restApi.changeDeviceId(token, deviceName, deviceName)
            await restApi.addOutput(token, deviceName, type, pinNumber)
        })

        it('should succed moving a WOTdevice motor output', async () => {
            const response = await restApi.setMotorSpeed(token, deviceName, pinNumber, speed)

            expect(response).to.exist
            expect(response.deviceid).to.equal(deviceName)
            expect(response.status).to.equal(100)
            speed = 0
            const response2 = await restApi.setMotorSpeed(token, deviceName, pinNumber, speed)

            expect(response2).to.exist
            expect(response2.deviceid).to.equal(deviceName)
            expect(response2.status).to.equal(0)
        })

        it('should fail on unexisting user token', async () => {
            let _token = 'unexistingToken'

            try {
                await await restApi.setMotorSpeed(_token, deviceName, pinNumber, speed)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`jwt malformed`)
            }
        })

        it('should fail on activating a undefined WOTdevice', async () => {
            deviceName = 'undefinedWOTdevice'

            try {
                await restApi.setMotorSpeed(token, deviceName, pinNumber, speed)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`A device named ${deviceName} does not exist in your collection`)
            }
        })

        it('should fail on null token', () => {
            const token = null

            expect(() => restApi.setMotorSpeed(token, deviceName, pinNumber, speed).to.throw(RequirementError, `token is not optional`))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => restApi.setMotorSpeed(token, deviceName, pinNumber, speed).to.throw(ValueError, 'token is empty'))
        })

        it('should fail on blank token', () => {
            const token = ' \t    \n'

            expect(() => restApi.setMotorSpeed(token, deviceName, pinNumber, speed).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined deviceName', () => {
            const deviceName = undefined

            expect(() => restApi.setMotorSpeed(token, deviceName, pinNumber, speed).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on null deviceName', () => {
            const deviceName = null

            expect(() => restApi.setMotorSpeed(token, deviceName, pinNumber, speed).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on empty deviceName', () => {
            const deviceName = ''

            expect(() => restApi.setMotorSpeed(token, deviceName, pinNumber, speed).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on blank deviceName', () => {
            const deviceName = ' \t    \n'
            expect(() => restApi.setMotorSpeed(token, deviceName, pinNumber, speed).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined pinNumber', () => {
            const pinNumber = undefined

            expect(() => restApi.setMotorSpeed(token, deviceName, pinNumber, speed).to.throw(RequirementError, `pinNumber is not optional`))
        })

        it('should fail on null pinNumber', () => {
            const pinNumber = null

            expect(() => restApi.setMotorSpeed(token, deviceName, pinNumber, speed).to.throw(RequirementError, `pinNumber is not optional`))
        })

        it('should fail on empty pinNumber', () => {
            const pinNumber = ''

            expect(() => restApi.setMotorSpeed(token, deviceName, pinNumber, speed).to.throw(ValueError, `pinNumber is empty`))
        })

        it('should fail on blank pinNumber', () => {
            const pinNumber = ' \t    \n'
            expect(() => restApi.setMotorSpeed(token, deviceName, pinNumber, speed).to.throw(ValueError, `pinNumber is empty`))
        })
    })

    describe('retrieving a WOTdevice analog input', () => {
        let pinNumber = 1
        let value = 0

        beforeEach(async() =>{
            email = `marcusontest-${Math.random()}@gmail.com`
            deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
            deviceIp = arduinoIp
            email = `marcusontest-${Math.random()}@gmail.com`
            let type = 'analog'
            _password = bcrypt.hashSync(password, 10)

            await Users.create({ name, surname, email, password: _password, isAdmin })
            const { token: _token } = await restApi.authenticateUser(email, password)
            token = _token
            user = await Users.findOne({ email })
            user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort }))
            await user.save()
            await restApi.changeDeviceId(token, deviceName, deviceName)
            await restApi.addInput(token, deviceName, type, pinNumber)
            user = await Users.findOne({ email })
            user.devices[0].inputs[0].values.push({value, date: Date.now()})
            value = Math.floor(Math.random()*100)
            user.devices[0].inputs[0].values.push({value, date: Date.now()})
            value = Math.floor(Math.random()*100)
            user.devices[0].inputs[0].values.push({value, date: Date.now()})
            await user.save()
        })

        it('should succed retrieving a WOTdevice analog value', async () => {

            const response = await restApi.retrieveAnalog(token, deviceName)

            expect(response).to.exist
            expect(response).to.be.instanceOf(Array)
            expect(response).to.have.lengthOf(3)
            expect(response[0].value).to.exist
            expect(response[0].date).to.exist
        })

        it('should fail on unexisting user token', async () => {
            let _token = 'unexistingToken'

            try {
                await await restApi.retrieveAnalog(_token, deviceName)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`jwt malformed`)
            }
        })

        it('should fail on retrieving a undefined WOTdevice', async () => {
            deviceName = 'undefinedWOTdevice'

            try {
                await restApi.retrieveAnalog(token, deviceName)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`A device named ${deviceName} does not exist in your collection`)
            }
        })

        it('should fail on null token', () => {
            const token = null

            expect(() => restApi.retrieveAnalog(token, deviceName).to.throw(RequirementError, `token is not optional`))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => restApi.retrieveAnalog(token, deviceName).to.throw(ValueError, 'token is empty'))
        })

        it('should fail on blank token', () => {
            const token = ' \t    \n'

            expect(() => restApi.retrieveAnalog(token, deviceName).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined deviceName', () => {
            const deviceName = undefined

            expect(() => restApi.retrieveAnalog(token, deviceName).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on null deviceName', () => {
            const deviceName = null

            expect(() => restApi.retrieveAnalog(token, deviceName).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on empty deviceName', () => {
            const deviceName = ''

            expect(() => restApi.retrieveAnalog(token, deviceName).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on blank deviceName', () => {
            const deviceName = ' \t    \n'
            expect(() => restApi.retrieveAnalog(token, deviceName).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined value', () => {
            const value = undefined

            expect(() => restApi.retrieveAnalog(token, deviceName).to.throw(RequirementError, `value is not optional`))
        })

        it('should fail on null value', () => {
            const value = null

            expect(() => restApi.retrieveAnalog(token, deviceName).to.throw(RequirementError, `value is not optional`))
        })

        it('should fail on empty value', () => {
            const value = ''

            expect(() => restApi.retrieveAnalog(token, deviceName).to.throw(ValueError, `value is empty`))
        })

        it('should fail on blank value', () => {
            const value = ' \t    \n'
            expect(() => restApi.retrieveAnalog(token, deviceName).to.throw(ValueError, `value is empty`))
        })
    })

    describe('retrieving a WOTdevice digital input', () => {
        let pinNumber = 1
        let value = 0

        beforeEach(async() =>{
            email = `marcusontest-${Math.random()}@gmail.com`
            deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
            deviceIp = arduinoIp
            email = `marcusontest-${Math.random()}@gmail.com`
            let type = 'digital'
            _password = bcrypt.hashSync(password, 10)

            await Users.create({ name, surname, email, password: _password, isAdmin })
            const { token: _token } = await restApi.authenticateUser(email, password)
            token = _token
            user = await Users.findOne({ email })
            user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort }))
            await user.save()
            await restApi.changeDeviceId(token, deviceName, deviceName)
            await restApi.addInput(token, deviceName, type, pinNumber)
            user = await Users.findOne({ email })
            user.devices[0].inputs[0].values.push({value, date: Date.now()})
            value = 1
            user.devices[0].inputs[0].values.push({value, date: Date.now()})
            value = 0
            user.devices[0].inputs[0].values.push({value, date: Date.now()})
            await user.save()
        })

        it('should succed retrieving a WOTdevice digital value', async () => {

            const response = await restApi.retrieveDigital(token, deviceName, pinNumber)

            expect(response).to.exist
            expect(response).to.be.instanceOf(Array)
            expect(response).to.have.lengthOf(3)
            expect(response[0].value).to.exist
            expect(response[0].date).to.exist
        })

        it('should fail on unexisting user token', async () => {
            let _token = 'unexistingToken'

            try {
                await await restApi.retrieveDigital(_token, deviceName, pinNumber)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`jwt malformed`)
            }
        })

        it('should fail on retrieving a undefined WOTdevice', async () => {
            deviceName = 'undefinedWOTdevice'

            try {
                await restApi.retrieveDigital(token, deviceName, pinNumber)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.equal(`A device named ${deviceName} does not exist in your collection`)
            }
        })

        it('should fail on null token', () => {
            const token = null

            expect(() => restApi.retrieveDigital(token, deviceName, pinNumber).to.throw(RequirementError, `token is not optional`))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => restApi.retrieveDigital(token, deviceName, pinNumber).to.throw(ValueError, 'token is empty'))
        })

        it('should fail on blank token', () => {
            const token = ' \t    \n'

            expect(() => restApi.retrieveDigital(token, deviceName, pinNumber).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined deviceName', () => {
            const deviceName = undefined

            expect(() => restApi.retrieveDigital(token, deviceName, pinNumber).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on null deviceName', () => {
            const deviceName = null

            expect(() => restApi.retrieveDigital(token, deviceName, pinNumber).to.throw(RequirementError, `deviceName is not optional`))
        })

        it('should fail on empty deviceName', () => {
            const deviceName = ''

            expect(() => restApi.retrieveDigital(token, deviceName, pinNumber).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on blank deviceName', () => {
            const deviceName = ' \t    \n'
            expect(() => restApi.retrieveDigital(token, deviceName, pinNumber).to.throw(ValueError, 'deviceName is empty'))
        })

        it('should fail on undefined value', () => {
            const value = undefined

            expect(() => restApi.retrieveDigital(token, deviceName, pinNumber).to.throw(RequirementError, `value is not optional`))
        })

        it('should fail on null value', () => {
            const value = null

            expect(() => restApi.retrieveDigital(token, deviceName, pinNumber).to.throw(RequirementError, `value is not optional`))
        })

        it('should fail on empty value', () => {
            const value = ''

            expect(() => restApi.retrieveDigital(token, deviceName, pinNumber).to.throw(ValueError, `value is empty`))
        })

        it('should fail on blank value', () => {
            const value = ' \t    \n'
            expect(() => restApi.retrieveDigital(token, deviceName, pinNumber).to.throw(ValueError, `value is empty`))
        })
    })

    after(async () => {
        let users = await Users.find({ $and: [{ email }, { 'devices.name': deviceName }] })
        if (users.length > 0) await restApi.changeDeviceId(token, deviceName, 'newWOTDevice')
        mongoose.disconnect()
    })
})