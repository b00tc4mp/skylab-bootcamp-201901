'use strict'

require('dotenv').config()

require('isomorphic-fetch')

const { User, House, mongoose } = require('homeSwapp-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { TEST_DB_URL } } = process


describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            House.deleteMany()
        ])
    )

    describe('register user', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(username, email, password, passwordConfirm)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })

            expect(user.username).toBe(username)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })


        it('should fail on undefined username', () => {
            const username = undefined
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on numeric username', () => {
            const username = 10
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })


        it('should fail on boolean username', () => {
            const username = false
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on object username', () => {
            const username = {}
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on array username', () => {
            const username = []
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on empty username', () => {
            const username = ''
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(Error('username cannot be empty'))
        })

        it('should fail on array email', () => {
            const username = 'manu'
            const email = []
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })
        it('should fail on numeric email', () => {
            const username = 'manu'
            const email = 1
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on boolean email', () => {
            const username = 'manu'
            const email = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const username = 'manu'
            const email = {}
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on undefined email', () => {
            const username = 'manu'
            const email = undefined
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const username = 'manuel'
            const email = ''
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(Error('email cannot be empty'))
        })

        it('should fail on undefined password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = undefined

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = 1

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on boolean password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = true

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = []

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = {}

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const username = 'manuel'
            const email = 'manuelbarzi@mail.com'
            const password = ''

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(Error('password cannot be empty'))
        })

        it('should fail on object password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on numeric password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, 1)
            }).toThrow(TypeError(1 + ' is not a string'))
        })

        it('should fail on bool password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, true)
            }).toThrow(TypeError(true + ' is not a string'))
        })

        it('should fail on undefined password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, undefined)
            }).toThrow(TypeError(undefined + ' is not a string'))
        })

        it('should fail on empty password confirmation', () => {
            const username = 'manuel'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, "")
            }).toThrow(Error('password confirmation cannot be empty'))
        })

        it('should fail on differences between password and password confirmation', () => {
            const username = 'manuel'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, 'password', "111")
            }).toThrow(Error('passwords do not match'))
        })

    })



    describe('authenticate user', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
        )

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on empty email', () => {
            const email = ''
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error('email cannot be empty'))
        })

        it('should fail on numeric email', () => {
            const email = 1
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })

        it('should fail on array email', () => {
            const email = []
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })

        it('should fail on undefined email', () => {
            const email = undefined
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })
        it('should fail on object email', () => {
            const email = {}
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })
        it('should fail on boolean email', () => {
            const email = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error('password cannot be empty'))
        })

        it('should fail on numeric password', () => {

            const password = 123

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })

        it('should fail on array password', () => {

            const password = []

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })

        it('should fail on undefined password', () => {

            const password = undefined

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })
        it('should fail on object password', () => {

            const password = {}

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })
        it('should fail on boolean password', () => {

            const password = true
            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })
    })

    describe('retrieve user', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.username).toBe(username)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()
                })


        )

        it('should fail on boolean id', () => {

            expect(() => {
                logic.retrieveUser(true)
            }).toThrow(Error(`${true} is not a string`))
        })

        it('should fail on object id', () => {

            expect(() => {
                logic.retrieveUser({})
            }).toThrow(Error(`${{}} is not a string`))
        })

        it('should fail on undefined id', () => {

            expect(() => {
                logic.retrieveUser(undefined)
            }).toThrow(Error(`${undefined} is not a string`))
        })

        it('should fail on array id', () => {

            expect(() => {
                logic.retrieveUser([])
            }).toThrow(Error(`${[]} is not a string`))
        })

        it('should fail on numeric id', () => {

            expect(() => {
                logic.retrieveUser(1)
            }).toThrow(Error(`${1} is not a string`))
        })

        it('should fail on empty id', () => {

            expect(() => {
                logic.retrieveUser("")
            }).toThrow(Error('userId cannot be empty'))
        })
    })


    describe('create house', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const images = ['https://ichef.bbci.co.uk/news/660/cpsprodpb/13F00/production/_95146618_bills.jpg']
        const adress =
        {
            country: 'spain',
            city: 'badalona',
            street: 'tamariu',
            number: '29'

        }
        const description = 'this is a sample description of a house'

        const info = {

            petsAllowed: 'no',
            smokersAllowed: 'no',
            numberOfBeds: '5'
        }

        let userId
        let houseId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct data', () =>
            logic.createHouse(userId, images, description, info, adress)
                .then(house => {

                    houseId = house._id
                    expect(house._id).toBeDefined()

                    return User.findById(userId).select('-password -__v')
                        .then(user => {
                            expect(JSON.stringify(user.myHouses[0])).toBe(JSON.stringify(houseId))


                        })

                })


        )

        it('should fail on undefined userId', () => {

            expect(() => {
                logic.createHouse(undefined, images, description, info, adress)
            }).toThrow(Error(`${undefined} is not a valid id`))
        })
        it('should fail on undefined images', () => {

            expect(() => {
                logic.createHouse(userId, undefined, description, info, adress)
            }).toThrow(Error(`${undefined} is not an array`))
        })
        it('should fail on empty images', () => {

            expect(() => {
                logic.createHouse(userId, [], description, info, adress)
            }).toThrow(Error('There must be at least one image'))
        })
        it('should fail on undefined description', () => {

            expect(() => {
                logic.createHouse(userId, images, undefined, info, adress)
            }).toThrow(Error(`${undefined} is not a string`))
        })
        it('should fail on undefined info', () => {

            expect(() => {
                logic.createHouse(userId, images, description, undefined, adress)
            }).toThrow(Error(`${undefined} is not an object`))
        })
        it('should fail on undefined adress', () => {

            expect(() => {
                logic.createHouse(userId, images, description, info, undefined)
            }).toThrow(Error(`${undefined} is not an object`))
        })

    })



    describe('update house', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const images = ['https://ichef.bbci.co.uk/news/660/cpsprodpb/13F00/production/_95146618_bills.jpg']
        const adress =
        {
            country: 'spain',
            city: 'badalona',
            street: 'tamariu',
            number: '29'

        }
        const description = 'this is a sample description of a house'

        const info = {

            petsAllowed: 'no',
            smokersAllowed: 'no',
            numberOfBeds: '5'
        }

        let userId
        let houseId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => { return logic.createHouse(userId, images, description, info, adress) })
                .then(house => houseId = house._id.toString())
        )

        it('should succeed on correct data', () =>
            logic.updateHouse(houseId, images, 'new description', info, adress)
                .then(house => {

                    expect(house.id).toBe(houseId)
                    expect(house.images.toString()).toBe(images.toString())
                    expect(house.description.toString()).toBe('new description')
                    expect(JSON.stringify(house.info)).toBe(JSON.stringify(info))
                    expect(JSON.stringify(house.adress)).toBe(JSON.stringify(adress))

                    return User.findById(userId).select('-password -__v')
                        .then(user => {
                            expect(JSON.stringify(user.myHouses[0])).toBe(JSON.stringify(houseId))


                        })

                })


        )

        it('should fail on undefined houseId', () => {

            expect(() => {
                logic.updateHouse(undefined, images, description, info, adress)
            }).toThrow(Error(`${undefined} is not a valid id`))
        })
        it('should fail on undefined images', () => {

            expect(() => {
                logic.updateHouse(houseId, undefined, description, info, adress)
            }).toThrow(Error(`${undefined} is not an array`))
        })
        it('should fail on empty images', () => {

            expect(() => {
                logic.updateHouse(houseId, [], description, info, adress)
            }).toThrow(Error('There must be at least one image'))
        })
        it('should fail on undefined description', () => {

            expect(() => {
                logic.updateHouse(houseId, images, undefined, info, adress)
            }).toThrow(Error(`${undefined} is not a string`))
        })
        it('should fail on undefined info', () => {

            expect(() => {
                logic.updateHouse(houseId, images, description, undefined, adress)
            }).toThrow(Error(`${undefined} is not an object`))
        })
        it('should fail on undefined adress', () => {

            expect(() => {
                logic.updateHouse(houseId, images, description, info, undefined)
            }).toThrow(Error(`${undefined} is not an object`))
        })

    })



    describe('retrieve house', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const images = ['https://ichef.bbci.co.uk/news/660/cpsprodpb/13F00/production/_95146618_bills.jpg']
        const adress =
        {
            country: 'spain',
            city: 'badalona',
            street: 'tamariu',
            number: '29'

        }
        const description = 'this is a sample description of a house'

        const info = {

            petsAllowed: 'no',
            smokersAllowed: 'no',
            numberOfBeds: '5'
        }

        let userId
        let houseId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => { return logic.createHouse(userId, images, description, info, adress) })
                .then(house => houseId = house.id.toString())
        )

        it('should succeed on correct data', () =>
            logic.retrieveHouse(houseId)
                .then(house => {

                    expect(house.id).toBe(houseId)
                    expect(house.images.toString()).toBe(images.toString())
                    expect(house.description.toString()).toBe(description)
                    expect(JSON.stringify(house.info)).toBe(JSON.stringify(info))
                    expect(JSON.stringify(house.adress)).toBe(JSON.stringify(adress))

                    return User.findById(userId).select('-password -__v')
                        .then(user => {
                            expect(JSON.stringify(user.myHouses[0])).toBe(JSON.stringify(houseId))


                        })

                })


        )

        it('should fail on undefined houseId', () => {

            expect(() => {
                logic.retrieveHouse(undefined)
            }).toThrow(Error(`${undefined} is not a valid id`))
        })
        it('should fail on null houseId', () => {

            expect(() => {
                logic.retrieveHouse(null)
            }).toThrow(Error(`${null} is not a valid id`))
        })
        it('should fail on numeric houseId', () => {

            expect(() => {
                logic.retrieveHouse(1)
            }).toThrow(Error(`${1} is not a valid id`))
        })
        it('should fail on bool houseId', () => {

            expect(() => {
                logic.retrieveHouse(true)
            }).toThrow(Error(`${true} is not a valid id`))
        })
        it('should fail on array houseId', () => {

            expect(() => {
                logic.retrieveHouse([])
            }).toThrow(Error(`${[]} is not a valid id`))
        })
        it('should fail on object houseId', () => {

            expect(() => {
                logic.retrieveHouse({})
            }).toThrow(Error(`${{}} is not a valid id`))
        })
    })


    describe('delete house', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const images = ['https://ichef.bbci.co.uk/news/660/cpsprodpb/13F00/production/_95146618_bills.jpg']
        const adress =
        {
            country: 'spain',
            city: 'badalona',
            street: 'tamariu',
            number: '29'

        }
        const description = 'this is a sample description of a house'

        const info = {

            petsAllowed: 'no',
            smokersAllowed: 'no',
            numberOfBeds: '5'
        }

        let userId
        let houseId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => { return logic.createHouse(userId, images, description, info, adress) })
                .then(house => houseId = house._id.toString())
        )

        it('should succeed on correct data', () =>
            logic.deleteHouse(houseId, userId)
                .then(user => {

                    expect(user.myHouses.length).toBe(0)

                })
        )

        it('should fail on undefined houseId', () => {

            expect(() => {
                logic.deleteHouse(undefined, userId)
            }).toThrow(Error(`${undefined} is not a valid id`))
        })
        it('should fail on null houseId', () => {

            expect(() => {
                logic.deleteHouse(null, userId)
            }).toThrow(Error(`${null} is not a valid id`))
        })
        it('should fail on numeric houseId', () => {

            expect(() => {
                logic.deleteHouse(1, userId)
            }).toThrow(Error(`${1} is not a valid id`))
        })
        it('should fail on bool houseId', () => {

            expect(() => {
                logic.deleteHouse(true, userId)
            }).toThrow(Error(`${true} is not a valid id`))
        })
        it('should fail on array houseId', () => {

            expect(() => {
                logic.deleteHouse([], userId)
            }).toThrow(Error(`${[]} is not a valid id`))
        })
        it('should fail on object houseId', () => {

            expect(() => {
                logic.deleteHouse({}, userId)
            }).toThrow(Error(`${{}} is not a valid id`))
        })



        it('should fail on undefined ownerId', () => {

            expect(() => {
                logic.deleteHouse(houseId, undefined)
            }).toThrow(Error(`${undefined} is not a valid id`))
        })
        it('should fail on null ownerId', () => {

            expect(() => {
                logic.deleteHouse(houseId, null)
            }).toThrow(Error(`${null} is not a valid id`))
        })
        it('should fail on numeric ownerId', () => {

            expect(() => {
                logic.deleteHouse(houseId, 1)
            }).toThrow(Error(`${1} is not a valid id`))
        })
        it('should fail on bool ownerId', () => {

            expect(() => {
                logic.deleteHouse(houseId, true)
            }).toThrow(Error(`${true} is not a valid id`))
        })
        it('should fail on array ownerId', () => {

            expect(() => {
                logic.deleteHouse(houseId, [])
            }).toThrow(Error(`${[]} is not a valid id`))
        })
        it('should fail on object ownerId', () => {

            expect(() => {
                logic.deleteHouse(houseId, {})
            }).toThrow(Error(`${{}} is not a valid id`))
        })

    })

    describe('retrive myHouses from user', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const images = ['https://ichef.bbci.co.uk/news/660/cpsprodpb/13F00/production/_95146618_bills.jpg']
        const adress =
        {
            country: 'spain',
            city: 'badalona',
            street: 'tamariu',
            number: '29'

        }
        const description = 'this is a sample description of a house'

        const info = {

            petsAllowed: 'no',
            smokersAllowed: 'no',
            numberOfBeds: '5'
        }

        let userId
        let houseId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => { return logic.createHouse(userId, images, description, info, adress) })
                .then(house => houseId = house._id.toString())
        )

        it('should retrieve myHouses from user', () =>
            logic.retrieveMyHouses(userId)
                .then(houses => {
                    expect(JSON.stringify(houses[0].images)).toBe(JSON.stringify(images))
                    expect(houses[0].description).toBe(description)
                    expect(JSON.stringify(houses[0].info)).toBe(JSON.stringify(info))
                    expect(JSON.stringify(houses[0].adress)).toBe(JSON.stringify(adress))
                    expect(JSON.stringify(houses[0].ownerId)).toBe(JSON.stringify(userId))

                    expect(houses.length).toBe(1)
                })
        )

        it('should fail on wrong userid', () =>
            logic.retrieveMyHouses('hola')
                .catch(err => {
                    expect(err).toBeDefined()
                })
        )

    })
    describe('toggle favorite', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const images = ['https://ichef.bbci.co.uk/news/660/cpsprodpb/13F00/production/_95146618_bills.jpg']
        const adress =
        {
            country: 'spain',
            city: 'badalona',
            street: 'tamariu',
            number: '29'

        }
        const description = 'this is a sample description of a house'

        const info = {

            petsAllowed: 'no',
            smokersAllowed: 'no',
            numberOfBeds: '5'
        }

        let userId
        let houseId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => { return logic.createHouse(userId, images, description, info, adress) })
                .then(house => houseId = house._id.toString())
        )

        it('should retrieve favorites from user', () =>
            logic.toggleFavorites(userId, houseId)
                .then(user => {
                    expect(JSON.stringify(user.favorites[0])).toBe(JSON.stringify(houseId))


                    expect(user.favorites.length).toBe(1)
                })
        )


        it('should fail on undefined houseId', () => {

            expect(() => {
                logic.toggleFavorites(userId, undefined)
            }).toThrow(Error(`${undefined} is not a string`))
        })

        it('should fail on undefined houseId', () => {

            expect(() => {
                logic.toggleFavorites(undefined, houseId)
            }).toThrow(Error(`${undefined} is not a string`))
        })

    })


    describe('retrive favorite houses from user', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const images = ['https://ichef.bbci.co.uk/news/660/cpsprodpb/13F00/production/_95146618_bills.jpg']
        const adress =
        {
            country: 'spain',
            city: 'badalona',
            street: 'tamariu',
            number: '29'

        }
        const description = 'this is a sample description of a house'

        const info = {

            petsAllowed: 'no',
            smokersAllowed: 'no',
            numberOfBeds: '5'
        }

        let userId
        let houseId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => { return logic.createHouse(userId, images, description, info, adress) })
                .then(house => houseId = house._id.toString())
                .then(() => logic.toggleFavorites(userId, houseId))
        )

        it('should retrieve favorites from user', () =>
            logic.retrieveMyFavorites(userId)
                .then(houses => {
                    expect(JSON.stringify(houses[0].images)).toBe(JSON.stringify(images))
                    expect(houses[0].description).toBe(description)
                    expect(JSON.stringify(houses[0].info)).toBe(JSON.stringify(info))
                    expect(JSON.stringify(houses[0].adress)).toBe(JSON.stringify(adress))
                    expect(JSON.stringify(houses[0].ownerId)).toBe(JSON.stringify(userId))

                    expect(houses.length).toBe(1)
                })
        )

        it('should retrieve no favorites from user', () =>
            logic.toggleFavorites(userId, houseId)
                .then(() => {

                    return logic.retrieveMyFavorites(userId)
                        .then(houses => {

                            expect(houses.length).toBe(0)
                        })


                })
        )

        it('should fail on undefined houseId', () => {

            expect(() => {
                logic.retrieveMyFavorites(undefined)
            }).toThrow(Error(`${undefined} is not a string`))
        })

    })







    describe('retrieve houses by query', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const images = ['https://ichef.bbci.co.uk/news/660/cpsprodpb/13F00/production/_95146618_bills.jpg']
        const adress =
        {
            country: 'spain',
            city: 'badalona',
            street: 'tamariu',
            number: '29'

        }
        const description = 'this is a sample description of a house'

        const info = {

            petsAllowed: 'no',
            smokersAllowed: 'no',
            numberOfBeds: '5'
        }

        let userId
        let houseId

        let query = 'badalona'

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => { return logic.createHouse(userId, images, description, info, adress) })
                .then(house => houseId = house._id.toString())
        )



        it('should retrieve favorites from user', () =>
            logic.retrieveHousesByQuery(query)
                .then(houses => {
                    expect(JSON.stringify(houses[0].images)).toBe(JSON.stringify(images))
                    expect(houses[0].description).toBe(description)
                    expect(JSON.stringify(houses[0].info)).toBe(JSON.stringify(info))
                    expect(JSON.stringify(houses[0].adress)).toBe(JSON.stringify(adress))
                    expect(JSON.stringify(houses[0].ownerId)).toBe(JSON.stringify(userId))

                    expect(houses.length).toBe(1)
                })
        )

        it('should retrieve favorites from user', () =>{
            query = 'spain'

           return logic.retrieveHousesByQuery(query)
                .then(houses => {
                    expect(JSON.stringify(houses[0].images)).toBe(JSON.stringify(images))
                    expect(houses[0].description).toBe(description)
                    expect(JSON.stringify(houses[0].info)).toBe(JSON.stringify(info))
                    expect(JSON.stringify(houses[0].adress)).toBe(JSON.stringify(adress))
                    expect(JSON.stringify(houses[0].ownerId)).toBe(JSON.stringify(userId))

                    expect(houses.length).toBe(1)
                })
            })

        it('should retrieve no favorites from user', () =>{
            query='jhsbadjsbdjasjkd'

            logic.retrieveHousesByQuery(query)
                .then(() => {

                    return logic.retrieveMyFavorites(userId)
                        .then(houses => {

                            expect(houses.length).toBe(0)
                        })


                })
            })

        it('should fail on undefined houseId', () => {

            expect(() => {
                logic.retrieveMyFavorites(undefined)
            }).toThrow(Error(`${undefined} is not a string`))
        })

    })

    after(() =>
        Promise.all([
            User.deleteMany(),
            House.deleteMany()

        ])
            .then(() => mongoose.disconnect())
    )
})