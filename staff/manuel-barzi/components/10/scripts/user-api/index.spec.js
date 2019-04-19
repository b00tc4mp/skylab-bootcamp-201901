'use strict'

describe('user api', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    let username
    const password = '123'

    beforeEach(() => username = `manuelbarzi-${Math.random()}@gmail.com`)

    describe('register', () => {
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
    })

    describe('update', () => {
        // blah blah blah
    })
})