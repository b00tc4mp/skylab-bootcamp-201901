import userApi from '../user-api/index-create'
import { TimeoutError, ConnectionError, ValueError, RequirementError } from '../../common/errors'


describe('user api', () => {
    const name = 'miluca'    
    let username
    const password = '123'
    let favorites = {}
    let creations= {}

    beforeEach(() => username = `holamundo-${Math.random()}@gmail.com`)

    describe('create', () => {
        debugger
        it ('Should succeed on  correct data', () =>
            userApi.create(username, password, {name, favorites, creations})
                .then(response => {
                    expect(response).toBeDefined()
                    const {status, data} = response
                    expect(status).toBe('OK')
                    expect(data).toBeDefined()
                    
                    const { id } = data
                    expect(typeof id).toBe('string')
                    expect(id.length).toBeGreaterThan(0)
                })
        )

        describe('on already existing user', () => {
            beforeEach(() => userApi.create(username, password, {name, favorites, creations}))

            it('Should fail on retrying to register', () => 
                userApi.create(username, password, {name, favorites, creations})

                    .then(response => {
                        expect(response).toBeDefined()

                        const {status , error: _error} = response
                        expect(status).toBe('KO')
                        expect(_error).toBe(`user with username \"${username}\" already exists`)
                    })
            )
            it('Should fail on undefined username', () => {
                const username = undefined
               
                expect(() => userApi.create(username, password, {name, favorites, creations})).toThrowError(RequirementError, `username is not optional`)
            })
            it('Should fail on null username', () => {
                const username = null
                expect(() => userApi.create(username, password, {name, favorites, creations})).toThrowError(RequirementError, `username is not optional`)
            })
            it('Should fail on empty username', () => {
                const username = ''
                expect(() => userApi.create(username, password, {name, favorites, creations})).toThrowError(ValueError, `username is empty`)
            })
            it('Should fail on blank username', () => {
                const username = '\r   \n'
                expect(() => userApi.create(username, password, {name, favorites, creations})).toThrowError(ValueError, `username is empty`)
            })

            it('Should fail on undefined password', () => {
                const password = undefined
                expect(() => userApi.create(username, password, {name, favorites, creations})).toThrowError(RequirementError, `password is not optional`)
            })
            it('Should fail on null password', () => {
                const password = null
                expect(() => userApi.create(username, password, {name, favorites, creations})).toThrowError(RequirementError, `password is not optional`)
            })
            it('Should fail on empty password', () => {
                const password = ''
                expect(() => userApi.create(username, password, {name, favorites, creations})).toThrowError(ValueError, `password is empty`)
            })
            it('Should fail on blank password', () => {
                const password = '\r   \n'
                expect(() => userApi.create(username, password, {name, favorites, creations})).toThrowError(ValueError, `password is empty`)
            })


        })
    })
})

