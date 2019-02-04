'use strict'

import userApi from '.'

describe('user api', () => {

    describe('register', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

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

        it('should fail on empty name', ()=> {
            expect( () => userApi.register('', surname, username, password)).toThrowError('name is empty')
        })
        it('should fail on empty surname', ()=> {
            expect( () => userApi.register(name, '', username, password)).toThrowError('surname is empty')
        })
        it('should fail on empty username', ()=> {
            expect( () => userApi.register(name, surname, '', password)).toThrowError('username is empty')
        })
        it('should fail on empty password', ()=> {
            expect( () => userApi.register(name, surname, username, '')).toThrowError('password is empty')
        })
        it('should fail when name is not a string', () => {
            const name = true
            expect( () => userApi.register(name, surname, username, password)).toThrowError(`${name} is not a string`)
        })
    })

    describe('authenticate', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id

        beforeEach( () =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .catch(error => {
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                }
        ))

        it('should succeed on correct data', () =>
            userApi.authenticate(username, password)
                .then(({ id, token }) => {
                    expect(id).toBe(_id)
                    expect(token).toBeDefined()
                })
        )
        it ('should fail if user is not registered',() =>
            userApi.authenticate('potato', password)
                .then ( () => {
                    throw Error ('should not have passed by here')    
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${'potato'}\" does not exist`)
                })
        )
        it ('should fail if password is incorrect',() =>
            userApi.authenticate(username, '456')
                .then ( ()=> {
                    throw Error ('should not have passed by here')    
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`username and/or password wrong`)
                })
        )
        it('should fail on empty username', ()=> {
            expect( () => userApi.authenticate('', password)).toThrowError('username is empty')
        })
        it('should fail on empty password', ()=> {
            expect( () => userApi.authenticate(username, '')).toThrowError('password is empty')
        })

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
                .catch (error =>{
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )

        it('should succeed on correct data', () =>
            userApi.retrieve(_id, _token)
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.username).toBe(username)
                })
        )
        it ('should fail on incorrect id',() =>
            userApi.retrieve('potato', _token)
                .then ( () => {
                    throw Error ('should not have passed by here')    
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`token id \"${_id}\" does not match user \"${'potato'}\"`)
                })        
        )
        it ('should fail on incorrect token',() =>
        userApi.retrieve(_id, 'potato')
            .then ( () => {
                throw Error ('should not have passed by here')    
            })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error.message).toBe('invalid token')
            })        
        )
        it('should fail on empty id', ()=> {
            expect( () => userApi.retrieve('', _token)).toThrowError('id is empty')
        })
        it('should fail on empty token', ()=> {
            expect( () => userApi.retrieve(_id , '')).toThrowError('token is empty')
        })
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
                .catch (error => {
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
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

        it('should fail on incorrect id', ()=> {
        const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            return userApi.update('potato', _token, data)       
                .then(() => {
                    throw Error ('should not have passed by here')    
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`token id \"${_id}\" does not match user \"${'potato'}\"`)
            })  
        })
        it('should fail on incorrect token', ()=> {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

                return userApi.update(_id, 'potato', data)
                    .then(()=> { 
                        throw Error ('should not have passed by here')
                    })
                    .catch(error => {
                        expect(error).toBeDefined
                        expect(error.message).toBe('invalid token')
                    })
        })
        it('should fail on empty id', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }
            expect(() => userApi.update('', _token, data)).toThrowError('id is empty')
        })
        it('should fail on empty token', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }
            expect( () => userApi.update(_id, '', data)).toThrowError('token is empty')
        })
        it('should fail on empty data', () => {
            expect( () => userApi.update(_id, _token, data)).toThrowError('data is not defined')
        })
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
                .catch(error =>{
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )

        it('should succeed on correct data', () => {
            return userApi.remove(_id, _token, username, password)
                .then(() => userApi.retrieve(_id, _token))
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({message}) => expect(message).toBe(`user with id \"${_id}\" does not exist`))
        })
        it('should fail when id is incorrect', () => {
            userApi.remove('potato', _token, username, password)
                .then(() => {
                    throw Error ('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`token id \"${_id}\" does not match user \"${'potato'}\"`)
                })
        })
        it('should fail when token is incorrect', ()=>{
            userApi.remove(_id, 'potato', username, password)
                .then(()=> {
                    throw Error ('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe('invalid token')
                })
        })
        it('should fail when username does not match', () =>
        userApi.remove(_id, _token, 'potato', password)
            .then( () => {
                throw Error ('should not have passed by here')})
            .catch(error => {
                expect(error).toBeDefined()
                expect(error.message).toBe('username and/or password wrong')
            })
        )
        it('should fail when password does not match', () =>
            userApi.remove(_id, _token, username, '444')
                .then( () => {
                    throw Error ('should not have passed by here')
                })
                .catch (error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe('username and/or password wrong')
                })
        )
        it('should fail on empty id', () =>{
            expect( ()=> userApi.remove('', _token, username, password)).toThrowError('id is empty')
        })
        it('should fail on empty token', ()=> {
            expect( () => userApi.remove(_id, '', username, password)).toThrowError('token is empty')
        })
        it('should fail on empty username', () => {
            expect( () => userApi.remove(_id, _token, '', password)).toThrowError('username is empty')
        })
        it('should fail on empty password', () => {
            const password = ''
            expect( () => userApi.remove(_id, _token, username, password)).toThrowError('password is empty')    
        })
    })
})