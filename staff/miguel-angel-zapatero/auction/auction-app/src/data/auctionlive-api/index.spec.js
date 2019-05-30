// require('dotenv').config();
import auctionLiveApi from '.'
import { mongoose, models } from 'auction-data'
import { LogicError, RequirementError, ValueError, FormatError } from 'auction-errors'
import bcrypt from  'bcrypt'
import moment from 'moment'
import jwt from 'jsonwebtoken'

const { User, Item, Bid } = models

const {env: { MONGO_URL_LOGIC_TEST }} = process

describe('auctionlive-api', () => {
    beforeAll(async () => {
        try {
            await mongoose.connect(MONGO_URL_LOGIC_TEST, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
            
            console.log('connected to database')
        } catch (error) {
            console.log(error, error.message)
        }
    })

    let name, surname, email, password

    beforeEach(async () => {
        const users = new Array(10).fill().map(item => item = {
            name: `Peter-${Math.random()}`,
            surname: `Parker-${Math.random()}`,
            email: `pparker-${Math.random()}@mail.com`,
            password: `${Math.random()}`
        })
        
        const user = users[Math.floor(Math.random() * users.length)]

        name = user.name
        surname = user.surname
        email = user.email
        password = user.password
        
        await User.deleteMany()
        await Item.deleteMany()
        await Bid.deleteMany()
    })

    describe('users', () => {
        describe('register user', () => {
            it('should success on correct data', async () => {
                const res = await auctionLiveApi.registerUser(name, surname, email, password)

                expect(res.message).toBe('Ok, user registered.')

                const user = await User.findOne({email})
                
                const samePass = bcrypt.compareSync(password, user.password)

                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(samePass).toBe(true)
            })

            it('should fail on already user exists', async () => {
                try {
                    await User.create({name, surname, email, password})   
                    await auctionLiveApi.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    // expect(error).toBeInstanceOf(LogicError)
                    expect(error.message).toBe(`user with email "${email}" already exist`)
                }
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => auctionLiveApi.registerUser(name, surname, nonEmail, password)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })

            it('should fail on undefined password', () => {
                const email = undefined

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => auctionLiveApi.registerUser(name, surname, email, password)).toThrowError(ValueError, 'password is empty')
            })
        })

        describe('after created user', () =>{
            let user, _password

            beforeEach(async() => {
                _password = bcrypt.hashSync(password, 10)
                user = await User.create({name, surname, email, password: _password})
            })

            describe('authenticate user', () => {
                it('should success on correct data', async () => {
                    const {token} = await auctionLiveApi.authenticateUser(email, password)
                    
                    var {sub} = jwt.decode(token)
                    
                    expect(sub).toBe(user.id)
                })

                it('should fail on non-existing user', async () => {
                    try {
                        await auctionLiveApi.authenticateUser(email = 'unexisting-user@mail.com', password)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        // expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe(`user with email "${email}" doesn't exist`)
                    }
                })

                it('should fail on wrong password', async () => {
                    try {
                        await auctionLiveApi.authenticateUser(email, password = '123')
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        // expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe('wrong credentials')
                    }
                })
            })

            describe('retrieve user', () => {
                let token

                beforeEach(async () => {
                    const res = await auctionLiveApi.authenticateUser(email, password)
                    token = res.token
                })

                it('should success on correct user token', async () => {
                   
                    const _user = await auctionLiveApi.retrieveUser(token)

                    expect(_user.id).toBeUndefined()
                    expect(_user.name).toBe(user.name)
                    expect(_user.surname).toBe(user.surname)
                    expect(_user.email).toBe(user.email)
                    expect(_user.password).toBeUndefined()
                })

                it('should fail on invalid token', async () => {
                    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2YwNWRiMTlhOWFkMDE2MGMxODhlYmMiLCJpYXQiOjE1NTkyNTY1MDEsImV4cCI6MTU1OTI2MDEwMX0.HXQ4YMq6bdsXfQQthBKKZ4sdfsdfsXUOCF3xdqs1h69F7bg'
    
                    try {
                        await auctionLiveApi.retrieveUser(token) 
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        // expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe('invalid signature')
                    }
                })
    
                it('should fail on wrong token', async () => {
                    token = 'wrong-id'
    
                    try {
                        await auctionLiveApi.retrieveUser(token) 
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        
                        expect(error.message).toBe('jwt malformed')
                    }
                })
            })

            //--------<start>

            describe('update', () => {        
                let data, token

                beforeEach(async () => {
                    const res = await auctionLiveApi.authenticateUser(email, password)
                    token = res.token

                    data = { name: 'n', surname: 's', email: 'e@e.com', password: 'p'}
                })
                it('should succeed on correct data', async () => {    
                    const response = await auctionLiveApi.updateUser(token, data.name, data.surname, data.email, data.password)
                    expect(response).toBeUndefined()
                    
                    const _user = await User.findById(user.id)
                    
                    expect(_user).toBeDefined()
                    expect(_user.id).toBe(user.id)
                    expect(_user.surname).toBe(data.surname)
                    expect(_user.name).toBe(data.name)
                    expect(_user.email).toBe(data.email)

                    const pass = bcrypt.compareSync(data.password, _user.password)

                    expect(pass).toBeTruthy()
                    expect(_user.lastAccess).toBeUndefined()
                    
                    expect(Object.keys(_user._doc).length).toEqual(Object.keys(user._doc).length)
                })

                it('should succeed changing some fields', async () => {    
                    const data = { name: 'n', email: 'e@e.com'}
    
                    const response = await auctionLiveApi.updateUser(token, data.name, data.surname, data.email, data.password)
                    expect(response).toBeUndefined()
                    
                    const _user = await User.findById(user.id)
                    
                    expect(_user).toBeDefined()
                    expect(_user.id).toBe(user.id)
                    expect(_user.name).toBe(data.name)
                    expect(_user.email).toBe(data.email)
                    
                    expect(_user.name).not.toBe(user.name)
                    expect(_user.email).not.toBe(user.email)
                    expect(_user.surname).toBe(user.surname)
                    expect(_user.password).toBe(user.password)
    
                    expect(Object.keys(_user._doc).length).toEqual(Object.keys(user._doc).length)
                })
    
                it('should fail on incorrect user token', async () => {    
                    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2YwNWRiMTlhOWFkMDE2MGMxODhlYmMiLCJpYXQiOjE1NTkyNTY1MDEsImV4cCI6MTU1OTI2MDEwMX0.HXQ4YMq6bdsXfQQthBKKZ4sdfsdfsXUOCF3xdqs1h69F7bg'
    
                    try {
                        await auctionLiveApi.updateUser(token, data.name, data.surname, data.email, data.password) 
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
        
                        expect(error.message).toBe('invalid signature')
                    }
                })
                
                it('should fail on wrong token', async () => {    
                    let id = 'wrong-id'
    
                    try {
                        await auctionLiveApi.updateUser(id, data.name, data.surname, data.email, data.password)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        
                        expect(error.message).toBe('jwt malformed')
                    }
                })

                it('should fail on existing email user', async () => {    
                    await User.create({name, surname, email: 'email@mail.com', password: _password}) 

                    data.email = 'email@mail.com'
    
                    try {
                        await auctionLiveApi.updateUser(token, data.name, data.surname, data.email, data.password) 
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
                        
                        expect(error.message).toBe(`email "${data.email}" already exist`)
                    }
                })
            })
        
            describe('delete', () => {
                it('should succed on correct id', async () => {
                    const response = await auctionLiveApi.deleteUser(user.id, user.email, password)
                    
                    expect(response).toBeUndefined()

                    const _user = await User.findById(user.id)

                    expect(_user).toBeNull()
                })
        
                it('should fail on incorrect id', async () => {
                    id = '01234567890123456789abcd'
                    try {
                        await auctionLiveApi.deleteUser(id, user.email, user.password)
                        throw new Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
        
                        expect(error.message).toBe(`user with id "${id}" does not exist`)
                    }
                })

                it('should fail on wrong id', async () => {    
                    let id = 'wrong-id'
    
                    try {
                        await auctionLiveApi.deleteUser(id, email, user.password)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        
                        // COMO PONER LOS MONGOOSE ERRORS COMO FORMAT ERROR
                        // expect(error).toBeInstanceOf(FormatError)
                        // expect(error.message).toBe('invalid id')
                        expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "User"`)
                    }
                })
    
                it('should fail on incorrect email', async () => {
                    let email = 'fake_email@gmail.com' 
    
                    try {
                        await auctionLiveApi.deleteUser(user.id, email, user.password)
                        throw new Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
        
                        expect(error.message).toBe('wrong credentials')
                    }
                })
    
                it('should fail on incorrect password', async () => {
                    let password = '423'
    
                    try {
                        await auctionLiveApi.deleteUser(user.id, user.email, password)
                        throw new Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
        
                        expect(error.message).toBe('wrong credentials')
                    }
                })
            })
        })
    })

    //-------<fin>

    describe('items', () => {
        let items
        const cities = ['Japan', 'New York', 'Spain', 'London']
        const categories = ['Art', 'Cars', 'Jewellery', 'Watches']

        beforeEach(async () => {
            items = new Array(25).fill().map(item => item = {
                title: `Car-${Math.random()}`,
                description: `description-${Math.random()}`,
                startPrice: Math.ceil(Math.random() * 200),
                startDate: Date.now(),
                finishDate: Date.now() + (Math.ceil(Math.random() * 1000000000)),
                reservedPrice: Math.floor(Math.random() * 1),
                city: cities[Math.floor(Math.random() * cities.length)],
	            category: categories[Math.floor(Math.random() * categories.length)],
	            images: "image1.jpg"
            })

            await Promise.all(items.map(async item => await Item.create(item)))
        })

        describe('create items', () => {
            it('should success on correct data', async () => {
                let item = items[Math.floor(Math.random() * items.length)]
                
                let { title, description, startPrice, startDate, finishDate, reservedPrice, city, category, images } = item
               
                startDate = moment(startDate).format('DD-MM-YYYY')
                finishDate = moment(finishDate).format('DD-MM-YYYY')
                
                await auctionLiveApi.createItem(title, description, startPrice, startDate, finishDate, reservedPrice, images, category, city)
                
                const _item = await Item.findOne({title: title})
                
                expect(_item.title).toBe(title)
                expect(_item.description).toBe(description)
                expect(_item.startPrice).toBe(startPrice)
                
                const startFormatDate = moment(_item.startDate).format('DD-MM-YYYY') 
                const endFormatDate = moment(_item.finishDate).format('DD-MM-YYYY')
                
                expect(startFormatDate).toEqual(startDate)
                expect(endFormatDate).toEqual(finishDate)
                expect(_item.reservedPrice).toBe(reservedPrice)
                expect(_item.city).toBe(city)
                expect(_item.category).toBe(category)
                expect(_item.images).toBeInstanceOf(Array)
                // expect(_item.images).toContain(images)
            })
        })

        //FALTA MEJORAR ESTE TEST
        describe('search items', () => {
            xit('should success on correct query', async () => {
                let query = {query: 'hola'}
                const _items = await auctionLiveApi.searchItems(query)

                expect(_items).toBe(items)
                expect(_items.length).toBe(5)
            })

            it('should list all items with empty query', async () => {
                const _items = await auctionLiveApi.searchItems({})

                expect(_items).toBeInstanceOf(Array)
                expect(_items.length).toBe(25)
            })
        })

        describe('retrieve items', () => {
            it('should success on correc item id', async () => {
                let item_ = items[Math.floor(Math.random() * items.length)]
                const item = await Item.create(item_)

                const _item = await auctionLiveApi.retrieveItem(item.id)
                
                expect(_item.title).toBe(item.title)
                expect(_item.description).toBe(item.description)
                expect(_item.startPrice).toBe(item.startPrice)
                expect(_item.startDate).toEqual(item.startDate)
                expect(_item.finishDate).toEqual(item.finishDate)
                expect(_item.reservedPrice).toBe(item.reservedPrice)
                expect(_item.city).toBe(item.city)
                expect(_item.category).toBe(item.category)
                expect(_item.images).toBeInstanceOf(Array)
            })
        })
    })

    describe('bids', () => {
        let item, user

        const cities = ['Japan', 'New York', 'Spain', 'London']
        const categories = ['Art', 'Cars', 'Jewellery', 'Watches']
        
        beforeEach(async () => {
            item = await Item.create({
                title: `Car-${Math.random()}`,
                description: `description-${Math.random()}`,
                startPrice: Math.ceil(Math.random() * 200),
                startDate: Date.now(),
                finishDate: Date.now() + (Math.ceil(Math.random() * 1000000000)),
                reservedPrice: Math.floor(Math.random() * 1),
                city: cities[Math.floor(Math.random() * cities.length)],
	            category: categories[Math.floor(Math.random() * categories.length)],
	            images: "image1.jpg"
            })
            
            user = await User.create({name, surname, email, password})
        })

        describe('place a bid', () => {
            it('should success on correct data when bidding first time', async () => {
                let amount = 200

                await auctionLiveApi.placeBid(item.id, user.id, amount)
                const _item = await Item.findById(item.id)
                const _user = await User.findById(user.id)

                expect(_item.bids).toBeInstanceOf(Array)
                expect(_item.bids.length).toBeGreaterThan(0)
                
                expect(_item.bids[0].userId.toString()).toBe(user.id)
                expect(_item.bids[0].amount).toBe(amount)
                expect(_item.bids[0].timeStamp).toBeDefined()
                
                expect(_user.items).toBeInstanceOf(Array)
                expect(_user.items.length).toBeGreaterThan(0)
                expect(_user.items[0].toString()).toBe(item.id)
            })

            it('should success on correct data when bidding second time', async () => {
                let amount = 200
                await auctionLiveApi.placeBid(item.id, user.id, amount)

                let amount2 = 500
                await auctionLiveApi.placeBid(item.id, user.id, amount2)

                const _item = await Item.findById(item.id)
                const _user = await User.findById(user.id)
                
                expect(_item.bids).toBeInstanceOf(Array)
                expect(_item.bids.length).toBeGreaterThan(1)
                expect(_item.bids[0].userId.toString()).toBe(user.id)
                expect(_item.bids[0].amount).toBe(amount)
                expect(_item.bids[0].timeStamp).toBeDefined()
                expect(_item.bids[1].userId.toString()).toBe(user.id)
                expect(_item.bids[1].amount).toBe(amount2)
                expect(_item.bids[1].timeStamp).toBeDefined()

                expect(_user.items).toBeInstanceOf(Array)
                expect(_user.items.length).toBeLessThan(2)
                expect(_user.items[0].toString()).toBe(item.id)
            })
        })

        describe('retrieve item bids', () => {
            it('should success on correc item id', async () => {
                let amount = 200
                await auctionLiveApi.placeBid(item.id, user.id, amount)

                let amount2 = 500
                await auctionLiveApi.placeBid(item.id, user.id, amount2)

                const bids = await auctionLiveApi.retrieveItemBids(item.id)
                
                expect(bids.length).toBeGreaterThan(0)
                expect(bids[0].userId.toString()).toBe(user.id)
                expect(bids[0].amount).toBe(amount)
                expect(bids[0].timeStamp).toBeDefined()
                expect(bids[1].userId.toString()).toBe(user.id)
                expect(bids[1].amount).toBe(amount2)
                expect(bids[1].timeStamp).toBeDefined()

                expect(bids[0].userId.name).toBe(user.name)
                expect(bids[0].userId.surname).toBe(user.surname)
                expect(bids[0].userId.email).toBe(user.email)
                expect(bids[1].userId.name).toBe(user.name)
                expect(bids[1].userId.surname).toBe(user.surname)
                expect(bids[1].userId.email).toBe(user.email)
            })
        })
    })

    afterAll(() => mongoose.disconnect())
})