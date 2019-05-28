const logic = require('.')
const { LogicError, RequirementError, ValueError, FormatError } = require('../common/errors')
const { MongoClient, ObjectId } = require('mongodb')
const duckApi = require('../data/duck-api')
const userData= require('../data/user-data')
require('../common/utils/object-matches.polyfill')

const url = 'mongodb://localhost/rest-api-logic-test'

describe('logic', () => {
    const name = 'lila'
    const surname = 'lila'
    let email
    const password = '123'
    beforeAll(async () => {
        client = await MongoClient.connect(url, { useNewUrlParser: true })

        const db = client.db()

        users = db.collection('users')

        userData.__col__ = users
        
    })

    beforeEach(async () => {
        await users.deleteMany()

        email = `lila-${Math.random()}@gmail.com`
    })

    describe('users', () => {
        describe('register user', () => {

            it('should succeed on correct user data', async () =>{
                    const response = await logic.registerUser(name, surname, email, password)
                    
                    expect(response).toBeUndefined()
                    const users =  await userData.find(user => user.matches({ name, surname, email, password }))
                    expect(users).toBeDefined()
                    expect(users).toHaveLength(1)
                    
                })

            describe('on already existing user', () => {
                beforeEach(() => userData.create({name, surname, email, password}))

                it('should fail on retrying to register', async () =>{
                    try{
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point') 
                    }catch(error) {
                            expect(error).toBeDefined()
                            expect(error).toBeInstanceOf(LogicError)
                            expect(error.message).toBe(`user with email "${email}" already exists`)
                        }
                })
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })

            // TODO password fail cases
        })

        describe('authenticate user', () => {
            beforeEach(() =>userData.create({ name, surname, email, password }))

            it('should succeed on correct user credential', async () =>{
                const id= await logic.authenticateUser(email, password)
        
                        expect(typeof id).toBe('string')
                        expect(id.length).toBeGreaterThan(0)
            })

            it('should fail on non-existing user', async () =>{
                try{
                    await logic.authenticateUser(email = 'unexisting-user@mail.com', password)
                    throw Error('should not reach this point') 
                }catch(error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe(`user with email "${email}" does not exist`)
                    }
            })
        })

        describe('retrieve user', () => {
            let id

            beforeEach(async () =>{
                await userData.create({ name, surname, email, password })
                const users= await userData.find(user => user.email === email)
                id = users[0]._id.toString()
            })

            it('should succeed on correct user id', async () =>{
                const user= await logic.retrieveUser(id)
                expect(user.id).toBeUndefined()
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(user.password).toBeUndefined()
                })

                it('should fail on unexisting user id', async () => {
                    id = '01234567890123456789abcd'
    
                    try {
                        await logic.retrieveUser(id)
    
                        throw new Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
    
                        expect(error).toBeInstanceOf(LogicError)
    
                        expect(error.message).toBe(`user with id "${id}" does not exist`)
                    }
                })
        })

        describe('toggle fav duck', () => {
            let id, duckId

            beforeEach(async () => {
                duckId = `${Math.random()}`

                await userData.create({ name, surname, email, password })

                const [user] = await userData.find(user => user.email === email)

                id = user._id.toString()
            })

            it('should succeed adding fav on first time', async () => {
                const res = await logic.toggleFavDuck(id, duckId)
                expect(res).toBeUndefined()

                const user = await userData.retrieve(ObjectId(id))

                const { favs } = user

                expect(favs).toBeDefined()
                expect(favs).toBeInstanceOf(Array)
                expect(favs).toHaveLength(1)
                expect(favs[0]).toBe(duckId)
            })

            it('should succeed removing fav on second time', async () => {
                await logic.toggleFavDuck(id, duckId)

                const res = await logic.toggleFavDuck(id, duckId)

                expect(res).toBeUndefined()

                const user = await userData.retrieve(ObjectId(id))

                const { favs } = user

                expect(favs).toBeDefined()
                expect(favs).toBeInstanceOf(Array)
                expect(favs).toHaveLength(0)
            })


            it('should fail on null duck id', () => {
                duckId = null

                expect(() => logic.toggleFavDuck(duckId)).toThrowError(RequirementError, 'id is not optional')
            })

            // TODO more cases
        })

        describe('retrieve fav ducks', () => {
            let id, _favs

            beforeEach( async () => {
                _favs = []

                const ducks= await duckApi.searchDucks('')
                    
                for (let i = 0; i < 10; i++) {
                    const randomIndex = Math.floor(Math.random() * ducks.length)

                    _favs[i] = ducks.splice(randomIndex, 1)[0].id
                }

                await userData.create({ email, password, name, surname, favs: _favs })
                    
                const [user]= await userData.find(user => user.email === email)
        
                id = user._id.toString()
            

            })

            it('should succeed adding fav on first time', async () =>{
                
                const ducks= await logic.retrieveFavDucks(id)
                
                        ducks.forEach(({ id, title, imageUrl, description, price }) => {
                            const isFav = _favs.some(fav => fav === id)

                            expect(isFav).toBeTruthy()
                            expect(typeof title).toBe('string')
                            expect(title.length).toBeGreaterThan(0)
                            expect(typeof imageUrl).toBe('string')
                            expect(imageUrl.length).toBeGreaterThan(0)
                            expect(typeof description).toBe('string')
                            expect(description.length).toBeGreaterThan(0)
                            expect(typeof price).toBe('string')
                            expect(price.length).toBeGreaterThan(0)
                        })
                    
                })
        })

        describe('add cart duck', () => {
            let id, duckId

            beforeEach(async () => {
                duckId = `${Math.random()}`

                await userData.create({ name, surname, email, password })
                const [user]= await userData.find(user => user.email === email)
                id = user._id.toString()
            })

            it('should succeed adding cart on first time', async () =>{
                const response = await logic.addCartDuck(id, duckId)
                
                    expect(response).toBeUndefined()
                    const user = await userData.retrieve(ObjectId(id))
                    
                    const { cart } = user

                    expect(cart).toBeDefined()
                    expect(cart).toBeInstanceOf(Array)
                    expect(cart).toHaveLength(1)
                    expect(cart[0]).toBe(duckId)
                    
                })

            it('should fail on null duck id', () => {
                duckId = null

                expect(() => logic.addCartDuck(duckId)).toThrowError(RequirementError, 'id is not optional')
            })

            // TODO more cases
        })
        describe('delete cart duck', () => {
            let id, duckId

            beforeEach(async () => {
                duckId = `${Math.random()}`

                await userData.create({ name, surname, email, password })
                const [user]= await userData.find(user => user.email === email)
                id = user._id.toString()
            })

            it('should succeed removing cart', async () =>{
                await logic.addCartDuck(id, duckId)
                const response= await logic.deleteCartDuck(id, duckId)
                expect(response).toBeUndefined()
                const user= await userData.retrieve(ObjectId(id))
                    
                const { cart } = user

                expect(cart).toBeDefined()
                expect(cart).toBeInstanceOf(Array)
                expect(cart).toHaveLength(0)
                    
                })

            it('should fail on null duck id', () => {
                duckId = null

                expect(() => logic.deleteCartDuck(duckId)).toThrowError(RequirementError, 'id is not optional')
            })

            // TODO more cases
        })
        describe('retrieve cart ducks', () => {
            let id, _carts

            beforeEach(async () => {
                _carts = []

                const ducks= await duckApi.searchDucks('')
            
                for (let i = 0; i < 10; i++) {
                    const randomIndex = Math.floor(Math.random() * ducks.length)

                    _carts[i] = ducks.splice(randomIndex, 1)[0].id
                }

                await userData.create({ email, password, name, surname, favs: _carts })
                    
                const [user]= await userData.find(user => user.email === email)
                id = user._id.toString()

            })

            it('should succeed adding cart on first time', async () =>{
                const ducks = await logic.retrieveCartDucks(id)
                
                        ducks.forEach(({ id, title, imageUrl, description, price }) => {
                            
                            const isOnCart = _carts.some(cart => cart === id)

                            expect(isOnCart).toBeTruthy()
                            expect(typeof title).toBe('string')
                            expect(title.length).toBeGreaterThan(0)
                            expect(typeof imageUrl).toBe('string')
                            expect(imageUrl.length).toBeGreaterThan(0)
                            expect(typeof description).toBe('string')
                            expect(description.length).toBeGreaterThan(0)
                            expect(typeof price).toBe('string')
                            expect(price.length).toBeGreaterThan(0)
                        })
                    
                })
        })
        describe('payment', ()=>{
            let id, duckId

            beforeEach(async () => {
                duckId = `${Math.random()}`

                await userData.create({ name, surname, email, password })
                const [user]= await userData.find(user => user.email === email)
                id = user._id.toString()
                await logic.addCartDuck(id, duckId)
            })
            it('should succeed on correct data', async ()=>{
                const response= await logic.payment(id)
                expect(response).toBeUndefined()
                const user= await userData.retrieve(ObjectId(id))
                const { orders , cart} = user

                expect(cart).toHaveLength(0)
                expect(orders).toBeDefined()
                expect(orders).toBeInstanceOf(Array)
                expect(orders).toHaveLength(1)

            })
        })
    })

    xdescribe('ducks', () => {
        let id

        beforeEach(() =>
            userData.create({ email, password, name, surname })
                .then(() => userData.find(user => user.email === email))
                .then(([user]) => id = user.id)
        )

        xdescribe('search ducks', () => {
            it('should succeed on correct query', () =>
                logic.searchDucks(id, 'yellow')
                    .then(ducks => {
                        expect(ducks).toBeDefined()
                        expect(ducks).toBeInstanceOf(Array)
                        expect(ducks.length).toBe(13)
                    })

                // TODO other cases
            )
        })

        describe('retrieve duck', () => {
            let duck

            beforeEach(() =>
                duckApi.searchDucks('yellow')
                    .then(ducks => duck = ducks[0])
            )

            it('should succeed on correct duck id', () =>
                logic.retrieveDuck(id, duck.id)
                    .then(_duck => {
                        expect(_duck).toMatchObject(duck)

                        expect(typeof _duck.description).toBe('string')
                        expect(_duck.description.length).toBeGreaterThan(0)
                    })
            )
        })
    })

    afterAll(() => client.close(true))
})