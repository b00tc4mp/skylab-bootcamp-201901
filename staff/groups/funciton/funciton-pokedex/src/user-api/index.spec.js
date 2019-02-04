'use strict'

import userApi from '.'

describe('user api', () => {

    describe('register', () => {
        const email = 'Manuel@mail.com'
        const username = `marcuricarlos-${Math.random()}`
        const password = '123'
        const passwordConf = '123'

        it('should succeed on correct data', () =>
            userApi.register(email, username, password, passwordConf)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(email, username, password, passwordConf)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                })
        )

        it('should fail on not matching password confirmation', () =>{
            try {
                userApi.register(email, username, password, 'blablabla')
            } catch (error) {
                expect(error).toBeDefined()
            }
        })

        it('should fail on empty username', () =>{
            try {
                userApi.register(email, '', password, passwordConf)
            } catch (error) {
                expect(error).toBeDefined()
            }
        })

        it('should fail on empty mail', () =>{
            try {
                userApi.register('',username , password, passwordConf)
            } catch (error) {
                expect(error).toBeDefined()
            }
        })


        
    })         // TODO more unit test cases
})

describe('authenticate', () => {
    it('should succeed on correct data', () =>{
        const email = 'Manuel@mail.com'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'
        const passwordConf = '123'
        let _id
        return userApi.register(email, username, password, passwordConf)
            .then(id => {
                _id = id
                return userApi.authenticate(username, password)
                .then(({ id, token }) => {
                    expect(id).toBe(_id)
                    expect(token).toBeDefined()
                })
            })
    })
    
    it('should fail auth on incorrect password', () =>{
        let email = 'Manuel@mail.com'
        let username = `manuelbarzi-${Math.random()}`
        let password = '123'
        let passwordConf = '123'
        let _id
        return userApi.register(email, username, password, passwordConf)
        .then(id => {
            _id = id
            return userApi.authenticate(username, '1234567')
            .then(({ id, token }) => {
                expect(id).toBe(_id)
                expect(token).toBeDefined()
            })
        })
        .catch(error => {
            expect(error).toBeDefined()
        })

    })
})



    describe('retrieve', () => {
        

        it('should succeed on correct data', () =>{
            const email = 'Manuel@manu.com'
            const username = `manuelbarzi-${Math.random()}`
            const password = '123'
            const passwordConf = '123'
            let _id, _token
            return userApi.register(email, username, password, passwordConf)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => {
                    _token = token
                    return userApi.retrieve(_id, _token)
                        .then(user => {
                            expect(user.id).toBe(_id)
                            expect(user.username).toBe(username)
                        })
                        
                })
                .catch(error => expect(error).not.toBeDefined())
            })

        it('should fail on incorrect id', () =>{
            const email = 'Manuel@manu.com'
            const username = `manuelbarzi-${Math.random()}`
            const password = '123'
            const passwordConf = '123'
            let _id, _token
            return userApi.register(email, username, password, passwordConf)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => {
                    _token = token
                    return userApi.retrieve(_id, _token)
                        .then(user => {
                            expect(user.id).toBe('abc')
                            expect(user.username).toBe(username)
                        })
                        
                })
                .catch(error => expect(error).toBeDefined())
        })

        it('should fail on incorrect username', () =>{
            const email = 'Manuel@manu.com'
            const username = `manuelbarzi-${Math.random()}`
            const password = '123'
            const passwordConf = '123'
            let _id, _token
            return userApi.register(email, username, password, passwordConf)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => {
                    _token = token
                    return userApi.retrieve(_id, _token)
                        .then(user => {
                            expect(user.id).toBe(_id)
                            expect(user.username).toBe('12345')
                        })
                        
                })
                .catch(error => expect(error).toBeDefined())
        })

        // TODO more unit test cases
    })

//     describe('update', () => {
//         const email = 'Manuel'
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
//         const email = 'Manuel'
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
//     