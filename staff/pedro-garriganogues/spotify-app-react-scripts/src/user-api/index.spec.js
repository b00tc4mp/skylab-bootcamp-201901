'use strict'

import userApi from '.'

describe('user api', () => {
    const name = 'Pedro'
    const surname = 'Vidal'
    const username = `pedro-${Math.random()}@mail.com`
    const password = '123'

    describe('register', () => {
        it('should succeed on correct data', () =>
            userApi.register(name, surname, username, password)
                .then(id => expect(id).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
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
    }),


        describe('authentification', () => {
            it('should return token + id', () =>
                userApi.authentification(username, password)
                    .then(({ id, token }) => {
                        expect(id).toBeDefined()
                        expect(token).toBeDefined()
                    })
                    .catch((error) => {
                        if (error) throw Error('should not enter here')
                    })
            )

            it('should not accept a wrong password', () => {
                userApi.register(name, surname, username, password)
                    .then(() => userApi.authentification(username, 777))
                    .then(() => {
                        throw Error('Should not get here')
                    })
                    .catch((error) => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe(`Wrong password`)
                    })

            })
        }),


        describe('retrieve', () => {
            it('should return token + id', () =>
                userApi.authentification(username, password)
                    .then(() => userApi.retrieve(token, id))
                    .then(({ id, token }) => {
                        expect(id).toBeDefined()
                        expect(token).toBeDefined()
                    })
                    .catch((error) => {
                        if (error) throw Error('should not enter here')
                    })
            )

        })



    // describe('delete', () => {
    //     it('should return status "OK"', () =>
    //         userApi.delete(name, surname, username, password)
    //             .then(() => {
    //                 expect(response).toBeTruthy()
    //             })
    //             .catch((error) => {
    //                 if (error) throw Error('should not enter here')
    //             })
    //     )

    // })




})






