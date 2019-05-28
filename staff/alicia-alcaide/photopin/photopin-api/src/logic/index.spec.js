/* eslint-disable no-undef */
require('dotenv').config()

const { mongoose, models: { User, PMap, Pin } } = require('photopin-data')
const expect = require('chai')
const logic = require('.')
const bcrypt = require('bcrypt')


const { env: { MONGODB_URL_API_LOGIC_TEST : url } } = process


describe('logic', () => {
    before(async () => {
        try {
            await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
            //await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false })
            console.log(`connected to ${url} database`)
        } catch (error) {
            console.log(error, error.message)
        }
    })

    let name, surname, email, password

    beforeEach(async () => {
        const users = new Array(10).fill().map(item => item = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@mail.com`,
            password: `password-${Math.random()}`
        })

        const user = users[Math.floor(Math.random() * users.length)]

        name = user.name
        surname = user.surname
        email = user.email
        password = user.password

        await User.deleteMany()
    })

    describe('users', () => {

        describe('register user', () => {
            it('should succeed on correct data', async () => {
                debugger
                const newId = await logic.registerUser(name, surname, email, password)
                debugger
                const user = await User.findOne({email})
                debugger
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(await bcrypt.compare(user.password, password)).to.be.true
            })
                

            it('should fail on retrying to register an already existing user', async () => {
                try {
                    await User.create({name, surname, email, password})   
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    debugger
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with email ${email} already exists`)
                }
            })
            
            it('should fail on undefined email', () => {
    
                expect(() => logic.registerUser(name, surname, undefined, password)).to.throw(RequirementError, `email is not optional`)
            })
    
            it('should fail on null email', () => {
    
                expect(() => logic.registerUser(name, surname, null, password)).to.throw(RequirementError, `email is not optional`)
            })
    
            it('should fail on empty email', () => {
                expect(() => logic.registerUser(name, surname, '', password)).to.throw(ValueError, 'email is empty')
            })
    
            it('should fail on blank email', () => {
                expect(() => logic.registerUser(name, surname, ' \t    \n', password)).to.throw(ValueError, 'email is empty')
            })

            //TODO resto de casos síncronos de variables obligatorias (name, surname, password)

            describe('after created user', () =>{
                let user, _password
    
                beforeEach(async() => {
                    _password = bcrypt.hashSync(password, 10)
                    user = await User.create({name, surname, email, password: _password})
                })
    
                describe('authenticate user', () => {
                    it('should success on correct data', async () => {
                        const id = await logic.authenticateUser(email, password)
    
                        expect(id).to.equal(user.id)
                    })
                })
    
                describe('retrieve user', () => {
                    it('should success on correct user id', async () => {
                        const _user = await logic.retrieveUser(user.id)
    
                        expect(_user.id).toBeUndefined()
                        expect(_user.name).to.equal(user.name)
                        expect(_user.surname).to.equal(user.surname)
                        expect(_user.email).to.equal(user.email)
                    })
                })
            })

        })

        describe('authenticate user', () => {
            let user

            beforeEach(async () => user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 11) }))

            it('should succeed on correct credentials', async () => {
                const id = await logic.authenticateUser(email, password)

                expect(id).to.exist
                expect(id).to.be.a('string')

                expect(id).to.equal(user.id)
            })

            it('should fail on non-existing user',async () => {
                try {
                    await logic.authenticateUser('unexisting-user@mail.com', password)
                    throw Error('should not reach this point')
                } catch (error) {
                    debugger
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with email ${email} already exists`)
                }
            })
            
            it('should fail on wrong credentials',async () => {
                try {
                    await logic.authenticateUser(email, 'incorrect password')
                    throw Error('should not reach this point')
                } catch (error) {
                    debugger
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`wrong credentials`)
                }
            })

        })

        describe('retrieve user', () => {
            let user

            beforeEach(async () => user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 11) }))

            it('should succeed on correct id from existing user', async () => {
                const _user = await logic.retrieveUser(user.id)

                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)

                expect(_user.password).to.be.undefined
            })

            it('should fail on incorrect user id', async() => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.retrieveUser(wrongId)
                    throw Error('should not reach this point')
                } catch (error) {
                    debugger
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

        })

        xdescribe('update user' , () => {
            //TODO
            it('should succeed on correct data', () => {

            })

            it('should fail on incorrect id user', () => {

            })

            //TODO validaciones síncronas
        })

        xdescribe('delete user' , () => {
            //TODO
            it('should succeed on correct data', () => {

            })

            it('should fail on incorrect id user', () => {

            })
        })

    })


    xdescribe('maps', () => { 
        //TODO  
    })

    xdescribe('pins', () => {
        //TODO
    })

    after(() => mongoose.disconnect())
})