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
        let username
        let password
        let passwordConfirm = '123'
        let gender = 'female'
        let birthDate = '1985/10/15'
        let height = 161
        let weight = 60
        let lifeStyle = 'sedentary'

        let _id
        beforeEach(() => {
            username = `manuelbarzi-${Math.random()}`
            password = '123'

            return userApi.register(name, surname, username, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
                .then(id => _id = id)
        })

        it('should succeed on correct data', () => 
            userApi.authenticate(username, password)
                .then(({ id, token }) => {
                    expect(id).toBe(_id)
                    expect(token).toBeDefined()
                })
        )
        it('should fail on non-existing username',() => {

            const testUser = 'testUser'
            userApi.authenticate(testUser, password)
             .then(() => {
                 throw Error('should not have passed by here')
             })
             .catch(error => {
                expect(error.message).toBe(`user with username \"${testUser}\" does not exist`)
             })
        })
        it('should fail on non-matching token',() => {

            const testPassword = '123123sadnauybdas123ybajdn21i38612usdasdiuhi213' 
            userApi.authenticate(username, testPassword)
             .then(() => {
                 throw Error('should not have passed by here')
             })
             .catch(error => {
                expect(error.message).toBe(`username and/or password wrong`)
             })
        })
        it('should fail on number password instead of string',() => {

            password = 4

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on boolean password instead of string',() => {

            password = true

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on empty password instead of string',() => {

            password = ''

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError('password is empty'))
        })
        it('should fail on object password instead of string',() => {

            password = {}

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on array password instead of string',() => {

            password = []

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on undefined password instead of string',() => {

            password = undefined

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on null password instead of string',() => {

            password = null

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on number username instead of string',() => {

            username = 4
            password = '123'

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError(username + ' is not a string'))
        })
        it('should fail on boolean username instead of string',() => {

            username = true

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError(username + ' is not a string'))
        })
        it('should fail on object username instead of string',() => {

            username = {}

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError(username + ' is not a string'))
        })
        it('should fail on array username instead of string',() => {

            username = []

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError(username + ' is not a string'))
        })
        it('should fail on null username instead of string',() => {

            username = null

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError(username + ' is not a string'))
        })
        it('should fail on undefined username instead of string',() => {

            username = undefined

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError(username + ' is not a string'))
        })
        it('should fail on empty username instead of string',() => {

            username = ''

            expect(() => 
                userApi.authenticate(username, password)
            ).toThrow(TypeError('username is empty'))
        })
    })

    describe('retrieve', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let username
        let password = '123'
        let passwordConfirm = '123'
        let gender = 'female'
        let birthDate = '1985/10/15'
        let height = 161
        let weight = 60
        let lifeStyle = 'sedentary'

        let _id, _token

        beforeEach(() => {
            username = `manuelbarzi-${Math.random()}`

            return userApi.register(name, surname, username, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
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
        it('should fail on empty token instead of string',() => {

            _token = ''

            expect(() => 
                userApi.retrieve(_id, _token)
            ).toThrow(TypeError('token is empty'))
        })
        it('should fail on object token instead of string',() => {

            _token = {}

            expect(() => 
                userApi.retrieve(_id, _token)
            ).toThrow(TypeError(`${_token} is not a string`))
        })
        it('should fail on boolean token instead of string',() => {

            _token = true

            expect(() => 
                userApi.retrieve(_id, _token)
            ).toThrow(TypeError(`${_token} is not a string`))
        })
        it('should fail on number token instead of string',() => {

            _token = 4

            expect(() => 
                userApi.retrieve(_id, _token)
            ).toThrow(TypeError(`${_token} is not a string`))
        })
        it('should fail on undefined token instead of string',() => {

            _token = undefined

            expect(() => 
                userApi.retrieve(_id, _token)
            ).toThrow(TypeError(`${_token} is not a string`))
        })
        it('should fail on null token instead of string',() => {

            _token = null

            expect(() => 
                userApi.retrieve(_id, _token)
            ).toThrow(TypeError(`${_token} is not a string`))
        })
        it('should fail on empty id instead of string',() => {

            _id = ''

            expect(() => 
                userApi.retrieve(_id, _token)
            ).toThrow(TypeError(`id is empty`))
        })
        it('should fail on object id instead of string',() => {

            _id = {}

            expect(() => 
                userApi.retrieve(_id, _token)
            ).toThrow(TypeError(`${_id} is not a string`))
        })
        it('should fail on boolean id instead of string',() => {

            _id = true

            expect(() => 
                userApi.retrieve(_id, _token)
            ).toThrow(TypeError(`${_id} is not a string`))
        })
        it('should fail on undefined id instead of string',() => {

            _id = undefined

            expect(() => 
                userApi.retrieve(_id, _token)
            ).toThrow(TypeError(`${_id} is not a string`))
        })
        it('should fail on null id instead of string',() => {

            _id = null

            expect(() => 
                userApi.retrieve(_id, _token)
            ).toThrow(TypeError(`${_id} is not a string`))
        })
        it('should fail on array id instead of string',() => {

            _id = []

            expect(() => 
                userApi.retrieve(_id, _token)
            ).toThrow(TypeError(`${_id} is not a string`))
        })
    })

    describe('update', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let username
        let password = '123'
        let passwordConfirm = '123'
        let gender = 'female'
        let birthDate = '1985/10/15'
        let height = 161
        let weight = 60
        let lifeStyle = 'sedentary'
        
        let _id, _token
        let data = { name: 'Pepito', surname: 'Grillo', age: 32 }
        
        beforeEach(() => {
            username = `manuelbarzi-${Math.random()}`
            return userApi.register(name, surname, username, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        })

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
        it('should fail on non-existing id',() => {

            const testToken = '123123sadnauybdas123ybajdn21i38612usdasdiuhi213' 
            userApi.update(_id, testToken, data)
             .then(() => {
                 throw Error('should not have passed by here')
             })
             .catch(error => {
                expect(error.message).toBe(`invalid token`)
             })
        })
        it('should fail on number token instead of string',() => {

            _token = 4

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${_token} is not a string`))
        })
        it('should fail on boolean token instead of string',() => {

            _token = true

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${_token} is not a string`))
        })
        it('should fail on object token instead of string',() => {

            _token = {}

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${_token} is not a string`))
        })
        it('should fail on array token instead of string',() => {

            _token = []

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${_token} is not a string`))
        })
        it('should fail on undefined token instead of string',() => {

            _token = undefined

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${_token} is not a string`))
        })
        it('should fail on null token instead of string',() => {

            _token = null

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${_token} is not a string`))
        })
        it('should fail on empty token instead of string',() => {

            _token = ''

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`token is empty`))
        })
        it('should fail on object id instead of string',() => {

            _id = {}

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${_id} is not a string`))
        })
        it('should fail on array id instead of string',() => {

            _id = []

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${_id} is not a string`))
        })
        it('should fail on number id instead of string',() => {

            _id = 4

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${_id} is not a string`))
        })
        it('should fail on undefined id instead of string',() => {

            _id = undefined

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${_id} is not a string`))
        })
        it('should fail on null id instead of string',() => {

            _id = null

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${_id} is not a string`))
        })
        it('should fail on empty id instead of string',() => {

            _id = ''

            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`id is empty`))
        })
        it('should fail on string data instead of object',() => {

            data = 'test'
            
            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${data} is not an object`))
        })
        it('should fail on number data instead of object',() => {

            data = 4
            
            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${data} is not an object`))
        })
        it('should fail on boolean data instead of object',() => {

            data = true
            
            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${data} is not an object`))
        })
        it('should fail on undefined data instead of object',() => {

            data = undefined
            
            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${data} is not an object`))
        })
        it('should fail on null data instead of object',() => {

            data = null
            
            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${data} is not an object`))
        })
        it('should fail on empty data instead of object',() => {

            data = ''
            
            expect(() => 
                userApi.update(_id, _token, data)
            ).toThrow(TypeError(`${data} is not an object`))
        })
    })

    describe('remove', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let username
        let password
        let passwordConfirm = '123'
        let gender = 'female'
        let birthDate = '1985/10/15'
        let height = 161
        let weight = 60
        let lifeStyle = 'sedentary'

        let _id, _token

        beforeEach(() => {
            username = `manuelbarzi-${Math.random()}`
            password = '123'

            return userApi.register(name, surname, username, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        })

        it('should succeed on correct data', () => {
            return userApi.remove(_id, _token, username, password)
                .then(() => userApi.retrieve(_id, _token))
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(error => expect(error.message).toBe(`user with id \"${_id}\" does not exist`))
        })
        it('should fail on non-matching token',() => {

            const testToken = '123123sadnauybdas123ybajdn21i38612usdasdiuhi213' 
            userApi.remove(_id, testToken, username, password)
             .then(() => {
                 throw Error('should not have passed by here')
             })
             .catch(error => {
                expect(error.message).toBe(`invalid token`)
             })
        })
        it('should fail on number id instead of string',() => {
            
            _id = 4

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(_id + ' is not a string'))
        })
        it('should fail on boolean id instead of string',() => {
            
            _id = true

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(true + ' is not a string'))
        })
        it('should fail on object id instead of string',() => {
            
            _id = {}

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(_id + ' is not a string'))
        })
        it('should fail on array id instead of string',() => {
            
            _id = []

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(_id + ' is not a string'))
        })
        it('should fail on undefined id instead of string',() => {
            
            _id = undefined

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(_id + ' is not a string'))
        })
        it('should fail on null id instead of string',() => {
            
            _id = null

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(_id + ' is not a string'))
        })
        it('should fail on undefined token instead of string',() => {
            
            _token = undefined

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(_token + ' is not a string'))
        })
        it('should fail on null token instead of string',() => {
            
            _token = null

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(_token + ' is not a string'))
        })
        it('should fail on object token instead of string',() => {
            
            _token = {}

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(_token + ' is not a string'))
        })
        it('should fail on number token instead of string',() => {
            
            _token = 4

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(_token + ' is not a string'))
        })
        it('should fail on boolean token instead of string',() => {
            
            _token = true

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(_token + ' is not a string'))
        })
        it('should fail on number password instead of string',() => {
            
            password = 123123

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on empty password',() => {
            
            password = ''

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError('password is empty'))
        })
        it('should fail on boolean password instead of string',() => {
            
            password = true

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on array password instead of string',() => {
            
            password = []

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on object password instead of string',() => {
            
            password = {}

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on null password instead of string',() => {
            
            password = null

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on undefined password instead of string',() => {
            
            password = undefined

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(password + ' is not a string'))
        })
        it('should fail on number username instead of string',() => {
            
            username = 4

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(`${username} is not a string`))
        }) 
        it('should fail on null username instead of string',() => {
            
            username = null

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(`${username} is not a string`))
        }) 
        it('should fail on undefined username instead of string',() => {
            
            username = undefined

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(`${username} is not a string`))
        }) 
        it('should fail on boolean username instead of string',() => {
            
            username = true

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(`${username} is not a string`))
        }) 
        it('should fail on array username instead of string',() => {
            
            username = []

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(`${username} is not a string`))
        }) 
        it('should fail on object username instead of string',() => {
            
            username = {}

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(`${username} is not a string`))
        })
        it('should fail on empty username instead of string',() => {
            
            username = ''

            expect(() => 
                userApi.remove(_id, _token, username, password)
            ).toThrow(TypeError(`username is empty`))
        }) 
    })
})