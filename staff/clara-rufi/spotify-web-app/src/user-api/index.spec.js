'use strict'

const { expect } = require('chai')
const userApi = require('.')

describe('user api', () => {
    describe('register', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        it('should succeed on correct data', () =>
            userApi.register(name, surname, username, password)
                .then(id => expect(id).to.exist)
        )

        it('should fail on already existing user', () =>
            userApi.register(name, surname, username, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with username \"${username}\" already exists`)
                })
        )

        // TODO more unit test cases
    })

    describe('authenticate', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
        )

        it('should succeed on correct data', () =>
            userApi.authenticate(username, password)
                .then(({ id, token }) => {
                    expect(id).to.equal(_id)
                    expect(token).to.exist
                })
        )

        // TODO more unit test cases
    })

    describe('retrieve', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () =>
            userApi.retrieve(_id, _token)
                .then(user => {
                    expect(user.id).to.equal(_id)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.username).to.equal(username)
                })
        )

        // TODO more unit test cases
    })

    describe('update', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            return userApi.update(_id, _token, data)
                .then(() => userApi.retrieve(_id, _token))
                .then(user => {
                    expect(user.id).to.equal(_id)
                    expect(user.name).to.equal(data.name)
                    expect(user.surname).to.equal(data.surname)
                    expect(user.age).to.equal(data.age)
                    expect(user.username).to.equal(username)
                })
        })

        // TODO more unit test cases
    })

    describe('remove', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () => {
            return userApi.remove(_id, _token, username, password)
                .then(() => userApi.retrieve(_id, _token))
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({message}) => expect(message).to.equal(`user with id \"${_id}\" does not exist`))
        })

        // TODO more unit test cases
    })
})


// // 'use strict'

// //POSTMAN
// // cada vegada q provem el test, estem registrant i eliminant el mateix usuari
// // per cada test, definirem un usuari. en el beforeEach creem l'usuari. el catch error en els podem estalviar, pq si hi ha error, salta la id
// // si el  method: 'GET', no cal posar-lo
// //retrive(_id, _token) es x recuperar dades
// //data.constructor !== Object li estas dient mostri error pq realment és un objecte
// //id instance of array, estas dient si es una array o no

// const userApi = require('../user-api')

// describe('user api', () => {

//     describe('register', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const username = `manuelbarzi-${Math.random()}`
//         const password = '123'

//         it('should succeed on correct data', () =>
//             userApi.register(name, surname, username, password)
//                 .then(id => expect(id).toBeDefined())
//         )

//         it('should fail on already existing user', () =>
//             userApi.register(name, surname, username, password)
//                 .then(() => {
//                     throw Error('should not have passed by here')
//                 })
//                 .catch(error => {
//                     expect(error).toBeDefined()
//                     expect(error.message).toBe(`user with username \"${username}\" already exists`)
//                 })
//         )

//         // TODO more unit test cases
//     })

//     describe('authenticate', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const username = `manuelbarzi-${Math.random()}`
//         const password = '123'

//         let _id

//         beforeEach(() =>
//             userApi.register(name, surname, username, password)
//                 .then(id => _id = id)
//         )

//         it('should succeed on correct data', () =>
//             userApi.authenticate(username, password)
//                 .then(({ id, token }) => {
//                     expect(id).toBe(_id)
//                     expect(token).toBeDefined()
//                 })
//         )

//         // TODO more unit test cases
//     })

//     describe('retrieve', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const username = `manuelbarzi-${Math.random()}`
//         const password = '123'

//         let _id, _token

//         beforeEach(() =>
//             userApi.register(name, surname, username, password)
//                 .then(id => _id = id)
//                 .then(() => userApi.authenticate(username, password))
//                 .then(({ token }) => _token = token)
//         )

//         it('should succeed on correct data', () =>
//             userApi.retrieve(_id, _token)
//                 .then(user => {
//                     expect(user.id).toBe(_id)
//                     expect(user.name).toBe(name)
//                     expect(user.surname).toBe(surname)
//                     expect(user.username).toBe(username)
//                 })
//         )

//         // TODO more unit test cases
//     })

//     describe('update', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const username = `manuelbarzi-${Math.random()}`
//         const password = '123'

//         let _id, _token

//         beforeEach(() =>
//             userApi.register(name, surname, username, password)
//                 .then(id => _id = id)
//                 .then(() => userApi.authenticate(username, password))
//                 .then(({ token }) => _token = token)
//         )

//         it('should succeed on correct data', () => {
//             const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

