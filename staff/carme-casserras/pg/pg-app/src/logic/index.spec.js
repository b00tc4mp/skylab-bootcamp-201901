import logic from '.'
import { RequirementError, ValueError, LogicError, HttpError } from 'pg-errors'
import jwt from 'jsonwebtoken'
import { models, mongoose } from 'pg-data'
const { UserData, Thing, Location } = models

const url = 'mongodb://localhost:27017/pg-test'

jest.setTimeout(100000)

beforeAll(() => mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }))

describe('pg-logic', () => {
    let name, email, password, user, token, id

    beforeEach(async () => {
        await UserData.deleteMany()
        await Thing.deleteMany()
        await Location.deleteMany()
        name = 'carme'
        email = `cc-${Math.random()}@gmail.com`
        password = '123'
    })

    describe('user', () => {

        xdescribe('register user', () => {

            it('should succeed on correct user data', async () => {
                
                const res = await logic.registerUser(name, email, password)
                const users = await UserData.find()
                
                expect(res).toBeUndefined()
                expect(users).toBeDefined()
                expect(users).toHaveLength(1)
                expect(users.length).toBeGreaterThan(0)
               
                const [user] = users

                expect(user.name).toBe(name)
                expect(user.email).toBe(email)
                expect(user.password).toBeDefined()
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on nul name', () => {
                const name = null
                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `name is not optional`)
            })
            it('should fail on empty name', () => {
                const name = ''
                expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, `name is not optional`)
            })
            it('should fail on blank name', () => {
                const name = '\t   \n'
                expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, `name is not optional`)
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'email is empty')
            })
        })

        xdescribe('on already existing user', () => {
            
            beforeEach(async() =>  await UserData.create({ name, email, password }))          
               
            it('should fail on retrying to register', async () => {

                try {
                    
                    await logic.registerUser(name, email, password)
    
                    throw Error('should not reach this point')                    
                    
                } catch (err) {

                    expect(err).toBeDefined()
                    expect(err).toBeInstanceOf(Error)
                    expect(err.message).toBe(`user with email ${email} already exists`)
                }
            })
        })

        fdescribe('authenticate user', () => {
                        
            beforeEach(async () =>  {
                user = await UserData.create({ name, email, password })                
            })
            
            it('should succedd on correct user credentials', async () => {
                logic.loginUser(email, password)
                .then(() => {
                    const { __userToken__ } = logic

                    expect(typeof __userToken__).toBe('string')
                    expect(__userToken__.length).toBeGreaterThan(0)
                    expect(logic.isUserLoggedIn).toBeTruthy()                    
                })
        
                // token = await logic.loginUser(email, password)        
                // const { sub } = jwt.decode(token.token)
                // expect(typeof sub).toBe('string')
                // expect(sub.length).toBeGreaterThan(0)
                // expect(sub).toBeDefined()
                // expect(sub).toEqual(user.id)

            })

            it('should fail on non-exixting user', async () => {
                
                await logic.authenticateUser(email = 'unexisting-user@mail.com', password)

                // .then(() => { throw Error('should not reach this point') })
                // .catch(error => {
                //     expect(error).toBeDefined()
                //     expect(error instanceof LogicError).toBeTruthy()

                //     expect(error.message).toBe(`user with username \"${email}\" does not exist`)
                // })
                
                try {

                    throw Error('should not reach this point')
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err).toBeInstanceOf(LogicError)
                    expect(err.message).toBe(`user with email ${email} does not exist`)

                    
                }
            })
        })

        describe('retrieve user', () => {
            
            beforeEach(async () =>  {
                user = await UserData.create({ name, email, password: await bcrypt.hash(password, 5) })                
                token = await logic.authenticateUser(email, password)        
            })

            it('should succeed on correct id from existing user', async () => {

                // const { sub } = jwt.decode(token.token)
                const _user = await logic.retrieveUser(token)

                // expect(sub).toEqual(user.id)
                expect(_user.id).toBeUndefined()
                expect(_user.name).toEqual(name)
                expect(_user.email).toEqual(email)
                expect(_user.password).toBeUndefined()
            })
            it('should fail on unexisting user id', async () => {
                const { sub } = jwt.decode(token.token)
                let idUserDelete = user._id.toString()
                debugger
                try {
                    debugger
                    await UserData.findByIdAndDelete(idUserDelete)
                    await logic.retrieveUser(idUserDelete)
debugger
                    throw Error('should not reach this point')
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err).toBeInstanceOf(LogicError)
                    debugger
                    expect(err.message).toBe(`user with id ${idUserDelete} does not exist`)
                    debugger
                }
            })
        })
    })

    describe('things', () => {
        let status
        let userId
        let loc, locId
        let thingId, stuff

        const category = 'electrodomesticos'
        const description = 'nevera'
        const name = 'Plaça-Catalunya'
        const address = 'Plaça Catalunya, Barcelona'
        const longitude = 40.7127837
        const latitude = -74.0059413

        beforeEach(async () => {

            user = await UserData.create({ name, email, password: await bcrypt.hash(password, 5) })
            userId = user._id.toString()
            token = await logic.authenticateUser(email, password)  
            loc = await Location.create({ name, address, latitude, longitude })
            locId = loc._id.toString()
            stuff = await Thing.create({ category, description, owner: userId, loc: locId })
            thingId = stuff.id.toString()
            status = stuff.status
        })

        describe('add things', () => {

            it('should succeed on correct public upload', async () => {
                const { sub } = jwt.decode(token.token)

                const res = await logic.addPublicThing(category, description, token.token, locId)
                expect(res).toBeDefined()

                const things = await Thing.find()

                expect(things).toBeDefined()
                expect(things).toBeInstanceOf(Array)

                const [thing] = things
                
                expect(thing.description).toEqual(description)
                expect(thing.category).toEqual(category)
                expect(userId).toEqual(sub)
                expect(thing.loc._id.toString()).toEqual(locId)
                expect(thing.status).toBeDefined()
                
            })
        })

        describe('update thing', () => {

            it('should succeed on correct data', async () => {
                const { sub } = jwt.decode(token.token)
                const res = await logic.updatePublicThing(token.token, thingId, status)
                
                expect(res).toBeDefined()
                
                const things = await Thing.find()
                expect(things).toHaveLength(1)
                expect(things).toBeDefined()
                expect(userId).toEqual(sub)
                const [thing] = things
                
                expect(thing.status).toEqual(status)
                
            })
        })


        describe('search', () => {

            it('should succeed on correct search category', async () => {
                const { sub } = jwt.decode(token.token)
                const category1 = await logic.searchByCategory(token.token, category)

                expect(userId).toEqual(sub)

                expect(category1).toBeDefined()
                expect(category1).toBeInstanceOf(Array)
                expect(category1).toHaveLength(1)

                category1.forEach(categor => {

                    expect(categor.description).toBeDefined()
                    expect(typeof categor.description).toBe('string')
                })
            })

            it('should succeed on correct search location', async () => {
                const { sub } = jwt.decode(token.token)
                const things = await logic.searchByLocation(token.token, name)

                expect(userId).toEqual(sub)
                expect(things).toBeDefined()
                expect(things).toBeInstanceOf(Array)
                

                // things.forEach(thing => {
                    const [thing] = things
                    expect(thing.description).toBeDefined()
                    expect(typeof thing.description).toBe('string')
                    expect(thing.category).toBeDefined()
                    expect(typeof thing.category).toBe('string')

                // })
            })

            it('should succed on correct search by owner', async () => {
                const { sub } = jwt.decode(token.token)
                const owner1 = await logic.retrivePrivateThings(token.token)

                expect(userId).toEqual(sub)

                expect(owner1).toBeDefined()
                expect(owner1).toBeInstanceOf(Array)
                expect(owner1).toHaveLength(1)

                owner1.forEach(own => {

                    expect(own.description).toBeDefined()
                    expect(typeof own.description).toBe('string')
                    expect(own.category).toBeDefined()
                    expect(typeof own.category).toBe('string')
                })
            })
        })

        describe('search thing', () => {

            it('should succedd on correct data', async () => {
                const { sub } = jwt.decode(token.token)
                const thing1 = await logic.retrieveThing(token.token, thingId)

                expect(userId).toEqual(sub)
                expect(thing1).toBeDefined()
                expect(thing1).toBeInstanceOf(Object)


                expect(thing1.description).toBeDefined()
                expect(typeof thing1.description).toBe('string')
                expect(thing1.category).toBeDefined()
                expect(typeof thing1.category).toBe('string')
                expect(thing1.loc.name).toBeDefined()
                expect(typeof thing1.loc.name).toBe('string')
            })
        })
    })
    afterAll(async () => {
        await UserData.deleteMany()
        await Thing.deleteMany()
        await Location.deleteMany()
        mongoose.disconnect()
    })
})