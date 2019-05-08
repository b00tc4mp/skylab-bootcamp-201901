import userApi from '.'
import { TimeoutError, ConnectionError, ValueError, RequirementError } from '../../common/errors'
import { isTSAnyKeyword } from '@babel/types';

describe('user api', ()=>{
    const name = 'weather'
    const surname = 'itumes'
    let username
    const password = '123'
    let preferences =[]
    const city = 'barcelona'
    const app='wtunes'
    beforeEach(() => username = `weather-${Math.random()}@gmail.com`)
    describe('create user', ()=>{

        it('should succeed on correct user data', ()=> 
            userApi.create(username, password, { name, surname,  preferences, city, app})
                .then(response => {
                    expect(response).toBeDefined()

                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    const { id } = data
                    expect(typeof id).toBe('string')
                    expect(id.length).toBeGreaterThan(0)
                })
        )
        describe('on already existing user', () => {
            beforeEach(() => userApi.create(username, password, { name, surname }))

            it('should fail on retrying to register', () =>
                userApi.create(username, password, { name, surname })
                    .then(response => {
                        expect(response).toBeDefined()

                        const { status, error: _error } = response

                        expect(status).toBe('KO')
                        expect(_error).toBe(`user with username \"${username}\" already exists`)
                    })
            )
        })

        it('should fail on undefined username', () => {
            const username = undefined

            expect(() => userApi.create(username, password, { name, surname })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on null username', () => {
            const username = null

            expect(() => userApi.create(username, password, { name, surname })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on empty username', () => {
            const username = ''

            expect(() => userApi.create(username, password, { name, surname })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on blank username', () => {
            const username = ' \t    \n'

            expect(() => userApi.create(username, password, { name, surname })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on undefined password', () => {
            const password = undefined

            expect(() => userApi.create(username, password, { name, surname })).toThrowError(RequirementError, `password is not optional`)
        })

        it('should fail on null password', () => {
            const password = null

            expect(() => userApi.create(username, password, { name, surname })).toThrowError(RequirementError, `password is not optional`)
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => userApi.create(username, password, { name, surname })).toThrowError(ValueError, 'password is empty')
        })

        it('should fail on blank password', () => {
            const password = ' \t    \n'

            expect(() => userApi.create(username, password, { name, surname })).toThrowError(ValueError, 'password is empty')
        })
        
    })
    describe('authenticate', () => {
        let _id

        beforeEach(() =>
            userApi.create(username, password, { name, surname })
                .then(response => _id = response.data.id)
        )

            it('should succeed on correct user credential', () =>
                userApi.authenticate(username, password)
                    .then(response => {
                        expect(response).toBeDefined()
    
                        const { status, data } = response
    
                        expect(status).toBe('OK')
                        expect(data).toBeDefined()
    
                        const { id, token } = data
    
                        expect(typeof id).toBe('string')
                        expect(id.length).toBeGreaterThan(0)
                        expect(id).toBe(_id)
    
                        expect(typeof token).toBe('string')
                        expect(token.length).toBeGreaterThan(0)
    
                        const [, payloadB64,] = token.split('.')
                        const payloadJson = atob(payloadB64)
                        const payload = JSON.parse(payloadJson)
    
                        expect(payload.id).toBe(id)
                    })
            )
    
            it('should fail on non-existing user', () =>
                userApi.authenticate(username = 'unexisting-user@mail.com', password)
                    .then(response => {
                        expect(response).toBeDefined()
    
                        const { status, error: _error } = response
    
                        expect(status).toBe('KO')
                        expect(_error).toBe(`user with username \"${username}\" does not exist`)
                    })
            )
            it('should fail on undefined username', () => {
                const username = undefined
    
                expect(() => userApi.authenticate(username, password)).toThrowError(RequirementError, `username is not optional`)
            })
    
            it('should fail on null username', () => {
                const username = null
    
                expect(() => userApi.authenticate(username, password)).toThrowError(RequirementError, `username is not optional`)
            })
    
            it('should fail on empty username', () => {
                const username = ''
    
                expect(() => userApi.authenticate(username, password)).toThrowError(ValueError, 'username is empty')
            })
    
            it('should fail on blank username', () => {
                const username = ' \t    \n'
    
                expect(() => userApi.authenticate(username, password)).toThrowError(ValueError, 'username is empty')
            })
            
            it('should fail on incorrect password', () =>
            
                userApi.authenticate(username , '999')
                    .then(response => {
                        expect(response).toBeDefined()
    
                        const { status, error: _error } = response
    
                        expect(status).toBe('KO')
                        expect(_error).toBe(`username and/or password wrong`)
                    })
            )
            it('should fail on undefined password', () => {
                const password = undefined
    
                expect(() => userApi.authenticate(username, password)).toThrowError(RequirementError, `password is not optional`)
            })
    
            it('should fail on null password', () => {
                const password = null
    
                expect(() => userApi.authenticate(username, password)).toThrowError(RequirementError, `password is not optional`)
            })
    
            it('should fail on empty password', () => {
                const password = ''
    
                expect(() => userApi.authenticate(username, password)).toThrowError(ValueError, 'password is empty')
            })
    
            it('should fail on blank username', () => {
                const password = ' \t    \n'
    
                expect(() => userApi.authenticate(username, password)).toThrowError(ValueError, 'password is empty')
            })
    
    })
    describe('retrieve', () => {
        let _id, token

        beforeEach(() =>
            userApi.create(username, password, { name, surname,  preferences, city, app})
                .then(response => {
                    _id = response.data.id

                    return userApi.authenticate(username, password)
                })
                .then(response => token = response.data.token)
        )

        it('should succeed on correct user id and token', () =>
            userApi.retrieve(_id, token)
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    expect(data.id).toBe(_id)
                    expect(data.name).toBe(name)
                    expect(data.surname).toBe(surname)
                    expect(data.username).toBe(username)
                    expect(data.preferences).toBeDefined()
                    expect(data.city).toBe(city)
                    expect(data.app).toBe(app)
                    expect(data.password).toBeUndefined()
                })
        )

        it('should fail on incorrect user id', () => {
            const wrongId = '5cb9998f2e59ee0009eac02c'

            return userApi.retrieve(wrongId, token)
                .then(response => {
                    const { status, error: _error } = response

                    expect(status).toBe('KO')
                    expect(_error).toBe(`token id \"${_id}\" does not match user \"${wrongId}\"`)
                })
        })
        it('should fail on incorrect user toke', () => {
            const wrongToken = '123'

            return userApi.retrieve(_id, wrongToken)
                .then(response => {
                    const { status, error: _error } = response

                    expect(status).toBe('KO')
                    expect(_error).toBe(`invalid token`)
                })
        })
    })
    describe('update', () => {
        let _id, token, _data

        beforeEach(() => {
            _data = { preferences: [{Snow:['Classical','Alternative','Pop']}, {Rain :['Rock', 'Electronic']} ] }

            return userApi.create(username, password,  { name, surname,  preferences, city, app} )
                .then(response => {
                    _id = response.data.id

                    return userApi.authenticate(username, password)
                })
                .then(response => token = response.data.token)
        })

        it('should succeed on correct data', () =>
            userApi.update(_id, token, _data)
                .then(response => {
                    const { status, data } = response
                    
                    expect(status).toBe('OK')
                    expect(data).toBeUndefined()
                })
                .then(() => userApi.retrieve(_id, token))
                .then(response => {
                    const { status, data } = response
                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    expect(data.id).toBe(_id)
                    expect(data.name).toBe(name)
                    expect(data.surname).toBe(surname)
                    expect(data.username).toBe(username)
                    expect(data.password).toBeUndefined()
                    expect(data.preferences).toEqual(_data.preferences)
                    const { preferences }=response.data
                    expect(preferences[0]).toEqual(_data.preferences[0])
                    expect(preferences[1]).toEqual(_data.preferences[1])
                })
        )

        it('should succeed on correct data re-updating', () =>
            userApi.update(_id, token, _data)
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeUndefined()
                })
                .then(() => {
                    _data.preferences[0]={Snow:['Alternative']}
                    _data.preferences[2]={Fog:['Pop']} 

                    return userApi.update(_id, token, _data)
                })
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeUndefined()
                })
                .then(() => userApi.retrieve(_id, token))
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    expect(data.id).toBe(_id)
                    expect(data.name).toBe(name)
                    expect(data.surname).toBe(surname)
                    expect(data.username).toBe(username)
                    expect(data.password).toBeUndefined()
                    const {preferences}=response.data
                    expect(preferences[0]).toEqual(_data.preferences[0])
                    expect(preferences[1]).toEqual(_data.preferences[1])
                    expect(preferences[2]).toEqual(_data.preferences[2])
                   
                })
        )
        it('should fail on incorrect user id', () => {
            const wrongId = '5cb9998f2e59ee0009eac02c'

            return userApi.update(wrongId, token, _data)
                .then(response => {
                    const { status, error: _error } = response

                    expect(status).toBe('KO')
                    expect(_error).toBe(`token id \"${_id}\" does not match user \"${wrongId}\"`)
                })
        })
        it('should fail on incorrect user toke', () => {
            const wrongToken = '123'

            return userApi.update(_id, wrongToken, _data)
                .then(response => {
                    const { status, error: _error } = response

                    expect(status).toBe('KO')
                    expect(_error).toBe(`invalid token`)
                })
        })
    })

})