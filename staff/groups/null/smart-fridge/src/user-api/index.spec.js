'use strict'

import userApi from '.'

describe('user api', () => {

    describe('register', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let username = `manuelbarzi-${Math.random()}`
        let password = '123'
        let passwordConfirm = '123'
        let gender = 'female'
        let birthDate = '1985/10/15'
        let height = 161
        let weight = 60
        let lifeStyle = 'sedentary'

        it('should succeed on correct data', () =>
            userApi.register(name, surname, username, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(name, surname, username, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )
    })

    describe('authenticate', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let username = `manuelbarzi-${Math.random()}`
        let password = '123'
        let passwordConfirm = '123'
        let gender = 'female'
        let birthDate = '1985/10/15'
        let height = 161
        let weight = 60
        let lifeStyle = 'sedentary'

        let _id

        userApi.register(name, surname, username, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
            .then(id => _id = id)

        it('should succeed on correct data', () =>
            userApi.authenticate(username, password)
                .then(({ id, token }) => {
                    expect(id).toBe(_id)
                    expect(token).toBeDefined()
                })
        )
        it('should fail on number password instead of string',() => {

            password = 4

            expect(() => {
                userApi.authenticate(username, password)
            }).toThrow(TypeError(`${password} is not a string`))
        })
        it('should fail on object password instead of string',() => {

            password = {}

            expect(() => {
                userApi.authenticate(username, password)
            }).toThrow(TypeError(`${password} is not a string`))
        })
        it('should fail on array password instead of string',() => {

            password = []

            expect(() => {
                userApi.authenticate(username, password)
            }).toThrow(TypeError(`${password} is not a string`))
        })
        it('should fail on number username instead of string',() => {

            username = 4
            password = '123'

            expect(() => {
                userApi.authenticate(username, password)
            }).toThrow(TypeError(`${username} is not a string`))
        })
        it('should fail on boolean username instead of string',() => {

            username = true

            expect(() => {
                userApi.authenticate(username, password)
            }).toThrow(TypeError(`${username} is not a string`))
        })
        it('should fail on object username instead of string',() => {

            username = {}

            expect(() => {
                userApi.authenticate(username, password)
            }).toThrow(TypeError(`${username} is not a string`))
        })
        it('should fail on array username instead of string',() => {

            username = []

            expect(() => {
                userApi.authenticate(username, password)
            }).toThrow(TypeError(`${username} is not a string`))
        })
        it('should fail on null username instead of string',() => {

            username = null

            expect(() => {
                userApi.authenticate(username, password)
            }).toThrow(TypeError(`${username} is not a string`))
        })
    })

    describe('retrieve', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let username = `manuelbarzi-${Math.random()}`
        let password = '123'
        let passwordConfirm = '123'
        let gender = 'female'
        let birthDate = '1985/10/15'
        let height = 161
        let weight = 60
        let lifeStyle = 'sedentary'

        let _id, _token

        userApi.register(name, surname, username, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
            .then(id => _id = id)
            .then(() => userApi.authenticate(username, password))
            .then(({ token }) => _token = token)

        it('should succeed on correct data', () =>
            userApi.retrieve(_id, _token)
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.username).toBe(username)
                })
        )
    })

    describe('update', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let password = '123'
        let passwordConfirm = '123'
        let gender = 'female'
        let birthDate = '1985/10/15'
        let height = 161
        let weight = 60
        let lifeStyle = 'sedentary'
        
        let _id, _token
        let data = { name: 'Pepito', surname: 'Grillo', age: 32 }
        
        let username = `manuelbarzi-${Math.random()}`
        userApi.register(name, surname, username, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
            .then(id => _id = id)
            .then(() => userApi.authenticate(username, password))
            .then(({ token }) => _token = token)
        it('should succeed on correct data', () => {

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
        it('should fail on object id instead of string',() => {

            _id = {}

            expect(() => {
                userApi.update(_id, _token, data)
            }).toThrow(TypeError(`${_id} is not a string`))
        })
        it('should fail on array id instead of string',() => {

            _id = []

            expect(() => {
                userApi.update(_id, _token, data)
            }).toThrow(TypeError(`${_id} is not a string`))
        })
        let _id2, _token2
        let username2 = `manuelbarzi-${Math.random()}`
        userApi.register(name, surname, username2, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
            .then(id => _id2 = id)
            .then(() => userApi.authenticate(username2, password))
            .then(({ token }) => _token2 = token)
        it('should fail on non-object data',() => {

            data = 'test'
            

            expect(() => {
                userApi.update(_id2, _token2, data)
            }).toThrow(TypeError(`${data} is not an object`))
        })
    })

    describe('remove', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let username = `manuelbarzi-${Math.random()}`
        let password = '123'
        let passwordConfirm = '123'
        let gender = 'female'
        let birthDate = '1985/10/15'
        let height = 161
        let weight = 60
        let lifeStyle = 'sedentary'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
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
                .catch(error => expect(error.message).toBe(`user with id \"${_id}\" does not exist`))
        })
        it('should fail on number password instead of string',() => {
            
            password = 123123

            expect(() => {
                userApi.remove(_id, _token, username, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on number username instead of string',() => {
            
            username = 4
            password = '123'

            expect(() => {
                userApi.remove(_id, _token, username, password)
            }).toThrow(TypeError(username + ' is not a string'))
        }) 
    })
})