const logic = require('.')
require('../common/utils/array-random.polyfill')
const { User } = require('../data/models')
const mongoose = require('mongoose')

const url = 'mongodb://localhost/notes-api-test'

describe('user data', () => {
    let users

    beforeAll(async () => {
        await mongoose.connect(url, { useNewUrlParser: true })
    })

    const names = ['Pepito', 'Fulanito', 'Menganito']

    let users_

    beforeEach(async () => {

        await User.deleteMany()

        users_ = new Array(Math.random(100)).fill().map(() => ({
            nickname: `${names.random()}-${Math.random()}`,
            age: Math.floor(Math.random(5) * 5),
            email: `grillo-${Math.random()}@mail.com`,
            password: `123-${Math.random()}`
        }))

    })

    describe('create', () => {
        it('should succeed on correct data', async () => {
            const nickname = 'Manuelito', age = 56, email = 'manuelbarzilito@gmail.com', password = '123'

            await logic.registerUser(nickname, age, email, password)

            let user = await User.findOne({ email: "manuelbarzi@gmail.com" })

            expect(user._id).toBeDefined

            console.log(user)

            const _users = await User.find({})

            expect(_users).toHaveLength(1)

            const [_user] = _users


            console.log(_user)


            // expect(_user).toMatchObject(user)
        })
    })

    describe('retrieve', () => {
        let marlon

        beforeEach(async () => {

            marlon = new User({
                nickname: 'Marlon',
                age: 27,
                email: 'tontico@gmail.com',
                password: '123'
            })

            await marlon.save()
        })

        it('should succeed on an already existing user', async () => {
            const _user = await logic.retrieveUser(marlon._id.toString())

            expect(_user.id).toBeUndefined()
            expect(_user.name).toEqual(marlon.name)
            expect(_user.surname).toEqual(marlon.surname)
            expect(_user.email).toEqual(marlon.email)
        })
    })

    describe('auth', () => {
        let pepito

        beforeEach(async () => {

            pepito = new User({
                nickname: 'Pepito',
                age: 25,
                email: 'tontaco@gmail.com',
                password: '123'
            })

            await pepito.save()
        })

        it('should succeed on correct data', async () => {

            const cosa = await logic.authenticateUser(pepito.email, pepito.password)

            expect(cosa).toBeDefined()

            expect(cosa).toEqual(pepito._id)
        })
    })

    afterAll(async () => {
        // await User.deleteMany({})
        await mongoose.disconnect()
    })
})