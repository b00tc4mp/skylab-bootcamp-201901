'use strict'

import userApi from '.';

describe('user api', () => {
    const username = `manuelbarzi-${Math.random()}`
    const password = '123'

    describe('register', () => {
        it('should succeed on correct data', () =>
            userApi.register(username, password)
                .then(id => expect(id).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(username, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )
    })

    describe('auth', () => {
        let username = `carloscalvo`
        let password = `123`

        it('should succesfully auth on correct data', () =>
            userApi.auth(username, password)
                .then(({id, token}) => {
                    expect(id).toBeDefined()
                    expect(token).toBeDefined()
                })
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on registering', () =>{
            username = "carloscalvo"
            password = "12345"
            return userApi.auth(username, password)
                .catch(error => expect(error.message).toBeDefined())
        })

    })


    describe('retrieve', () => {
        it('should succesfully retrieve from user after auth', () =>{
            let username = "carloscalvo"
            let password = "123"

            return userApi.auth(username, password)
                .then(({id, token}) => {
                    return userApi.retrieve(id, token)
                    .then((data) =>
                        expect(data).toBeDefined()
                    )
                    .catch(error => expect(error).toBeUndefined())
                })
                .catch(error => expect(error).toBeUndefined())
        })

        it('should fail when retrieve from user after auth', () =>{
            let username = "carloscalvo"
            let password = "123"

            return userApi.auth(username, password)
                .then(({id, token}) => {
                    let iden = 'abc'
                    return userApi.retrieve(iden, token)
                    .then((data) =>
                        expect(data).toBeDefined()
                    )
                    .catch(error => expect(error).toBeDefined())
                })
                .catch(error => expect(error).toBeDefined())
        })
    })


    describe('update', () => {
        it('should succesfully update properties after auth', () =>{
            let username = "carloscalvo"
            let password = "123"
            let properties ={
                "age":"32",
                "favorites":"modafoca"
            }

            return userApi.auth(username, password)
                .then(({id, token}) => {
                    return userApi.update(id, token, properties)
                    .then((status) =>
                        expect(status).toBe('OK'))
                    .catch(error => expect(error).toBeUndefined())
                })
                .catch(error => expect(error).toBeUndefined())
        })

        it('should succesfully auth but fail as body is not a JSON', () =>{
            let username = "carloscalvo"
            let password = "123"
            let properties = true

            return userApi.auth(username, password)
                .then(({id, token}) => {
                    return userApi.update(id, token, properties)
                    .then((status) =>
                        expect(status).toBe('OK'))
                    .catch(error => expect(error).toBeDefined())
                })
                .catch(error => expect(error).toBeDefined())
        })
    })

    describe('remove', () => {
        it('should succesfully create and remove user', () =>{
            let username2 = `manuelbarzi-${Math.random()}`
            let password2 = '123'
            let _id;
            let _token;
            return userApi.register(username2, password2)
                .then(() =>
                    userApi.auth(username2, password2)
                        .then(({id, token}) => {
                            expect(id).toBeDefined()
                            expect(token).toBeDefined()
                            _id = id
                            _token = token
                            
                        })
                        .then(() =>
                            userApi.remove(username2, password2, _id, _token)
                                .then((status) =>
                                    expect(status).toBe('OK')
                                )
                        )
                )
                .catch(error => expect(error).toBeUndefined())
        })
    })
})