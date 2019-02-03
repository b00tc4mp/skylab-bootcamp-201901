'use strict'

import userApi from '.'

/**
 * 
 * User Api Testing
 * 
 */

describe('user api', () => {

    describe('register', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '456'

        it('should succeed on correct data', () =>
            userApi.register(name, surname, username, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(name, surname, username, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )

        it('should fail on empty name', () => {
            expect(()=> userApi.register('', surname, username, password)).toThrowError('name is empty')
        })

        it('should fail when surname is a number', () => {
            expect(()=> userApi.register(name, 1, username, password)).toThrowError(`1 is not a string`)
        })

        it('should fail when username is a boolean', () => {
            expect(()=> userApi.register(name, surname, true, password)).toThrowError(`true is not a string`)
        })

        it('should fail when password is an array', () => {
            expect(()=> userApi.register(name, surname, username, [1,2,3])).toThrowError(`1,2,3 is not a string`)
        })
    })

    describe('authenticate', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let username
        const password = '456'

        const usernameTest = 'dasdasdasd'
        const passwordTest = '123'

        let _id

        beforeEach(() =>{
            username =`manuelbarzi-${Math.random()}`   
            return userApi.register(name, surname, username, password)
                .then(id => _id = id)
        })

        it('should succeed on correct data', () =>
            userApi.authenticate(username, password)
                .then(({ id, token }) => {
                    expect(id).toBe(_id)
                    expect(token).toBeDefined()
                })
        )

        it('should fail on wrong username', () =>
            userApi.authenticate(usernameTest, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${usernameTest}\" does not exist`)
                })
        ) 

        it('should fail on wrong password', () =>
            userApi.authenticate(username, passwordTest)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`username and/or password wrong`)
                })
        ) 

        it('should fail when username is a boolean', () => {
            expect(()=> userApi.authenticate(true, password)).toThrowError(`true is not a string`)
        })

        it('should fail when password is an array', () => {
            expect(()=> userApi.authenticate(username, [1,2,3])).toThrowError(`1,2,3 is not a string`)
        })     

    })

    describe('retrieve', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let username
        const password = '456'

        let _id, _token

        beforeEach(() => {
            username = `manuelbarzi-${Math.random()}`
            return userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        })

        it('should succeed on correct data', () =>
            userApi.retrieve(_id, _token)
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.username).toBe(username)
                })
        )
        
        it('should fail on wrong token', () =>
        userApi.retrieve(_id, 'wrong token')
            .then(() => {
                throw Error('should not have passed by here')
            })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error.error).toBe(`invalid token`)
            })
    ) 
        
    })

    false && describe('update', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '456'

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
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(data.surname)
                    expect(user.age).toBe(data.age)
                    expect(user.username).toBe(username)
                })
        })

        // TODO more unit test cases
    })

    false && describe('remove', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '456'

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
                .catch(({message}) => expect(message).toBe(`user with id \"${_id}\" does not exist`))
        })

        // TODO more unit test cases
    })
})