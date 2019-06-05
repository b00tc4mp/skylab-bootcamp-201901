import logic from '.'
import { RequirementError, ValueError, LogicError, HttpError } from 'pg-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { models, mongoose } from 'pg-data'
import pgApi from '../data';
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
        email = `c1c-${Math.random()}@gmail.com`
        password = '123'
    })

    describe('user', () => {

        describe('register user', () => {

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

        describe('on already existing user', () => {

            beforeEach(async () => await UserData.create({ name, email, password }))

            it('should fail on retrying to register', async () => {

                try {

                    await logic.registerUser(name, email, password)

                    // throw Error('should not reach this point')                    

                } catch (err) {

                    expect(err).toBeDefined()
                    expect(err).toBeInstanceOf(Error)
                    expect(err.message).toBe(`user with email ${email} already exists`)
                }
            })
        })

        describe('authenticate user', () => {

            beforeEach(async () => {
                user = await UserData.create({ name, email, password: await bcrypt.hash(password, 5) })
            })

            it('should succedd on correct user credentials', async () => {
                await logic.loginUser(email, password)

                expect(logic.isUserLoggedIn).toBeTruthy()
            })

            it('should fail on non-exixting user', async () => {
                let _email = 'unexisting-user@mail.com'
                try {
                    await logic.loginUser(_email, password)
                    throw Error('should not reach this point')
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err).toBeInstanceOf(LogicError)
                    expect(err.message).toBe(`user with email ${_email} does not exist`)
                }
            })
        })

        describe('retrieve user', () => {

            beforeEach(async () => {
                user = await UserData.create({ name, email, password: await bcrypt.hash(password, 5) })
                const res = await pgApi.authenticateUser(email, password)
                token = res.token
                logic.__userToken__ = token
            })

            it('should succeed on correct id from existing user', async () => {

                const _user = await logic.retrieveUser()

                expect(_user.id).toBeUndefined()
                expect(_user.name).toEqual(name)
                expect(_user.email).toEqual(email)
                expect(_user.password).toBeUndefined()
            })
            // xit('should fail on unexisting user id', async () => {

            //     logic.__userToken__ = 'wrong-token'
            //     // const _user = await logic.retrieveUser()

            //     return logic.retrieveUser()
            //         .then(() => { throw Error('should not reach this point') })

            //         .catch(error => {
            //             expect(error).toBeDefined()
            //             expect(error instanceof LogicError).toBeTruthy()

            //             expect(error.message).toBe(`invalid token`)
            //         })

            // const { sub } = jwt.decode(token.token)
            // let idUserDelete = user._id.toString()
            // return logic.retrieveUser()
            // .then(() => { throw Error('should not reach this point') })
            // .catch(error => {
            //     expect(error).toBeDefined()
            //     expect(error instanceof LogicError).toBeTruthy()

            //     expect(error.message).toBe(`token id \"${id}\" does not match user \"${logic.__userId__}\"`)

            // try {

            //     await UserData.findByIdAndDelete(idUserDelete)
            //     await logic.retrieveUser(idUserDelete)

            //     throw Error('should not reach this point')
            // } catch (err) {
            //     expect(err).toBeDefined()
            //     expect(err).toBeInstanceOf(LogicError)

            //     expect(err.message).toBe(`user with id ${idUserDelete} does not exist`)

            // }
            // })
        })
    })

    describe('things', () => {
        let status
        let userId
        let loc, locId
        let thingId, stuff

        const category = 'electrodomesticos'
        const description = 'nevera'
        const nameloc = 'Plaça-Catalunya'
        const address = 'Plaça Catalunya, Barcelona'
        const longitude = 40.7127837
        const latitude = -74.0059413

        beforeEach(async () => {

            try {

                user = await UserData.create({ name, email, password: await bcrypt.hash(password, 5) })
                const res = await pgApi.authenticateUser(email, password)
                token = res.token
                logic.__userToken__ = token
                userId = user._id.toString()
                // token = await logic.loginUser(email, password)
                loc = await Location.create({ name: nameloc, address, latitude, longitude })
                locId = loc._id.toString()
                stuff = await Thing.create({ category, description, owner: userId, loc: locId })
                thingId = stuff.id.toString()
                status = stuff.status

            } catch (error) {
            }
        })

        describe('add things', () => {

            it('should succeed on correct public upload', async () => {

                const res = await logic.addPublicThings(category, description, locId)
                expect(res).toBeDefined()

                const things = await Thing.find()

                expect(things).toBeDefined()
                expect(things).toBeInstanceOf(Array)

                const [thing] = things

                expect(thing.description).toEqual(description)
                expect(thing.category).toEqual(category)
                expect(thing.loc._id.toString()).toEqual(locId)
                expect(thing.status).toBeDefined()

            })
        })

        describe('update thing', () => {

            it('should succeed on correct data', async () => {

                const res = await logic.updatePublicThing(thingId, status)

                expect(res).toBeDefined()

                const things = await Thing.find()
                expect(things).toHaveLength(1)
                expect(things).toBeDefined()
                const [thing] = things

                expect(thing.status).toEqual(status)

            })
        })

        describe('search', () => {

            it('should succeed on correct search category', async () => {

                const category1 = await logic.searchByCategory(category)

                expect(category1).toBeDefined()
                expect(category1).toBeInstanceOf(Array)
                expect(category1).toHaveLength(1)

                category1.forEach(categor => {

                    expect(categor.description).toBeDefined()
                    expect(typeof categor.description).toBe('string')
                })
            })

            it('should succeed on correct search location', async () => {

                const things = await logic.searchByLocation( nameloc)

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
                
                const owner1 = await logic.retrivePrivateThings()                

                expect(owner1).toBeDefined()
                expect(owner1).toBeInstanceOf(Array)
                
                owner1.forEach(own => {

                    expect(own.description).toBeDefined()
                    expect(typeof own.description).toBe('string')
                    expect(own.category).toBeDefined()
                    expect(typeof own.category).toBe('string')
                    debugger
                })
            })
        })

        describe('search thing', () => {

            it('should succedd on correct data', async () => {
                
                const thing1 = await logic.retrieveThing(thingId)

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