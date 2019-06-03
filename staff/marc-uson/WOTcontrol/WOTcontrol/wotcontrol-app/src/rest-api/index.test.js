const {models, mongoose} = require('wotcontrol-data')
const { expect } =  require ('chai')
const bcrypt = require('bcrypt')
const {  ValueError, RequirementError } = require('wotcontrol-errors')
const restApi = require('.')
require('dotenv').config()

const { env: { MONGO_URL_API_TEST: url } } = process

const { Users, Devices} = models

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
            it.only('should succeed on correct user data', async () => {

                const res = await restApi.registerUser(name, surname, email, password, isAdmin)

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

        // describe('authenticate user', () => {
        //     let _password
        //         beforeEach(async () => {
        //             _password = bcrypt.hashSync(password, 10)
        //             await Users.create({ name, surname, email, password: _password })
        //         })

        //     it('should succeed on correct user credential', async () => {
        //         const id = await logic.authenticateUser(email, password)

        //         expect(id).to.be.a('string')
        //         expect(id.length).to.be.greaterThan(0)
        //     })

        //     it('should fail on wrong passwotd', async () => {
        //         try {
        //             debugger
        //             await logic.authenticateUser(email, password='000')

        //             throw Error('should not reach this point')
        //         } catch (error) {
        //             expect(error).to.exist
        //             expect(error).to.be.instanceOf(LogicError)

        //             expect(error.message).to.equal(`wrong credentials`)
        //         }
        //     })

        //     it('should fail on non-existing user', async () => {
        //         try {
        //             await logic.authenticateUser(email = 'unexisting-user@mail.com', password)

        //             throw Error('should not reach this point')
        //         } catch (error) {
        //             expect(error).to.exist
        //             expect(error).to.be.instanceOf(LogicError)

        //             expect(error.message).to.equal(`user with email "${email}" does not exist`)
        //         }
        //     })
        // })

        // describe('retrieve user', () => {
        //     let id
        //     let _password

        //     beforeEach(async () => {
        //         _password = bcrypt.hashSync(password, 10)

        //         await Users.create({ name, surname, email, password: _password })

        //         const users = await Users.find({email})

        //         id = users[0].id
        //     })

        //     it('should succeed on correct user id from existing user', async () => {
        //         const user = await logic.retrieveUser(id)

        //         expect(user.id).to.not.exist
        //         expect(user.name).to.equal(name)
        //         expect(user.surname).to.equal(surname)
        //         expect(user.email).to.equal(email)
        //         expect(user.password).to.not.exist
        //     })

        //     it('should fail on unexisting user id', async () => {
        //         id = '01234567890123456789abcd'

        //         try {
        //             await logic.retrieveUser(id)

        //             throw new Error('should not reach this point')
        //         } catch (error) {
        //             expect(error).to.exist

        //             expect(error).to.be.an.instanceOf(LogicError)

        //             expect(error.message).to.equal(`user with id "${id}" does not exist`)
        //         }
        //     })
        // })

        // describe('update user', () => {
        //     let id
        //     let _password

        //     beforeEach(async () => {
        //         _password = bcrypt.hashSync(password, 10)

        //         await Users.create({ name, surname, email, password: _password })

        //         const users = await Users.find({ email })

        //         id = users[0].id
        //     })

        //     it('should succeed on updating user name', async () => {
        //         let newName = 'newName'
        //         const response = await logic.updateUser(id, {name: newName})

        //         expect(response).to.be.a('string')
        //         expect(response).to.equal('User succesfully updated')

        //         const user = await logic.retrieveUser(id)

        //         expect(user.id).to.not.exist
        //         expect(user.name).to.equal(newName)
        //         expect(user.surname).to.equal(surname)
        //         expect(user.email).to.equal(email)
        //         expect(user.password).to.not.exist
        //     })

        //     it('should succeed on updating user surname', async () => {
        //         let newSurname = 'newSurname'
        //         const response = await logic.updateUser(id, {surname: newSurname})

        //         expect(response).to.be.a('string')
        //         expect(response).to.equal('User succesfully updated')

        //         const user = await logic.retrieveUser(id)

        //         expect(user.id).to.not.exist
        //         expect(user.name).to.equal(name)
        //         expect(user.surname).to.equal(newSurname)
        //         expect(user.email).to.equal(email)
        //         expect(user.password).to.not.exist
        //     })

        //     it('should succeed on updating user email', async () => {
        //         let newEmail = 'newemail@mail.com'

        //         const response = await logic.updateUser(id, {email: newEmail})

        //         expect(response).to.be.a('string')
        //         expect(response).to.equal('User succesfully updated')

        //         const user = await logic.retrieveUser(id)

        //         expect(user.id).to.not.exist
        //         expect(user.name).to.equal(name)
        //         expect(user.surname).to.equal(surname)
        //         expect(user.email).to.equal(newEmail)
        //         expect(user.password).to.not.exist
        //     })

        //     it('should succeed on updating user password', async () => {
        //         let newPassword = 'newpassword'

        //         const response = await logic.updateUser(id, {password: newPassword})

        //         expect(response).to.be.a('string')
        //         expect(response).to.equal('User succesfully updated')

        //         const user = await logic.retrieveUser(id)

        //         expect(user.id).to.not.exist
        //         expect(user.name).to.equal(name)
        //         expect(user.surname).to.equal(surname)
        //         expect(user.email).to.equal(email)
        //         expect(user.password).to.not.exist

        //         const _id = await logic.authenticateUser(email, newPassword)

        //         expect(_id).to.be.a('string')
        //         expect(_id.length).to.be.greaterThan(0)
        //     })

        //     it('should fail on unexisting user id', async () => {
        //         id = '01234567890123456789abcd'

        //         try {
        //             await logic.updateUser(id, {email})

        //             throw new Error('should not reach this point')
        //         } catch (error) {
        //             expect(error).to.exist

        //             expect(error).to.be.an.instanceOf(LogicError)

        //             expect(error.message).to.equal(`user with id "${id}" does not exist`)
        //         }
        //     })
        // })

        // describe('delete user', () => {
        //     let id
        //     let _password

        //     beforeEach(async () => {
        //         _password = bcrypt.hashSync(password, 10)

        //         await Users.create({ name, surname, email, password: _password })

        //         const users = await Users.find({email})

        //         id = users[0].id
        //     })

        //     it('should succeed on deleting', async () => {
        //         const response = await logic.deleteUser(id)

        //         expect(response).to.be.a('string')
        //         expect(response).to.equal('User succesfully deleted')

        //         try {
        //             await logic.retrieveUser(id)

        //             throw new Error('should not reach this point')
        //         } catch (error) {
        //             expect(error).to.exist

        //             expect(error).to.be.an.instanceOf(LogicError)

        //             expect(error.message).to.equal(`user with id "${id}" does not exist`)
        //         }
        //     })

        //     it('should fail on unexisting user id', async () => {
        //         id = '01234567890123456789abcd'

        //         try {
        //             await logic.deleteUser(id)

        //             throw new Error('should not reach this point')
        //         } catch (error) {
        //             expect(error).to.exist

        //             expect(error).to.be.an.instanceOf(LogicError)

        //             expect(error.message).to.equal(`user with id "${id}" does not exist`)
        //         }
        //     })
        // })

    })

    after(async () => {
        // let users = await Users.find({ $and: [{ _id: id }, { 'devices.name': deviceName }] })
        // if (users.length > 0) await logic.changeDeviceId(id, deviceName, 'newWOTDevice')

        mongoose.disconnect()
    })
})