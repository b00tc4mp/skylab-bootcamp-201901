'use strict'

describe('user api', () => {
    const name = 'Lila'
    const surname = 'Petri'
    let username
    const password = '123'

    beforeEach((done) => {
        username = `marialilapetri-${Math.random()}@gmail.com`
        done()
    })

    describe('create', () => {
        it('should succeed on correct user data', done => {
            userApi.create(name, surname, username, password, function (response) {
                expect(response).toBeDefined()

                const { status, data: { id } } = response

                expect(status).toBe('OK')
                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)

                done()
            })
        })

        describe('on already existing user', () => {
            beforeEach(done => userApi.create(name, surname, username, password, done))

            it('should fail on retrying to register', done => {
                userApi.create(name, surname, username, password, function (response) {
                    expect(response).toBeDefined()

                    const { status, error } = response

                    expect(status).toBe('KO')
                    expect(error).toBe(`user with username \"${username}\" already exists`)

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

        // TODO password fail cases
    })

    describe('authenticate', () => {
    const name = 'Lila'
    const surname = 'Petri'
    let username
    const password = '123'

    beforeEach(done =>{
        username = `marialilapetri-${Math.random()}@gmail.com`
        userApi.create(name, surname, username, password, done)
        
    })
        
        it('should succeed on correct user data', done => {         
            userApi.authenticate(username, password, function (response) {
                expect(response).toBeDefined()
                const { status, data: { id, token } } = response
                expect(status).toBe('OK')
                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)
                expect(typeof token).toBe('string')
                expect(token.length).toBeGreaterThan(0)


                done()
            })
        })
        describe('on a authenticated user', ()=>{
            let idFirts
            let tokenFirts
            beforeEach(done=>{  
                userApi.authenticate(username, password, function (response) {
                    expect(response).toBeDefined()
                    //const { status, data: { id, token } } = response
                    expect(status).toBe('OK')
                    idFirts=response.data.id
                    tokenFirts=response.data.token
                    done()
                })
            })

            it('should retrieve a new token and keep id every time the user is authenticated', done => {
               
                userApi.authenticate(username, password, function (response) {
                    expect(response).toBeDefined()
                    const { status, data: { id, token } } = response
                    expect(status).toBe('OK')
                    expect(typeof id).toBe('string')
                    expect(id.length).toBeGreaterThan(0)
                    expect(typeof token).toBe('string')
                    expect(token.length).toBeGreaterThan(0)
                    expect(id).toBe(idFirts)
                    expect(token).not.toBe(tokenFirts)

                    done()
                })
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

    describe('update', () => {
        
        // blah blah blah
    })
})
