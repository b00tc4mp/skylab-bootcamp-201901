'use strict'

describe('logic', function () {

    describe('users', () => {
        const name = 'Peter'
        const surname = 'Seller'
        let email
        const password = '123'
        let userId
        let userToken
    

        beforeEach(() => email = `manuelbarzi-${Math.floor(Math.random() * 10000) + 1}@gmail.com`)

        describe('register', () => {
            it('should succeed on correct user data', done => {
                logic.registerUser(name, surname, email, password, 
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
                beforeEach(done => logic.registerUser(name, surname, email, password, done, done))

                it('should fail on retrying to register', done => {
                    logic.registerUser(name, surname, email, password, 
                        () => {done()},
                        (response) => {
                            expect(response).toBeDefined()
                            const { status, error } = response
                            expect(status).toBe('KO')
                            expect(error).toBe(`user with username \"${email}\" already exists`)
                            done()
                        }
                    )
                })
            })

            describe('on validate parameters', () => {
                it('should fail on undefined name', () => {
                    const name = undefined
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(TypeError, 'Wrong field/s')
                })
        
                it('should fail on null name', () => {
                    const name = null
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(TypeError, 'Wrong field/s')
                })
        
                it('should fail on empty name', () => {
                    const name = ''
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(TypeError, 'Wrong field/s')
                })
        
                it('should fail on blank name', () => {
                    const name = ' \t    \n'
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(TypeError, 'Wrong field/s')
                })
        
                it('should fail on undefined surname', () => {
                    const surname = undefined
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(TypeError, 'Wrong field/s')
                })
        
                it('should fail on null surname', () => {
                    const surname = null
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(TypeError, 'Wrong field/s')
                })
        
                it('should fail on empty surname', () => {
                    const surname = ''
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(TypeError, 'Wrong field/s')
                })
        
                it('should fail on blank surname', () => {
                    const surname = ' \t    \n'
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(TypeError, 'Wrong field/s')
                })
        
                it('should fail on undefined email', () => {
                    const email = undefined
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(Error, 'Incorrect email')
                })
        
                it('should fail on null email', () => {
                    const email = null
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(Error, 'Incorrect email')
                })
        
                it('should fail on empty email', () => {
                    const email = ''
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(Error, 'Incorrect email')
                })
        
                it('should fail on blank email', () => {
                    const email = ' \t    \n'
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(Error, 'Incorrect email')
                })
        
                it('should fail on undefined password', () => {
                    const password = undefined
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(TypeError, 'Wrong field/s')
                })
        
                it('should fail on null email', () => {
                    const password = null
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(TypeError, 'Wrong field/s')
                })
        
                it('should fail on empty email', () => {
                    const password = ''
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(TypeError, 'Wrong field/s')
                })
        
                it('should fail on blank email', () => {
                    const password = ' \t    \n'
        
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, () => { })).toThrowError(TypeError, 'Wrong field/s')
                })
    
                it('should fail if callback is not a function', () => {
                    const valueCallback = []
                    expect(() => logic.registerUser(name, surname, email, password, valueCallback, () => { } )).toThrowError(Error,'Internal error')
                })    
    
                it('should fail if callbackError is not a function', () => {
                    const valueCallback = []
                    expect(() => logic.registerUser(name, surname, email, password, () => { }, valueCallback )).toThrowError(Error,'Internal error')
                })    
            })
    
        })


        describe('login', () => {
            describe('on an existing user', () => {
          
                beforeEach(done => logic.registerUser(name, surname, email, password, done, done))
                            
                it('should succeed on correct user data', done => {
                    logic.loginUser(email, password, 
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
                    logic.loginUser(email, wrongPassword,
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
    
            it('should fail on a wrong e-mail (usermane)', done => {
                const wrongUsername = '123456abc@gmail.com'
                logic.loginUser(wrongUsername, password,
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
                it('should fail on undefined email (username)', () => {
                    const username = undefined    
                    expect(() => logic.loginUser(username, password, () => { }, () => { })).toThrowError(Error, 'Incorrect email')
                })
        
                it('should fail on null email (username)', () => {
                    const username = null
                    expect(() => logic.loginUser(username, password, () => { }, () => { })).toThrowError(Error, 'Incorrect email')
                })
        
                it('should fail on empty email (username)', () => {
                    const username = ''  
                    expect(() => logic.loginUser(username, password, () => { }, () => { })).toThrowError(Error, 'Incorrect email')
                })
        
                it('should fail on blank email (username)', () => {
                    const username = ' \t    \n'
                    expect(() => logic.loginUser(username, password, () => { }, () => { })).toThrowError(Error, 'Incorrect email')
                })
        
                it('should fail on undefined password', () => {
                    const wrongPassword = undefined
                    expect(() => logic.loginUser(email, wrongPassword, () => { }, () => { })).toThrowError(Error,"Password can't be empty")
                })
        
                it('should fail on null password', () => {
                    const wrongPassword = null
                    expect(() => logic.loginUser(email, wrongPassword, () => { }, () => { })).toThrowError(Error,"Password can't be empty")
                })
        
                it('should fail on empty password', () => {
                    const wrongPassword = ''
                    expect(() => logic.loginUser(email, wrongPassword, () => { }, () => { })).toThrowError(Error,"Password can't be empty")
                })
        
                it('should fail on blank password', () => {
                    const wrongPassword = ' \t    \n'
                    expect(() => logic.loginUser(email, wrongPassword, () => { }, () => { })).toThrowError(Error,"Password can't be empty")
                })
    
                it('should fail if callback is not a function', () => {
                    const valueCallback = []
                    expect(() => logic.loginUser(email, password, valueCallback, () => { } )).toThrowError(Error,'Internal error')
                })    
    
                it('should fail if callbackError is not a function', () => {
                    const valueCallback = []
                    expect(() => logic.loginUser(email, password, () => { }, valueCallback )).toThrowError(Error,'Internal error')
                })
            })

        })


        describe('retrieve user', () => {
            describe('on an existing user', () => {

                beforeEach(done => logic.registerUser(name, surname, email, password, done, done))
    
                beforeEach(done => logic.loginUser(email, password, 
                    (response) => {
                        const { data: { id }, data: { token } } = response
                        userId = id
                        userToken = token
                        done()
                    },
                    () => {done()}
                ))
    
                it('should succeed on correct user data', done => {
                    logic.retrieveUser(userId, userToken, 
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
                            expect(resUsername).toBe(email)
                            done()
                        },
                        () => {done()}
                    )
                })
                
                it('should fail on a wrong id', done => {
                    const wrongUserId = "123456"
                    logic.retrieveUser(wrongUserId, userToken,
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
                    logic.retrieveUser(userId, wrongUserToken,
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
                    expect(() => logic.retrieveUser(id, token, () => { }, () => { })).toThrowError(Error, 'Internal error')
                })
        
                it('should fail on null id', () => {
                    const id = null
                    const token = '1234567890abcdefghijk'
                    expect(() => logic.retrieveUser(id, token, () => { }, () => { })).toThrowError(Error, 'Internal error')
                })
        
                it('should fail on empty id', () => {
                    const id = ''
                    const token = '1234567890abcdefghijk'
                    expect(() => logic.retrieveUser(id, token, () => { }, () => { })).toThrowError(Error, 'Internal error')
                })
        
                it('should fail on blank id', () => {
                    const id = ' \t    \n'
                    const token = '1234567890abcdefghijk'
                    expect(() => logic.retrieveUser(id, token, () => { }, () => { })).toThrowError(Error, 'Internal error')
                })
        
                it('should fail on undefined token', () => {
                    const id = '123456'
                    const token = undefined
                    expect(() => logic.retrieveUser(id, token, () => { }, () => { })).toThrowError(Error, 'Internal error')
                })
        
                it('should fail on null token', () => {
                    const id = '123456'
                    const token = null
                    expect(() => logic.retrieveUser(id, token, () => { }, () => { })).toThrowError(Error, 'Internal error')
                })
        
                it('should fail on empty token', () => {
                    const id = '123456'
                    const token = ''
                    expect(() => logic.retrieveUser(id, token, () => { }, () => { })).toThrowError(Error, 'Internal error')
                })
        
                it('should fail on blank token', () => {
                    const id = '123456'
                    const token = ' \t    \n'
                    expect(() => logic.retrieveUser(id, token, () => { }, () => { })).toThrowError(Error, 'Internal error')
                })
    
                it('should fail if callback is not a function', () => {
                    const id = '123456'
                    const token = '1234567890abcdefghijk'
                    const valueCallback = []
                    expect(() => logic.retrieveUser(id, token, valueCallback, () => { } )).toThrowError(Error, 'Internal error')
                }) 
    
                it('should fail if callbackError is not a function', () => {
                    const id = '123456'
                    const token = '1234567890abcdefghijk'
                    const valueCallback = []
                    expect(() => logic.retrieveUser(id, token, () => { }, valueCallback )).toThrowError(Error, 'Internal error')
                })         
   
            })

        })

    })

    describe('ducks', () => {
        describe('search ducks', () => {
            it('should succeed on correct query', function (done) {
                logic.searchDucks('yellow',  
                    (ducks) => {
                        expect(ducks).toBeDefined()
                        expect(ducks instanceof Array).toBeTruthy()
                        expect(ducks.length).toBe(13)
            
                        done()
                    }, 
                    () => {done()}
                )
            })

            it('should fail on no results', (done) => {
                const query = '1234dswfhhyt'
                logic.searchDucks(query,
                  () => {done()},
                  (ducksError) => {
                    expect(ducksError).toBeDefined()
                    expect(ducksError.error).toBe(`There are not results for this query: ${query}`);
                    done()
                  }
                )
            })


            describe('on validate parameters', () => {
                it('should fail on undefined query', () => {
                    const query = undefined
                    expect(() => logic.searchDucks(query, () => { }, () => { })).toThrowError(RequirementError, `query is not optional`)
                })
        
                it('should fail on null query', () => {
                    const query = null
                    expect(() => logic.searchDucks(query, () => { }, () => { })).toThrowError(RequirementError, `query is not optional`)
                })
        
                it('should fail on empty query', () => {
                    const query = ''
                    expect(() => logic.searchDucks(query, () => { }, () => { })).toThrowError(ValueError, 'query is empty')
                })
        
                it('should fail on blank query', () => {
                    const query = ' \t    \n'
                    expect(() => logic.searchDucks(query, () => { }, () => { })).toThrowError(ValueError, 'query is empty')
                })
        
                it('should fail if callback is not a function', () => {
                    const query = 'yellow'
                    const valueCallback = []
                    expect(() => logic.searchDucks(query, valueCallback, () => { })).toThrowError(TypeError, `callback ${valueCallback} is not a function`)
                }) 
    
                it('should fail if callbackError is not a function', () => {
                    const query = 'yellow'
                    const valueCallback = []
                    expect(() => logic.searchDucks(query, () => { }, valueCallback )).toThrowError(TypeError, `callbackError ${valueCallback} is not a function`)
                }) 
    
            })

        })

        describe('search duck detail', function () {

            describe('on an existing data for a query', () => {
                let duckId
                beforeEach(done => 
                    logic.searchDucks('yellow', 
                        (ducks) => {
                            duckId = ducks[0].id
                            done()
                        },
                        () => {done()}
                    )
                )
                            
                it('should succeed', (done) => {
                    logic.retrieveDuck(duckId, 
                        (duck) => {
                            expect(duck).toBeDefined()
                            expect(duck.id).toBe(duckId)
                            done()
                        },
                        () => {done()}
                    )          
                })
        
            })        

            it('should fail on no results for a query', (done) => {
                const id = '1234dswfhhyt'
                logic.retrieveDuck(id, 
                    () => {done()},
                    (duckError) => {
                        expect(duckError).toBeDefined()
                        expect(duckError.error).toBe(`duck with id ${id} not found`)
                        done() 
                    }
                )          
            })

            describe('on validate parameters', () => {
                it('should fail on undefined id', () => {
                    const id = undefined
                    expect(() => logic.retrieveDuck(id, () => { }, () => { })).toThrowError(RequirementError, `id is not optional`)
                })
        
                it('should fail on null id', () => {
                    const id = null
                    expect(() => logic.retrieveDuck(id, () => { }, () => { })).toThrowError(RequirementError, `id is not optional`)
                })
        
                it('should fail on empty id', () => {
                    const id = ''
                    expect(() => logic.retrieveDuck(id, () => { }, () => { })).toThrowError(ValueError, 'id is empty')
                })
        
                it('should fail on blank id', () => {
                    const id = ' \t    \n'
                    expect(() => logic.retrieveDuck(id, () => { }, () => { })).toThrowError(ValueError, 'id is empty')
                })
        
                it('should fail if callback is not a function', () => {
                    const id = '123456'
                    const valueCallback = []
                    expect(() => logic.retrieveDuck(id, valueCallback, () => { })).toThrowError(TypeError, `callback ${valueCallback} is not a function`)
                }) 
    
                it('should fail if callbackError is not a function', () => {
                    const id = '123456'
                    const valueCallback = []
                    expect(() => logic.retrieveDuck(id, () => { }, valueCallback )).toThrowError(TypeError, `callbackError ${valueCallback} is not a function`)
                }) 
    
            })
    
        })
    })
})