//             return userApi.update(_id, _token, data)
//                 .then(() => userApi.retrieve(_id, _token))
//                 .then(user => {
//                     expect(user.id).toBe(_id)
//                     expect(user.name).toBe(data.name)
//                     expect(user.surname).toBe(data.surname)
//                     expect(user.age).toBe(data.age)
//                     expect(user.username).toBe(username)
//                 })
//         })

//         // TODO more unit test cases
//     })

//     describe('remove', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const username = `manuelbarzi-${Math.random()}`
//         const password = '123'

//         let _id, _token

//         beforeEach(() =>
//             userApi.register(name, surname, username, password)
//                 .then(id => _id = id)
//                 .then(() => userApi.authenticate(username, password))
//                 .then(({ token }) => _token = token)
//         )

//         it('should succeed on correct data', () => {
//             return userApi.remove(_id, _token, username, password)
//                 .then(() => userApi.retrieve(_id, _token))
//                 .then(() => {
//                     throw Error('should not pass by here')
//                 })
//                 .catch(({message}) => expect(message).toBe(`user with id \"${_id}\" does not exist`))
//         })

//         // TODO more unit test cases
//     })
// })

// // import userApi from '.'

// // describe('user api', () => {
// //     const username = `clara123-${Math.random()}`
// //     const usersurname = `r`
// //     const email = `clara@gmail.com-${Math.random()}`
// //     const password = `123`
// //     const confirmpassword = `123`
// //     const id
// //     const token
// //     const updateInfo = {age: 33}

// //     describe('register', () => {
// //         it('should succeed on correct data', () =>
// //             userApi.register(username, usersurname, email, password, confirmpassword)
// //                 .then(id => expect(id).toBeDefined())
// //                 .catch(error => expect(error).toBeUndefined())
// //         )

// //         it('should fail on already existing user', () =>
// //             userApi.register(username, usersurname, email, password, confirmpassword)
// //                 .then(() => {
// //                     throw Error('should not have passed by here')
// //                 })
// //                 .catch(error => {
// //                     expect(error).toBeDefined()
// //                     expect(error.message).toBe(`user with username \"${username}\" already exists`)
// //                 })
// //         )
// //         it('password must be defined', () =>
// //         userApi.register(username)
// //             .then(() => {
// //                 throw Error('should not have passed by here')
// //             })
// //             .catch(error => {
// //                 expect(error).toBeDefined()
// //                 expect(error.message).toBe(`password is null or not defined`)
// //             })
// //         )
// //     })
// //     describe('auth', () => {
// //         id = `5c54031e17332400091f06c0`
// //         token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTQwMzFlMTczMzI0MDAwOTFmMDZjMCIsImlhdCI6MTU0OTAxMDUyOSwiZXhwIjoxNTQ5MDE0MTI5fQ.4wlMe2YGdSTaS_Cuq1ohNpNpgqxgt5HUmYcLVxPT_d0`
// //         it('auth should succeed on correct data', () =>
// //             userApi.auth(username, password)
// //                 .then(data => {
// //                     expect(data.id).toBeDefined()
// //                     expect(data.token).toBeDefined()
// //                     id=data.id
// //                     token=data.token
// //                 })
                
// //                 .then(data => expect(data.id).toBeDefined())
// //                 .then(data => expect(data.token).toBeDefined())
// //                 .catch(error => expect(error).toBeUndefined()) 
// //         )
// //         it('should fail on an incorrect data', () => {
// //             try{
// //                 userApi.auth()
// //             }
// //             catch(err){
// //                 expect(err).toBeDefined()
// //                 expect(err.message).toBe("undefined is not a string")
// //             }
// //         })
// //     })

// //     describe('update', () => {
// //         it ('should update information', () => 
// //             userApi.update(username, password, id, token, updateInfo)
// //             .then(data => expect(data.id).toBeDefined())
// //             .then(data => expect(data.token).toBeDefined())
// //             .catch(error => expect(error).toBeDefined()) //
// //         )
// //         it('should fail on an incorrect data', () => {
// //             try{
// //                 userApi.update()
// //             }
// //             catch(err){
// //                 expect(err).toBeDefined()
// //                 expect(err.message).toBe("undefined is not a string")
// //             }
// //         })
// //     })

// //     describe('delete', () => {
// //         it ('should delete user', () => 
// //             userApi.delete(username, password, id, token)
// //             .then(data => expect(data.id).toBeDefined())
// //             .then(data => expect(data.token).toBeDefined())
// //             .catch(error => expect(error).toBeDefined()) //
// //         )
// //         it('should fail on an incorrect data', () => {
// //             try{
// //                 userApi.delete()
// //             }
// //             catch(err){
// //                 expect(err).toBeDefined()
// //                 expect(err.message).toBe("undefined is not a string")
// //             }
// //         })
// //     })
// // })