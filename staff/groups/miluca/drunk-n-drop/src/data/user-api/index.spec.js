import userApi from '../user-api/index'
import { ValueError, RequirementError } from '../../common/errors'

describe('user api', () => {
    const name = 'miluca'    
    let username
    const password = '123'
    let favorites = {}
    let creations= {}

    beforeEach(() => username = `holamundo-${Math.random()}@gmail.com`)

    describe('create', () => {
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

    describe("authenticate", () => {
        let _id
        beforeEach(()=>
        userApi.create(username,password,{name})
            .then(response => _id = response.data.id)
        )
        it('should succed on correct user credentials',() =>
        
            userApi.authenticate(username,password)
                .then(response => {
                    expect(response).toBeDefined()

                    const { status , data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    const {id , token } = data

                    expect(typeof id).toBe('string')
                    expect(id.length).toBeGreaterThan(0)
                    expect(id).toBe(_id)

                    expect(typeof token).toBe('string')
                    expect(token.length).toBeGreaterThan(0)

                    const [,payloadB64,] = token.split('.')
                    const payloadJson = atob(payloadB64)
                    const payload = JSON.parse(payloadJson) 
                    expect(payload.id).toBe(id)
                })
        )
        it('should fail on non-existing user', () =>
                userApi.authenticate(username = 'testwrong@gmail.com', password)
                .then(response =>{
                        expect(response).toBeDefined()

                        const{ status , error: _error} = response

                        expect(status).toBe('KO')
                        expect(_error).toBe(`user with username \"${username}\" does not exist`)
                })
        )
    })
    describe('retrieve',() =>{
        let _id,token
        beforeEach(() =>
            userApi.create(username, password, { name, favorites, creations })
                .then(response => {
                    _id = response.data.id

                    return userApi.authenticate(username, password)
                })
                .then(response => token = response.data.token)
        )

        it('should succeed on correct id and token', () =>  {
             userApi.retrieve(_id,token)
                .then( response => {
                    const {status, data} = response
                    expect(status).toBe('OK')
                    expect(data).toBeDefined()
                    expect(data.username).toBeDefined()
                    expect(data.password).toBeUndefined()
                })
        })
        it('should fail on incorrect token', ()=>{

            const wrongtoken='wrong-token'

            userApi.retrieve(_id,wrongtoken)
                .then( response => {
                    const {status, error: _error} = response 
                    expect(status).toBe('KO')
                    expect(_error).toBe('invalid token')
                })
        })
        it('should fail on incorrect id', ()=>{

            const wrongId='5cb9998f2e59ee0009eac02c-wrong-id'

            userApi.retrieve(wrongId,token)
                .then( response => {
                    const {status, error: _error} = response
                    expect(status).toBe('KO')
                    expect(_error).toBe(`token id \"${_id}\" does not match user \"${wrongId}\"`)
                })
        })
    })
    describe('update', () => {
        let _id, token, _data


        beforeEach(() => {
            _data = { test: 'hello world' }

            return userApi.create(username, password)
                .then(response => {
                    _id = response.data.id

                    return userApi.authenticate(username, password)
                })
                .then(response => token = response.data.token)

        })

        it('should succed on correct data', () =>
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
                    expect(data.username).toBe(username)

                    expect(data.test).toEqual(_data.test)
                })
        )
        it('should succeed on data re-updating', () =>
            userApi.update(_id, token, _data)
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeUndefined()
        
                })
                .then(() =>{
                    _data.test = 'Hola Mundo'


                    return userApi.update(_id, token, _data)

                })
                .then(response => {
                    const {status , data} = response

                    expect(status).toBe('OK')
                    expect(data).toBeUndefined()
                })
                .then(() => userApi.retrieve(_id , token))
                .then(response =>{
                    const {status , data} = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()
                    expect(data.id).toBe(_id)

                    expect(data.test).toBe(_data.test)
                })

        )
        
    })  
})

