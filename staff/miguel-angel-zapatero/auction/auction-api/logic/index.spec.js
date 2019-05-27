require('dotenv').config();
const logic = require('.')
const mongoose = require('mongoose')
const { Users, Items, Bids } = require('../data/models')
const { LogicError } = require('../common/errors')
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
        
        await Users.deleteMany()
        await Items.deleteMany()
    })

    describe('users', () => {
        describe('register user', () => {
            it('should success on correct data', async () => {
                await logic.registerUser(name, surname, email, password)

                const user = await Users.findOne({email})
                
                const samePass = bcrypt.compareSync(password, user.password)

                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(samePass).toBe(true)
            })

            it('should fail on already user exists', async () => {
                try {
                    await Users.create({name, surname, email, password})   
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
                user = await Users.create({name, surname, email, password: _password})
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

    describe('bids', () => {
        let item, user

        beforeEach(async () => {
            item = await Items.create({
                title: 'Monopatin',
                description: 'Un monopatin super chulo',
                startPrice: 20,
                startDate: Date.now(),
                finishDate: Date.now() + 360000
            })
            
            user = await Users.create({name, surname, email, password})
        })

        describe('place a bid', () => {
            it('should success on correct data when bidding first time', async () => {
                let amount = 200

                await logic.placeBid(item.id, user.id, amount)
                const _item = await Items.findById(item.id)
                const _user = await Users.findById(user.id)

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

                const _item = await Items.findById(item.id)
                const _user = await Users.findById(user.id)
                debugger
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