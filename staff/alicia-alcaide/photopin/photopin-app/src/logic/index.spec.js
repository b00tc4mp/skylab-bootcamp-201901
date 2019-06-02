require('dotenv').config()

const logic = require('.')
const jsdom = require('jsdom')
const expect = require('chai').expect
const bcrypt = require('bcrypt')
const { RequirementError, ValueError } = require ('photopin-errors')
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
                
                await logic.registerUser(name, surname, email, password)
                
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
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
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

        })

        describe('login user', () => {
            let user

            beforeEach(async () => user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) }))

            it('should succeed on correct credentials', async () => {
                await logic.loginUser(email, password)
            })

            it('should fail on non-existing user',async () => {
                const _email = 'unexisting-user@mail.com'
                try {
                    await logic.loginUser(_email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                }
            })
            
            it('should fail on wrong credentials',async () => {
                try {
                    await logic.loginUser(email, 'incorrect password')
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                }
            })

        })

        describe('retrieve user', () => {
            let user, token

            beforeEach(async () => {
                user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) })
                await logic.loginUser(email, password)
                token = logic.__userToken__
            })

            it('should succeed on correct authenticate user', async () => {
                const _user = await logic.retrieveUser(token)

                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)
                expect(_user.password).to.be.undefined
            })

            it('should fail on incorrect token', async() => {
                const wrongtoken = '342452654635'
                try {
                    await logic.retrieveUser(wrongtoken)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                }
            })

        })

        describe('update user' , () => {
            let user, _name, _surname, _email, _avatar, _language, userUp, userId, token

            beforeEach(async () => {
                user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) })
                await logic.loginUser(email, password)
                token = logic.__userToken__
                userId = user.id
                _name = user.name + '-MOD'
                _surname = user.surname + '-MOD'
                _email = user.email + '-MOD'
                _avatar = 'newAvatar'
                _language = 'ES'
                userUp = { name: _name, surname: _surname, email: _email, avatar: _avatar, language: _language }
            }) 

            it('should succeed on correct credentials', async () => {

                await logic.updateUser(token, userUp)
                
                const userMod = logic.retrieveUser(token)
                
                expect(userMod.name).to.equal(userUp._name)
                expect(userMod.surname).to.equal(userUp._surname)
                expect(userMod.email).to.equal(userUp._email)
                expect(userMod.avatar).to.equal(userUp._avatar)
                expect(userMod.language).to.equal(userUp._language)
                expect(userMod.password).to.be.undefined

            })

            it('should fail on a not athenticate user', async () => {

                const _token = '342452654635'

                try {
                    await logic.updateUser(_token, userUp)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                }
            })

            it('should fail on undefined id', () => {
                expect(() => logic.updateUser(undefined, userUp)).to.throw(RequirementError, `token is not optional`)
            })
    
            it('should fail on null token', () => {
                expect(() => logic.updateUser(null, userUp)).to.throw(RequirementError, `token is not optional`)
            })
    
            it('should fail on empty token', () => {
                expect(() => logic.updateUser('', userUp)).to.throw(ValueError, 'token is empty')
            })
    
            it('should fail on blank token', () => {
                expect(() => logic.updateUser(' \t    \n', userUp)).to.throw(ValueError, 'token is empty')
            })
    
            it('should fail on a not string token', () => {
                expect(() => logic.updateUser(123, userUp)).to.throw(TypeError, `token 123 is not a string`)
            })

            it('should fail on undefined user data', () => {
                expect(() => logic.updateUser(userId, undefined)).to.throw(RequirementError, `data is not optional`)
            })
    
            it('should fail on null user data', () => {
                expect(() => logic.updateUser(userId, null)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on a not object data', () => {
                expect(() => logic.updateUser(userId, 'data')).to.throw(TypeError, 'data data is not a object')
            })

        })

        describe('remove user' , () => {
            let user, userId, token

            beforeEach(async () => {
                user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) })
                await logic.loginUser(email, password)
                token = logic.__userToken__
            }) 

            it('should succeed on correct credentials', async () => {
                try {
                    await logic.removeUser(token)
                }
                catch(error) {
                    throw Error('should not reach this point')
                }
            
                let _user
                try {
                    _user = logic.retrieveUser(token)
                }
                catch(error) {
                    expect(error).to.exist
                }
            })

            it('should fail on a not authenticate user', async () => {

                const _token = '342452654635'

                try {
                    await logic.removeUser(_token)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.exist
                }
            })

            it('should fail on undefined token', () => {
                expect(() => logic.removeUser(undefined)).to.throw(RequirementError, `token is not optional`)
            })
    
            it('should fail on null token', () => {
                expect(() => logic.removeUser(null)).to.throw(RequirementError, `token is not optional`)
            })
    
            it('should fail on empty token', () => {
                expect(() => logic.removeUser('')).to.throw(ValueError, 'token is empty')
            })
    
            it('should fail on blank token', () => {
                expect(() => logic.removeUser(' \t    \n')).to.throw(ValueError, 'token is empty')
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