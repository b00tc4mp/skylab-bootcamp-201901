require('dotenv').config()
const logic = require('.')
const { RequirementError, ValueError, LogicError } = require('../../common/errors')
const bcrypt = require('bcrypt')
require('../../common/util/math-random.polyfill')

const { models, mongoose } = require('pg-data')
const { UserData, Thing, Location } = models

describe('logic', () => {
    let name, email, password
    
    beforeAll(async () => {

        try {
            await mongoose.connect('mongodb://localhost:27017/pg-test', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
            console.log('connected to database')
        } catch (error) {
            throw Error(error)
        }
    })

    describe('user', () => {
        beforeEach(async () => {
    
            await UserData.deleteMany()
            await Thing.deleteMany()
            name = 'carme'
            email = `cc-${Math.random()}@gmail.com`
            password = '123'
        })
        describe('register user', () => {

            it('should succeed on correct user data', async () => {

                const res = await logic.registerUser(name, email, password)

                const users = await UserData.find()

                expect(res).toBeUndefined()
                expect(users).toBeDefined()
                expect(users).toHaveLength(1)
                expect(users.length).toBeGreaterThan(0)
                expect(users).toHaveLength(1)

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

        describe('on already existing user', () => {
            beforeEach(() => UserData.create({ name, email, password }))

            it('should fail on retrying to register', async () => {
                try {
                    await logic.registerUser(name, email, password)

                    throw Error('should not reach this point')
                } catch (err) {

                    expect(err).toBeDefined()
                    expect(err).toBeInstanceOf(LogicError)
                    expect(err.message).toBe(`user with email ${email} already exists`)
                }
            })
        })

        describe('authenticate user', () => {

            beforeEach(async () => user = await UserData.create({ name, email, password: await bcrypt.hash(password, 5) }))

            it('should succedd on correct user credentials', async () => {

                const id = await logic.authenticateUser(email, password)

                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)
                expect(id).toBeDefined()
                
            })

            it('should fail on non-exixting user', async () => {
                try {
                    await logic.authenticateUser(email = 'unexisting-user@mail.com', password)

                    throw Error('should not reach this point')
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err).toBeInstanceOf(LogicError)
                    expect(err.message).toBe(`user with email ${email} does not exist`)
                }
            })
        })

        describe('retrieve user', () => {
            let user, id
            beforeEach(async () => user = await UserData.create({ name, email, password: await bcrypt.hash(password, 5) }))

            it('should succeed on correct id from existing user', async () => {
                const _user = await logic.retrieveUser(user.id)

                expect(_user.id).toBeUndefined()
                expect(_user.name).toEqual(name)
                expect(_user.email).toEqual(email)
                expect(_user.password).toBeUndefined()
            })
            // it('should fail on unexisting user id', async () => {
            // id = '01234567887654'
            // try {
            //     await logic.retrieveUser(user.id)
            //     throw Error('should not reach this point')
            // } catch (err) {
            //     expect(err).toBeDefined()
            //     expect(err).toBeInstanceOf(LogicError)
            //     expect(err.message).toBe(`user with id ${id} does not exist`)
            // }
            // })
        })
    })

    describe('things', () => {
        let category, description, status
        let name, address, longitude, latitude
        let user, userId
        let loc, locId

        beforeEach(async () => {
    
            await UserData.deleteMany()
            await Thing.deleteMany()
            category = 'electrodomesticos'
            description = 'nevera'
            name = 'Plaça Catalunya'
            address = 'Plaça Catalunya, Barcelona'
            longitude = 40.7127837
            latitude = -74.0059413
        })
    
        describe('add things', () => {
           
            beforeEach(async () => {
                
                user = await UserData.create({ name, email, password: await bcrypt.hash(password, 5) })
                userId = user._id.toString()
                loc = await Location.create({ name, address, latitude, longitude })
                locId = loc._id.toString()                
            })
            it('should succeed on correct public upload', async () => {

                const res = await logic.addPublicThing(category, description, userId, locId)
                expect(res).toBeUndefined()

                const things = await Thing.find()
                expect(things).toHaveLength(1)
                expect(things).toBeDefined()

                const [thing] = things
                
                expect(thing.description).toEqual(description)
                expect(thing.category).toEqual(category)
                expect(thing.owner.toString()).toEqual(userId)
                expect(thing.loc.toString()).toEqual(locId)
                expect(thing.status).toBeDefined()
            })
        })

        describe('update thing', () => {

            beforeEach(async () => {
                user = await UserData.create({ name, email, password: await bcrypt.hash(password, 5) })
                userId = user._id.toString()
                loc = await Location.create({ name, address, latitude, longitude })
                locId = loc._id.toString()

                let stuff = await Thing.create({category, description, owner: userId, loc: locId})
                thingId = stuff.id.toString()
                status = stuff.status
                
            })
            it('should succeed on correct data', async () => {
                
                const res = await logic.updatePublicThing(userId, thingId, status)

                expect(res).toBeDefined()
                
                const things = await Thing.find()
                expect(things).toHaveLength(1)
                expect(things).toBeDefined()

                const [thing] = things
                
                expect(thing.status).toEqual(status)
            })
        })

        describe('search', () => {

            beforeEach(async () => {
                
                
                user = await UserData.create({ name, email, password: await bcrypt.hash(password, 5) })
                userId = user._id.toString()
                loc = await Location.create({ name, address, latitude, longitude })
                locId = loc._id.toString()

                await Thing.create({category, description, owner: userId, loc: locId})
            })
       
            it('should succeed on correct search category', async () => {                
                           
                const category1 = await logic.searchByCategory(userId, category)

                expect(category1).toBeDefined()
                expect(category1).toBeInstanceOf(Array)
                expect(category1).toHaveLength(1)

                category1.forEach(categor => {

                    expect(categor.description).toBeDefined()
                    expect(typeof categor.description).toBe('string')
                })
            })

            it('should succeed on correct search location', async () => {
                                
                const things = await logic.searchByLocation(userId, locId)

                expect(things).toBeDefined()
                expect(things).toBeInstanceOf(Array)
                expect(things).toHaveLength(1)

                things.forEach(thing => {

                    expect(thing.description).toBeDefined()
                    expect(typeof thing.description).toBe('string')
                    expect(thing.category).toBeDefined()
                    expect(typeof thing.category).toBe('string')
                   
                })
            })

            // it('should fail on non- exixting user', async () => {
            //     try {
            //         await logic.registerUser(name, email, password)

            //         // throw Error('should not reach this point')
            //     } catch (err) {

            //         expect(err).toBeDefined()
            //         // expect(err).toBeInstanceOf(LogicError)
            //         expect(err.message).toBe(`user with id ${userId} does not exists`)
            //     }
            // })

            it('should succed on correct search by owner', async() => {
                
                const owner1 = await logic.retrivePrivateThings(userId)

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

    })
    afterAll(async () => {
        // await UserData.deleteMany()
        // await Thing.deleteMany()
        mongoose.disconnect()
    })
})

