import logic from '.'
import { LogicError, RequirementError, ValueError, FormatError, ComparisonError } from 'auction-errors'
import { mongoose, models } from 'auction-data'
import bcrypt from  'bcrypt'
import jwt from 'jsonwebtoken'
import auctionLiveApi from '../data/auctionlive-api';

jest.setTimeout(100000)

const { User, Item, Bid } = models

const {env: { MONGO_URL_LOGIC_TEST }} = process

describe('logic', () => {
    beforeAll(async () => {
        try {
            await mongoose.connect(MONGO_URL_LOGIC_TEST, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
            
            console.log('connected to database')
        } catch (error) {
            console.log(error, error.message)
        }
    })

    let name, surname, email, password, confirmPassword

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
        confirmPassword = user.password
        
        await User.deleteMany()
        await Item.deleteMany()
        await Bid.deleteMany()
    })

    describe('users', () => {
        describe('register user', () => {
            it('should success on correct data', async () => {
                const res = await logic.registerUser(name, surname, email, password, confirmPassword)
                expect(res).toBeUndefined()

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
                    await logic.registerUser(name, surname, email, password, confirmPassword)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeInstanceOf(LogicError)
                    expect(error.message).toBe(`user with email "${email}" already exist`)
                }
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword))
                .toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword))
                .toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword))
                .toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword))
                .toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword))
                .toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword))
                .toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword))
                .toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword))
                .toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword))
                .toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword))
                .toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword))
                .toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password, confirmPassword)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword)).toThrowError(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword)).toThrowError(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword)).toThrowError(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword)).toThrowError(ValueError, 'password is empty')
            })

            it('should fail on undefined confirmpassword', () => {
                const confirmPassword = undefined

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword)).toThrowError(RequirementError, `confirmPassword is not optional`)
            })

            it('should fail on null confirmpassword', () => {
                const confirmPassword = null

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword)).toThrowError(RequirementError, `confirmPassword is not optional`)
            })

            it('should fail on empty confirmpassword', () => {
                const confirmPassword = ''

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword)).toThrowError(ValueError, 'confirmPassword is empty')
            })

            it('should fail on blank confirmpassword', () => {
                const confirmPassword = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword)).toThrowError(ValueError, 'confirmPassword is empty')
            })

            it('should fail on password when not coincide with confirmPassword', () => {
                const confirmPassword = 'hohohoho'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword)).toThrowError(ComparisonError, 'passwords not match')
            })
        })

        describe('after created user', () =>{
            let user, _password, token

            beforeEach(async() => {
                _password = bcrypt.hashSync(password, 10)
                user = await User.create({name, surname, email, password: _password})
               
                const res = await auctionLiveApi.authenticateUser(email, password)
                token = res.token 
            })

            describe('authenticate user', () => {
                it('should success on correct data', async () => {
                    const res = await logic.loginUser(email, password)
                    expect(res).toBeUndefined()

                    let {sub} = jwt.decode(logic.__userToken__)
                    
                    expect(sub).toBe(user.id)
                    expect(logic.__userToken__).toBe(token)
                })

                it('should fail on non-existing user', async () => {
                    try {
                        await logic.loginUser(email = 'unexisting-user@mail.com', password)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe(`user with email "${email}" doesn't exist`)
                    }
                })

                it('should fail on wrong password', async () => {
                    try {
                        await logic.loginUser(email, password = '123')
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe('wrong credentials')
                    }
                })
            })

            describe('retrieve user', () => {
                it('should success on correct user token', async () => {
                    logic.__userToken__ = token
                    const _user = await logic.retrieveUser()

                    expect(_user.id).toBeUndefined()
                    expect(_user.name).toBe(user.name)
                    expect(_user.surname).toBe(user.surname)
                    expect(_user.email).toBe(user.email)
                    expect(_user.password).toBeUndefined()
                })

                it('should fail on invalid token', async () => {
                    logic.__userToken__ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2YwNWRiMTlhOWFkMDE2MGMxODhlYmMiLCJpYXQiOjE1NTkyNTY1MDEsImV4cCI6MTU1OTI2MDEwMX0.HXQ4YMq6bdsXfQQthBKKZ4sdfsdfsXUOCF3xdqs1h69F7bg'

                    try {
                        await logic.retrieveUser() 
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe('invalid signature')
                    }
                })
    
                it('should fail on wrong token', async () => {
                    logic.__userToken__ = 'wrong-id'
    
                    try {
                        await logic.retrieveUser() 
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)                        
                        expect(error.message).toBe('jwt malformed')
                    }
                })
            })

            describe('update', () => {        
                let data

                beforeEach(async () => {
                    logic.__userToken__ = token
                    data = { name: 'n', surname: 's', email: 'ess@ess.com', password: 'p'}
                })

                it('should succeed on correct data', async () => {    
                    const _user = await logic.updateUser(data)
                    expect(_user).toBeDefined()
                    
                    expect(_user.id).toBeUndefined()
                    expect(_user.surname).toBe(data.surname)
                    expect(_user.name).toBe(data.name)
                    expect(_user.email).toBe(data.email)
                    expect(_user.avatar).toBeDefined()

                    const user_ = await User.findById(user.id)
                    const pass = bcrypt.compareSync(data.password, user_.password)

                    expect(pass).toBeTruthy()
                })

                it('should succeed changing some fields', async () => {    
                    const data = { name: 'n', email: 'e@e.com'}
    
                    const _user = await logic.updateUser(data)
                    expect(_user).toBeDefined()
                    expect(_user.id).toBeUndefined()
                    expect(_user.name).toBe(data.name)
                    expect(_user.email).toBe(data.email)
                    
                    expect(_user.name).not.toBe(user.name)
                    expect(_user.email).not.toBe(user.email)
                    
                    const user_ = await User.findById(user.id)
                    
                    expect(user_.surname).toBe(user.surname)
                    expect(user_.password).toBe(user.password)
                })

                it('should fail on existing email user', async () => {    
                    await User.create({name, surname, email: 'email2@mail.com', password: _password}) 

                    data.email = 'email2@mail.com'
    
                    try {
                        await logic.updateUser(data) 
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe(`email "${data.email}" already exist`)
                    }
                })
    
                it('should fail on incorrect user token', async () => {    
                    logic.__userToken__ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2YwNWRiMTlhOWFkMDE2MGMxODhlYmMiLCJpYXQiOjE1NTkyNTY1MDEsImV4cCI6MTU1OTI2MDEwMX0.HXQ4YMq6bdsXfQQthBKKZ4sdfsdfsXUOCF3xdqs1h69F7bg'
    
                    try {
                        await logic.updateUser(data) 
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe('invalid signature')
                    }
                })
                
                it('should fail on wrong token', async () => {    
                    logic.__userToken__ = 'wrong-token'
    
                    try {
                        await logic.updateUser(data)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe('jwt malformed')
                    }
                })
            })
        
            describe('delete', () => {
                beforeEach(()=>{
                    logic.__userToken__ = token
                })

                it('should succed on correct token', async () => {
                    const response = await logic.deleteUser(user.email, password, confirmPassword)
                    expect(response).toBeUndefined()

                    const _user = await User.findById(user.id)

                    expect(_user).toBeNull()
                })

                it('should fail on already deleted user', async () => {
                    let {sub} = jwt.decode(token)
                    
                    try {
                        await logic.deleteUser(user.email, password, confirmPassword)

                        await logic.deleteUser(user.email, password, confirmPassword)
                        throw new Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe(`user with id "${sub}" does not exist`)
                    }
                })
        
                it('should fail on incorrect token', async () => {
                    logic.__userToken__ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2YwNWRiMTlhOWFkMDE2MGMxODhlYmMiLCJpYXQiOjE1NTkyNTY1MDEsImV4cCI6MTU1OTI2MDEwMX0.HXQ4YMq6bdsXfQQthBKKZ4sdfsdfsXUOCF3xdqs1h69F7bg'

                    try {
                        await logic.deleteUser(user.email, password, confirmPassword)
                        throw new Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(Error)
                        expect(error.message).toBe('invalid signature')
                    }
                })

                it('should fail on wrong token', async () => {    
                    logic.__userToken__ = 'wrong-token'
    
                    try {
                        await logic.deleteUser(user.email, password, confirmPassword)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(Error)
                        expect(error.message).toBe('jwt malformed')
                    }
                })
    
                it('should fail on incorrect email', async () => {
                    let email = 'fake_email@gmail.com' 
    
                    try {
                        await logic.deleteUser(email, password, confirmPassword)
                        throw new Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(Error)
                        expect(error.message).toBe('wrong credentials')
                    }
                })
    
                it('should fail on incorrect password', async () => {
                    let password = '423'
                    confirmPassword = '423'
    
                    try {
                        await logic.deleteUser(user.email, password, confirmPassword)
                        throw new Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(Error)
                        expect(error.message).toBe('wrong credentials')
                    }
                })
            })
        })
    })

    describe('items', () => {
        let items, sDate, fDate
        const cities = ['Japan', 'London', 'New York', 'Spain']
        const categories = ['Art', 'Cars', 'Jewellery', 'Watches']

        beforeEach(async () => {
            items = new Array(25).fill().map(item => {
                sDate = new Date
                fDate = new Date

                return item = {
                    title: `Car-${Math.random()}`,
                    description: `description-${Math.random()}`,
                    startPrice: Math.ceil(Math.random() * 200),
                    startDate: sDate.setDate(sDate.getDate() + (Math.floor(Math.random() * 3))),
                    finishDate: fDate.setDate(fDate.getDate() + (Math.floor(Math.random() * 5) + 3)),
                    reservedPrice: Math.floor(Math.random() * 1),
                    city: cities[Math.floor(Math.random() * cities.length)],
	                category: categories[Math.floor(Math.random() * categories.length)],
	                images: "image1.jpg"
                }
            })

            await Promise.all(items.map(async item => await Item.create(item)))
        })

        describe('search items', () => {
            let query

            beforeEach(() => {
                query = {}
            })

            it('should success on correct city', async () => {
                let items_ = items.filter(item => item.city === 'Japan')
                query.city = 'Japan'

                const _items = await logic.searchItems(query)

                expect(_items).toBeInstanceOf(Array)
                expect(_items).toHaveLength(items_.length)
            })

            it('should success on correct category', async () => {
                let items_ = items.filter(item => item.category === 'Art')
                query.category = 'Art'

                const _items = await logic.searchItems(query)

                expect(_items).toBeInstanceOf(Array)
                expect(_items).toHaveLength(items_.length)
            })

            it('should success on correct finish range date', async () => { 
                sDate = new Date
                fDate = new Date
                sDate.setDate(sDate.getDate() + (Math.floor(Math.random() * 3)))
                fDate.setDate(fDate.getDate() + (Math.floor(Math.random() * 5) + 3))

                let items_ = items.filter(item => (item.finishDate >= sDate && item.finishDate <= fDate))

                query.startDate = sDate
                query.endDate = fDate

                const _items = await logic.searchItems(query)

                expect(_items).toBeInstanceOf(Array)
                expect(_items).toHaveLength(items_.length)
            })

            it('should success on correct start price range', async () => {
                let items_ = items.filter(item => (item.startPrice >= 20 && item.startPrice <= 150))

                query.startPrice = 20
                query.endPrice = 150

                const _items = await logic.searchItems(query)

                expect(_items).toBeInstanceOf(Array)
                expect(_items).toHaveLength(items_.length)
            })

            it('should success on correct on multiple data', async () => {
                let items_ = items.filter(item => (item.startPrice >= 20 && item.startPrice <= 150) && (item.city === 'London') && (item.category === 'Jewellery'))

                query.city = 'London'
                query.category = 'Jewellery'
                query.startPrice = 20 
                query.endPrice = 150

                const _items = await logic.searchItems(query)
                
                expect(_items).toBeInstanceOf(Array)
                expect(_items).toHaveLength(items_.length)
            })

            it('should list all items with empty query', async () => {
                const _items = await logic.searchItems(query)

                expect(_items).toBeInstanceOf(Array)
                expect(_items.length).toBe(25)
            })
        })

        describe('retrieve item', () => {
            let item_, _item_, _password
    
            beforeEach(async ()=> {
                _password = bcrypt.hashSync(password, 10)
                await User.create({name, surname, email, password: _password})
               
                const res = await auctionLiveApi.authenticateUser(email, password)
                logic.__userToken__ = res.token  

                item_ = items[Math.floor(Math.random() * items.length)]
                _item_ = await Item.create(item_)
            })
            
            it('should success on correct item id', async () => {
                let item_ = items[Math.floor(Math.random() * items.length)]
                const item = await Item.create(item_)

                const _item = await logic.retrieveItem(item.id)
                
                let startDate = new Date(_item.startDate)
                let finishDate = new Date(_item.finishDate)

                expect(_item.title).toBe(item.title)
                expect(_item.description).toBe(item.description)
                expect(_item.startPrice).toBe(item.startPrice)
                expect(startDate).toEqual(item.startDate)
                expect(finishDate).toEqual(item.finishDate)
                expect(_item.reservedPrice).toBe(item.reservedPrice)
                expect(_item.city).toBe(item.city)
                expect(_item.category).toBe(item.category)
                expect(_item.images).toBeInstanceOf(Array)
            })

            it('should fail on incorrect item id', async () => {
                let id = '01234567890123456789abcd'
                
                try {
                    await logic.retrieveItem(id)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(Error)
    
                    expect(error.message).toBe(`item with id "${id}" doesn't exist`)
                }
            })

            it('should fail on incorrect item id', async () => {
                let id = 'wrong-id'
                
                try {
                    await logic.retrieveItem(id)                     
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                  
                    expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "Item"`)
                }
            })

            it('should fail on incorrect user token', async () => {
                logic.__userToken__ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2YwNWRiMTlhOWFkMDE2MGMxODhlYmMiLCJpYXQiOjE1NTkyNTY1MDEsImV4cCI6MTU1OTI2MDEwMX0.HXQ4YMq6bdsXfQQthBKKZ4sdfsdfsXUOCF3xdqs1h69F7bg'
                
                try {
                    await logic.retrieveItem(_item_.id)               
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(Error)
    
                    expect(error.message).toBe('invalid signature')
                }
            })

            it('should fail on incorrect user token', async () => {
                logic.__userToken__ = 'wrong-id'
                
                try {
                    await logic.retrieveItem(_item_.id)
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                   
                    expect(error.message).toBe('jwt malformed')
                }
            })
        })

        describe('retrieve cities', () => {
            it('should success and not repeat values', async() => {
                const _cities = await logic.retrieveCities()

                expect(_cities).toBeDefined()
                expect(_cities).toBeInstanceOf(Array)
                expect(_cities).toEqual(cities)
            })
        })

        describe('retrieve categories', () => {
            it('should success and not repeat values', async() => {
                const _categories = await logic.retrieveCategories()

                expect(_categories).toBeDefined()
                expect(_categories).toBeInstanceOf(Array)
                expect(_categories).toEqual(categories)
            })
        })
    })

    describe('bids', () => {
        let item, user, _password

        const cities = ['Japan', 'New York', 'Spain', 'London']
        const categories = ['Art', 'Cars', 'Jewellery', 'Watches']
        
        beforeEach(async () => {
            item = await Item.create({
                title: `Car-${Math.random()}`,
                description: `description-${Math.random()}`,
                startPrice: Math.floor(Math.random() * 200) + 10,
                startDate: Date.now(),
                finishDate: Date.now() + (Math.ceil(Math.random() * 1000000000)),
                reservedPrice: Math.floor(Math.random() * 1),
                city: cities[Math.floor(Math.random() * cities.length)],
	            category: categories[Math.floor(Math.random() * categories.length)],
	            images: "image1.jpg"
            })
            
            _password = bcrypt.hashSync(password, 10)
            user = await User.create({name, surname, email, password: _password})

            const res = await auctionLiveApi.authenticateUser(email, password)
            logic.__userToken__ = res.token
        })

        describe('place a bid', () => {
            it('should success on correct data when bidding first time', async () => {
                let amount = 1000

                await logic.placeBid(item.id, amount)
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
                let amount = 1000
                await logic.placeBid(item.id, amount)

                let amount2 = 2000
                await logic.placeBid(item.id, amount2)

                const _item = await Item.findById(item.id)
                const _user = await User.findById(user.id)
                
                expect(_item.bids).toBeInstanceOf(Array)
                expect(_item.bids.length).toBeGreaterThan(1)
                expect(_item.bids[0].userId.toString()).toBe(user.id)
                expect(_item.bids[0].amount).toBe(amount2)
                expect(_item.bids[0].timeStamp).toBeDefined()
                expect(_item.bids[1].userId.toString()).toBe(user.id)
                expect(_item.bids[1].amount).toBe(amount)
                expect(_item.bids[1].timeStamp).toBeDefined()

                expect(_user.items).toBeInstanceOf(Array)
                expect(_user.items.length).toBeLessThan(2)
                expect(_user.items[0].toString()).toBe(item.id)
            })

            it('should fail on item is closed', async () => {
                const _item = await Item.create({
                    title: `Car-${Math.random()}`,
                    description: `description-${Math.random()}`,
                    startPrice: Math.floor(Math.random() * 200) + 10,
                    startDate: Date.now(),
                    finishDate: Date.now() - (Math.ceil(Math.random() * 1000000000)),
                    reservedPrice: Math.floor(Math.random() * 1),
                    city: cities[Math.floor(Math.random() * cities.length)],
                    category: categories[Math.floor(Math.random() * categories.length)],
                    images: "image1.jpg"
                })
                
                let amount = 100
                
                try {
                    await logic.placeBid(_item.id, amount)
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(Error)
    
                    expect(error.message).toBe(`item with id "${_item.id}" is closed`)

                    
                }
            })

            it('should fail on item is upcoming', async () => {
                const _item = await Item.create({
                    title: `Car-${Math.random()}`,
                    description: `description-${Math.random()}`,
                    startPrice: Math.floor(Math.random() * 200) + 10,
                    startDate: Date.now() + (Math.ceil(Math.random() * 1000000000)),
                    finishDate: Date.now() + (Math.ceil(Math.random() * 1000000000)),
                    reservedPrice: Math.floor(Math.random() * 1),
                    city: cities[Math.floor(Math.random() * cities.length)],
                    category: categories[Math.floor(Math.random() * categories.length)],
                    images: "image1.jpg"
                })
                
                let amount = 100
                
                try {
                    await logic.placeBid(_item.id, amount)
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(Error)
    
                    expect(error.message).toBe(`the auction item with id "${_item.id}" has not started`)
                }
            })

            it('should fail if the bid is lower than the start price', async () => {
                let amount = 5
                try {
                    await logic.placeBid(item.id, amount)
                    throw new Error('should not reach this point')
                } catch (error) {
                    debugger
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
                    expect(error.message).toBe(`sorry, the current bid "${amount}" is lower than the start price`)
                }
            })

            it('should fail if the bid is lower than the current bid with less than 10 bids', async () => {
                let amount = 2000, currentBid
                try {
                    await logic.placeBid(item.id, amount)

                    const _items = await Item.findById(item.id)
                    currentBid = _items.bids[0].amount
                    
                    amount = 1000
                    await logic.placeBid(item.id, amount)
                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(Error)
    
                    expect(error.message).toBe(`sorry, the bid "${amount}" is lower than the minimum bid "${currentBid+100}"`)
                }
            })

            it('should fail on incorrect item id', async () => {
                let amount = 2000
                let id = '01234567890123456789abcd'
                
                try {
                    await logic.placeBid(id, amount)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
                    expect(error.message).toBe(`item with id "${id}" doesn't exist`)
                }
            })

            it('should fail on incorrect item id', async () => {
                let amount = 2000
                let id = 'wrong-id'
                
                try {
                    await logic.placeBid(id, amount)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
                    expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "Item"`)
                }
            })

            it('should fail on incorrect user token', async () => {
                let amount = 2000
                logic.__userToken__ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2YwNWRiMTlhOWFkMDE2MGMxODhlYmMiLCJpYXQiOjE1NTkyNTY1MDEsImV4cCI6MTU1OTI2MDEwMX0.HXQ4YMq6bdsXfQQthBKKZ4sdfsdfsXUOCF3xdqs1h69F7bg'
                
                try {
                    await logic.placeBid(item.id, amount)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
                    expect(error.message).toBe('invalid signature')
                }
            })

            it('should fail on incorrect user token', async () => {
                let amount = 2000
                logic.__userToken__ = 'wrong-token'
                
                try {
                    await logic.placeBid(item.id, amount)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
                    expect(error.message).toBe('jwt malformed')
                }
            })

        })

        describe('retrieve item bids', () => {
            it('should success on correct item id', async () => {
                let amount = 1000
                await logic.placeBid(item.id, amount)

                let amount2 = 1500
                await logic.placeBid(item.id, amount2)

                const _item = await logic.retrieveItemBids(item.id)
                
                expect(_item).toBeInstanceOf(Object)
                expect(_item.bids.length).toBe(2)

                expect(_item.bids[0].amount).toBe(amount2)
                expect(_item.bids[0].timeStamp).toBeDefined()
                expect(_item.bids[0].userId.name).toBe(user.name)
                expect(_item.bids[0].userId.avatar).toBeDefined()
                expect(_item.bids[0].userId.id).toBe(user.id)
                expect(_item.bids[0].userId.name).toBe(user.name)
                expect(_item.bids[0].userId.surname).toBeUndefined()
                expect(_item.bids[0].userId.password).toBeUndefined()

                expect(_item.bids[1].amount).toBe(amount)
                expect(_item.bids[1].timeStamp).toBeDefined()
                expect(_item.bids[1].userId.name).toBe(user.name)
                expect(_item.bids[1].userId.avatar).toBeDefined()
                expect(_item.bids[1].userId.id).toBe(user.id)
                expect(_item.bids[1].userId.name).toBe(user.name)
                expect(_item.bids[1].userId.surname).toBeUndefined()
                expect(_item.bids[1].userId.password).toBeUndefined()
            })

            it('should fail on incorrect item id', async () => {
                let id = '01234567890123456789abcd'
                
                try {
                    await logic.retrieveItemBids(id)                   
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
                    debugger
                    expect(error.message).toBe(`item with id "${id}" doesn't exist`)
                }
            })

            it('should fail on wrong item id', async () => {
                let id = 'wrong-id'
                
                try {
                    await logic.retrieveItemBids(id)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
                    expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "Item"`)
                }
            })

            it('should fail on incorrect user token', async () => {
                logic.__userToken__ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2YwNWRiMTlhOWFkMDE2MGMxODhlYmMiLCJpYXQiOjE1NTkyNTY1MDEsImV4cCI6MTU1OTI2MDEwMX0.HXQ4YMq6bdsXfQQthBKKZ4sdfsdfsXUOCF3xdqs1h69F7bg'
                
                try {
                    await logic.retrieveItemBids(item.id)              
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
                    expect(error.message).toBe('invalid signature')
                }
            })

            it('should fail on wrong user token', async () => {
                logic.__userToken__ = 'wrong-token'
                
                try {
                    await logic.retrieveItemBids(item.id)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
                    expect(error.message).toBe("jwt malformed")
                }
            })
        })

        describe('retrieve item users bids', ()=> {
            it('should success on correct item and user id', async () =>{
                let amount = 1000
                await logic.placeBid(item.id, amount)

                let amount2 = 1500
                await logic.placeBid(item.id, amount2)

                const _item = await logic.retrieveUserItemsBids()
            
                expect(_item).toBeInstanceOf(Array)
                expect(_item[0].bids.length).toBe(2)
                
                expect(_item[0].bids[0].userId.id).toBe(user.id)
                expect(_item[0].bids[0].amount).toBe(amount2)
                expect(_item[0].bids[1].userId.id).toBe(user.id)
                expect(_item[0].bids[1].amount).toBe(amount)
            })

            it('should fail on incorrect user id', async () => {
                logic.__userToken__ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2YwNWRiMTlhOWFkMDE2MGMxODhlYmMiLCJpYXQiOjE1NTkyNTY1MDEsImV4cCI6MTU1OTI2MDEwMX0.HXQ4YMq6bdsXfQQthBKKZ4sdfsdfsXUOCF3xdqs1h69F7bg'
                
                try {
                    await logic.retrieveUserItemsBids()              
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(Error)
    
                    expect(error.message).toBe('invalid signature')
                }
            })

            it('should fail on incorrect user id', async () => {
                logic.__userToken__ = 'wrong-id'
                
                try {
                    await logic.retrieveUserItemsBids()                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
            
                    expect(error.message).toBe("jwt malformed")
                }
            })
        })
    })

    afterAll(() => mongoose.disconnect())
})