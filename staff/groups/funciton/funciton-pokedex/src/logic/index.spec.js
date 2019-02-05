'use strict'

import logic from '.';
import pokemonApi from '../apipokemon';

describe('Logic Testing', () => {
    describe('Testing Register User', () => {
        it('should succeed on registering a userName', () =>{
            let email = 'a@a.com'
            let username = `marcuricarlos-${Math.random()}`
            let password = '123'
            let passwordConfirmation = '123'
            return logic.registerUser( email, username, password, passwordConfirmation)
                .then((result) =>{
                    expect(result).not.toBeDefined()
                })
                .catch(err => expect(err).not.toBeDefined())
        })

        it('should fail on not string email', () =>{
            try{
                let email = false
                let username = `marcuricarlos-${Math.random()}`
                let password = '123'
                let passwordConfirmation = '123'
                return logic.registerUser( email, username, password, passwordConfirmation)
                    .then((result) =>{
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on empty email', () =>{
            try{
                let email = ''
                let username = `marcuricarlos-${Math.random()}`
                let password = '123'
                let passwordConfirmation = '123'
                return logic.registerUser( email, username, password, passwordConfirmation)
                    .then((result) =>{
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on not string username', () =>{
            try{
                let email = 'b@b.com'
                let username = []
                let password = '123'
                let passwordConfirmation = '123'
                return logic.registerUser( email, username, password, passwordConfirmation)
                    .then((result) =>{
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on empty username', () =>{
            try{
                let email = 'b@b.com'
                let username = ''
                let password = '123'
                let passwordConfirmation = '123'
                return logic.registerUser( email, username, password, passwordConfirmation)
                    .then((result) =>{
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })

        
        it('should fail on not string password', () =>{
            try{
                let email = 'b@b.com'
                let username = `marcuricarlos-${Math.random()}`
                let password = false
                let passwordConfirmation = '123'
                return logic.registerUser( email, username, password, passwordConfirmation)
                    .then((result) =>{
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on empty password', () =>{
            try{
                let email = 'b@b.com'
                let username = `marcuricarlos-${Math.random()}`
                let password = ''
                let passwordConfirmation = '123'
                return logic.registerUser( email, username, password, passwordConfirmation)
                    .then((result) =>{
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on not String passwordConfirmation', () =>{
            try{
                let email = 'b@b.com'
                let username = `marcuricarlos-${Math.random()}`
                let password = '123'
                let passwordConfirmation = false
                return logic.registerUser( email, username, password, passwordConfirmation)
                    .then((result) =>{
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on empty passwordConfirmation', () =>{
            try{
                let email = 'b@b.com'
                let username = `marcuricarlos-${Math.random()}`
                let password = '123'
                let passwordConfirmation = ''
                return logic.registerUser( email, username, password, passwordConfirmation)
                    .then((result) =>{
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on not matching passwords', () =>{
            try{
                let email = 'b@b.com'
                let username = `marcuricarlos-${Math.random()}`
                let password = '123'
                let passwordConfirmation = '12345'
                return logic.registerUser( email, username, password, passwordConfirmation)
                    .then((result) =>{
                        expect(result).toBeDefined()
                    })
                    .catch(err => expect(err).not.toBeDefined())
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })
    })

    describe('Testing Login User', () => {
        it('should succeed on Login User', () =>{
            const email = 'Manuel@mail.com'
            const username = `manuelbarzi-${Math.random()}`
            const password = '123'
            const passwordConf = '123'
            let _id
            //primero register del user
            return logic.registerUser(email, username, password, passwordConf)
            .then( () => {
                logic.loginUser(username, password)
                    .then(({ id, token, user }) => {
                        expect(id).toBeDefined()
                        expect(token).toBeDefined()
                        expect(user).toBe(username)
                    })
            })
        })

        it('should fail on empty username', () =>{
            try{
                let username = ''
                let password = '123'
                logic.loginUser(username, password)
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on non string username', () =>{
            try{
                let username = false
                let password = '123'
                logic.loginUser(username, password)
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on empty password', () =>{
            try{
                let username = 'carloscalvo'
                let password = ''
                logic.loginUser(username, password)
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })

        it('should fail on non string password', () =>{
            try{
                let username = 'carloscalvo'
                let password = true
                logic.loginUser(username, password)
            } catch (error){
                expect(error.message).toBeDefined()
            }
        })

    })

    describe('Testing retrievePokemon', () => {
        it('should succeed on searchingpokemonByName', () =>{
            let query = 'pikachu';
            return logic.retrievePokemon(query)
                .then((result) => {
                    expect(result.name == query).toBe(true)
                    expect(result.types[0].type.name).toBe('electric')
                })
                .catch(error => expect(error).toBeUndefined())
        })

        it('should fail on retrieving data from a randomname', () =>{
            let query = 'modafoca2345678' ;
            return logic.retrievePokemon(query)
                .then((result) => {
                })
                .catch(error => expect(error).toBeDefined())
        })

        it('It should fail on a wrong query parameter - boolean', () =>{
            expect(() => logic.retrievePokemon(false).toThrowError())
        })
        it('It should fail on a wrong query parameter - object', () =>{
            const query = {}
            expect(() => logic.retrievePokemon(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - number', () =>{
            const query = 12
            expect(() => logic.retrievePokemon(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - Array', () =>{
            const query = [12, 22]
            expect(() => logic.retrievePokemon(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - Undefined', () =>{
            const query = undefined
            expect(() => logic.retrievePokemon(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - null', () =>{
            const query = null
            expect(() => logic.retrievePokemon(query).toThrowError())
        })
    })


    describe('Testing retrieveAllpokemon', () => {
        it('should succeed on searchingAllPokemons', () =>{
            return logic.retrieveAllPokemons()
                .then((result) => {
                    expect(result.length).toBe(pokemonApi.limit)
                })
                .catch(error => expect(error).toBeUndefined())
        })

        it('should fail on toomany args', () =>{
            let query = 'abc'
            expect(() => logic.retrieveAllPokemons(query).toThrowError())
        })
    })
})
