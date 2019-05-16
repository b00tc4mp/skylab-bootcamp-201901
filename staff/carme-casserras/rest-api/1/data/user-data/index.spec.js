const userData = require('.')
const fs = require('fs').promises
const path = require('path')

userData.__file__ = path.join(__dirname, 'users.test.json')

describe('user data', () => {
    const users = [
        {
            id: "123",
            name: "Pepito",
            surname: "Grillo",
            email: "pepitogrillo@mail.com",
            password: "123"
        },
        {
            id: "456",
            name: "John",
            surname: "Doe",
            email: "johndoe@mail.com",
            password: "123"
        },
        {
            id: "789",
            name: "Pepito",
            surname: "Palotes",
            email: "pepitopalotes@mail.com",
            password: "123"
        },
    ]

    describe('create', () => {
        beforeEach(() => fs.writeFile(userData.__file__, '[]'))

        it('should succeed on correct data', () => {
            const user = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            }

            return userData.create(user)
                .then(() => {
                    expect(typeof user.id).toBe('string')

                    return fs.readFile(userData.__file__, 'utf8')
                })
                .then(content => {
                    expect(content).toBeDefined()

                    const users = JSON.parse(content)

                    expect(users).toHaveLength(1)

                    const [_user] = users

                    // expect(_user).toMatchObject(user) 
                    expect(_user).toEqual(user)
                })
        })
    })

    describe('list', () => {
        beforeEach(() => fs.writeFile(userData.__file__, JSON.stringify(users)))

        it('should succeed and return items if users exist', () => {
            userData.list()
                .then(_users => {
                    expect(_users).toHaveLength(users.length)

                    // expect(_users).toMatchObject(users)
                    expect(_users).toEqual(users)
                })
        })
    })

    describe('retrieve', () => {
        beforeEach(() => fs.writeFile(userData.__file__, JSON.stringify(users)))
        it('should succeed on an already existing user', () => {
            userData.retrieve(users[0].id)
                .then(content => {
                    expect(content).toBeDefined()        
                    expect(typeof content.id).toBe('string')
                    expect(content).toEqual(users[0])                    
                })
        })

        // it ('should failed on incorrect id', () => {

        //     const wrongId = '5cb9998f2e59ee0009eac02c'
        //     return userData.retrieve(users[0].id)
        //     status .....????? 
        // })
    })

    fdescribe('update', () => {
        
        beforeEach(() => fs.writeFile(userData.__file__, JSON.stringify(users)))        
        let content = {age : 25}
        
        it('should sucedd on a update existing user', () => {
            userData.update(users[0].id)
            .then(content=> {
                expect(content).toBeDefined()
                expect(typeof user.id).toBe('string')
                expect(content.age).toBeDefined()
            })
            
        })
        
    })

    // describe('delete', () => {
    //     // TODO
    // })

    // describe('find', () => {
    //     // TODO

    //     it('should succeed on matching existing users', () => {
    //         userData.find({ name: 'Pepito' })
    //             .then(_users => {
    //                 // TODO
    //             })
    //     })

    // })

    afterAll(() => fs.writeFile(userData.__file__, '[]'))
})