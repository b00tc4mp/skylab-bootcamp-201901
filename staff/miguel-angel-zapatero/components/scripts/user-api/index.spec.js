'use strict'

describe('user api', () => {
    const name = 'Peter'
    const surname = 'Seller'
    let username
    const password = '123'

    beforeEach(() => username = `miguelangel-${Math.random()}@gmail.com`)

    describe('when api url fails', () => {
        let url

        beforeEach(()=> {
            url = userApi.__url__
            userApi.__url__ = 'https://this-is-fake-url'
        })
        it('should fail on failing api url', done => {
            userApi.create(name, surname, username, password, function(error, response){
                expect(error).toBeUndefined()

                done()
            })
        })
        afterEach(() => {
            userApi.__url__ = url
        })
    })

    describe('when server responds to late', () => {
        beforeEach(() => userApi.__timeout__ = 10)

        it('should fail on too long wait', done => {
            userApi.create()
            done()
        })
    })

    describe('create', () => {
        it('should succeed on correct user data', done => {
            userApi.create(name, surname, username, password, function(error, response){
                expect(error).toBeUndefined()
                expect(response).toBeDefined()

                const {status, data } = response
                expect(status).toBe('OK')
                expect(data).toBeDefined()

                const { id } = data
                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)
                
                done()
            });
        });

        describe('on already existing user', () => {
            beforeEach(done => userApi.create(name, surname, username, password, done))

            it('should fail on retrying to register', done => {
                userApi.create(name, surname, username, password, function(error,response) {
                    expect(response).toBeDefined()

                    const { status, error: _error } = response

                    expect(status).toBe('KO')
                    expect(_error).toBe(`user with username \"${username}\" already exists`)

                    done()
                })
            })
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `name is not optional`)
        })

        it('should fail on null name', () => {
            const name = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `name is not optional`)
        })

        it('should fail on empty name', () => {
            const name = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'name is empty')
        })

        it('should fail on blank name', () => {
            const name = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'name is empty')
        })

        it('should fail on undefined surname', () => {
            const surname = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
        })

        it('should fail on null surname', () => {
            const surname = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
        })

        it('should fail on empty surname', () => {
            const surname = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'surname is empty')
        })

        it('should fail on blank surname', () => {
            const surname = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'surname is empty')
        })

        it('should fail on undefined username', () => {
            const username = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on null username', () => {
            const username = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on empty username', () => {
            const username = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on blank username', () => {
            const username = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on undefined password', () => {
            const password = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `password is not optional`)
        })

        it('should fail on null password', () => {
            const password = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `password is not optional`)
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'password is empty')
        })

        it('should fail on blank password', () => {
            const password = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'password is empty')
        })

    });

    describe('authenticate', () => {
        let _id
        beforeEach(done => userApi.create(name, surname, username, password, function(error, response) {
            _id = response.data.id
            done()
        }))

        it('should succed on correct user credential', done => {
            userApi.authenticate(username, password, function(error, response){
                expect(response).toBeDefined()

                //mejor destructurar de esta menera porque si la respuesta es 'KO' no continuaria.
                const {status, data } = response
                expect(status).toBe('OK')
                expect(data).toBeDefined()

                const { id, token } = data
                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)
                expect(id).toBe(_id)
                expect(typeof token).toBe('string')
                expect(token.length).toBeGreaterThan(0)
                
                const [,playloadB64,] = token.split('.')
                const playloadJson = atob(playloadB64)
                //TODO

                done()
            })
        })

        it('should fail on non-existing username', done => {
            userApi.authenticate(username = 'non-existing-user@gmail.com', password, function(error, response){
                expect(response).toBeDefined()

                const {status, error: _error} = response
                expect(status).toBe('KO')
                expect(_error).toBe(`user with username \"${username}\" does not exist`)
                done()
            })
        })

        it('should fail on undefined username', () => {
            const username = undefined

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on null username', () => {
            const username = null

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on empty username', () => {
            const username = ''

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on blank username', () => {
            const username = ' \t    \n'

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on undefined password', () => {
            const password = undefined

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(RequirementError, `password is not optional`)
        })

        it('should fail on null password', () => {
            const password = null

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(RequirementError, `password is not optional`)
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(ValueError, 'password is empty')
        })

        it('should fail on blank password', () => {
            const password = ' \t    \n'

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(ValueError, 'password is empty')
        })
    })

    describe('retrieve', () => {
        let _id 
        let token

        beforeEach(done => {
            userApi.create(name, surname, username, password, () => {
                userApi.authenticate(username, password, response => {
                    _id = response.data.id
                    token = response.data.token
                    done()
                })
            })
        })

        it('should succed on correct id and token', done => {
            userApi.retrieve(_id, token, function(error, response){
                expect(error).toBeUndefined()
                expect(response).toBeDefined()
                
                const { status, data: { name:_name, surname:_surname, username:_username, id: _id} } = response
                expect(status).toBe('OK')
                expect(typeof _name).toBe('string')
                expect(_name.length).toBeGreaterThan(0)
                expect(typeof _surname).toBe('string')
                expect(_surname.length).toBeGreaterThan(0)
                expect(typeof _username).toBe('string')
                expect(_username.length).toBeGreaterThan(0)
                expect(username.password).toBeUndefined()
                expect(typeof _id).toBe('string')
                expect(_id.length).toBeGreaterThan(0)
                expect(_id).toBe(userId)
                
                done()
            })
        })

        it('should fail on incorrect id', done => {
            const wrongId = 'wrongId'
            userApi.retrieve(wrongId, token, function(error, response){
                expect(error).toBeUndefined()
                expect(response).toBeDefined()
                
                const {status, error: _error} = response
                expect(status).toBe('KO')
                expect(_error).toBe(`token id \"${wrongId}\" ............`)
                


                done()
            })
        })
    })

    describe('update', () => {
        let userId
        let userToken
        let name
        let _name = 'Julian'
        
        beforeEach(done => {
            userApi.create(name, surname, username, password, () => {
                userApi.authenticate(username, password, response => {
                    userId = response.data.id
                    userToken = response.data.token
                    userApi.retrieve(userId, userToken, response => {
                        name = response.data.name
                        _name = 'Julian'

                        done()
                    })
                })
            })
        })

        !true && it('should succed on correct id and token', done => {
            userApi.update(userId, _name, userToken, response => {
                expect(response).toBeDefined()
                
                expect(response.status).toBe('OK')
                
                done()
            })
        })
    })
})