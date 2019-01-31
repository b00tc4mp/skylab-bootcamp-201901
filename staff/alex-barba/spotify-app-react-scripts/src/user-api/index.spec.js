'use strict'
import userApi from './index'

/**
 * user-api testing
 */

describe('user api', () => {
    let name = `manuel`
    let surname = 'barzi'
    let email = `manuelbarzi-${Math.random()}@gmail.com`
    let password = '123'

/* register */

    describe('register', () => {
        it('should succeed on correct data', () =>

            userApi.register(name, surname, email, password)
                .then(id => expect(id).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(name, surname, email, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${email}\" already exists`)
                })
        )
    }),

    /* auth */

    describe('auth', () => {
        it('should succeed on correct data', () =>
            userApi.auth(email, password)
                .then(data => {
                    expect(data.id).toBeDefined()
                    expect(data.token).toBeDefined()
                })
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on invalid user', () =>
            userApi.auth('test@mail.com', password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"test@mail.com\" does not exist`)
                })
        )
    });

     /* retrieve */

     describe ('retrieve', () => {
        it('should succeed on correct data', () =>
        userApi.auth(email, password)
            .then((data)=>
            userApi.retrieve(data.id, data.token)
                .then(data => {
                    expect(data.name).toBeDefined()
                    expect(data.surname).toBeDefined()
                    expect(data.username).toBeDefined()
                })
                .catch(error => expect(error).toBeUndefined())
            ) 
        )

        it('should fail on invalid id', () =>
            userApi.auth(email, password)
                .then((data) => 
                userApi.retrieve('testing', data.token)
                    .then(() => {
                        throw Error('should not have passed by here')
                    })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe(`token id \"${data.id}\" does not match user \"testing\"`)
                    })
                )
        )

        it('should fail on invalid token', () =>
            userApi.auth(email, password)
                .then((data) => 
                userApi.retrieve(data.id, 'test')
                    .then(() => {
                        throw Error('should not have passed by here')
                    })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe(`invalid token`)
                    })
                )
        )
    })

    /* update */
     
    describe ('update', () => {

        it('should succeed on modifying surname', () =>
            userApi.auth(email, password)
                .then((data) => 
                userApi.update(data.id, data.token, {surname : 'barba'})
                    .then(data => {
                        expect(() => {
                            userApi.retrieve(email, passaword).then(data.surname).toBe('barba')
                        })
                    })
                    .catch(error => expect(error).toBeUndefined())
                )
        )

        it('should fail on passing a string', () =>
            userApi.auth(email, password)
                .then((data) => 
                userApi.update(data.id, data.token, 'barba'))
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                })
        )
    })

    /* delete */
     
    describe ('remove', () => {

        it('should succeed on deleting user', () =>
            userApi.auth(email, password)
                .then((data) => 
                userApi.remove(data.id, data.token, email, password)
                    .then(result => {
                    expect(result).toBeTruthy()
                })
                )
                    .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on passing wrong password', () =>
            userApi.auth(email, password)
            .then((data) => 
                userApi.remove(data.id, data.token, email, 'testing')
                    .then(() => {
                        throw Error('should not have passed by here')
                })
                )
                .catch(error => {
                    expect(error).toBeDefined()
                })
        )
    })
        
})
