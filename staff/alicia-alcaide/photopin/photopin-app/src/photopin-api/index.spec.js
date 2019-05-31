require('dotenv').config()

const photopinApi = require('.')
const expect = require('chai')
const bcrypt = require('bcrypt')
const { LogicError, RequirementError, ValueError } = require ('photopin-errors')
const { mongoose, models : { User, PMap, Pin } } = require('photopin-data')

//const { env: { MONGODB_URL_API_LOGIC_TEST : url } } = process
const url = 'mongodb://localhost/photopin-front-test'

describe('logic', () => {
    before(async () => {
        try {
            await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false })
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
                
                await photopinApi.registerUser(name, surname, email, password)
                
                const user = await User.findOne({email})
                
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                
                const match = await bcrypt.compare(password, user.password)
                expect(match).to.be.true
            })
                
            it('should fail on retrying to register an already existing user', async () => {
                try {
                    await User.create({name, surname, email, password})   
                    await photopinApi.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with email ${email} already exists`)
                }
            })
            
            it('should fail on undefined email', () => {
    
                expect(() => photopinApi.registerUser(name, surname, undefined, password)).to.throw(RequirementError, `email is not optional`)
            })
    
            it('should fail on null email', () => {
    
                expect(() => photopinApi.registerUser(name, surname, null, password)).to.throw(RequirementError, `email is not optional`)
            })
    
            it('should fail on empty email', () => {
                expect(() => photopinApi.registerUser(name, surname, '', password)).to.throw(ValueError, 'email is empty')
            })
    
            it('should fail on blank email', () => {
                expect(() => photopinApi.registerUser(name, surname, ' \t    \n', password)).to.throw(ValueError, 'email is empty')
            })

            //TODO resto de casos síncronos de variables obligatorias (name, surname, password)


        })

        describe('authenticate user', () => {
            let user

            beforeEach(async () => user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) }))

            it('should succeed on correct credentials', async () => {
            
                const id = await photopinApi.authenticateUser(email, password)

                expect(id).to.exist
                expect(id).to.be.a('string')
                expect(id).to.equal(user.id)
            })

            it('should fail on non-existing user',async () => {
                const _email = 'unexisting-user@mail.com'
                try {
                    await photopinApi.authenticateUser(_email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with email ${_email} doesn't exists`)
                }
            })
            
            it('should fail on wrong credentials',async () => {
                try {
                    await photopinApi.authenticateUser(email, 'incorrect password')
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`wrong credentials`)
                }
            })

        })

        describe('retrieve user', () => {
            let user

            beforeEach(async () => user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) }))

            it('should succeed on correct id from existing user', async () => {
                const _user = await photopinApi.retrieveUser(user.id)

                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)

                expect(_user.password).to.be.undefined
            })

            it('should fail on incorrect user id', async() => {
                const wrongId = '342452654635'
                try {
                    await photopinApi.retrieveUser(wrongId)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

        })

        describe('update user' , () => {
            let user, _name, _surname, _email, _avatar, _language, userUp, userId

            beforeEach(async () => {
                user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) })
                userId = user.id
                _name = user.name + '-MOD'
                _surname = user.surname + '-MOD'
                _email = user.email + '-MOD'
                _avatar = 'newAvatar'
                _language = 'ES'
                userUp = { name: _name, surname: _surname, email: _email, avatar: _avatar, language: _language }
            }) 

            it('should succeed on correct data', async () => {

                await photopinApi.updateUser(userId, userUp)
                
                const userMod = photopinApi.retrieveUser(userId)
                
                expect(userMod.name).to.equal(userUp._name)
                expect(userMod.surname).to.equal(userUp._surname)
                expect(userMod.email).to.equal(userUp._email)
                expect(userMod.avatar).to.equal(userUp._avatar)
                expect(userMod.language).to.equal(userUp._language)
                expect(userMod.password).to.be.undefined

            })

            it('should fail on incorrect id user', async () => {

                const wrongId = '342452654635'

                try {
                    await photopinApi.updateUser(wrongId, userUp)
                    throw Error('should not reach this point')
                } catch (error) {
                    
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on undefined id', () => {
                expect(() => photopinApi.updateUser(undefined, userUp)).to.throw(RequirementError, `id is not optional`)
            })
    
            it('should fail on null id', () => {
                expect(() => photopinApi.updateUser(null, userUp)).to.throw(RequirementError, `id is not optional`)
            })
    
            it('should fail on empty id', () => {
                expect(() => photopinApi.updateUser('', userUp)).to.throw(ValueError, 'id is empty')
            })
    
            it('should fail on blank id', () => {
                expect(() => photopinApi.updateUser(' \t    \n', userUp)).to.throw(ValueError, 'id is empty')
            })
    
            it('should fail on a not string id', () => {
                expect(() => photopinApi.updateUser(123, userUp)).to.throw(TypeError, `id 123 is not a string`)
            })

            it('should fail on undefined user data', () => {
                expect(() => photopinApi.updateUser(userId, undefined)).to.throw(RequirementError, `data is not optional`)
            })
    
            it('should fail on null user data', () => {
                expect(() => photopinApi.updateUser(userId, null)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on a not object data', () => {
                expect(() => photopinApi.updateUser(userId, 'data')).to.throw(TypeError, 'data data is not a object')
            })

        })

        describe('remove user' , () => {
            let user, userId

            beforeEach(async () => {
                user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) })
                userId = user.id
            }) 

            it('should succeed on correct credentials', async () => {
                try {
                    await photopinApi.removeUser(userId)
                }
                catch(error) {
                    throw Error('should not reach this point')
                }
            
                let _user
                try {
                    _user = photopinApi.retrieveUser(userId)
                }
                catch(error) {
                    expect(_user).to.be.undefined
                }
            })

            it('should fail on incorrect id user', async () => {

                const wrongId = '342452654635'

                try {
                    await photopinApi.removeUser(wrongId)
                    throw Error('should not reach this point')
                } catch (error) {
                    
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on undefined id', () => {
                expect(() => photopinApi.removeUser(undefined)).to.throw(RequirementError, `id is not optional`)
            })
    
            it('should fail on null id', () => {
                expect(() => photopinApi.removeUser(null)).to.throw(RequirementError, `id is not optional`)
            })
    
            it('should fail on empty id', () => {
                expect(() => photopinApi.removeUser('')).to.throw(ValueError, 'id is empty')
            })
    
            it('should fail on blank id', () => {
                expect(() => photopinApi.removeUser(' \t    \n')).to.throw(ValueError, 'id is empty')
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