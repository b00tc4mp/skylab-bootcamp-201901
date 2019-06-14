const userData = require('.')
require('../../common/utils/array-random.polyfill')
const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb://localhost/rest-api-test'

describe('user data', () => {
    let client, users

    beforeAll(async () => {

        // obro la conexió amb Mongo
        client = await MongoClient.connect(url, { useNewUrlParser: true })

        //conecto amb la base de dades (p.e duck) (amb aquest cas ja la tinc definida abans dels describe)
        const db = client.db()

        // creo la collecció users
        users = db.collection('users')
        
        // Guada la colleció a l'index.js, amb moltes més dades que els usuaris
        userData.__col__ = users
    })

    const names = ['Pepito', 'Fulanito', 'Menganito']

    const _users = new Array(Math.random(100)).fill().map(() => ({
        name: `${names.random()}-${Math.random()}`,
        surname: `Grillo-${Math.random()}`,
        email: `grillo-${Math.random()}@mail.com`,
        password: `123-${Math.random()}`
    }))

    beforeEach(() => users.deleteMany())

    describe('create', () => {
        it('should succeed on correct data', async () => {
            const user = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            }

            await userData.create(user)
            
            expect(user._id).toBeInstanceOf(ObjectId)
            
            const cursor = await users.find()
            
            const _users = []
            
            await cursor.forEach(user => _users.push(user))
            
            expect(_users).toHaveLength(1)
            //desestructuro
            const [_user] = _users

            expect(_user).toEqual(user)
        })
    })

    describe('list', () => {

        beforeEach(async () => await users.insertMany(_users))
        
        it('should succeed and return items if users exist', async () => {
            const users = await userData.list()
                expect(users).toHaveLength(_users.length)
                
                // expect(_users).toMatchObject(users)
                expect(users).toEqual(_users)
                
        })
    })

    describe('retrieve', () => {

        // si creo un objecte amb id, Mongo no crea id
        const user1 = {name: 'Miguel', surname: 'Angel', email: 'u1@mail.com', password: '1313'}

        beforeEach(async () => await users.insertOne(user1))
        // quan creo l'objecte crea l'id i també li passa aquest id a user1, per tant modifica user1

        fit('should succeed on an already existing user', async () => {
            
            const {_id } = user1
            
            const _user = await userData.retrieve(_id)
                expect(_user._id).toEqual(_id)
                
        })
    })

    describe('update', () => {
        beforeEach(() => file.writeFile(userData.__file__, JSON.stringify(users)))

        describe('replacing', () => {
            it('should succeed on correct data', () => {
                const user = users[Math.random(users.length - 1)]

                const data = { name: 'n', email: 'e', password: 'p', lastAccess: Date.now() }

                return userData.update(user.id, data, true)
                    .then(() => file.readFile(userData.__file__, 'utf8'))
                    .then(JSON.parse)
                    .then(users => {
                        const _user = users.find(({ id }) => id === user.id)

                        expect(_user).toBeDefined()

                        expect(_user.id).toEqual(user.id)

                        expect(_user).toMatchObject(data)

                        expect(Object.keys(_user).length).toEqual(Object.keys(data).length + 1)
                    })
            })
        })

        describe('not replacing', () => {
            it('should succeed on correct data', () => {
                const user = users[Math.random(users.length - 1)]

                const data = { name: 'n', surname: 's', email: 'e', password: 'p', lastAccess: Date.now() }

                return userData.update(user.id, data)
                    .then(() => file.readFile(userData.__file__, 'utf8'))
                    .then(JSON.parse)
                    .then(users => {
                        const _user = users.find(({ id }) => id === user.id)

                        expect(_user).toBeDefined()

                        expect(_user.id).toEqual(user.id)

                        expect(_user).toMatchObject(data)

                        expect(Object.keys(_user).length).toEqual(Object.keys(data).length + 1)
                    })
            })
        })
    })

    describe('delete', () => {
        // TODO
    })

    describe('find', () => {
        let _users

        beforeEach(() => {
            _users = users.concat({
                id: `123-${Math.random()}`,
                name: `Fulanito-${Math.random()}`,
                surname: `Grillo-${Math.random()}`,
                email: `pepitogrillo-${Math.random()}@mail.com`,
                password: `123-${Math.random()}`
            })

            return file.writeFile(userData.__file__, JSON.stringify(_users))
        })

        it('should succeed on matching existing users', () => {
            const criteria = ({ name, email }) => (name.includes('F') || name.includes('a')) && email.includes('i')

            return userData.find(criteria)
                .then(() => userData.find(criteria))
                .then(users => {
                    const __users = _users.filter(criteria)

                    expect(users).toEqual(__users)
                })
        })
    })

    afterAll(() => client.close())
})