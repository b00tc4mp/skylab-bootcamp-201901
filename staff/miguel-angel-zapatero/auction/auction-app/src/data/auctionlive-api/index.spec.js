// require('dotenv').config();
import auctionLiveApi from '.'
import { mongoose, models } from 'auction-data'
import { LogicError } from 'auction-errors'
import bcrypt from  'bcrypt'
import moment from 'moment'

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
                await auctionLiveApi.registerUser(name, surname, email, password)

                const user = await User.findOne({email})
                debugger
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
                    const id = await auctionLiveApi.authenticateUser(email, password)
                    
                    expect(id).toBe(user.id)
                })
            })

            describe('retrieve user', () => {
                it('should success on correct user id', async () => {
                    const _user = await auctionLiveApi.retrieveUser(user.id)

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