'use strict'

describe('user api', () => {
    const name = 'user'
    const surname = 'surname'
    let username
    const password = '123'

    beforeEach(() => username = `user-${Math.random()}@mail.com`)

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
                    expect(response).toBeDefined();

                    const { status, error } = response;

                    expect(status).toBe('KO');
                    expect(error).toBe(`user with username "${username}" already exists`);

                    done();
                })
            })
        })

        // Name
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

        //  Surname
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

        // Username
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

        // Password
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
    })

    describe('authenticate', () => {
        beforeEach(done => userApi.create(name, surname, username, password, done))
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

        // Username
        it('should fail on undefined username', () => {
            const username = undefined
            const password = '123'

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on null username', () => {
            const username = null
            const password = '123'

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on empty username', () => {
            const username = ''
            const password = '123'

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on blank username', () => {
            const username = ' \t    \n'
            const password = '123'

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        // Password
        it('should fail on undefined password', () => {
            const username = 'user@mail.com'
            const password = undefined

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(RequirementError, `password is not optional`)
        })

        it('should fail on null password', () => {
            const username = 'user@mail.com'
            const password = null

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(RequirementError, `password is not optional`)
        })

        it('should fail on empty password', () => {
            const username = 'user@mail.com'
            const password = ''

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(ValueError, 'password is empty')
        })

        it('should fail on blank password', () => {
            const username = 'user@mail.com'
            const password = ' \t    \n'

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(ValueError, 'password is empty')
        })
    })

    describe('retrieve', () => {
        beforeEach(done => userApi.create(name, surname, username, password, done))

        it('should retrieve entire user data', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { id, token } } = response

                userApi.retrieve(id, token, function(response) {
                    expect(response).toBeDefined()

                    const { status, data: { name, surname, username, id } } = response

                    expect(status).toBe('OK')

                    expect(typeof name).toBe('string')
                    expect(name.length).toBeGreaterThan(0)

                    expect(typeof surname).toBe('string')
                    expect(surname.length).toBeGreaterThan(0)

                    expect(typeof username).toBe('string')
                    expect(username.length).toBeGreaterThan(0)

                    expect(typeof id).toBe('string')
                    expect(id.length).toBeGreaterThan(0)

                    done()
                })
            })
        })

        // Id
        it('should fail on undefined id', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { token } } = response
                const id = undefined

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(RequirementError, `id is not optional`)

                done()
            })
        })

        it('should fail on null id', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { token } } = response
                const id = null

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(RequirementError, `id is not optional`)

                done()
            })
        })

        it('should fail on empty id', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { token } } = response
                const id = ''

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(ValueError, `id is empty`)

                done()
            })
        })

        it('should fail on blank id', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { token } } = response
                const id = ' \t    \n'

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(ValueError, `id is empty`)

                done()
            })
        })

        // Token
        it('should fail on undefined token', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { id } } = response
                const token = undefined

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(RequirementError, `token is not optional`)

                done()
            })
        })

        it('should fail on null token', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { id } } = response
                const token = null

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(RequirementError, `token is not optional`)

                done()
            })
        })

        it('should fail on empty token', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { id } } = response
                const token = ''

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(ValueError, `token is empty`)

                done()
            })
        })

        it('should fail on blank token', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { id } } = response
                const token = ' \t    \n'

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(ValueError, `token is empty`)

                done()
            })
        })
    })

    describe('delete', () => {
        beforeEach(done => userApi.create(name, surname, username, password, done))

        it('should delete entire user data', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { id, token } } = response

                userApi.delete(username, password, id, token, function(response) {
                    expect(response).toBeDefined()

                    const { status } = response

                    expect(status).toBe('OK')

                    done()
                })
            })
        })
/*
        // Id
        it('should fail on undefined id', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { token } } = response
                const id = undefined

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(RequirementError, `id is not optional`)

                done()
            })
        })

        it('should fail on null id', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { token } } = response
                const id = null

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(RequirementError, `id is not optional`)

                done()
            })
        })

        it('should fail on empty id', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { token } } = response
                const id = ''

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(ValueError, `id is empty`)

                done()
            })
        })

        it('should fail on blank id', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { token } } = response
                const id = ' \t    \n'

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(ValueError, `id is empty`)

                done()
            })
        })

        // Token
        it('should fail on undefined token', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { id } } = response
                const token = undefined

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(RequirementError, `token is not optional`)

                done()
            })
        })

        it('should fail on null token', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { id } } = response
                const token = null

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(RequirementError, `token is not optional`)

                done()
            })
        })

        it('should fail on empty token', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { id } } = response
                const token = ''

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(ValueError, `token is empty`)

                done()
            })
        })

        it('should fail on blank token', done => {
            userApi.authenticate(username, password, function (response) {
                const { data: { id } } = response
                const token = ' \t    \n'

                expect(() => userApi.retrieve(id, token, () => { })).toThrowError(ValueError, `token is empty`)

                done()
            })
        })*/
    })
})
