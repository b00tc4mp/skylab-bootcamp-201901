'use strict'

import logic from '.';
import pokemonApi from '../apipokemon';
import userApi from '../user-api'

describe('Logic Testing', () => {
    describe('Testing Register User', () => {
        it('should succeed on registering a userName', () => {
            let email = 'a@a.com'
            let username = `marcuricarlos-${Math.random()}`
            let password = '123'
            let passwordConfirmation = '123'
            return logic.registerUser(email, username, password, passwordConfirmation)
                .then((result) => {
                    expect(result).not.toBeDefined()
                })
                .catch(err => expect(err).not.toBeDefined())
        })

        it('should fail on not string email', () => {
            let email = false
            let username = `marcuricarlos-${Math.random()}`
            let password = '123'
            let passwordConfirmation = '123'
            try {
                logic.registerUser(email, username, password, passwordConfirmation)
            } catch (error) {
                expect(error.message).toBe(email + ' is not a string')
            }
        })

        it('should fail on empty email', () => {
            try {
                let email = ''
                let username = `marcuricarlos-${Math.random()}`
                let password = '123'
                let passwordConfirmation = '123'
                return logic.registerUser(email, username, password, passwordConfirmation)
                    .then((result) => {
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error) {
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on not string username', () => {
            try {
                let email = 'b@b.com'
                let username = []
                let password = '123'
                let passwordConfirmation = '123'
                return logic.registerUser(email, username, password, passwordConfirmation)
                    .then((result) => {
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error) {
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on empty username', () => {
            try {
                let email = 'b@b.com'
                let username = ''
                let password = '123'
                let passwordConfirmation = '123'
                return logic.registerUser(email, username, password, passwordConfirmation)
                    .then((result) => {
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error) {
                expect(error.message).toBeDefined()
            }
        })


        it('should fail on not string password', () => {
            try {
                let email = 'b@b.com'
                let username = `marcuricarlos-${Math.random()}`
                let password = false
                let passwordConfirmation = '123'
                return logic.registerUser(email, username, password, passwordConfirmation)
                    .then((result) => {
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error) {
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on empty password', () => {
            try {
                let email = 'b@b.com'
                let username = `marcuricarlos-${Math.random()}`
                let password = ''
                let passwordConfirmation = '123'
                return logic.registerUser(email, username, password, passwordConfirmation)
                    .then((result) => {
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error) {
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on not String passwordConfirmation', () => {
            try {
                let email = 'b@b.com'
                let username = `marcuricarlos-${Math.random()}`
                let password = '123'
                let passwordConfirmation = false
                return logic.registerUser(email, username, password, passwordConfirmation)
                    .then((result) => {
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error) {
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on empty passwordConfirmation', () => {
            try {
                let email = 'b@b.com'
                let username = `marcuricarlos-${Math.random()}`
                let password = '123'
                let passwordConfirmation = ''
                return logic.registerUser(email, username, password, passwordConfirmation)
                    .then((result) => {
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error) {
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on not matching passwords', () => {
            try {
                let email = 'b@b.com'
                let username = `marcuricarlos-${Math.random()}`
                let password = '123'
                let passwordConfirmation = '12345'
                return logic.registerUser(email, username, password, passwordConfirmation)
                    .then((result) => {
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error) {
                expect(error.message).toBeDefined()
            }
        })
    })

    describe('Testing Login User', () => {
        it('should succeed on Login User', () => {
            const email = 'Manuel@mail.com'
            const username = `manuelbarzi-${Math.random()}`
            const password = '123'
            const passwordConf = '123'
            return logic.registerUser(email, username, password, passwordConf)
                .then(() => {
                    logic.loginUser(username, password)
                        .then(({ id, token, user }) => {
                            expect(id).toBeDefined()
                            expect(token).toBeDefined()
                            expect(user).toBe(username)
                        })
                })
        })

        it('should fail on empty username', () => {
            try {
                let username = ''
                let password = '123'
                logic.loginUser(username, password)
            } catch (error) {
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on non string username', () => {
            try {
                let username = false
                let password = '123'
                logic.loginUser(username, password)
            } catch (error) {
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on empty password', () => {
            try {
                let username = 'carloscalvo'
                let password = ''
                logic.loginUser(username, password)
            } catch (error) {
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on non string password', () => {
            try {
                let username = 'carloscalvo'
                let password = true
                logic.loginUser(username, password)
            } catch (error) {
                expect(error.message).toBeDefined()
            }
        })

    })

    describe('Testing retrievePokemon', () => {
        it('should succeed on searchingpokemonByName', () => {
            let query = 'pikachu';
            return logic.retrievePokemon(query)
                .then((result) => {
                    expect(result.name == query).toBe(true)
                    expect(result.types[0].type.name).toBe('electric')
                })
                .catch(error => expect(error).toBeUndefined())
        })

        it('should fail on retrieving data from a randomname', () => {
            let query = 'modafoca2345678';
            return logic.retrievePokemon(query)
                .then((result) => {
                })
                .catch(error => expect(error).toBeDefined())
        })

        it('It should fail on a wrong query parameter - boolean', () => {
            expect(() => logic.retrievePokemon(false).toThrowError())
        })
        it('It should fail on a wrong query parameter - object', () => {
            const query = {}
            expect(() => logic.retrievePokemon(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - number', () => {
            const query = 12
            expect(() => logic.retrievePokemon(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - Array', () => {
            const query = [12, 22]
            expect(() => logic.retrievePokemon(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - Undefined', () => {
            const query = undefined
            expect(() => logic.retrievePokemon(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - null', () => {
            const query = null
            expect(() => logic.retrievePokemon(query).toThrowError())
        })
    })


    describe('Testing retrieveAllpokemon', () => {
        it('should succeed on searchingAllPokemons', () => {
            return logic.retrieveAllPokemons()
                .then(() => { })
                .catch(error => expect(error).toBeUndefined())
        })

        it('should fail on toomany args', () => {
            let query = 'abc'
            expect(() => logic.retrieveAllPokemons(query).toThrowError())
        })
    })


    describe('Testing Toggle Favorites', () => {


        const email = 'Manuel@mail.com'
        const password = '123'
        const passwordConfirmation = '123'
        let _id, _token, username

        beforeAll(() => {
            username = `marcuricarlos-${Math.random()}`

            return userApi.register(email, username, password, passwordConfirmation)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)

        })

        it('It should fail on a wrong id parameter - boolean', () => {
            const data = 'Bulbasur'
            expect(() => logic.toggleFavorite(true, _token, data).toThrowError())
        })


        it('It should fail on a wrong id parameter - undefined', () => {
            const data = 'Bulbasur'
            expect(() => logic.toggleFavorite(undefined, _token, data).toThrowError())
        })



        it('It should fail on a wrong id parameter - null', () => {
            const data = 'Bulbasur'
            expect(() => logic.toggleFavorite(null, _token, data).toThrowError())
        })

        it('It should fail on a wrong token parameter - boolean', () => {
            const data = 'Bulbasur'
            expect(() => logic.toggleFavorite(_id, true, data).toThrowError())
        })

        it('It should fail on a wrong token parameter - undefined', () => {
            const data = 'Bulbasur'
            expect(() => logic.toggleFavorite(_id, undefined, data).toThrowError())
        })



        it('It should fail on a wrong token parameter - null', () => {
            const data = 'Bulbasur'
            expect(() => logic.toggleFavorite(_id, null, data).toThrowError())
        })

        it('It should fail on a wrong token parameter - undefined', () => {
            const data = 'Bulbasur'
            expect(() => logic.toggleFavorite(_id, undefined, data).toThrowError())
        })

        it('It should fail on a wrong data parameter - boolean', () => {
            expect(() => logic.toggleFavorite(_id, _token, true).toThrowError())
        })

        it('It should fail on a wrong data parameter - null', () => {

            expect(() => logic.toggleFavorite(_id, _token, null).toThrowError())
        })

        it('It should fail on a wrong data parameter - undefined', () => {

            expect(() => logic.toggleFavorite(_id, _token, undefined).toThrowError())
        })


        it('should succeed on adding a favorite', () => {
            const data = 'Blastoise'
            return logic.toggleFavorite(_id, _token, data)
                .then(res => expect(res).toBe(true))
        })

        it('should succeed on adding a favorite on a existing array of favorites -charmander', () => {


            const data = 'Charmander'
            return logic.toggleFavorite(_id, _token, data)
                .then(res => expect(res).toBe(true))

        })

        it('should succeed on deleting from the array of favorites-pikachu', () => {
            const data = 'Charmander'
            return logic.toggleFavorite(_id, _token, data)
                .then(res => expect(res).toBe(true))
                .catch(error => expect(error).toBeUndefined())


        })


        describe('Testing getFavorites', () => {

            const email = 'a@a.com'
            const password = '123'
            const passwordConfirmation = '123'
            const pokemon = 'Butterfly'
            let _id, _token, username

            beforeAll(() => {
                username = `marcuricarlos-${Math.random()}`

                return userApi.register(email, username, password, passwordConfirmation)
                    .then(id => _id = id)
                    .then(() => userApi.authenticate(username, password))
                    .then(({ token }) => _token = token)
                    .then(() => logic.toggleFavorite(_id, _token, pokemon))

            })
            it('It should fail on a wrong id parameter - boolean', () => {
                const data = 'Bulbasur'
                expect(() => logic.toggleFavorite(true, _token, data).toThrowError())
            })

            it('It should fail on a wrong id parameter - undefined', () => {
                const data = 'Bulbasur'
                expect(() => logic.toggleFavorite(undefined, _token, data).toThrowError())
            })


            it('It should fail on a wrong id parameter - null', () => {
                const data = 'Bulbasur'
                expect(() => logic.toggleFavorite(null, _token, data).toThrowError())
            })

            it('It should fail on a wrong token parameter - boolean', () => {
                const data = 'Bulbasur'
                expect(() => logic.toggleFavorite(_id, true, data).toThrowError())
            })

            it('It should fail on a wrong token parameter - undefined', () => {
                const data = 'Bulbasur'
                expect(() => logic.toggleFavorite(_id, undefined, data).toThrowError())
            })


            it('It should fail on a wrong token parameter - null', () => {
                const data = 'Bulbasur'
                expect(() => logic.toggleFavorite(_id, null, data).toThrowError())
            })

            it('It should fail on a wrong token parameter - undefined', () => {
                const data = 'Bulbasur'
                expect(() => logic.toggleFavorite(_id, undefined, data).toThrowError())
            })

            it('It should fail on a wrong data parameter - boolean', () => {

                expect(() => logic.toggleFavorite(_id, _token, true).toThrowError())
            })

            it('It should fail on a wrong data parameter - null', () => {

                expect(() => logic.toggleFavorite(_id, _token, null).toThrowError())
            })

            it('It should fail on a wrong data parameter - undefined', () => {

                expect(() => logic.toggleFavorite(_id, _token, undefined).toThrowError())
            })

            it('It should succes on retrieving pokemon', () => {
                return logic.getFavorites(_id, _token)
                    .then(res => expect(res).toEqual(["Butterfly"]))

            })


        })

        describe('Testing getFavorites (null)', () => {

            const email = 'a@a.com'
            const password = '123'
            const passwordConfirmation = '123'
            let _id, _token, username
            beforeAll(() => {

                username = `marcuricarlos-${Math.random()}`

                return userApi.register(email, username, password, passwordConfirmation)
                    .then(id => _id = id)
                    .then(() => userApi.authenticate(username, password))
                    .then(({ token }) => _token = token)
                    .then(() => logic.getFavorites(_id, _token))
            })


            it('It should return null on non Favorites', () => {

                return logic.getFavorites(_id, _token)
                    .then(res => expect(res).toBe(null))



            })

        })

    })

})
