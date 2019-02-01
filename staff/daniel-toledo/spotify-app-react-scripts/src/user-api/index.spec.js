'use strict'

import userApi from '.'

describe('user api', () => {
    
    // const usernameExists = 'danieltoledo'
    // const passwordExists = "123"
    
    // const unexistingUsername = 'QUALSEVOL COSA'
    
    describe('register', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}@mail.com`
        const password = '123'

        it('should succeed on correct data', () =>
            userApi.register(name, surname, username, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(name, surname, username, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )
    })

    describe('login', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}@mail.com`
        const password = '123'

        let _id

        beforeEach(()=>{
            return userApi.register(name, surname, username, password)
            .then (id => _id=id)
        })

        it('should succeed on correct data', () =>
            userApi.login(username, password)
                .then(({id, token}) => {
                    expect(id).toBe(_id)
                    expect(token).toBeDefined()
                })
        )

        // it('should fail on not existing user', () =>
        //     userApi.login(unexistingUsername, password)
        //         .then(() => {
        //             throw Error('should not have passed by here')
        //         })
        //         .catch(error => {
        //             expect(error).toBeDefined()
        //             expect(error.message).toBe(`user with username \"${unexistingUsername}\" does not exist`)
        //         })
        // )
    })

    false && describe('retrieve', () => {
        it('should succed with right data', () =>
            userApi.login(username, password)
                .then((data) => {
                    return userApi.retrieve(data.id, data.token)
                        .then(user => {
                            expect(user.username).toBeDefined()
                            expect(user.id).toBe(data.id)
                        })
                        .catch(error => expect(error).toBeUndefined())
                })
        )

        it('should fail on unexpected Token', () =>
            userApi.login(username, password)
                .then((data) => {
                    return userApi.retrieve(data.id, 'failtoken')
                        .then(() => {
                            throw Error('should not have passed by here')
                        })
                        .catch(error => {
                            expect(error).toBeDefined()
                            expect(error.message).toBe(`invalid token`)
                        })
                })
        )
    })

    false && describe('update', () => {
        it('should succeed adding one item', () =>
            userApi.login('maracuya', 'p')
                .then(data => { userApi.update(data.id, data.token, { alex: true })
                        .then( () => userApi.retrieve(data.id, data.token))
                        .then (data => {
                            expect(data.username).toBeDefined()
                            expect(data.id).toBe(data.id)
                            expect(data.alex).toBe(true)
                            
                        })
                        .catch(error => expect(error).toBeUndefined())
                        
                })
        )

        it('should succeed adding more than one item data', () =>
            userApi.login('maracuya', 'p')
            .then(data => { userApi.update(data.id, data.token, { favorites: ['a1', 'b2', 'c3'], alex: false})
                    .then( () => userApi.retrieve(data.id, data.token))
                    .then (data => {
                        expect(data.username).toBeDefined()
                        expect(data.id).toBe(data.id)
                        expect(data.alex).toBe(false)
                        expect(user.favorites).toBe(['a1', 'b2', 'c3'])
                        
                    })
                    .catch(error => expect(error).toBeUndefined())
                    
            })

            // userApi.login('maracuya', 'p')
            //     .then((data) => {
            //         return userApi.update(data.id, data.token, { favorites: ['a1', 'b2', 'c3'], alex: false })
            //             .then(user => {
            //                 expect(user.username).toBeDefined()
            //                 expect(user.id).toBe(data.id)
            //                 expect(user.favorites).toBe(['a1', 'b2', 'c3'])
            //                 expect(user.alex).toBe(false)
            //             })
            //             .catch(error => expect(error).toBeUndefined())
            //     })
        )

    })

    // describe('remove', () => {
    //     it('should remove the user', () =>
    //         userApi.register('dani', 'toledo', 'daniel@mail.com', '123')
    //             .then(userApi.login('daniel@mail.com', '123'))
    //             // .then(data => userApi.remove(data.id, data.token, 'daniel@mail.com', '123'))
    //             // .then(response => expect(response).toBe(true))
    //             .catch(error => expect(error).toBeUndefined())
    //     )

    // })
})

