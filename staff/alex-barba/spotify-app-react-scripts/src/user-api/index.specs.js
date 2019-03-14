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

        it('should fail on invalid password', () =>
            userApi.auth(email, 'test')
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                })
        )
    });

    describe ('auth before each method', () => {
        
        let tokenTest, idTest 

        beforeEach(() => 
            userApi.auth(email, password)
                .then((data) => {
                    tokenTest = data.token
                    idTest = data.id
                }
        ))
        /* retrieve */
    
        describe ('retrieve', () => {
            
           it('should succeed on correct data', () =>
               userApi.retrieve(idTest, tokenTest)
                   .then(data => {
                       expect(data.name).toBeDefined()
                       expect(data.surname).toBeDefined()
                       expect(data.username).toBeDefined()
                   })
                   .catch(error => expect(error).toBeUndefined())
           )
    
           it('should fail on invalid id', () =>
                   userApi.retrieve('testing', tokenTest)
                       .then(() => {
                           throw Error('should not have passed by here')
                       })
                       .catch(error => {
                           expect(error).toBeDefined()
                           expect(error.message).toBe(`token id \"${idTest}\" does not match user \"testing\"`)
                       })
           )
    
           it('should fail on invalid token', () =>
                   userApi.retrieve(idTest, 'test')
                       .then(() => {
                           throw Error('should not have passed by here')
                       })
                       .catch(error => {
                           expect(error).toBeDefined()
                           expect(error.message).toBe(`invalid token`)
                       })
           )
        })

        /* update */
         
        describe ('update', () => {
    
            it('should succeed on modifying surname', () =>
                userApi.update(idTest, tokenTest, {surname : 'barba'})
                    .then(data => {
                        expect(() => {
                            userApi.retrieve(email, passaword).then(data.surname).toBe('barba')
                        })
                    })
                    .catch(error => expect(error).toBeUndefined())
            )
    
            it('should fail on passing a string', () =>
                userApi.update(idTest, tokenTest, 'barba')
                    .then(() => {
                        throw Error('should not have passed by here')
                    })
                    .catch(error => {
                        expect(error).toBeDefined()
                    }) 
            ) 
        })
    
        /* remove */
         
        describe ('remove', () => {

            it('should fail on passing wrong password', () =>
                userApi.remove(idTest, tokenTest, email, 'testing')
                    .then(() => {
                        throw Error('should not have passed by here')
                        })
                    .catch(error => {
                        expect(error).toBeDefined()
                    })
            )
    
            it('should succeed on deleting user', () =>
                userApi.remove(idTest, tokenTest, email, password)
                    .then(result => {
                        expect(result).toBeTruthy()
                    })
                    .catch(error => expect(error).toBeUndefined())
            )
    
            
        })
    })   
})