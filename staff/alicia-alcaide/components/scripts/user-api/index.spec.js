'use strict'

describe('user api', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    let username
    const password = '123'
    let userId
    let userToken
    
    beforeEach(() => username = `manuelbarzi-${Math.floor(Math.random() * 10000) + 1}@gmail.com`)

    describe('create', () => {
        it('should succeed on correct user data', done => {
            userApi.create(name, surname, username, password, 
                (response) => {
                    expect(response).toBeDefined()
                    const { status, data: { id } } = response
                    expect(status).toBe('OK')
                    expect(typeof id).toBe('string')
                    expect(id.length).toBeGreaterThan(0)
                    done()
                },
                () => {done()}
            )
        })

        describe('on already existing user', () => {
            beforeEach(done => userApi.create(name, surname, username, password, done, done))

            it('should fail on retrying to register', done => {
                userApi.create(name, surname, username, password, 
                    () => {done()},
                    (response) => {
                        expect(response).toBeDefined()
                        const { status, error } = response
                        expect(status).toBe('KO')
                        expect(error).toBe(`user with username \"${username}\" already exists`)
                        done()
                    }
                )
            })
        })

        describe('on validate parameters', () => {
            it('should fail on undefined name', () => {
                const name = undefined
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(RequirementError, `name is not optional`)
            })
    
            it('should fail on null name', () => {
                const name = null
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(RequirementError, `name is not optional`)
            })
    
            it('should fail on empty name', () => {
                const name = ''
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(ValueError, 'name is empty')
            })
    
            it('should fail on blank name', () => {
                const name = ' \t    \n'
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(ValueError, 'name is empty')
            })
    
            it('should fail on undefined surname', () => {
                const surname = undefined
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(RequirementError, `surname is not optional`)
            })
    
            it('should fail on null surname', () => {
                const surname = null
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(RequirementError, `surname is not optional`)
            })
    
            it('should fail on empty surname', () => {
                const surname = ''
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(ValueError, 'surname is empty')
            })
    
            it('should fail on blank surname', () => {
                const surname = ' \t    \n'
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(ValueError, 'surname is empty')
            })
    
            it('should fail on undefined username', () => {
                const username = undefined
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(RequirementError, `username is not optional`)
            })
    
            it('should fail on null username', () => {
                const username = null
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(RequirementError, `username is not optional`)
            })
    
            it('should fail on empty username', () => {
                const username = ''
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(ValueError, 'username is empty')
            })
    
            it('should fail on blank username', () => {
                const username = ' \t    \n'
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(ValueError, 'username is empty')
            })
    
            it('should fail on undefined password', () => {
                const password = undefined
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(RequirementError, `password is not optional`)
            })
    
            it('should fail on null username', () => {
                const password = null
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(RequirementError, `password is not optional`)
            })
    
            it('should fail on empty username', () => {
                const password = ''
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(ValueError, 'password is empty')
            })
    
            it('should fail on blank username', () => {
                const password = ' \t    \n'
    
                expect(() => userApi.create(name, surname, username, password, () => { }, () => { })).toThrowError(ValueError, 'password is empty')
            })

            it('should fail if callback is not a function', () => {
                const valueCallback = []
                expect(() => userApi.create(name, surname, username, password, valueCallback, () => { } )).toThrowError(TypeError, `callback ${valueCallback} is not a function`)
            })    

            it('should fail if callbackError is not a function', () => {
                const valueCallback = []
                expect(() => userApi.create(name, surname, username, password, () => { }, valueCallback )).toThrowError(TypeError, `callbackError ${valueCallback} is not a function`)
            })    
        })
    })


    describe('authenticate', () => {
        describe('on an existing user', () => {
          
            beforeEach(done => userApi.create(name, surname, username, password, done, done))
                        
            it('should succeed on correct user data', done => {
                userApi.authenticate(username, password, 
                    (response) => {
                        expect(response).toBeDefined()
                        const { status, data: { id }, data: { token } } = response
                        expect(status).toBe('OK')
                        expect(typeof id).toBe('string')
                        expect(id.length).toBeGreaterThan(0)
                        expect(typeof token).toBe('string')
                        expect(token.length).toBeGreaterThan(0)
                        done()
                    },
                    () => {done()}
                )
            })
    
            it('should fail on a wrong password', done => {
                const wrongPassword = 'aqwrdd'
                userApi.authenticate(username, wrongPassword,
                    () => {done()}, 
                    (response) => {               
                        expect(response).toBeDefined()
                        const { status, error } = response
                        expect(status).toBe('KO')
                        expect(error).toBe(`username and/or password wrong`)
                        done()
                    }
                )
            })

        })

        it('should fail on a wrong username', done => {
            const wrongUsername = '123456abc@gmail.com'
            userApi.authenticate(wrongUsername, password,
                () => {done()}, 
                (response) => {               
                    expect(response).toBeDefined()
                    const { status, error } = response
                    expect(status).toBe('KO')
                    expect(error).toBe(`user with username "${wrongUsername}" does not exist`)
                    done()
                }
            )
        })

        describe('on validate parameters', () => {
            it('should fail on undefined username', () => {
                const username = undefined    
                expect(() => userApi.authenticate(username, password, () => { }, () => { })).toThrowError(RequirementError, `username is not optional`)
            })
    
            it('should fail on null username', () => {
                const username = null
                expect(() => userApi.authenticate(username, password, () => { }, () => { })).toThrowError(RequirementError, `username is not optional`)
            })
    
            it('should fail on empty username', () => {
                const username = ''  
                expect(() => userApi.authenticate(username, password, () => { }, () => { })).toThrowError(ValueError, 'username is empty')
            })
    
            it('should fail on blank username', () => {
                const username = ' \t    \n'
                expect(() => userApi.authenticate(username, password, () => { }, () => { })).toThrowError(ValueError, 'username is empty')
            })
    
            it('should fail on undefined password', () => {
                const password = undefined
                expect(() => userApi.authenticate(username, password, () => { }, () => { })).toThrowError(RequirementError, `password is not optional`)
            })
    
            it('should fail on null password', () => {
                const password = null
                expect(() => userApi.authenticate(username, password, () => { }, () => { })).toThrowError(RequirementError, `password is not optional`)
            })
    
            it('should fail on empty password', () => {
                const password = ''
                expect(() => userApi.authenticate(username, password, () => { }, () => { })).toThrowError(ValueError, 'password is empty')
            })
    
            it('should fail on blank password', () => {
                const password = ' \t    \n'
                expect(() => userApi.authenticate(username, password, () => { }, () => { })).toThrowError(ValueError, 'password is empty')
            })

            it('should fail if callback is not a function', () => {
                const valueCallback = []
                expect(() => userApi.authenticate(username, password, valueCallback, () => { } )).toThrowError(TypeError, `callback ${valueCallback} is not a function`)
            })    

            it('should fail if callbackError is not a function', () => {
                const valueCallback = []
                expect(() => userApi.authenticate(username, password, () => { }, valueCallback )).toThrowError(TypeError, `callbackError ${valueCallback} is not a function`)
            })    
        })
    })


    describe('retrieve', () => {
        describe('on an existing user', () => {

            beforeEach(done => userApi.create(name, surname, username, password, done, done))

            beforeEach(done => userApi.authenticate(username, password, 
                (response) => {
                    const { data: { id }, data: { token } } = response
                    userId = id
                    userToken = token
                    done()
                },
                () => {done()}
            ))

            it('should succeed on correct user data', done => {
                userApi.retrieve(userId, userToken, 
                    (response) => {
                        expect(response).toBeDefined()
                        const { status, 
                                data: { id: resId }, 
                                data: { name: resName }, 
                                data: { surname: resSurname }, 
                                data: { username: resUsername } 
                            } = response                     
                        expect(status).toBe('OK')
                        expect(resId).toBe(userId)
                        expect(resName).toBe(name)
                        expect(resSurname).toBe(surname)
                        expect(resUsername).toBe(username)
                        done()
                    },
                    () => {done()}
                )
            })
            
            it('should fail on a wrong id', done => {
                const wrongUserId = "123456"
                userApi.retrieve(wrongUserId, userToken,
                    () => {done()},
                    (response) => {
                        expect(response).toBeDefined()
                        const { status, error } = response
                        expect(status).toBe('KO')
                        expect(error).toBe(`token id "${userId}" does not match user "${wrongUserId}"`)
                        done()
                    }
                )
            })

            it('should fail on a wrong token', done => {
                const wrongUserToken = "123456"
                userApi.retrieve(userId, wrongUserToken,
                    () => {done()}, 
                    (response) => {
                        expect(response).toBeDefined()

                        const { status, error } = response

                        expect(status).toBe('KO')
                        expect(error).toBe(`invalid token`)
        
                        done()
                    }
                )
            })
        })

        describe('on validate parameters', () => {
            it('should fail on undefined id', () => {
                const id = undefined
                const token = '1234567890abcdefghijk'
                expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(RequirementError, `id is not optional`)
            })
    
            it('should fail on null id', () => {
                const id = null
                const token = '1234567890abcdefghijk'
                expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(RequirementError, `id is not optional`)
            })
    
            it('should fail on empty id', () => {
                const id = ''
                const token = '1234567890abcdefghijk'
                expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(ValueError, 'id is empty')
            })
    
            it('should fail on blank id', () => {
                const id = ' \t    \n'
                const token = '1234567890abcdefghijk'
                expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(ValueError, 'id is empty')
            })
    
            it('should fail on undefined token', () => {
                const id = '123456'
                const token = undefined
                expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(RequirementError, `token is not optional`)
            })
    
            it('should fail on null token', () => {
                const id = '123456'
                const token = null
                expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(RequirementError, `token is not optional`)
            })
    
            it('should fail on empty token', () => {
                const id = '123456'
                const token = ''
                expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(ValueError, 'token is empty')
            })
    
            it('should fail on blank token', () => {
                const id = '123456'
                const token = ' \t    \n'
                expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(ValueError, 'token is empty')
            })

            it('should fail if callback is not a function', () => {
                const id = '123456'
                const token = '1234567890abcdefghijk'
                const valueCallback = []
                expect(() => userApi.retrieve(id, token, valueCallback, () => { } )).toThrowError(TypeError, `callback ${valueCallback} is not a function`)
            }) 

            it('should fail if callbackError is not a function', () => {
                const id = '123456'
                const token = '1234567890abcdefghijk'
                const valueCallback = []
                expect(() => userApi.retrieve(id, token, () => { }, valueCallback )).toThrowError(TypeError, `callbackError ${valueCallback} is not a function`)
            })         
        })
    })
})