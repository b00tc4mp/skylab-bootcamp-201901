require('dotenv').config();
const logic = require('.')
const { mongoose, models: {User, Item, Bid }} = require('auction-data')
const { LogicError } = require('auction-errors')
const bcrypt = require('bcrypt')

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

            it('should fail on already user exists', async () => {
                try {
                    await User.create({name, surname, email, password})   
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeInstanceOf(LogicError)
                    expect(error.message).toBe(`user with email ${email} already exists`)
                }
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
                    const id = await logic.authenticateUser(email, password)
                    
                    expect(id).toBe(user.id)
                })
            })

            describe('retrieve user', () => {
                it('should success on correct user id', async () => {
                    const _user = await logic.retrieveUser(user.id)

                    expect(_user.id).toBeUndefined()
                    expect(_user.name).toBe(user.name)
                    expect(_user.surname).toBe(user.surname)
                    expect(_user.email).toBe(user.email)
                })
            })
        })
    })

    describe('items', () => {
        let items

        beforeEach(async () => {
            items = new Array(25).fill().map(item => item = {
                title: `Car-${Math.random()}`,
                description: `description-${Math.random()}`,
                startPrice: Math.ceil(Math.random() * 200),
                startDate: Date.now(),
                finishDate: Date.now() + 3600000,
                reservedPrice: Math.floor(Math.random() * 1)
            })

            await Promise.all(items.map(async item => await Item.create(item)))
        })

        describe('create items', () => {
            it('should success on correct data', async () => {
<<<<<<< Updated upstream
                let item = {title: 'Ferrari 100', description: 'buen coche', startPrice: 2000}
                const { title, description, startPrice } = item
                try {
                    await logic.createItem(title, description, startPrice, '28/05/2019', '28/06/2020')
                } catch (error) {
                    debugger
                }

                const _item = Item.findOne({title})
=======
                let item = {title: 'Ferrari 100', description: 'buen coche', startPrice: 2000, startDate: '28/05/2019', finishDate: '01/06/2019'}
                const { title, description, startPrice, startDate, finishDate } = item
               
                await logic.createItem(title, description, startPrice, startDate, finishDate)

                const _item = await Item.findOne({title: title})
>>>>>>> Stashed changes
                debugger
                expect(_item.title).toBe(item.title)
                expect(_item.description).toBe(item.description)
                expect(_item.startPrice).toBe(item.startPrice)
<<<<<<< Updated upstream
                // expect(_item.startDate).toEqual()
=======
                // expect(_item.startDate).toEqual(item.startDate)
>>>>>>> Stashed changes
                // expect(_item.finishDate).toEqual(item.finishDate)
                expect(_item.reservedPrice).toBeUndefined()
            })
        })

        describe('search items', () => {
            xit('should success on correct query', async () => {
                let query = ''
                const _items = await logic.searchItems(query)

                expect(_items).toBe(items)
                expect(_items.length).toBe(5)
            })

            it('should list all items with empty query', async () => {
                const _items = await logic.searchItems({})

                expect(_items).toBeInstanceOf(Array)
                expect(_items.length).toBe(25)
            })
        })

        describe('retrieve items', () => {
            it('should success on correc item id', async () => {
                let item_ = items[Math.floor(Math.random() * items.length)]
                const item = await Item.create(item_)

                const _item = await logic.retrieveItem(item.id)
                
                expect(_item.title).toBe(item.title)
                expect(_item.description).toBe(item.description)
                expect(_item.startPrice).toBe(item.startPrice)
                expect(_item.startDate).toEqual(item.startDate)
                expect(_item.finishDate).toEqual(item.finishDate)
            })
        })
    })

    describe('bids', () => {
        let item, user

        beforeEach(async () => {
            item = await Item.create({
                title: 'Monopatin',
                description: 'Un monopatin super chulo',
                startPrice: 20,
                startDate: Date.now(),
                finishDate: Date.now() + 360000
            })
            
            user = await User.create({name, surname, email, password})
        })

        describe('place a bid', () => {
            it('should success on correct data when bidding first time', async () => {
                let amount = 200

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
                let amount = 200
                await logic.placeBid(item.id, user.id, amount)

                let amount2 = 500
                await logic.placeBid(item.id, user.id, amount2)

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
    })

    afterAll(() => mongoose.disconnect())
})