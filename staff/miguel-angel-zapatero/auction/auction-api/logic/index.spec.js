require('dotenv').config();
const logic = require('.')
const { mongoose, models: {User, Item, Bid }} = require('auction-data')
const { LogicError, RequirementError, ValueError, FormatError } = require('auction-errors')
const bcrypt = require('bcrypt')
const moment = require('moment')

const {env: { MONGO_URL_LOGIC_TEST }} = process

jest.setTimeout(100000)

describe('logic', () => {
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
                await logic.registerUser(name, surname, email, password)

                const user = await User.findOne({email})
                
                const samePass = bcrypt.compareSync(password, user.password)

                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(samePass).toBe(true)
            })

            it('should fail if user exists', async () => {
                try {
                    await User.create({name, surname, email, password})   
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeInstanceOf(LogicError)
                    expect(error.message).toBe(`user with email "${email}" already exist`)
                }
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

            it('should fail on undefined password', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'password is empty')
            })
        })

        describe('on already existing user', () =>{
            let user, _password

            beforeEach(async() => {
                _password = bcrypt.hashSync(password, 10)
                user = await User.create({name, surname, email, password: _password})
            })

            describe('authenticate user', () => {
                it('should success on correct user data', async () => {
                    const id = await logic.authenticateUser(email, password)
                    
                    expect(id).toBe(user.id)
                })

                it('should fail on non-existing user', async () => {
                    try {
                        await logic.authenticateUser(email = 'unexisting-user@mail.com', password)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe(`user with email "${email}" doesn't exist`)
                    }
                })

                it('should fail on wrong password', async () => {
                    try {
                        await logic.authenticateUser(email, password = '123')
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe('wrong credentials')
                    }
                })
            })

            describe('retrieve user', () => {
                it('should success on correct user id', async () => {
                    const _user = await logic.retrieveUser(user.id)

                    expect(_user.id).toBeUndefined()
                    expect(_user.name).toBe(user.name)
                    expect(_user.surname).toBe(user.surname)
                    expect(_user.email).toBe(user.email)
                    expect(_user.password).toBeUndefined()
                })

                it('should fail on unexisting user id', async () => {
                    id = '01234567890123456789abcd'
    
                    try {
                        await logic.retrieveUser(id) 
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
        
                        expect(error.message).toBe(`user with id "${id}" doesn't exist`)
                    }
                })
    
                it('should fail on wrong id', async () => {
                    id = 'wrong-id'
    
                    try {
                        await logic.retrieveUser(id) 
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        
                        expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "User"`)
                    }
                })
            })

            describe('update', () => {        
                let data

                beforeEach(() => {
                    data = { name: 'n', surname: 's', email: 'e@e.com', password: 'p'}
                })
                
                it('should succeed on correct data', async () => {    
                    const response = await logic.updateUser(user.id, data)
                    expect(response).toBeDefined()
                    
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
    
                    const response = await logic.updateUser(user.id, data)
                    expect(response).toBeDefined()
                    
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
    
                it('should fail on incorrect user id', async () => {    
                    id = '01234567890123456789abcd'
    
                    try {
                        await logic.updateUser(id, data) 
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
        
                        expect(error.message).toBe(`user with id "${id}" does not exist`)
                    }
                })
                
                it('should fail on wrong id', async () => {    
                    let id = 'wrong-id'
    
                    try {
                        await logic.updateUser(id, data)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                     
                        expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "User"`)
                    }
                })

                it('should fail on existing email user', async () => {    
                    await User.create({name, surname, email: 'email@mail.com', password: _password}) 

                    data.email = 'email@mail.com'
    
                    try {
                        await logic.updateUser(user.id, data) 
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
                    const response = await logic.deleteUser(user.id, user.email, password)
                    
                    expect(response).toBeUndefined()

                    const _user = await User.findById(user.id)

                    expect(_user).toBeNull()
                })
        
                it('should fail on incorrect id', async () => {
                    id = '01234567890123456789abcd'
                    try {
                        await logic.deleteUser(id, user.email, user.password)
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
                        await logic.deleteUser(id, email, user.password)
                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                       
                        expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "User"`)
                    }
                })
    
                it('should fail on incorrect email', async () => {
                    let email = 'fake_email@gmail.com' 
    
                    try {
                        await logic.deleteUser(user.id, email, user.password)
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
                        await logic.deleteUser(user.id, user.email, password)
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
                    // images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
                }
            })

            await Promise.all(items.map(async item => await Item.create(item)))
        })

        describe('create items', () => {
            let _user

            beforeEach(async () => {
                _user = await User.create({name, surname, email, password, role:'ADMIN'})
            })

            it('should success on correct data', async () => {
                let item = items[Math.floor(Math.random() * items.length)]

                item.startDate = new Date(item.startDate)
                item.finishDate = new Date(item.finishDate)

                const { title, description, startPrice, startDate, finishDate, reservedPrice, city, category, images } = item

                await logic.createItem(_user.id, title, description, startPrice, startDate, finishDate, reservedPrice, images, category, city)
                
                const _item = await Item.findOne({title: title}).lean()
                
                expect(_item.title).toBe(title)
                expect(_item.description).toBe(description)
                expect(_item.startPrice).toBe(startPrice)
                expect(_item.startDate).toEqual(startDate)
                expect(_item.finishDate).toEqual(finishDate)
                expect(_item.reservedPrice).toBe(reservedPrice)
                expect(_item.city).toBe(city)
                expect(_item.category).toBe(category)
                expect(_item.images).toBeInstanceOf(Array)
                
                // expect(_item.images).toEqual(images)
            })
        })

        describe('search items', () => {
            let query = {}

            it('should success on correct city', async () => {
                let { text, category, city, startDate, endDate, startPrice, endPrice } = query
                let items_ = items.filter(item => item.city === 'Japan')
                city = 'Japan'

                const _items = await logic.searchItems(text, category, city, startDate, endDate, startPrice, endPrice)

                expect(_items).toBeInstanceOf(Array)
                expect(_items).toHaveLength(items_.length)
            })

            it('should success on correct category', async () => {
                let { text, category, city, startDate, endDate, startPrice, endPrice } = query
                let items_ = items.filter(item => item.category === 'Art')
                category = 'Art'

                const _items = await logic.searchItems(text, category, city, startDate, endDate, startPrice, endPrice)

                expect(_items).toBeInstanceOf(Array)
                expect(_items).toHaveLength(items_.length)
            })

            it('should success on correct finish range date', async () => {
                let { text, category, city, startDate, endDate, startPrice, endPrice } = query

                sDate.setDate(sDate.getDate() + (Math.floor(Math.random() * 3)))
                fDate.setDate(fDate.getDate() + (Math.floor(Math.random() * 5) + 3))
                
                let items_ = items.filter(item => (item.finishDate >= sDate && item.finishDate <= fDate))

                startDate = sDate
                endDate = fDate

                const _items = await logic.searchItems(text, category, city, startDate, endDate, startPrice, endPrice)

                expect(_items).toBeInstanceOf(Array)
                expect(_items).toHaveLength(items_.length)
            })

            it('should success on correct start price range', async () => {
                let { text, category, city, startDate, endDate, startPrice, endPrice } = query
                let items_ = items.filter(item => (item.startPrice >= 20 && item.startPrice <= 150))

                startPrice = 20
                endPrice = 150

                const _items = await logic.searchItems(text, category, city, startDate, endDate, startPrice, endPrice)

                expect(_items).toBeInstanceOf(Array)
                expect(_items).toHaveLength(items_.length)
            })

            it('should success on correct on multiple data', async () => {
                let { text, category, city, startDate, endDate, startPrice, endPrice } = query
                let items_ = items.filter(item => (item.startPrice >= 20 && item.startPrice <= 150) && (item.city === 'London') && (item.category === 'Jewellery'))

                city = 'London'
                category = 'Jewellery'
                startPrice = 20 
                endPrice = 150

                const _items = await logic.searchItems(text, category, city, startDate, endDate, startPrice, endPrice)
                
                expect(_items).toBeInstanceOf(Array)
                expect(_items).toHaveLength(items_.length)
            })

            it('should list all items with empty query', async () => {
                query = {}
                const _items = await logic.searchItems()

                expect(_items).toBeInstanceOf(Array)
                expect(_items.length).toBe(25)
            })
        })

        describe('retrieve item', () => {
            let user, item_, _item_
            beforeEach(async ()=> {
                user = await User.create({name, surname, email, password}) 
                
                item_ = items[Math.floor(Math.random() * items.length)]
                _item_ = await Item.create(item_)
            })

            it('should success on correc item id', async () => {
                const _item = await logic.retrieveItem(_item_.id, user.id)
                
                expect(_item.title).toBe(_item_.title)
                expect(_item.description).toBe(_item_.description)
                expect(_item.startPrice).toBe(_item_.startPrice)
                expect(_item.startDate).toEqual(_item_.startDate)
                expect(_item.finishDate).toEqual(_item_.finishDate)
                expect(_item.reservedPrice).toBe(_item_.reservedPrice)
                expect(_item.city).toBe(_item_.city)
                expect(_item.category).toBe(_item_.category)
                expect(_item.images).toBeInstanceOf(Array)
            })

            it('should fail on incorrect item id', async () => {
                let id = '01234567890123456789abcd'
                
                try {
                    await logic.retrieveItem(id, user.id)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
                    expect(error.message).toBe(`item with id "${id}" doesn't exist`)
                }
            })

            it('should fail on incorrect item id', async () => {
                let id = 'wrong-id'
                
                try {
                    await logic.retrieveItem(id, user.id)                     
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                  
                    expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "Item"`)
                }
            })

            it('should fail on incorrect user id', async () => {
                let id = '01234567890123456789abcd'
                
                try {
                    await logic.retrieveItem(_item_.id, id)               
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
                    expect(error.message).toBe(`user with id "${id}" doesn't exist`)
                }
            })

            it('should fail on incorrect user id', async () => {
                let id = 'wrong-id'
                
                try {
                    await logic.retrieveItem(_item_.id, id)
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                   
                    expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "User"`)
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
        let item, user

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
            
            user = await User.create({name, surname, email, password})
        })

        describe('place a bid', () => {
            it('should success on correct data when bidding first time', async () => {
                let amount = 1000

                await logic.placeBid(item.id, user.id, amount)
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
                await logic.placeBid(item.id, user.id, amount)

                let amount2 = 2000
                await logic.placeBid(item.id, user.id, amount2)

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
                    await logic.placeBid(_item.id, user.id, amount)
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
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
                    await logic.placeBid(_item.id, user.id, amount)
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
                    expect(error.message).toBe(`the auction item with id "${_item.id}" has not started`)
                }
            })

            it('should fail if the bid is lower than the start price', async () => {
                let amount = 5
                try {
                    await logic.placeBid(item.id, user.id, amount)
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
                    expect(error.message).toBe(`sorry, the current bid "${amount}" is lower than the start price`)
                }
            })

            it('should fail if the bid is lower than the current bid with less than 10 bids', async () => {
                let amount = 2000, currentBid
                try {
                    await logic.placeBid(item.id, user.id, amount)

                    const _items = await Item.findById(item.id)
                    currentBid = _items.bids[0].amount
                    
                    amount = 1000
                    await logic.placeBid(item.id, user.id, amount)
                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
                    expect(error.message).toBe(`sorry, the bid "${amount}" is lower than the minimum bid "${currentBid+100}"`)
                }
            })

            it('should fail on incorrect item id', async () => {
                let amount = 2000
                let id = '01234567890123456789abcd'
                
                try {
                    await logic.placeBid(id, user.id, amount)                    
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
                    await logic.placeBid(id, user.id, amount)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                  
                    expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "Item"`)
                }
            })

            it('should fail on incorrect user id', async () => {
                let amount = 2000
                let id = '01234567890123456789abcd'
                
                try {
                    await logic.placeBid(item.id, id, amount)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
                    expect(error.message).toBe(`user with id "${id}" doesn't exist`)
                }
            })

            it('should fail on incorrect user id', async () => {
                let amount = 2000
                let id = 'wrong-id'
                
                try {
                    await logic.placeBid(item.id, id, amount)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                   
                    expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "User"`)
                }
            })

        })

        describe('retrieve item bids', () => {
            it('should success on correct item id', async () => {
                let amount = 1000
                await logic.placeBid(item.id, user.id, amount)

                let amount2 = 1500
                await logic.placeBid(item.id, user.id, amount2)

                const {bids} = await logic.retrieveItemBids(item.id, user.id)
                
                expect(bids.length).toBeGreaterThan(0)

                expect(bids[0].amount).toBe(amount2)
                expect(bids[0].timeStamp).toBeDefined()
                expect(bids[0].userId.name).toBe(user.name)
                expect(bids[0].userId.name).toBe(user.name)
                expect(bids[0].userId.name).toBe(user.name)
                expect(bids[0].userId.password).toBeUndefined()
                expect(bids[0].userId._id).toBeUndefined()

                expect(bids[1].amount).toBe(amount)
                expect(bids[1].timeStamp).toBeDefined()
                expect(bids[1].userId.name).toBe(user.name)
                expect(bids[1].userId.surname).toBeUndefined()
                expect(bids[1].userId.email).toBeUndefined()
                expect(bids[1].userId.password).toBeUndefined()
                expect(bids[1].userId._id).toBeUndefined()
            })

            it('should fail on incorrect item id', async () => {
                let id = '01234567890123456789abcd'
                
                try {
                    await logic.retrieveItemBids(id, user.id)                   
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
                    expect(error.message).toBe(`item with id "${id}" doesn't exist`)
                }
            })

            it('should fail on incorrect item id', async () => {
                let id = 'wrong-id'
                
                try {
                    await logic.retrieveItemBids(id, user.id)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                   
                    expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "Item"`)
                }
            })

            it('should fail on incorrect user id', async () => {
                let id = '01234567890123456789abcd'
                
                try {
                    await logic.retrieveItemBids(item.id, id)              
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
                    expect(error.message).toBe(`user with id "${id}" doesn't exist`)
                }
            })

            it('should fail on incorrect user id', async () => {
                let id = 'wrong-id'
                
                try {
                    await logic.retrieveItemBids(item.id, id)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    
                    expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "User"`)
                }
            })
        })

        describe('retrieve item users bids', ()=> {
            let _user

            beforeEach(async() => {
                _user = await User.create({name: "Carmelo", surname, email:"c.zapa@gmail.com", password})
            })

            it('should success on correct item and user id', async () =>{
                let amount = 1000
                await logic.placeBid(item.id, user.id, amount)

                let amount2 = 1500
                await logic.placeBid(item.id, _user.id, amount2)

                const _item = await logic.retriveUserItemsBids(_user.id)
            
                expect(_item).toBeInstanceOf(Array)
                expect(_item[0].bids.length).toBe(2)
                
                expect(_item[0].bids[0].userId.id).toBe(_user.id)
                expect(_item[0].bids[0].amount).toBe(amount2)
                expect(_item[0].bids[1].userId.id).toBe(user.id)
                expect(_item[0].bids[1].amount).toBe(amount)
            })

            it('should fail on incorrect user id', async () => {
                let id = '01234567890123456789abcd'
                
                try {
                    await logic.retriveUserItemsBids(id)              
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
    
                    expect(error.message).toBe(`user with id "${id}" doesn't exist`)
                }
            })

            it('should fail on incorrect user id', async () => {
                let id = 'wrong-id'
                
                try {
                    await logic.retriveUserItemsBids(id)                    
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
            
                    expect(error.message).toBe(`Cast to ObjectId failed for value "wrong-id" at path "_id" for model "User"`)
                }
            })
        })
    })

    afterAll(() => mongoose.disconnect())
})