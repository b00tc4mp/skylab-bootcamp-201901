require('dotenv').config()
const bcrypt = require('bcrypt')
const { expect } =  require ('chai')
const logic = require('.')
const { LogicError, RequirementError, ValueError, FormatError } = require('wotcontrol-errors')
const {models, mongoose} = require('wotcontrol-data')

const { Users, Devices } = models;
const { env: { MONGO_URL_LOGIC_TEST : url }} = process

const arduinoIp = `192.168.0.59`

describe('logic', () => {

    before(async () => {
        await mongoose.connect(url, { useNewUrlParser: true })
    })

    const name = 'Marc'
    const surname = 'Uson'
    let email
    let password = '123'
    const isAdmin = true;
    let id
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
                expect(_user[0].id).to.exist
                expect(_user[0].id).to.be.a('string')
                expect(_user[0].admin).to.be.false
            })

            it('should succeed on correct admin user data', async () => {
                const res = await logic.registerUser(name, surname, email, password, isAdmin)

                expect(res).to.not.exist

                const _user = await Users.find({ email })

                expect(_user).to.exist
                expect(_user).to.be.an.instanceOf(Array)
                expect(_user[0].id).to.exist
                expect(_user[0].id).to.be.a('string')
                expect(_user[0].admin).to.be.true
            })

            it('should succeed on registering email in lower case', async () => {

                const uperCaseEmail = email.toUpperCase()

                const res = await logic.registerUser(name, surname, uperCaseEmail, password)

                expect(res).to.not.exist

                const _user = await Users.find({ email })

                expect(_user).to.exist
                expect(_user).to.be.an.instanceOf(Array)
                expect(_user[0].id).to.exist
                expect(_user[0].id).to.be.a('string')
                expect(_user[0].admin).to.be.false
            })

            describe('on already existing user', () => {
                let _password
                beforeEach(async () => {
                    _password = bcrypt.hashSync(password, 10)
                    await Users.create({ name, surname, email, password: _password })
                })

                it('should fail on retrying to register', async () => {
                    try {
                        await logic.registerUser(name, surname, email, password)

                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

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

        describe('authenticate user', () => {
            let _password
                beforeEach(async () => {
                    _password = bcrypt.hashSync(password, 10)
                    await Users.create({ name, surname, email, password: _password })
                })

            it('should succeed on correct user credential', async () => {
                const id = await logic.authenticateUser(email, password)

                expect(id).to.be.a('string')
                expect(id.length).to.be.greaterThan(0)
            })

            it('should fail on wrong passwotd', async () => {
                try {
                    await logic.authenticateUser(email, password='000')

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)

                    expect(error.message).to.equal(`wrong credentials`)
                }
            })

            it('should fail on non-existing user', async () => {
                try {
                    await logic.authenticateUser(email = 'unexisting-user@mail.com', password)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with email "${email}" does not exist`)
                }
            })
        })

        describe('retrieve user', () => {
            let id
            let _password

            beforeEach(async () => {
                _password = bcrypt.hashSync(password, 10)

                await Users.create({ name, surname, email, password: _password })

                const users = await Users.find({email})

                id = users[0].id
            })

            it('should succeed on correct user id from existing user', async () => {
                const user = await logic.retrieveUser(id)

                expect(user.id).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.not.exist
            })

            it('should fail on unexisting user id', async () => {
                id = '01234567890123456789abcd'

                try {
                    await logic.retrieveUser(id)

                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id "${id}" does not exist`)
                }
            })
        })

        describe('update user', () => {
            let id
            let _password

            beforeEach(async () => {
                _password = bcrypt.hashSync(password, 10)

                await Users.create({ name, surname, email, password: _password })

                const users = await Users.find({ email })

                id = users[0].id
            })

            it('should succeed on updating user name', async () => {
                let newName = 'newName'
                const response = await logic.updateUser(id, {name: newName})

                expect(response).to.be.a('string')
                expect(response).to.equal('User succesfully updated')

                const user = await logic.retrieveUser(id)

                expect(user.id).to.not.exist
                expect(user.name).to.equal(newName)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.not.exist
            })

            it('should succeed on updating user surname', async () => {
                let newSurname = 'newSurname'
                const response = await logic.updateUser(id, {surname: newSurname})

                expect(response).to.be.a('string')
                expect(response).to.equal('User succesfully updated')

                const user = await logic.retrieveUser(id)

                expect(user.id).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(newSurname)
                expect(user.email).to.equal(email)
                expect(user.password).to.not.exist
            })

            it('should succeed on updating user email', async () => {
                let newEmail = 'newemail@mail.com'

                const response = await logic.updateUser(id, {email: newEmail})

                expect(response).to.be.a('string')
                expect(response).to.equal('User succesfully updated')

                const user = await logic.retrieveUser(id)

                expect(user.id).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(newEmail)
                expect(user.password).to.not.exist
            })

            it('should succeed on updating user password', async () => {
                let newPassword = 'newpassword'

                const response = await logic.updateUser(id, {password: newPassword})

                expect(response).to.be.a('string')
                expect(response).to.equal('User succesfully updated')

                const user = await logic.retrieveUser(id)

                expect(user.id).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.not.exist

                const _id = await logic.authenticateUser(email, newPassword)

                expect(_id).to.be.a('string')
                expect(_id.length).to.be.greaterThan(0)
            })

            it('should fail on unexisting user id', async () => {
                id = '01234567890123456789abcd'

                try {
                    await logic.updateUser(id, {email})

                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id "${id}" does not exist`)
                }
            })
        })

        describe('delete user', () => {
            let id
            let _password

            beforeEach(async () => {
                _password = bcrypt.hashSync(password, 10)

                await Users.create({ name, surname, email, password: _password })

                const users = await Users.find({email})

                id = users[0].id
            })

            it('should succeed on deleting', async () => {
                const response = await logic.deleteUser(id)

                expect(response).to.be.a('string')
                expect(response).to.equal('User succesfully deleted')

                try {
                    await logic.retrieveUser(id)

                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id "${id}" does not exist`)
                }
            })

            it('should fail on unexisting user id', async () => {
                id = '01234567890123456789abcd'

                try {
                    await logic.deleteUser(id)

                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id "${id}" does not exist`)
                }
            })
        })

    })

    describe('WOTdevices', () => {

        describe('check if WOTdevice exists', () => {
            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = arduinoIp

                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})
                id = user.id
            })

            it('should succed on checking the selected WOTdevice', async () => {
                const response = await logic.checkDevice(id, deviceIp, devicePort)

                expect(response).to.exist
                expect(response.HELLO).to.equal('WORLD!')
                expect(response.userid).to.exist
                expect(response.deviceid).to.exist
                expect(response.status).to.exist
                expect(response.interval).to.exist
            })

            it('should fail on checking a WOTdevice from unexisting user', async () => {
                let _id = 'unexistingId'

                try {
                    await logic.checkDevice(_id, deviceIp,devicePort)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }
            })

            it('should fail on checking a unexisting WOTdevice ip', async () => {
                const _deviceIp = '99.99.99.99'

                try {
                    await logic.checkDevice(id, _deviceIp, devicePort)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`Connection timed out`)
                }
            })

            it('should fail on checking a wrong WOTdevice port', async () => {
                let _devicePort = 90

                try {
                    await logic.checkDevice(id, deviceIp, _devicePort)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`Connection refused`)
                }
            })


            it('should fail on null id', () => {
                const id = null

                expect(() => logic.checkDevice(id, deviceIp, devicePort).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.checkDevice(id, deviceIp, devicePort).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.checkDevice(id, deviceIp, devicePort).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceIp', () => {
                const deviceIp = undefined

                expect(() => logic.checkDevice(id, deviceIp, devicePort).to.throw(RequirementError, `deviceIp is not optional`))
            })

            it('should fail on null deviceIp', () => {
                const deviceIp = null

                expect(() => logic.checkDevice(id, deviceIp, devicePort).to.throw(RequirementError, `deviceIp is not optional`))
            })

            it('should fail on empty deviceIp', () => {
                const deviceIp = ''

                expect(() => logic.checkDevice(id, deviceIp, devicePort).to.throw(ValueError, 'deviceIp is empty'))
            })

            it('should fail on blank deviceIp', () => {
                const deviceIp = ' \t    \n'
                expect(() => logic.checkDevice(id, deviceIp, devicePort).to.throw(ValueError, 'deviceIp is empty'))
            })

            it('should fail on undefined devicePort', () => {
                const devicePort = undefined

                expect(() => logic.checkDevice(id, deviceIp, devicePort).to.throw(RequirementError, `devicePort is not optional`))
            })

            it('should fail on null devicePort', () => {
                const devicePort = null

                expect(() => logic.checkDevice(id, deviceIp, devicePort).to.throw(RequirementError, `devicePort is not optional`))
            })

            it('should fail on empty devicePort', () => {
                const devicePort = ''

                expect(() => logic.checkDevice(id, deviceIp, devicePort).to.throw(ValueError, `devicePort is empty`))
            })

            it('should fail on blank devicePort', () => {
                const devicePort = ' \t    \n'
                expect(() => logic.checkDevice(id, deviceIp, devicePort).to.throw(ValueError, `devicePort is empty`))
            })
        })

        describe('register WOTdevice', () => {

            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = `192.168.${String(Math.floor(Math.random()*100))}.${String(Math.floor(Math.random()*255))}`

                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})

                id = user.id
            })

            it('should succeed on correct WOTdevice register', async () => {
                const response = await logic.addDevice(id, deviceName, deviceIp, devicePort)

                expect(response).to.not.exist

                const _user = await Users.findById(id)

                const { devices } = _user

                expect(_user.id).to.equal(id)
                expect(devices).to.exist
                expect(devices).to.be.instanceOf(Array)
                expect(devices).to.have.length(1)
                expect(devices[0].name).to.equal(deviceName)
                expect(devices[0].ip).to.equal(deviceIp)
                expect(devices[0].port).to.equal(devicePort)
            })

            it('should succeed on two correct WOTdevices register', async () => {

                await logic.addDevice(id, deviceName, deviceIp, devicePort)

                let _user = await Users.findById(id)

                let { devices } = _user

                expect(devices).to.have.length(1)
                expect(devices[0].name).to.equal(deviceName)
                expect(devices[0].ip).to.equal(deviceIp)
                expect(devices[0].port).to.equal(devicePort)

                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = `192.168.${String(Math.floor(Math.random()*100))}.${String(Math.floor(Math.random()*255))}`

                const response = await logic.addDevice(id, deviceName, deviceIp, devicePort)

                expect(response).to.not.exist

                _user = await Users.findById(id)

                const { devices:_devices } = _user

                expect(_user.id).to.equal(id)
                expect(_devices).to.exist
                expect(_devices).to.be.instanceOf(Array)
                expect(_devices).to.have.length(2)
                expect(_devices[1].name).to.equal(deviceName)
                expect(_devices[1].ip).to.equal(deviceIp)
                expect(_devices[1].port).to.equal(devicePort)
            })

            it('should fail adding a new WOTdevice with an already used name', async () => {
                const _ip = '192.168.0.0'
                const user = await Users.findById(id)

                user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                await user.save()

                try {
                    await logic.addDevice(id, deviceName, _ip, devicePort)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device named ${deviceName} is already in your collection`)
                }
            })

            it('should fail adding a new WOTdevice with an already used ip', async () => {
                const _deviceName = 'newName'
                const user = await Users.findById(id)

                user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                await user.save()

                try {
                    await logic.addDevice(id, _deviceName, deviceIp, devicePort)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device with ip ${deviceIp} is already in your collection`)
                }
            })

            it('should fail adding a new WOTdevice to an unexisting user', async () => {
                let _id = 'unexistingId'
                try {
                    await logic.addDevice(_id, deviceName, deviceIp, devicePort)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }
            })

            it('should fail on undefined device id', () => {
                const id = undefined

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined device deviceName', () => {
                const deviceName = undefined

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined device deviceIp', () => {
                const deviceIp = undefined

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(RequirementError, `deviceIp is not optional`))
            })

            it('should fail on null deviceIp', () => {
                const deviceIp = null

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(RequirementError, `deviceIp is not optional`))
            })

            it('should fail on empty deviceIp', () => {
                const deviceIp = ''

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(ValueError, 'deviceIp is empty'))
            })

            it('should fail on blank deviceIp', () => {
                const deviceIp = ' \t    \n'

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(ValueError, 'deviceIp is empty'))
            })

            it('should fail on undefined device devicePort', () => {
                const devicePort = undefined

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(RequirementError, `devicePort is not optional`))
            })

            it('should fail on null devicePort', () => {
                const devicePort = null

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(RequirementError, `devicePort is not optional`))
            })

            it('should fail on empty devicePort', () => {
                const devicePort = ''

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(ValueError, `devicePort is empty`))
            })

            it('should fail on blank devicePort', () => {
                const devicePort = ' \t    \n'

                expect(() => logic.addDevice(id, deviceName, deviceIp, devicePort).to.throw(ValueError, `devicePort is empty`))
            })
        })

        describe('delete WOTdevice', () => {

            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = `192.168.${String(Math.floor(Math.random()*100))}.${String(Math.floor(Math.random()*255))}`

                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})

                id = user.id
            })

            it('should succeed on correct WOTdevice deletion', async () => {
                await logic.addDevice(id, deviceName, deviceIp, devicePort)
                await logic.deleteDevice(id, deviceName)

                const _user = await Users.findById(id)

                const { devices } = _user

                expect(_user.id).to.equal(id)
                expect(devices).to.exist
                expect(devices).to.be.instanceOf(Array)
                expect(devices).to.have.length(0)
            })

            it('should fail on unexisting user', async () => {
                await logic.addDevice(id, deviceName, deviceIp, devicePort)

                let _id = 'unexistingId'

                try {
                    await logic.deleteDevice(_id, deviceName)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }

            })

            it('should fail on unexisting device', async () => {
                await logic.addDevice(id, deviceName, deviceIp, devicePort)

                deviceName = 'unexisting device'

                try {
                    await logic.deleteDevice(id, deviceName)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device named ${deviceName} does not exist`)
                }

            })


            it('should fail on undefined id', () => {
                const id = undefined

                expect(() => logic.deleteDevice(id, deviceName, deviceIp, devicePort).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.deleteDevice(id, deviceName, deviceIp, devicePort).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.deleteDevice(id, deviceName, deviceIp, devicePort).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.deleteDevice(id, deviceName).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined device deviceName', () => {
                const deviceName = undefined

                expect(() => logic.deleteDevice(id, deviceName).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.deleteDevice(id, deviceName).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.deleteDevice(id, deviceName).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'

                expect(() => logic.deleteDevice(id, deviceName).to.throw(ValueError, 'deviceName is empty'))
            })

        })

        describe('manage WOTdevice inputs', () =>{
            let inputType = ''
            let inputDirection = 0

            describe('add inputs', () => {
                beforeEach(async() =>{
                    email = `marcusontest-${Math.random()}@gmail.com`
                    deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                    deviceIp = `192.168.${String(Math.floor(Math.random()*100))}.${String(Math.floor(Math.random()*255))}`

                    await Users.create({ name, surname, email, password, isAdmin })
                    user = await Users.findOne({email})
                    id = user.id
                    user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                    await user.save()
                })

                it('should succed adding a new WOTdevice digital input', async()=>{
                    inputType = 'digital'
                    inputDirection = 1

                    const response = await logic.addInput(id, deviceName, inputType, inputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

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
                    await logic.addInput(id, deviceName, inputType, inputDirection)
                    const response = await logic.addInput(id, deviceName, inputType, _inputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

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
                    const response = await logic.addInput(id, deviceName, inputType, inputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

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
                    let _id = 'unexistingId'

                    try {
                        await logic.addInput(_id, deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                    }
                })

                it('should fail adding a input to a unexisting WOTdevice', async()=>{
                    inputType = 'digital'
                    inputDirection = 1
                    let _deviceName = 'wrongName'

                    try {
                        await logic.addInput(id, _deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`A device named ${_deviceName} does not exist in your collection`)
                    }
                })

                it('should fail adding three WOTdevice digital input', async()=>{
                    inputType = 'digital'
                    inputDirection = 1
                    let _inputDirection = 2
                    await logic.addInput(id, deviceName, inputType, inputDirection)
                    await logic.addInput(id, deviceName, inputType, _inputDirection)

                    try {
                        const response = await logic.addInput(id, deviceName, inputType, _inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`The device ${deviceName} could not have more ${inputType} inputs`)
                    }
                })

                it('should fail adding two WOTdevice analog input', async()=>{
                    inputType = 'analog'
                    inputDirection = 1
                    await logic.addInput(id, deviceName, inputType, inputDirection)

                    try {
                        const response = await logic.addInput(id, deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`The device ${deviceName} could not have more ${inputType} inputs`)
                    }
                })

                it('should fail adding a WOTdevice digital input with wrong direction', async()=>{
                    inputType = 'digital'
                    inputDirection = 3

                    try {
                        const response = await logic.addInput(id, deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`${inputDirection} is not a valid direction for a ${inputType} input`)
                    }
                })

                it('should fail adding a WOTdevice analog input with wrong direction', async()=>{
                    inputType = 'analog'
                    inputDirection = 2

                    try {
                        const response = await logic.addInput(id, deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`${inputDirection} is not a valid direction for a ${inputType} input`)
                    }
                })

                it('should fail adding a WOTdevice with wrong type', async()=>{
                    inputType = 'invalidType'
                    inputDirection = 2

                    try {
                        const response = await logic.addInput(id, deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`${inputType} is not a valid input type`)
                    }

                })

                it('should fail on undefined device id', () => {
                    const id = undefined

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `id is not optional`))
                })

                it('should fail on null id', () => {
                    const id = null

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `id is not optional`))
                })

                it('should fail on empty id', () => {
                    const id = ''

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'id is empty'))
                })

                it('should fail on blank id', () => {
                    const id = ' \t    \n'

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'deviceName is empty'))
                })

                it('should fail on undefined deviceName', () => {
                    const deviceName = undefined

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `deviceName is not optional`))
                })

                it('should fail on null deviceName', () => {
                    const deviceName = null

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `deviceName is not optional`))
                })

                it('should fail on empty deviceName', () => {
                    const deviceName = ''

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'deviceName is empty'))
                })

                it('should fail on blank deviceName', () => {
                    const deviceName = ' \t    \n'
                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'deviceName is empty'))
                })

                it('should fail on undefined inputType', () => {
                    const inputType = undefined

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputType is not optional`))
                })

                it('should fail on null inputType', () => {
                    const inputType = null

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputType is not optional`))
                })

                it('should fail on empty inputType', () => {
                    const inputType = ''

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputType is empty'))
                })

                it('should fail on blank inputType', () => {
                    const inputType = ' \t    \n'

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputType is empty'))
                })

                it('should fail on undefined inputDirection', () => {
                    const inputDirection = undefined

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputDirection is not optional`))
                })

                it('should fail on null inputDirection', () => {
                    const inputDirection = null

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputDirection is not optional`))
                })

                it('should fail on empty inputDirection', () => {
                    const inputDirection = ''

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputDirection is empty'))
                })

                it('should fail on blank inputDirection', () => {
                    const inputDirection = ' \t    \n'

                    expect(() => logic.addInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputDirection is empty'))
                })
            })

            describe('delete inputs', () => {
                beforeEach(async() =>{
                    email = `marcusontest-${Math.random()}@gmail.com`
                    deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                    deviceIp = `192.168.${String(Math.floor(Math.random()*100))}.${String(Math.floor(Math.random()*255))}`

                    await Users.create({ name, surname, email, password, isAdmin })
                    user = await Users.findOne({email})
                    id = user.id
                    user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                    await user.save()
                })

                it('should succed deleting a WOTdevice digital input', async()=>{
                    inputType = 'digital'
                    inputDirection = 1
                    await logic.addInput(id, deviceName, inputType, inputDirection)
                    inputDirection = 2
                    await logic.addInput(id, deviceName, inputType, inputDirection)
                    debugger
                    const response = await logic.deleteInput(id, deviceName, inputType, inputDirection)
                    inputType = 'analog'
                    inputDirection = 1
                    await logic.addInput(id, deviceName, inputType, inputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

                    expect(user.devices[0].name).to.equal(deviceName)
                    expect(user.devices[0].inputs).to.exist
                    expect(user.devices[0].inputs).to.be.instanceOf(Array)
                    expect(user.devices[0].inputs).to.have.length(2)
                })

                it('should succed deleting two WOTdevice digital input', async()=>{
                    inputType = 'digital'
                    inputDirection = 1
                    let _inputDirection = 2
                    await logic.addInput(id, deviceName, inputType, inputDirection)
                    await logic.addInput(id, deviceName, inputType, _inputDirection)

                    await logic.deleteInput(id, deviceName, inputType, inputDirection)
                    const response = await logic.deleteInput(id, deviceName, inputType, _inputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

                    expect(user.devices[0].name).to.equal(deviceName)
                    expect(user.devices[0].inputs).to.exist
                    expect(user.devices[0].inputs).to.be.instanceOf(Array)
                    expect(user.devices[0].inputs).to.have.length(0)

                })

                it('should succed deleting a WOTdevice analog input', async()=>{
                    inputType = 'digital'
                    inputDirection = 1
                    await logic.addInput(id, deviceName, inputType, inputDirection)
                    inputType = 'analog'
                    inputDirection = 1
                    await logic.addInput(id, deviceName, inputType, inputDirection)
                    const response = await logic.deleteInput(id, deviceName, inputType, inputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

                    expect(user.devices[0].name).to.equal(deviceName)
                    expect(user.devices[0].inputs).to.exist
                    expect(user.devices[0].inputs).to.be.instanceOf(Array)
                    expect(user.devices[0].inputs).to.have.length(1)
                })

                it('should fail deleting a input to a unexisting user', async()=>{
                    inputType = 'digital'
                    inputDirection = 1
                    let _id = 'unexistingId'

                    try {
                        await logic.deleteInput(_id, deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                    }
                })

                it('should fail deleting a input to a unexisting WOTdevice', async()=>{
                    inputType = 'digital'
                    inputDirection = 1
                    let _deviceName = 'wrongName'

                    try {
                        await logic.deleteInput(id, _deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`A device named ${_deviceName} does not exist in your collection`)
                    }
                })

                it('should fail deleting unexisting WOTdevice digital input', async()=>{
                    inputType = 'digital'
                    inputDirection = 1

                    try {
                        await logic.deleteInput(id, deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`The device ${deviceName} don't have any ${inputType} input`)
                    }
                })

                it('should fail deleting WOTdevice digital input in a undefined input direction', async()=>{
                    inputType = 'digital'
                    inputDirection = 1
                    let _inputDirection = 2

                    await logic.addInput(id, deviceName, inputType, inputDirection)

                    try {
                        await logic.deleteInput(id, deviceName, inputType, _inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`The device ${deviceName} don't have any ${inputType} input asigned to ${_inputDirection} direction`)
                    }
                })

                it('should fail deleting unexisting WOTdevice analog input', async()=>{
                    inputType = 'analog'
                    inputDirection = 1

                    try {
                        await logic.deleteInput(id, deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`The device ${deviceName} don't have any ${inputType} input`)
                    }
                })

                it('should fail deleting a WOTdevice digital input with wrong direction', async()=>{
                    inputType = 'digital'
                    inputDirection = 3

                    try {
                        await logic.deleteInput(id, deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`${inputDirection} is not a valid direction for a ${inputType} input`)
                    }
                })

                it('should fail deleting a WOTdevice analog input with wrong direction', async()=>{
                    inputType = 'analog'
                    inputDirection = 2

                    try {
                        await logic.deleteInput(id, deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`${inputDirection} is not a valid direction for a ${inputType} input`)
                    }
                })

                it('should fail deleting a WOTdevice with wrong type', async()=>{
                    inputType = 'invalidType'
                    inputDirection = 2

                    try {
                        await logic.deleteInput(id, deviceName, inputType, inputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`${inputType} is not a valid input type`)
                    }
                })

                it('should fail on undefined device id', () => {
                    const id = undefined

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `id is not optional`))
                })

                it('should fail on null id', () => {
                    const id = null

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `id is not optional`))
                })

                it('should fail on empty id', () => {
                    const id = ''

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'id is empty'))
                })

                it('should fail on blank id', () => {
                    const id = ' \t    \n'

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'deviceName is empty'))
                })

                it('should fail on undefined deviceName', () => {
                    const deviceName = undefined

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `deviceName is not optional`))
                })

                it('should fail on null deviceName', () => {
                    const deviceName = null

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `deviceName is not optional`))
                })

                it('should fail on empty deviceName', () => {
                    const deviceName = ''

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'deviceName is empty'))
                })

                it('should fail on blank deviceName', () => {
                    const deviceName = ' \t    \n'
                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'deviceName is empty'))
                })

                it('should fail on undefined inputType', () => {
                    const inputType = undefined

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputType is not optional`))
                })

                it('should fail on null inputType', () => {
                    const inputType = null

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputType is not optional`))
                })

                it('should fail on empty inputType', () => {
                    const inputType = ''

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputType is empty'))
                })

                it('should fail on blank inputType', () => {
                    const inputType = ' \t    \n'

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputType is empty'))
                })

                it('should fail on undefined inputDirection', () => {
                    const inputDirection = undefined

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputDirection is not optional`))
                })

                it('should fail on null inputDirection', () => {
                    const inputDirection = null

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `inputDirection is not optional`))
                })

                it('should fail on empty inputDirection', () => {
                    const inputDirection = ''

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputDirection is empty'))
                })

                it('should fail on blank inputDirection', () => {
                    const inputDirection = ' \t    \n'

                    expect(() => logic.deleteInput(id, deviceName, inputType, inputDirection).to.throw(ValueError, 'inputDirection is empty'))
                })
            })
        })

        describe('manage WOTdevice outputs', () =>{
            let outputType = ''
            let outputDirection = 0

            describe('add outputs', () => {
                beforeEach(async() =>{
                    email = `marcusontest-${Math.random()}@gmail.com`
                    deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                    deviceIp = `192.168.${String(Math.floor(Math.random()*100))}.${String(Math.floor(Math.random()*255))}`

                    await Users.create({ name, surname, email, password, isAdmin })
                    user = await Users.findOne({email})
                    id = user.id
                    user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                    await user.save()
                })

                it('should succed adding a new WOTdevice digital output', async()=>{
                    outputType = 'digital'
                    outputDirection = 1
                    const response = await logic.addOutput(id, deviceName, outputType, outputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

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
                    await logic.addOutput(id, deviceName, outputType, outputDirection)
                    const response = await logic.addOutput(id, deviceName, outputType, _outputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

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
                    const response = await logic.addOutput(id, deviceName, outputType, outputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

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
                    await logic.addOutput(id, deviceName, outputType, outputDirection)
                    const response = await logic.addOutput(id, deviceName, outputType, _outputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

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
                    const response = await logic.addOutput(id, deviceName, outputType, outputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

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
                    await logic.addOutput(id, deviceName, outputType, outputDirection)
                    const response = await logic.addOutput(id, deviceName, outputType, _outputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

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
                    let _id = 'unexistingId'

                    try {
                        await logic.addInput(_id, deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                    }
                })

                it('should fail adding a output to a unexisting WOTdevice', async()=>{
                    outputType = 'digital'
                    outputDirection = 1
                    let _deviceName = 'wrongName'

                    try {
                        await logic.addInput(id, _deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`A device named ${_deviceName} does not exist in your collection`)
                    }
                })

                it('should fail adding three WOTdevice digital output', async()=>{
                    outputType = 'digital'
                    outputDirection = 1
                    let _outputDirection = 2
                    await logic.addOutput(id, deviceName, outputType, outputDirection)
                    await logic.addOutput(id, deviceName, outputType, _outputDirection)

                    try {
                        const response = await logic.addOutput(id, deviceName, outputType, _outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`The device ${deviceName} could not have more ${outputType} outputs`)
                    }
                })

                it('should fail adding three WOTdevice motor output', async()=>{
                    outputType = 'motor'
                    outputDirection = 1
                    await logic.addOutput(id, deviceName, outputType, outputDirection)
                    let _outputDirection = 2
                    await logic.addOutput(id, deviceName, outputType, _outputDirection)

                    try {
                        const response = await logic.addOutput(id, deviceName, outputType, _outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`The device ${deviceName} could not have more ${outputType} outputs`)
                    }
                })

                it('should fail adding a WOTdevice digital output with wrong direction', async()=>{
                    outputType = 'digital'
                    outputDirection = 3

                    try {
                        const response = await logic.addOutput(id, deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`${outputDirection} is not a valid direction for a ${outputType} output`)
                    }
                })

                it('should fail adding a WOTdevice motor output with wrong direction', async()=>{
                    outputType = 'motor'
                    outputDirection = 3

                    try {
                        const response = await logic.addOutput(id, deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`${outputDirection} is not a valid direction for a ${outputType} output`)
                    }
                })

                it('should fail adding a WOTdevice motor output with wrong direction', async()=>{
                    outputType = 'servo'
                    outputDirection = 4

                    try {
                        const response = await logic.addOutput(id, deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`${outputDirection} is not a valid direction for a ${outputType} output`)
                    }
                })

                it('should fail adding a WOTdevice with wrong type', async()=>{
                    outputType = 'invalidType'
                    outputDirection = 2

                    try {
                        const response = await logic.addOutput(id, deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`${outputType} is not a valid output type`)
                    }

                })

                it('should fail on undefined device id', () => {
                    const id = undefined

                    expect(() => logic.addOutput(id, deviceName, inputType, inputDirection).to.throw(RequirementError, `id is not optional`))
                })

                it('should fail on null id', () => {
                    const id = null

                    expect(() => logic.addOutput(id, deviceName, inputType, outputDirection).to.throw(RequirementError, `id is not optional`))
                })

                it('should fail on empty id', () => {
                    const id = ''

                    expect(() => logic.addOutput(id, deviceName, inputType, outputDirection).to.throw(ValueError, 'id is empty'))
                })

                it('should fail on blank id', () => {
                    const id = ' \t    \n'

                    expect(() => logic.addOutput(id, deviceName, inputType, outputDirection).to.throw(ValueError, 'deviceName is empty'))
                })

                it('should fail on undefined deviceName', () => {
                    const deviceName = undefined

                    expect(() => logic.addOutput(id, deviceName, inputType, outputDirection).to.throw(RequirementError, `deviceName is not optional`))
                })

                it('should fail on null deviceName', () => {
                    const deviceName = null

                    expect(() => logic.addOutput(id, deviceName, inputType, outputDirection).to.throw(RequirementError, `deviceName is not optional`))
                })

                it('should fail on empty deviceName', () => {
                    const deviceName = ''

                    expect(() => logic.addOutput(id, deviceName, inputType, outputDirection).to.throw(ValueError, 'deviceName is empty'))
                })

                it('should fail on blank deviceName', () => {
                    const deviceName = ' \t    \n'
                    expect(() => logic.addOutput(id, deviceName, inputType, outputDirection).to.throw(ValueError, 'deviceName is empty'))
                })

                it('should fail on undefined outputType', () => {
                    const outputType = undefined

                    expect(() => logic.addOutput(id, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputType is not optional`))
                })

                it('should fail on null outputType', () => {
                    const outputType = null

                    expect(() => logic.addOutput(id, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputType is not optional`))
                })

                it('should fail on empty outputType', () => {
                    const outputType = ''

                    expect(() => logic.addOutput(id, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputType is empty'))
                })

                it('should fail on blank outputType', () => {
                    const outputType = ' \t    \n'

                    expect(() => logic.addOutput(id, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputType is empty'))
                })

                it('should fail on undefined outputDirection', () => {
                    const outputDirection = undefined

                    expect(() => logic.addOutput(id, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputDirection is not optional`))
                })

                it('should fail on null outputDirection', () => {
                    const outputDirection = null

                    expect(() => logic.addOutput(id, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputDirection is not optional`))
                })

                it('should fail on empty outputDirection', () => {
                    const outputDirection = ''

                    expect(() => logic.addOutput(id, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputDirection is empty'))
                })

                it('should fail on blank outputDirection', () => {
                    const outputDirection = ' \t    \n'

                    expect(() => logic.addOutput(id, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputDirection is empty'))
                })
            })

            describe('delete outputs', () => {
                beforeEach(async() =>{
                    email = `marcusontest-${Math.random()}@gmail.com`
                    deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                    deviceIp = `192.168.${String(Math.floor(Math.random()*100))}.${String(Math.floor(Math.random()*255))}`

                    await Users.create({ name, surname, email, password, isAdmin })
                    user = await Users.findOne({email})
                    id = user.id
                    user.devices.push(new Devices({ name: deviceName, ip: deviceIp, port: devicePort}))
                    await user.save()
                })

                it('should succed deleting a WOTdevice digital output', async()=>{
                    outputType = 'digital'
                    outputDirection = 1
                    await logic.addOutput(id, deviceName, outputType, outputDirection)
                    outputDirection = 2
                    await logic.addOutput(id, deviceName, outputType, outputDirection)
                    const response = await logic.deleteOutput(id, deviceName, outputType, outputDirection)
                    outputType = 'motor'
                    outputDirection = 1
                    await logic.addOutput(id, deviceName, outputType, outputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

                    expect(user.devices[0].name).to.equal(deviceName)
                    expect(user.devices[0].outputs).to.exist
                    expect(user.devices[0].outputs).to.be.instanceOf(Array)
                    expect(user.devices[0].outputs).to.have.length(2)
                })

                it('should succed deleting two WOTdevice digital output', async()=>{
                    outputType = 'digital'
                    outputDirection = 1
                    let _outputDirection = 2
                    await logic.addOutput(id, deviceName, outputType, outputDirection)
                    await logic.addOutput(id, deviceName, outputType, _outputDirection)

                    await logic.deleteOutput(id, deviceName, outputType, outputDirection)
                    const response = await logic.deleteOutput(id, deviceName, outputType, _outputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

                    expect(user.devices[0].name).to.equal(deviceName)
                    expect(user.devices[0].outputs).to.exist
                    expect(user.devices[0].outputs).to.be.instanceOf(Array)
                    expect(user.devices[0].outputs).to.have.length(0)

                })

                it('should succed deleting a WOTdevice analog output', async()=>{
                    outputType = 'digital'
                    outputDirection = 1
                    await logic.addOutput(id, deviceName, outputType, outputDirection)
                    outputType = 'servo'
                    outputDirection = 1
                    await logic.addOutput(id, deviceName, outputType, outputDirection)
                    const response = await logic.deleteOutput(id, deviceName, outputType, outputDirection)

                    expect(response).to.not.exist
                    const user = await Users.findOne({$and:[{_id: id}, {'devices.name': deviceName}]})

                    expect(user.devices[0].name).to.equal(deviceName)
                    expect(user.devices[0].outputs).to.exist
                    expect(user.devices[0].outputs).to.be.instanceOf(Array)
                    expect(user.devices[0].outputs).to.have.length(1)
                })

                it('should fail deleting a output to a unexisting user', async()=>{
                    outputType = 'digital'
                    outputDirection = 1
                    let _id = 'unexistingId'

                    try {
                        await logic.deleteOutput(_id, deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                    }
                })

                it('should fail deleting a output to a unexisting WOTdevice', async()=>{
                    outputType = 'digital'
                    outputDirection = 1
                    let _deviceName = 'wrongName'

                    try {
                        await logic.deleteOutput(id, _deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`A device named ${_deviceName} does not exist in your collection`)
                    }
                })

                it('should fail deleting unexisting WOTdevice digital output', async()=>{
                    outputType = 'digital'
                    outputDirection = 1

                    try {
                        await logic.deleteOutput(id, deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`The device ${deviceName} don't have any ${outputType} output`)
                    }
                })

                it('should fail deleting WOTdevice digital input in a undefined output direction', async()=>{
                    outputType = 'digital'
                    outputDirection = 1
                    let _outputDirection = 2

                    await logic.addOutput(id, deviceName, outputType, outputDirection)

                    try {
                        await logic.deleteOutput(id, deviceName, outputType, _outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`The device ${deviceName} don't have any ${outputType} output asigned to ${_outputDirection} direction`)
                    }
                })

                it('should fail deleting unexisting WOTdevice motor output', async()=>{
                    outputType = 'motor'
                    outputDirection = 1

                    try {
                        await logic.deleteOutput(id, deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`The device ${deviceName} don't have any ${outputType} output`)
                    }
                })

                it('should fail deleting a WOTdevice digital output with wrong direction', async()=>{
                    outputType = 'digital'
                    outputDirection = 3

                    try {
                        await logic.deleteOutput(id, deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`${outputDirection} is not a valid direction for a ${outputType} output`)
                    }
                })

                it('should fail deleting a WOTdevice motor output with wrong direction', async()=>{
                    outputType = 'motor'
                    outputDirection = 4

                    try {
                        await logic.deleteOutput(id, deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)
                        expect(error.message).to.equal(`${outputDirection} is not a valid direction for a ${outputType} output`)
                    }
                })

                it('should fail deleting a WOTdevice with wrong type', async()=>{
                    outputType = 'invalidType'
                    outputDirection = 2

                    try {
                        await logic.deleteOutput(id, deviceName, outputType, outputDirection)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(LogicError)

                        expect(error.message).to.equal(`${outputType} is not a valid output type`)
                    }
                })

                it('should fail on undefined device id', () => {
                    const id = undefined

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(RequirementError, `id is not optional`))
                })

                it('should fail on null id', () => {
                    const id = null

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(RequirementError, `id is not optional`))
                })

                it('should fail on empty id', () => {
                    const id = ''

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(ValueError, 'id is empty'))
                })

                it('should fail on blank id', () => {
                    const id = ' \t    \n'

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(ValueError, 'deviceName is empty'))
                })

                it('should fail on undefined deviceName', () => {
                    const deviceName = undefined

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(RequirementError, `deviceName is not optional`))
                })

                it('should fail on null deviceName', () => {
                    const deviceName = null

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(RequirementError, `deviceName is not optional`))
                })

                it('should fail on empty deviceName', () => {
                    const deviceName = ''

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(ValueError, 'deviceName is empty'))
                })

                it('should fail on blank deviceName', () => {
                    const deviceName = ' \t    \n'
                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(ValueError, 'deviceName is empty'))
                })

                it('should fail on undefined outputType', () => {
                    const outputType = undefined

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputType is not optional`))
                })

                it('should fail on null outputType', () => {
                    const outputType = null

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputType is not optional`))
                })

                it('should fail on empty outputType', () => {
                    const outputType = ''

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputType is empty'))
                })

                it('should fail on blank outputType', () => {
                    const outputType = ' \t    \n'

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputType is empty'))
                })

                it('should fail on undefined outputDirection', () => {
                    const outputDirection = undefined

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputDirection is not optional`))
                })

                it('should fail on null outputDirection', () => {
                    const outputDirection = null

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(RequirementError, `outputDirection is not optional`))
                })

                it('should fail on empty outputDirection', () => {
                    const outputDirection = ''

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputDirection is empty'))
                })

                it('should fail on blank outputDirection', () => {
                    const outputDirection = ' \t    \n'

                    expect(() => logic.deleteOutput(id, deviceName, outputType, outputDirection).to.throw(ValueError, 'outputDirection is empty'))
                })
            })
        })

        describe('retrieve WOTdevice', () => {
            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = `192.168.${String(Math.floor(Math.random()*100))}.${String(Math.floor(Math.random()*255))}`

                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})
                id = user.id

                await logic.addDevice(id, deviceName, deviceIp, devicePort)
            })

            it('should succes retrieving a WOTdevice', async () => {
                const response = await logic.retrieveDevice(id, deviceName)

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
                    await logic.retrieveDevice(id, deviceName)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device named ${deviceName} does not exist in your collection`)
                }
            })

            it('should fail retrieving a WOTdevice of a unexisting user', async () => {
                let _id = 'unexistingId'
                try {
                    await logic.retrieveDevice(_id, deviceName)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }
            })

            it('should fail on undefined device id', () => {
                const id = undefined

                expect(() => logic.retrieveDevice(id, deviceName).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.retrieveDevice(id, deviceName).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.retrieveDevice(id, deviceName).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.retrieveDevice(id, deviceName).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.retrieveDevice(id, deviceName).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.retrieveDevice(id, deviceName).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.retrieveDevice(id, deviceName).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => logic.retrieveDevice(id, deviceName).to.throw(ValueError, 'deviceName is empty'))
            })
        })

        describe('activate WOTdevice', () => {
            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = arduinoIp

                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})
                id = user.id

                await logic.addDevice(id, deviceName, deviceIp, devicePort)
            })

            it('should succed on activating the selected WOTdevice', async () => {
                const response = await logic.activateDevice(id, deviceName, timeInterval)

                expect(response).to.exist
                expect(response.userid).to.equal(undefined)
                expect(response.deviceid).to.equal('newWOTDevice')
                expect(response.status).to.equal('ON')
                expect(response.interval).to.equal(timeInterval.toString())
            })

            it('should fail on activating a WOTdevice from unexisting user', async () => {
                let _id = 'unexistingId'

                try {
                    await logic.activateDevice(_id, deviceName, timeInterval)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }
            })

            it('should fail on activating a undefined WOTdevice', async () => {
                deviceName = 'undefinedWOTdevice'

                try {
                    await logic.activateDevice(id, deviceName, timeInterval)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device named ${deviceName} does not exist in your collection`)
                }
            })

            it('should fail on activating a WOTdevice witch time interval too low', async () => {
                timeInterval = 10

                try {
                    await logic.activateDevice(id, deviceName, timeInterval)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`time interval ${timeInterval} is too low. must be at least 1000`)
                }
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.activateDevice(id, deviceName, timeInterval).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.activateDevice(id, deviceName, timeInterval).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.activateDevice(id, deviceName, timeInterval).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.activateDevice(id, deviceName, timeInterval).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.activateDevice(id, deviceName, timeInterval).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.activateDevice(id, deviceName, timeInterval).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => logic.activateDevice(id, deviceName, timeInterval).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined timeInterval', () => {
                const timeInterval = undefined

                expect(() => logic.activateDevice(id, deviceName, timeInterval).to.throw(RequirementError, `timeInterval is not optional`))
            })

            it('should fail on null timeInterval', () => {
                const timeInterval = null

                expect(() => logic.activateDevice(id, deviceName, timeInterval).to.throw(RequirementError, `timeInterval is not optional`))
            })

            it('should fail on empty timeInterval', () => {
                const timeInterval = ''

                expect(() => logic.activateDevice(id, deviceName, timeInterval).to.throw(ValueError, `timeInterval is empty`))
            })

            it('should fail on blank timeInterval', () => {
                const timeInterval = ' \t    \n'
                expect(() => logic.activateDevice(id, deviceName, timeInterval).to.throw(ValueError, `timeInterval is empty`))
            })
        })

        describe('change WOTdevice name', () => {
            let newDeviceName = 'newWOTdeviceName'

            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = arduinoIp

                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})
                id = user.id

                await logic.addDevice(id, deviceName, deviceIp, devicePort)
            })

            it('should succed changing a WOTdevice name', async () => {
                const response = await logic.changeDeviceId(id, deviceName, newDeviceName)

                expect(response).to.exist
                expect(response.userid).to.equal(id)
                expect(response.deviceid).to.equal(newDeviceName)
                expect(response.status).to.equal('OK')

                const users = await Users.find({ $and: [{ _id: id }, { 'devices.name': newDeviceName }] })
                expect(users).to.have.lengthOf(1)
                expect(users[0].devices).to.have.lengthOf(1)
                expect(users[0].devices[0].name).to.equal(newDeviceName)

                await logic.changeDeviceId(id, newDeviceName, 'newWOTDevice')
            })

            it('should fail on unexisting user id', async () => {
                let _id = 'unexistingId'

                try {
                    await await logic.changeDeviceId(_id, deviceName, newDeviceName)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }
            })

            it('should fail on activating a undefined WOTdevice', async () => {
                deviceName = 'undefinedWOTdevice'

                try {
                    await logic.changeDeviceId(id, deviceName, newDeviceName)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device named ${deviceName} does not exist in your collection`)
                }
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.changeDeviceId(id, deviceName, newDeviceName).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.changeDeviceId(id, deviceName, newDeviceName).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.changeDeviceId(id, deviceName, newDeviceName).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.changeDeviceId(id, deviceName, newDeviceName).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.changeDeviceId(id, deviceName, newDeviceName).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.changeDeviceId(id, deviceName, newDeviceName).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => logic.changeDeviceId(id, deviceName, newDeviceName).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined newDeviceName', () => {
                const newDeviceName = undefined

                expect(() => logic.changeDeviceId(id, deviceName, newDeviceName).to.throw(RequirementError, `newDeviceName is not optional`))
            })

            it('should fail on null newDeviceName', () => {
                const newDeviceName = null

                expect(() => logic.changeDeviceId(id, deviceName, newDeviceName).to.throw(RequirementError, `newDeviceName is not optional`))
            })

            it('should fail on empty newDeviceName', () => {
                const newDeviceName = ''

                expect(() => logic.changeDeviceId(id, deviceName, newDeviceName).to.throw(ValueError, `newDeviceName is empty`))
            })

            it('should fail on blank newDeviceName', () => {
                const newDeviceName = ' \t    \n'
                expect(() => logic.changeDeviceId(id, deviceName, newDeviceName).to.throw(ValueError, `newDeviceName is empty`))
            })
        })

        describe('toggle WOTdevice digital output', () => {
            let pinNumber = 1

            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = arduinoIp
                let type = 'digital'

                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})
                id = user.id
                await logic.addDevice(id, deviceName, deviceIp, devicePort)
                await logic.changeDeviceId(id, deviceName, deviceName)
                await logic.addOutput(id, deviceName, type, pinNumber)
            })

            it('should succed toggling on and off a WOTdevice digital output', async () => {
                const response = await logic.toggleDigitalOutput(id, deviceName, pinNumber)

                expect(response).to.exist
                expect(response.deviceid).to.equal(deviceName)
                expect(response.status).to.equal('ON')

                const response2 = await logic.toggleDigitalOutput(id, deviceName, pinNumber)

                expect(response2).to.exist
                expect(response2.deviceid).to.equal(deviceName)
                expect(response2.status).to.equal('OFF')
            })

            it('should fail on unexisting user id', async () => {
                let _id = 'unexistingId'

                try {
                    await await logic.toggleDigitalOutput(_id, deviceName, pinNumber)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }
            })

            it('should fail on activating a undefined WOTdevice', async () => {
                deviceName = 'undefinedWOTdevice'

                try {
                    await logic.toggleDigitalOutput(id, deviceName, pinNumber)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device named ${deviceName} does not exist in your collection`)
                }
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.toggleDigitalOutput(id, deviceName, pinNumber).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.toggleDigitalOutput(id, deviceName, pinNumber).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.toggleDigitalOutput(id, deviceName, pinNumber).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.toggleDigitalOutput(id, deviceName, pinNumber).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.toggleDigitalOutput(id, deviceName, pinNumber).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.toggleDigitalOutput(id, deviceName, pinNumber).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => logic.toggleDigitalOutput(id, deviceName, pinNumber).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined pinNumber', () => {
                const pinNumber = undefined

                expect(() => logic.toggleDigitalOutput(id, deviceName, pinNumber).to.throw(RequirementError, `pinNumber is not optional`))
            })

            it('should fail on null pinNumber', () => {
                const pinNumber = null

                expect(() => logic.toggleDigitalOutput(id, deviceName, pinNumber).to.throw(RequirementError, `pinNumber is not optional`))
            })

            it('should fail on empty pinNumber', () => {
                const pinNumber = ''

                expect(() => logic.toggleDigitalOutput(id, deviceName, pinNumber).to.throw(ValueError, `pinNumber is empty`))
            })

            it('should fail on blank pinNumber', () => {
                const pinNumber = ' \t    \n'
                expect(() => logic.toggleDigitalOutput(id, deviceName, pinNumber).to.throw(ValueError, `pinNumber is empty`))
            })
        })

        describe('moving a WOTdevice servo output', () => {
            let pinNumber = 1
            let angle = 0

            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = arduinoIp
                let type = 'servo'

                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})
                id = user.id
                await logic.addDevice(id, deviceName, deviceIp, devicePort)
                await logic.changeDeviceId(id, deviceName, deviceName)
                await logic.addOutput(id, deviceName, type, pinNumber)
            })

            it('should succed moving a WOTdevice servo output', async () => {
                const response = await logic.setServoPosition(id, deviceName, pinNumber, angle)

                expect(response).to.exist
                expect(response.deviceid).to.equal(deviceName)
                expect(response.status).to.equal(5)
                angle = 120
                const response2 = await logic.setServoPosition(id, deviceName, pinNumber, angle)

                expect(response2).to.exist
                expect(response2.deviceid).to.equal(deviceName)
                expect(response2.status).to.equal(120)
            })

            it('should fail on unexisting user id', async () => {
                let _id = 'unexistingId'

                try {
                    await await logic.setServoPosition(_id, deviceName, pinNumber, angle)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }
            })

            it('should fail on activating a undefined WOTdevice', async () => {
                deviceName = 'undefinedWOTdevice'

                try {
                    await logic.setServoPosition(id, deviceName, pinNumber, angle)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device named ${deviceName} does not exist in your collection`)
                }
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.setServoPosition(id, deviceName, pinNumber, angle).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.setServoPosition(id, deviceName, pinNumber, angle).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.setServoPosition(id, deviceName, pinNumber, angle).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.setServoPosition(id, deviceName, pinNumber, angle).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.setServoPosition(id, deviceName, pinNumber, angle).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.setServoPosition(id, deviceName, pinNumber, angle).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => logic.setServoPosition(id, deviceName, pinNumber, angle).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined pinNumber', () => {
                const pinNumber = undefined

                expect(() => logic.setServoPosition(id, deviceName, pinNumber, angle).to.throw(RequirementError, `pinNumber is not optional`))
            })

            it('should fail on null pinNumber', () => {
                const pinNumber = null

                expect(() => logic.setServoPosition(id, deviceName, pinNumber, angle).to.throw(RequirementError, `pinNumber is not optional`))
            })

            it('should fail on empty pinNumber', () => {
                const pinNumber = ''

                expect(() => logic.setServoPosition(id, deviceName, pinNumber, angle).to.throw(ValueError, `pinNumber is empty`))
            })

            it('should fail on blank pinNumber', () => {
                const pinNumber = ' \t    \n'
                expect(() => logic.setServoPosition(id, deviceName, pinNumber, angle).to.throw(ValueError, `pinNumber is empty`))
            })
        })

        describe('speeding a WOTdevice motor output', () => {
            let pinNumber = 1
            let speed = 100

            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = arduinoIp
                let type = 'motor'

                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})
                id = user.id
                await logic.addDevice(id, deviceName, deviceIp, devicePort)
                await logic.changeDeviceId(id, deviceName, deviceName)
                await logic.addOutput(id, deviceName, type, pinNumber)
            })

            it('should succed moving a WOTdevice motor output', async () => {
                const response = await logic.setMotorSpeed(id, deviceName, pinNumber, speed)

                expect(response).to.exist
                expect(response.deviceid).to.equal(deviceName)
                expect(response.status).to.equal(100)
                speed = 0
                const response2 = await logic.setMotorSpeed(id, deviceName, pinNumber, speed)

                expect(response2).to.exist
                expect(response2.deviceid).to.equal(deviceName)
                expect(response2.status).to.equal(0)
            })

            it('should fail on unexisting user id', async () => {
                let _id = 'unexistingId'

                try {
                    await await logic.setMotorSpeed(_id, deviceName, pinNumber, speed)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }
            })

            it('should fail on activating a undefined WOTdevice', async () => {
                deviceName = 'undefinedWOTdevice'

                try {
                    await logic.setMotorSpeed(id, deviceName, pinNumber, speed)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device named ${deviceName} does not exist in your collection`)
                }
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.setMotorSpeed(id, deviceName, pinNumber, speed).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.setMotorSpeed(id, deviceName, pinNumber, speed).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.setMotorSpeed(id, deviceName, pinNumber, speed).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.setMotorSpeed(id, deviceName, pinNumber, speed).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.setMotorSpeed(id, deviceName, pinNumber, speed).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.setMotorSpeed(id, deviceName, pinNumber, speed).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => logic.setMotorSpeed(id, deviceName, pinNumber, speed).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined pinNumber', () => {
                const pinNumber = undefined

                expect(() => logic.setMotorSpeed(id, deviceName, pinNumber, speed).to.throw(RequirementError, `pinNumber is not optional`))
            })

            it('should fail on null pinNumber', () => {
                const pinNumber = null

                expect(() => logic.setMotorSpeed(id, deviceName, pinNumber, speed).to.throw(RequirementError, `pinNumber is not optional`))
            })

            it('should fail on empty pinNumber', () => {
                const pinNumber = ''

                expect(() => logic.setMotorSpeed(id, deviceName, pinNumber, speed).to.throw(ValueError, `pinNumber is empty`))
            })

            it('should fail on blank pinNumber', () => {
                const pinNumber = ' \t    \n'
                expect(() => logic.setMotorSpeed(id, deviceName, pinNumber, speed).to.throw(ValueError, `pinNumber is empty`))
            })
        })

        describe('saving a WOTdevice analog input', () => {
            let type = 'analog'
            let pinNumber = 1
            let value = 0
            let scaledValue = 0

            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = arduinoIp
                value = Math.floor(Math.random()*1024)

                scaledValue = (value/10.23).toFixed(2)

                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})
                id = user.id
                await logic.addDevice(id, deviceName, deviceIp, devicePort)
                await logic.changeDeviceId(id, deviceName, deviceName)
                await logic.addInput(id, deviceName, type, pinNumber)
            })

            it('should succed saving a WOTdevice analog value', async () => {

                const response = await logic.saveAnalogInput(id, deviceName, value)

                expect(response).to.not.exist
                users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                const deviceIndex = users[0].devices.findIndex(({ name }) => name == deviceName)
                const input = users[0].devices[deviceIndex].inputs[0]
                expect(input).to.exist
                expect(input.type).to.equal(type)
                expect(input.direction).to.equal(pinNumber)
                expect(input.values).to.be.instanceOf(Array)
                expect(input.values[0]).to.be.instanceOf(Object)
                expect(input.values[0].value).to.equal(Number(scaledValue))
                expect(input.values[0].date).to.be.instanceOf(Date)


            })

            it('should succed saving two WOTdevice analog value', async () => {
                let _value = 250
                await logic.saveAnalogInput(id, deviceName, value)
                const response = await logic.saveAnalogInput(id, deviceName, _value)

                expect(response).to.not.exist
                users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                const deviceIndex = users[0].devices.findIndex(({ name }) => name == deviceName)
                const input = users[0].devices[deviceIndex].inputs[0]
                expect(input).to.exist
                expect(input.type).to.equal(type)
                expect(input.direction).to.equal(pinNumber)
                expect(input.values).to.be.instanceOf(Array)
                expect(input.values).to.have.lengthOf(2)
                expect(input.values[0]).to.be.instanceOf(Object)
                expect(input.values[0].value).to.equal(Number(scaledValue))
                expect(input.values[0].date).to.be.instanceOf(Date)
                expect(input.values[1]).to.be.instanceOf(Object)
                expect(input.values[1].date).to.be.instanceOf(Date)

            })

            it('should fail on unexisting user id', async () => {
                let _id = 'unexistingId'

                try {
                    await await logic.saveAnalogInput(_id, deviceName, value)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }
            })

            it('should fail on activating a undefined WOTdevice', async () => {
                deviceName = 'undefinedWOTdevice'

                try {
                    await logic.saveAnalogInput(id, deviceName, value)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device named ${deviceName} does not exist in your collection`)
                }
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.saveAnalogInput(id, deviceName, value).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.saveAnalogInput(id, deviceName, value).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.saveAnalogInput(id, deviceName, value).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.saveAnalogInput(id, deviceName, value).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.saveAnalogInput(id, deviceName, value).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.saveAnalogInput(id, deviceName, value).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => logic.saveAnalogInput(id, deviceName, value).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined value', () => {
                const value = undefined

                expect(() => logic.saveAnalogInput(id, deviceName, value).to.throw(RequirementError, `value is not optional`))
            })

            it('should fail on null value', () => {
                const value = null

                expect(() => logic.saveAnalogInput(id, deviceName, value).to.throw(RequirementError, `value is not optional`))
            })

            it('should fail on empty value', () => {
                const value = ''

                expect(() => logic.saveAnalogInput(id, deviceName, value).to.throw(ValueError, `value is empty`))
            })

            it('should fail on blank value', () => {
                const value = ' \t    \n'
                expect(() => logic.saveAnalogInput(id, deviceName, value).to.throw(ValueError, `value is empty`))
            })
        })

        describe('saving a WOTdevice digital input', () => {
            let type = 'digital'
            let pinNumber = 1
            let value = 0

            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = arduinoIp
                value = Math.floor(Math.random()*2)

                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})
                id = user.id
                await logic.addDevice(id, deviceName, deviceIp, devicePort)
                await logic.changeDeviceId(id, deviceName, deviceName)
                await logic.addInput(id, deviceName, type, pinNumber)
            })

            it('should succed saving a WOTdevice digital value', async () => {
                const response = await logic.saveDigitalInput(id, deviceName, value, pinNumber)

                expect(response).to.not.exist
                users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                const deviceIndex = users[0].devices.findIndex(({ name }) => name == deviceName)
                const input = users[0].devices[deviceIndex].inputs[0]
                expect(input).to.exist
                expect(input.type).to.equal(type)
                expect(input.direction).to.equal(pinNumber)
                expect(input.values).to.be.instanceOf(Array)
                expect(input.values[0]).to.be.instanceOf(Object)
                expect(input.values[0].value).to.equal(value)
                expect(input.values[0].date).to.be.instanceOf(Date)


            })

            it('should succed saving two WOTdevice digital value', async () => {
                let _value = 0
                await logic.saveDigitalInput(id, deviceName, value, pinNumber)
                const response = await logic.saveDigitalInput(id, deviceName, _value, pinNumber)

                expect(response).to.not.exist
                users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
                const deviceIndex = users[0].devices.findIndex(({ name }) => name == deviceName)
                const input = users[0].devices[deviceIndex].inputs[0]
                expect(input).to.exist
                expect(input.type).to.equal(type)
                expect(input.direction).to.equal(pinNumber)
                expect(input.values).to.be.instanceOf(Array)
                expect(input.values).to.have.lengthOf(2)
                expect(input.values[0]).to.be.instanceOf(Object)
                expect(input.values[0].value).to.equal(value)
                expect(input.values[0].date).to.be.instanceOf(Date)
                expect(input.values[1]).to.be.instanceOf(Object)
                expect(input.values[1].date).to.be.instanceOf(Date)

            })

            it('should fail on unexisting user id', async () => {
                let _id = 'unexistingId'

                try {
                    await await logic.saveDigitalInput(_id, deviceName, value, pinNumber)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }
            })

            it('should fail on activating a undefined WOTdevice', async () => {
                deviceName = 'undefinedWOTdevice'

                try {
                    await logic.saveDigitalInput(id, deviceName, value, pinNumber)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device named ${deviceName} does not exist in your collection`)
                }
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.saveDigitalInput(id, deviceName, value, pinNumber).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.saveDigitalInput(id, deviceName, value, pinNumber).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.saveDigitalInput(id, deviceName, value, pinNumber).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.saveDigitalInput(id, deviceName, value, pinNumber).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.saveDigitalInput(id, deviceName, value, pinNumber).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.saveDigitalInput(id, deviceName, value, pinNumber).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => logic.saveDigitalInput(id, deviceName, value, pinNumber).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined value', () => {
                const value = undefined

                expect(() => logic.saveDigitalInput(id, deviceName, value, pinNumber).to.throw(RequirementError, `value is not optional`))
            })

            it('should fail on null value', () => {
                const value = null

                expect(() => logic.saveDigitalInput(id, deviceName, value, pinNumber).to.throw(RequirementError, `value is not optional`))
            })

            it('should fail on empty value', () => {
                const value = ''

                expect(() => logic.saveDigitalInput(id, deviceName, value, pinNumber).to.throw(ValueError, `value is empty`))
            })

            it('should fail on blank value', () => {
                const value = ' \t    \n'
                expect(() => logic.saveDigitalInput(id, deviceName, value, pinNumber).to.throw(ValueError, `value is empty`))
            })
        })

        describe('retrieving a WOTdevice analog input', () => {
            let type = 'analog'
            let pinNumber = 1
            let value = 0

            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = arduinoIp
                value = Math.floor(Math.random()*1024)

                scaledValue = (value/10.23).toFixed(2)

                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})
                id = user.id
                await logic.addDevice(id, deviceName, deviceIp, devicePort)
                await logic.changeDeviceId(id, deviceName, deviceName)
                await logic.addInput(id, deviceName, type, pinNumber)
                await logic.saveAnalogInput(id, deviceName, value)
                value = Math.floor(Math.random()*1024)
                await logic.saveAnalogInput(id, deviceName, value)
                value = Math.floor(Math.random()*1024)
                await logic.saveAnalogInput(id, deviceName, value)
            })

            it('should succed retrieving a WOTdevice analog value', async () => {

                const response = await logic.retrieveAnalog(id, deviceName)

                expect(response).to.exist
                expect(response).to.be.instanceOf(Array)
                expect(response).to.have.lengthOf(3)
                expect(response[0].value).to.exist
                expect(response[0].date).to.exist
                expect(response[0].date).to.be.instanceOf(Date)
            })

            it('should fail on unexisting user id', async () => {
                let _id = 'unexistingId'

                try {
                    await await logic.retrieveAnalog(_id, deviceName)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }
            })

            it('should fail on retrieving a undefined WOTdevice', async () => {
                deviceName = 'undefinedWOTdevice'

                try {
                    await logic.retrieveAnalog(id, deviceName)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device named ${deviceName} does not exist in your collection`)
                }
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.retrieveAnalog(id, deviceName).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.retrieveAnalog(id, deviceName).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.retrieveAnalog(id, deviceName).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.retrieveAnalog(id, deviceName).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.retrieveAnalog(id, deviceName).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.retrieveAnalog(id, deviceName).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => logic.retrieveAnalog(id, deviceName).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined value', () => {
                const value = undefined

                expect(() => logic.retrieveAnalog(id, deviceName).to.throw(RequirementError, `value is not optional`))
            })

            it('should fail on null value', () => {
                const value = null

                expect(() => logic.retrieveAnalog(id, deviceName).to.throw(RequirementError, `value is not optional`))
            })

            it('should fail on empty value', () => {
                const value = ''

                expect(() => logic.retrieveAnalog(id, deviceName).to.throw(ValueError, `value is empty`))
            })

            it('should fail on blank value', () => {
                const value = ' \t    \n'
                expect(() => logic.retrieveAnalog(id, deviceName).to.throw(ValueError, `value is empty`))
            })
        })

        describe('retrieving a WOTdevice digital input', () => {
            let type = 'digital'
            let pinNumber = 1
            let value = 0

            beforeEach(async() =>{
                email = `marcusontest-${Math.random()}@gmail.com`
                deviceName = `WOTdevice${Math.floor(Math.random()*999)}`
                deviceIp = arduinoIp
                value = 0
                await Users.create({ name, surname, email, password, isAdmin })

                user = await Users.findOne({email})
                id = user.id
                await logic.addDevice(id, deviceName, deviceIp, devicePort)
                await logic.changeDeviceId(id, deviceName, deviceName)
                await logic.addInput(id, deviceName, type, pinNumber)
                await logic.saveDigitalInput(id, deviceName, value, pinNumber)
                value = 1
                await logic.saveDigitalInput(id, deviceName, value, pinNumber)
                value = 0
                await logic.saveDigitalInput(id, deviceName, value, pinNumber)
            })

            it('should succed retrieving a WOTdevice digital value', async () => {

                const response = await logic.retrieveDigital(id, deviceName, pinNumber)

                expect(response).to.exist
                expect(response).to.be.instanceOf(Array)
                expect(response).to.have.lengthOf(3)
                expect(response[0].value).to.exist
                expect(response[0].date).to.exist
                expect(response[0].date).to.be.instanceOf(Date)
            })

            it('should fail on unexisting user id', async () => {
                let _id = 'unexistingId'

                try {
                    await await logic.retrieveDigital(_id, deviceName, pinNumber)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`user with id: ${_id} does not exist`)
                }
            })

            it('should fail on retrieving a undefined WOTdevice', async () => {
                deviceName = 'undefinedWOTdevice'

                try {
                    await logic.retrieveDigital(id, deviceName, pinNumber)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(LogicError)

                    expect(error.message).to.equal(`A device named ${deviceName} does not exist in your collection`)
                }
            })

            it('should fail on null id', () => {
                const id = null

                expect(() => logic.retrieveDigital(id, deviceName, pinNumber).to.throw(RequirementError, `id is not optional`))
            })

            it('should fail on empty id', () => {
                const id = ''

                expect(() => logic.retrieveDigital(id, deviceName, pinNumber).to.throw(ValueError, 'id is empty'))
            })

            it('should fail on blank id', () => {
                const id = ' \t    \n'

                expect(() => logic.retrieveDigital(id, deviceName, pinNumber).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined deviceName', () => {
                const deviceName = undefined

                expect(() => logic.retrieveDigital(id, deviceName, pinNumber).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on null deviceName', () => {
                const deviceName = null

                expect(() => logic.retrieveDigital(id, deviceName, pinNumber).to.throw(RequirementError, `deviceName is not optional`))
            })

            it('should fail on empty deviceName', () => {
                const deviceName = ''

                expect(() => logic.retrieveDigital(id, deviceName, pinNumber).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on blank deviceName', () => {
                const deviceName = ' \t    \n'
                expect(() => logic.retrieveDigital(id, deviceName, pinNumber).to.throw(ValueError, 'deviceName is empty'))
            })

            it('should fail on undefined value', () => {
                const value = undefined

                expect(() => logic.retrieveDigital(id, deviceName, pinNumber).to.throw(RequirementError, `value is not optional`))
            })

            it('should fail on null value', () => {
                const value = null

                expect(() => logic.retrieveDigital(id, deviceName, pinNumber).to.throw(RequirementError, `value is not optional`))
            })

            it('should fail on empty value', () => {
                const value = ''

                expect(() => logic.retrieveDigital(id, deviceName, pinNumber).to.throw(ValueError, `value is empty`))
            })

            it('should fail on blank value', () => {
                const value = ' \t    \n'
                expect(() => logic.retrieveDigital(id, deviceName, pinNumber).to.throw(ValueError, `value is empty`))
            })
        })

    })
    after(async () => {
        // let users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
        // if (users.length > 0) await logic.changeDeviceId(id, deviceName, 'newWOTDevice')

        mongoose.disconnect()
    })

})