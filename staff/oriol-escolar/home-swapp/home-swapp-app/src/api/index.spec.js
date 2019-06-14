'use strict'

require('dotenv').config()


const { User, House, mongoose } = require('homeSwapp-data')
import expect from 'expect'
import bcrypt from 'bcrypt'
import homeSwappApi from './index'
const { env: { REACT_APP_TEST_DB_URL } } = process

describe('homeSwappApi ', () => {
    beforeAll(() => mongoose.connect(REACT_APP_TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            House.deleteMany()
        ])
    )

    describe('register user', () => {
        const username = 'Barito'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on valid data', async () => {

            const id = await homeSwappApi.registerUser(username, email, password, passwordConfirm)

            expect(id).toBeDefined()

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
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on numeric username', () => {
            const username = 10
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })


        it('should fail on boolean username', () => {
            const username = false
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on object username', () => {
            const username = {}
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on array username', () => {
            const username = []
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on empty username', () => {
            const username = ''
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(Error('username is empty'))
        })

        it('should fail on array email', () => {
            const username = 'manu'
            const email = []
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })
        it('should fail on numeric email', () => {
            const username = 'manu'
            const email = 1
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on boolean email', () => {
            const username = 'manu'
            const email = true
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const username = 'manu'
            const email = {}
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on undefined email', () => {
            const username = 'manu'
            const email = undefined
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const username = 'manuel'
            const email = ''
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(Error('email is empty'))
        })

        it('should fail on undefined password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = undefined

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = 1

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on boolean password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = true

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = []

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = {}

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const username = 'manuel'
            const email = 'manuelbarzi@mail.com'
            const password = ''

            expect(() => {
                homeSwappApi.registerUser(username, email, password, password)
            }).toThrow(Error('password is empty'))
        })

        it('should fail on object password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on numeric password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, 1)
            }).toThrow(TypeError(1 + ' is not a string'))
        })

        it('should fail on bool password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, true)
            }).toThrow(TypeError(true + ' is not a string'))
        })

        it('should fail on undefined password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, undefined)
            }).toThrow(TypeError(undefined + ' is not a string'))
        })

        it('should fail on empty password confirmation', () => {
            const username = 'manuel'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, password, "")
            }).toThrow(Error('passwordConfirm is empty'))
        })

        it('should fail on differences between password and password confirmation', () => {
            const username = 'manuel'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.registerUser(username, email, 'password', "111")
            }).toThrow(Error('Password and Password confirmation do not match'))
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
            homeSwappApi.authenticateUser(email, password)
                .then(token => expect(token).toBeDefined())
        )

        it('should fail on empty email', () => {
            const email = ''
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.authenticateUser(email, password)
            }).toThrow(Error('email is empty'))
        })

        it('should fail on numeric email', () => {
            const email = 1
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })

        it('should fail on array email', () => {
            const email = []
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })

        it('should fail on undefined email', () => {
            const email = undefined
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })
        it('should fail on object email', () => {
            const email = {}
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })
        it('should fail on boolean email', () => {
            const email = true
            const password = `123-${Math.random()}`

            expect(() => {
                homeSwappApi.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => {
                homeSwappApi.authenticateUser(email, password)
            }).toThrow(Error('password is empty'))
        })

        it('should fail on numeric password', () => {

            const password = 123

            expect(() => {
                homeSwappApi.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })

        it('should fail on array password', () => {

            const password = []

            expect(() => {
                homeSwappApi.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })

        it('should fail on undefined password', () => {

            const password = undefined

            expect(() => {
                homeSwappApi.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })
        it('should fail on object password', () => {

            const password = {}

            expect(() => {
                homeSwappApi.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })
        it('should fail on boolean password', () => {

            const password = true
            expect(() => {
                homeSwappApi.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })
    })

    describe('retrieve user', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ _id }) => {
                    userId = _id
                    return homeSwappApi.authenticateUser(email, password)

                })
                .then((token) => {
                    _token = token;
                })
        )

        it('should succeed on correct credentials', () =>
            homeSwappApi.retrieveUser(_token)
                .then(user => {
                    expect(JSON.stringify(user.id)).toBe(JSON.stringify(userId))
                    expect(user.username).toBe(username)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()
                })


        )

        it('should fail on boolean id', () => {

            expect(() => {
                homeSwappApi.retrieveUser(true)
            }).toThrow(Error(`${true} is not a string`))
        })

        it('should fail on object id', () => {

            expect(() => {
                homeSwappApi.retrieveUser({})
            }).toThrow(Error(`${{}} is not a string`))
        })

        it('should fail on undefined id', () => {

            expect(() => {
                homeSwappApi.retrieveUser(undefined)
            }).toThrow(Error(`${undefined} is not a string`))
        })

        it('should fail on array id', () => {

            expect(() => {
                homeSwappApi.retrieveUser([])
            }).toThrow(Error(`${[]} is not a string`))
        })

        it('should fail on numeric id', () => {

            expect(() => {
                homeSwappApi.retrieveUser(1)
            }).toThrow(Error(`${1} is not a string`))
        })

        it('should fail on empty id', () => {

            expect(() => {
                homeSwappApi.retrieveUser("")
            }).toThrow(Error('token is empty'))
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

        let houseId
        let _token
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ _id }) => {
                    userId = _id
                    return homeSwappApi.authenticateUser(email, password)

                })
                .then((token) => {
                    _token = token;
                })
        )


        it('should succeed on correct data', () =>
            homeSwappApi.createHouse(_token, images, description, info, adress)
                .then(house => {

                    houseId = house._id
                    expect(house._id).toBeDefined()

                    return User.findById(userId).select('-password -__v')
                        .then(user => {
                            expect(JSON.stringify(user.myHouses[0])).toBe(JSON.stringify(houseId))


                        })

                })


        )

        it('should fail on undefined _token', () => {

            expect(() => {
                homeSwappApi.createHouse(undefined, images, description, info, adress)
            }).toThrow(Error(`${undefined} is not a string`))
        })
        it('should fail on undefined images', () => {

            expect(() => {
                homeSwappApi.createHouse(_token, undefined, description, info, adress)
            }).toThrow(Error(`${undefined} is not an array`))
        })
        it('should fail on empty images', () => {

            expect(() => {
                homeSwappApi.createHouse(_token, [], description, info, adress)
            }).toThrow(Error('There must be at least one image'))
        })
        it('should fail on undefined description', () => {

            expect(() => {
                homeSwappApi.createHouse(_token, images, undefined, info, adress)
            }).toThrow(Error(`${undefined} is not a string`))
        })
        it('should fail on undefined info', () => {

            expect(() => {
                homeSwappApi.createHouse(_token, images, description, undefined, adress)
            }).toThrow(Error(`${undefined} is not an object`))
        })
        it('should fail on undefined adress', () => {

            expect(() => {
                homeSwappApi.createHouse(_token, images, description, info, undefined)
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

        let houseId
        let _token
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ _id }) => {
                    userId = _id
                    return homeSwappApi.authenticateUser(email, password)

                })
                .then((token) => {
                    _token = token;
                })
                .then(() => homeSwappApi.createHouse(_token, images, description, info, adress)
                )
                .then(({ _id }) => {

                    houseId = _id

                })
        )



        it('should succeed on correct data', () =>
            homeSwappApi.updateHouse(_token, houseId, images, 'new description', info, adress)
                .then(house => {

                    expect(house._id).toBe(houseId)
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
        it('should fail on undefined token', () => {

            expect(() => {
                homeSwappApi.updateHouse(undefined, houseId, images, description, info, adress)
            }).toThrow(Error(`${undefined} is not a string`))
        })

        it('should fail on undefined houseId', () => {

            expect(() => {
                homeSwappApi.updateHouse(_token, undefined, images, description, info, adress)
            }).toThrow(Error(`${undefined} is not a string`))
        })
        it('should fail on undefined images', () => {

            expect(() => {
                homeSwappApi.updateHouse(_token, houseId, undefined, description, info, adress)
            }).toThrow(Error(`${undefined} is not an array`))
        })
        it('should fail on empty images', () => {

            expect(() => {
                homeSwappApi.updateHouse(_token, houseId, [], description, info, adress)
            }).toThrow(Error('There must be at least one image'))
        })
        it('should fail on undefined description', () => {

            expect(() => {
                homeSwappApi.updateHouse(_token, houseId, images, undefined, info, adress)
            }).toThrow(Error(`${undefined} is not a string`))
        })
        it('should fail on undefined info', () => {

            expect(() => {
                homeSwappApi.updateHouse(_token, houseId, images, description, undefined, adress)
            }).toThrow(Error(`${undefined} is not an object`))
        })
        it('should fail on undefined adress', () => {

            expect(() => {
                homeSwappApi.updateHouse(_token, houseId, images, description, info, undefined)
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

        let houseId
        let _token
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ _id }) => {
                    userId = _id
                    return homeSwappApi.authenticateUser(email, password)

                })
                .then((token) => {
                    _token = token;
                })
                .then(() => homeSwappApi.createHouse(_token, images, description, info, adress)
                )
                .then(({ _id }) => {

                    houseId = _id

                })
        )
        it('should succeed on correct data', () =>

            homeSwappApi.retrieveHouse(houseId)
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
                homeSwappApi.retrieveHouse(undefined)
            }).toThrow(Error(`${undefined} is not a string`))
        })
        it('should fail on null houseId', () => {

            expect(() => {
                homeSwappApi.retrieveHouse(null)
            }).toThrow(Error(`${null} is not a string`))
        })
        it('should fail on numeric houseId', () => {

            expect(() => {
                homeSwappApi.retrieveHouse(1)
            }).toThrow(Error(`${1} is not a string`))
        })
        it('should fail on bool houseId', () => {

            expect(() => {
                homeSwappApi.retrieveHouse(true)
            }).toThrow(Error(`${true} is not a string`))
        })
        it('should fail on array houseId', () => {

            expect(() => {
                homeSwappApi.retrieveHouse([])
            }).toThrow(Error(`${[]} is not a string`))
        })
        it('should fail on object houseId', () => {

            expect(() => {
                homeSwappApi.retrieveHouse({})
            }).toThrow(Error(`${{}} is not a string`))
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

        let houseId
        let _token
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ _id }) => {
                    userId = _id
                    return homeSwappApi.authenticateUser(email, password)

                })
                .then((token) => {
                    _token = token;
                })
                .then(() => homeSwappApi.createHouse(_token, images, description, info, adress)
                )
                .then(({ _id }) => {

                    houseId = _id

                })
        )

        it('should fail on undefined houseId', () => {

            expect(() => {
                homeSwappApi.deleteHouse(undefined, userId)
            }).toThrow(Error(`${undefined} is not a string`))
        })
        it('should fail on null houseId', () => {

            expect(() => {
                homeSwappApi.deleteHouse(null, userId)
            }).toThrow(Error(`${null} is not a string`))
        })
        it('should fail on numeric houseId', () => {

            expect(() => {
                homeSwappApi.deleteHouse(1, userId)
            }).toThrow(Error(`${1} is not a string`))
        })
        it('should fail on bool houseId', () => {

            expect(() => {
                homeSwappApi.deleteHouse(true, userId)
            }).toThrow(Error(`${true} is not a string`))
        })
        it('should fail on array houseId', () => {

            expect(() => {
                homeSwappApi.deleteHouse([], userId)
            }).toThrow(Error(`${[]} is not a string`))
        })
        it('should fail on object houseId', () => {

            expect(() => {
                homeSwappApi.deleteHouse({}, userId)
            }).toThrow(Error(`${{}} is not a string`))
        })



        it('should fail on undefined ownerId', () => {

            expect(() => {
                homeSwappApi.deleteHouse(houseId, undefined)
            }).toThrow(Error(`${undefined} is not a string`))
        })
        it('should fail on null ownerId', () => {

            expect(() => {
                homeSwappApi.deleteHouse(houseId, null)
            }).toThrow(Error(`${null} is not a string`))
        })
        it('should fail on numeric ownerId', () => {

            expect(() => {
                homeSwappApi.deleteHouse(houseId, 1)
            }).toThrow(Error(`${1} is not a string`))
        })
        it('should fail on bool ownerId', () => {

            expect(() => {
                homeSwappApi.deleteHouse(houseId, true)
            }).toThrow(Error(`${true} is not a string`))
        })
        it('should fail on array ownerId', () => {

            expect(() => {
                homeSwappApi.deleteHouse(houseId, [])
            }).toThrow(Error(`${[]} is not a string`))
        })
        it('should fail on object ownerId', () => {

            expect(() => {
                homeSwappApi.deleteHouse(houseId, {})
            }).toThrow(Error(`${{}} is not a string`))
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
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ _id }) => {
                    userId = _id
                    return homeSwappApi.authenticateUser(email, password)

                })
                .then((token) => {
                    _token = token;
                })
                .then(() => homeSwappApi.createHouse(_token, images, description, info, adress)
                )
                .then(({ _id }) => {

                    houseId = _id

                })
        )
        it('should retrieve myHouses from user', () =>
            homeSwappApi.retrieveMyHouses(_token)
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
            homeSwappApi.retrieveMyHouses('hola')
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
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ _id }) => {
                    userId = _id
                    return homeSwappApi.authenticateUser(email, password)

                })
                .then((token) => {
                    _token = token;
                    console.log(_token)
                })
                .then(() => homeSwappApi.createHouse(_token, images, description, info, adress)
                )
                .then(({ _id }) => {

                    houseId = _id

                })
        )

        it('should retrieve favorites from user', () =>
            homeSwappApi.toggleFavorite(_token, houseId)
                .then(user => {
                    expect(JSON.stringify(user.favorites[0])).toBe(JSON.stringify(houseId))


                    expect(user.favorites.length).toBe(1)
                })
        )


        it('should fail on undefined houseId', () => {

            expect(() => {
                homeSwappApi.toggleFavorite(_token, undefined)
            }).toThrow(Error(`${undefined} is not a string`))
        })

        it('should fail on undefined houseId', () => {

            expect(() => {
                homeSwappApi.toggleFavorite(undefined, houseId)
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
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ _id }) => {
                    userId = _id
                    return homeSwappApi.authenticateUser(email, password)

                })
                .then((token) => {
                    _token = token;
                })
                .then(() => homeSwappApi.createHouse(_token, images, description, info, adress)
                )
                .then(({ _id }) => {

                    houseId = _id

                })
                .then(() => homeSwappApi.toggleFavorite(_token, houseId)
                )
        )

        it('should retrieve favorites from user', () =>
            homeSwappApi.retrieveFavorites(_token)
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
            homeSwappApi.toggleFavorite(_token, houseId)
                .then(() => {

                    return homeSwappApi.retrieveFavorites(_token)
                        .then(houses => {

                            expect(houses.length).toBe(0)
                        })


                })
        )

        it('should fail on undefined houseId', () => {

            expect(() => {
                homeSwappApi.retrieveFavorites(undefined)
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
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ _id }) => {
                    userId = _id
                    return homeSwappApi.authenticateUser(email, password)

                })
                .then((token) => {
                    _token = token;

                })
                .then(() => homeSwappApi.createHouse(_token, images, description, info, adress)
                )
                .then(({ _id }) => {

                    houseId = _id

                })
                .then(() => homeSwappApi.toggleFavorite(_token, houseId)
                )
        )


        it('should retrieve houses by city', () =>
            homeSwappApi.searchByQuery(query)
                .then(houses => {
                    expect(JSON.stringify(houses[0].images)).toBe(JSON.stringify(images))
                    expect(houses[0].description).toBe(description)
                    expect(JSON.stringify(houses[0].info)).toBe(JSON.stringify(info))
                    expect(JSON.stringify(houses[0].adress)).toBe(JSON.stringify(adress))
                    expect(JSON.stringify(houses[0].ownerId)).toBe(JSON.stringify(userId))

                    expect(houses.length).toBe(1)
                })
        )

        it('should retrieve houses by country', () => {
            query = 'spain'

            return homeSwappApi.searchByQuery(query)
                .then(houses => {
                    expect(JSON.stringify(houses[0].images)).toBe(JSON.stringify(images))
                    expect(houses[0].description).toBe(description)
                    expect(JSON.stringify(houses[0].info)).toBe(JSON.stringify(info))
                    expect(JSON.stringify(houses[0].adress)).toBe(JSON.stringify(adress))
                    expect(JSON.stringify(houses[0].ownerId)).toBe(JSON.stringify(userId))

                    expect(houses.length).toBe(1)
                })
        })

        it('should retrieve no houses', () => {
            query = 'jhsbadjsbdjasjkd'

            homeSwappApi.searchByQuery(query)
                .then((houses) => {

                    expect(houses.length).toBe(0)


                })
        })

        it('should fail on undefined query', () => {
            query = 'badalona'
            expect(() => {
                homeSwappApi.searchByQuery(3)
            }).toThrow(Error(`3 is not a string`))
        })



    })
    


    describe('retrieve user public info', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`



        let userId

        let text = 'test'

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct credentials', () =>
            homeSwappApi.retrieveUserPublicInfo(userId)
                .then(name => {

                    expect(name).toBe(username)

                })
        )

        it('should fail on undefined id', () => {

            expect(() => {
                homeSwappApi.retrieveUserPublicInfo(undefined)
            }).toThrow(Error(`${undefined} is not a string`))
        })



    })



    afterAll(() =>
        Promise.all([
            User.deleteMany(),
            House.deleteMany()

        ])
            .then(() => mongoose.disconnect())
    )
})