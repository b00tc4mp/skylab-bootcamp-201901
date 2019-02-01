'use strict'

import userApi from '.'

describe('user api', () => {
    const username = `Tachi-${Math.random()}`
    const password = '123'

    describe('register', () => {
        it('should succeed on correct data', () =>
            userApi.register(username, password)
                .then(id => expect(id).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(username, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )

    })

    describe('auth', () => {
        it ('should succed on correct data', ()=>
        userApi.auth(username, password)
            .then(data => {
                expect(data.id).toBeDefined()
                expect(data.token).toBeDefined()
            })
            .catch(error => expect(error).toBeUndefined())
        )

        it('should not return if user is not register' , () => 
        userApi.auth("tachi",password)
            .then(() => {
                throw Error('should not have passed by here')
            })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with username \"tachi\" does not exist`)
            })
        
        )
    })

    describe('retrieve', () => {

        let _token
        let _id

        beforeEach(()=>{
            return userApi.auth(username,password)
                .then(({id,token})=> {
                    console.log(id,token)
                    _token = token
                    _id = id
                    
                })
        })
        it('should retrieve an existing user' , () => {
            return userApi.retrieve(_id,_token)
                .then(data => {
                    expect(data.username).toBeDefined()
                    expect(data.id).toBeDefined()
                    expect(data.id).toEqual(_id)
                })
                .catch(error => expect(error).toBeUndefined())
        })
        it('should fail if the id is not defined' , () => {
                let _idBad = 'hola'
                return userApi.retrieve(_idBad, _token)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error =>{
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`token id "${_id}" does not match user "${_idBad}"`)
                })

        })

    })
    
    

})

