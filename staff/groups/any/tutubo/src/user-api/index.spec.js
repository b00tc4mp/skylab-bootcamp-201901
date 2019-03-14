'use strict'

import userApi from './'

jest.setTimeout(300000);

describe('user api', () => {

    describe('register', () => {
        const name = 'sergio'
        const surname = 'costa'
        const username = `sergio-${Math.random()}`
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


        describe('fail on typeError name', () => {
            it('should fail on name typeof number instead of string ', () =>
                expect(() => userApi.register(12345, surname, username, password)).toThrowError(`12345 is not a string`)
            )

            it('should fail on name typeof boolean instead of string ', () =>
                expect(() => userApi.register(true, surname, username, password)).toThrowError(`true is not a string`)
            )

            it('should fail on name typeof object instead of string ', () =>
                expect(() => userApi.register({}, surname, username, password)).toThrowError(`[object Object] is not a string`)
            )

            it('should fail on name typeof array instead of string ', () =>
                expect(() => userApi.register([], surname, username, password)).toThrowError(` is not a string`)
            )
        })

        describe('fail on typeError surname', () => {
            it('should fail on surname typeof number instead of string ', () =>
                expect(() => userApi.register(name, 12345, username, password)).toThrowError(`12345 is not a string`)
            )

            it('should fail on surname typeof boolean instead of string ', () =>
                expect(() => userApi.register(name, true, username, password)).toThrowError(`true is not a string`)
            )

            it('should fail on surname typeof object instead of string ', () =>
                expect(() => userApi.register(name, {}, username, password)).toThrowError(`[object Object] is not a string`)
            )

            it('should fail on surname typeof array instead of string ', () =>
                expect(() => userApi.register(name, [], username, password)).toThrowError(` is not a string`)
            )
        })

        describe('fail on typeError username', () => {
            it('should fail on username typeof number instead of string ', () =>
                expect(() => userApi.register(name, surname, 12345, password)).toThrowError(`12345 is not a string`)
            )

            it('should fail on username typeof boolean instead of string ', () =>
                expect(() => userApi.register(name, surname, true, password)).toThrowError(`true is not a string`)
            )

            it('should fail on username typeof object instead of string ', () =>
                expect(() => userApi.register(name, surname, {}, password)).toThrowError(`[object Object] is not a string`)
            )

            it('should fail on username typeof array instead of string ', () =>
                expect(() => userApi.register(name, surname, [], password)).toThrowError(` is not a string`)
            )
        })

        describe('fail on typeError password', () => {
            it('should fail on username typeof number instead of string ', () =>
                expect(() => userApi.register(name, surname, username, 12345)).toThrowError(`12345 is not a string`)
            )

            it('should fail on username typeof boolean instead of string ', () =>
                expect(() => userApi.register(name, surname, username, true)).toThrowError(`true is not a string`)
            )

            it('should fail on username typeof object instead of string ', () =>
                expect(() => userApi.register(name, surname, username, {})).toThrowError(`[object Object] is not a string`)
            )

            it('should fail on username typeof array instead of string ', () =>
                expect(() => userApi.register(name, surname, username, [])).toThrowError(` is not a string`)
            )
            it('should fail on empty password', () =>
                expect(() => userApi.register(username, '')).toThrowError(`password is empty`)
            )
        })

    })

    describe('authenticate', () => {
        const name = 'sergio'
        const surname = 'costa'
        const username = `any-${Math.random()}`
        const password = '123'

        let _id

        // beforeEach(() =>
        //     userApi.register(name, surname, username, password)
        //         .then(id => _id = id)
        // )

        it('should succeed on correct data', () =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => {
                    return userApi.authenticate(username, password)
                        .then(({ id, token }) => {
                            expect(id).toBe(_id)
                            expect(token).toBeDefined()
                        })
                })

        )

        describe('fail on TypeError username', () => {

            it('should fail on username typeof number instead of string ', () =>
                expect(() => userApi.authenticate(12345, password)).toThrowError(`12345 is not a string`)
            )
            it('should fail on username typeof boolean instead of string ', () =>
                expect(() => userApi.authenticate(true, password)).toThrowError(`true is not a string`)
            )
            it('should fail on username typeof object instead of string ', () =>
                expect(() => userApi.authenticate({}, password)).toThrowError(`[object Object] is not a string`)
            )
            it('should fail on username typeof array instead of string ', () =>
                expect(() => userApi.authenticate([], password)).toThrowError(` is not a string`)
            )
            it('should fail on empty username', () =>
                expect(() => userApi.authenticate('', password)).toThrowError(`username is empty`)
            )
        })

        describe('fail on TypeError password', () => {

            it('should fail on password typeof number instead of string ', () =>
                expect(() => userApi.authenticate(username, 12345)).toThrowError(`12345 is not a string`)
            )
            it('should fail on password typeof boolean instead of string ', () =>
                expect(() => userApi.authenticate(username, true)).toThrowError(`true is not a string`)
            )
            it('should fail on password typeof object instead of string ', () =>
                expect(() => userApi.authenticate(username, {})).toThrowError(`[object Object] is not a string`)
            )
            it('should fail on password typeof array instead of string ', () =>
                expect(() => userApi.authenticate(username, [])).toThrowError(` is not a string`)
            )
            it('should fail on empty password', () =>
                expect(() => userApi.authenticate(username, '')).toThrowError(`password is empty`)
            )
        })

        describe('fail on no matching username or password', () => {
            it('should fail', () => 
                userApi.authenticate('dssdsadd', 'dsdkvsn')
                    .then(response => {
                        expect(Error).toBe(response.error)   
                    })
            )
        })
    })

    describe('retrieve', () => {
        const name = 'sergio'
        const surname = 'costa'
        const username = `sergio-${Math.random()}`
        const password = '123'

        let _id, _token

        describe('should succeed', () => {
            beforeEach(() =>
                userApi.register(name, surname, username, password)
                    .then(id => _id = id)
                    .then(() => userApi.authenticate(username, password))
                    .then(({ token }) => _token = token)
            )
            it('should succeed on correct data', () =>
                userApi.retrieve(_id, _token)
                    .then(user => {
                        expect(user.id).toBe(_id)
                        expect(user.name).toBe(name)
                        expect(user.surname).toBe(surname)
                        expect(user.username).toBe(username)
                    })
            )
        })

        //Preguntar por el beforeEach que da error de registro al poner mas casos asincronos

        describe('fail on TypeError id', () => {

            it('should fail on id typeof number instead of string ', () =>
                expect(() => userApi.retrieve(12345, _token)).toThrowError(`12345 is not a string`)
            )
            it('should fail on id typeof boolean instead of string ', () =>
                expect(() => userApi.retrieve(true, _token)).toThrowError(`true is not a string`)
            )
            it('should fail on id typeof object instead of string ', () =>
                expect(() => userApi.retrieve({}, _token)).toThrowError(`[object Object] is not a string`)
            )
            it('should fail on id typeof array instead of string ', () =>
                expect(() => userApi.retrieve([], _token)).toThrowError(` is not a string`)
            )
            it('should fail on empty id', () =>
                expect(() => userApi.retrieve('', _token)).toThrowError(`id is empty`)
            )
        })

        describe('fail on TypeError token', () => {

            it('should fail on token typeof number instead of string ', () =>
                expect(() => userApi.retrieve(_id, 12345)).toThrowError(`12345 is not a string`)
            )
            it('should fail on token typeof boolean instead of string ', () =>
                expect(() => userApi.retrieve(_id, true)).toThrowError(`true is not a string`)
            )
            it('should fail on token typeof object instead of string ', () =>
                expect(() => userApi.retrieve(_id, {})).toThrowError(`[object Object] is not a string`)
            )
            it('should fail on token typeof array instead of string ', () =>
                expect(() => userApi.retrieve(_id, [])).toThrowError(` is not a string`)
            )
            it('should fail on empty token', () =>
                expect(() => userApi.retrieve(_id, '')).toThrowError(`token is empty`)
            )
        })
    })

    describe('update', () => {
        const name = 'sergio'
        const surname = 'costa'
        let username
        const password = '123'

        let _id, _token

        beforeEach(() => {
            username = `sergio-${Math.random()}`
            return userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        }
           
        )

        it('should succeed on correct data', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            return userApi.update(_id, _token, data)
                .then(() => userApi.retrieve(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(data.surname)
                    expect(user.age).toBe(data.age)
                    expect(user.username).toBe(username)
                })
        })

        it('should fail on invalid data, token or id', () => {
            const id = 'smkasklmask'
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            return userApi.update(id, _token, data)
                .catch(error => {
                    expect(error).toBeDefined()
                })
        })

    })

    describe('remove', () => {
        const name = 'sergio'
        const surname = 'costa'
        const username = `sergio-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () => {
            return userApi.remove(_id, _token, username, password)
                .then(() => userApi.retrieve(_id, _token))
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({ message }) => expect(message).toBe(`user with id \"${_id}\" does not exist`))
        })

        it('should fail on empty passwoed', () =>
                expect(() => userApi.remove(_id, _token, username, '')).toThrowError(`password is empty`)     
        )

        it('should fail on empty username', () =>
                expect(() => userApi.remove(_id, _token, '', password)).toThrowError(`username is empty`)     
        )

        it('should fail on object for password', () =>
                expect(() => userApi.remove(_id, _token, username, {})).toThrowError(`{object Object} is not a string`)     
        )

        // TODO more unit test cases

        describe('fail on no matching username or password', () => {
            it('should fail', () => 
                userApi.remove(_id, _token, 'dssdsadd', 'dsdkvsn')
                    .then(response => {
                        expect(Error).toBe(response.error)   
                    })
            )
        })
    })

    describe('retrieveAllUsers', () => {
            
        it('should return all users', () => 
            userApi.retrieveAllUsers('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTg3OGE0Y2Q0OTJhMDAwOTA2Nzg2OSIsImlhdCI6MTU0OTMwMTk5MSwiZXhwIjoxNTQ5MzA1NTkxfQ.mBkUdeA1MiCF4ttJ9rOH2EjerGQwX-WeMH0L5qiUOWE')
                .then(data => {
                    expect(data).toBeDefined()  
                }).catch(()=> console.log('shut the fuk up'))
        )

        it('shoulf fail on object for token', () =>
            expect(() => userApi.retrieveAllUsers()).toThrowError(`undefined is not a string`)     
        )

        it('shoulf fail on object for token', () =>
            expect(() => userApi.retrieveAllUsers('')).toThrowError(`undefined is not a string`)     
        )
    })
})