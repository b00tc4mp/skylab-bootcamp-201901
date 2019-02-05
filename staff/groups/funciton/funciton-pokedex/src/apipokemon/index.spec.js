import pokemonApi from '.';
const path = require('path');

describe('pokemon API', () => {

    describe('search AllPokemons', () => {
        it('should succeed on retrieving allpokemons', () =>{
            
            let query = 'pikachu';
            return pokemonApi.searchAllPokemons(query)
                .then((result) => {
                    expect(result.length).toBe(pokemonApi.limit)
                })
                .catch(error => expect(error).toBeUndefined())
        })
    })

    describe('search for an pokemon by name', () => {
        it('should succeed on retrieving data from a pokemon', () =>{
            
            let query = 'pikachu';
            return pokemonApi.searchPokemonByName(query)
                .then((result) => {
                    expect(result.name == query).toBe(true)
                    expect(result.types[0].type.name).toBe('electric')
                })
                .catch(error => expect(error).toBeUndefined())
        })

        it('should fail on retrieving data from a randomname', () =>{
            let query = 'modafoca' ;
            return pokemonApi.searchPokemonByName(query)
                .then((result) => {
                })
                .catch(error => expect(error).toBeDefined())
        })

        it('It should fail on a wrong query parameter - boolean', () =>{
            expect(() => pokemonApi.searchPokemonByName(false).toThrowError())
        })
        it('It should fail on a wrong query parameter - object', () =>{
            const query = {}
            expect(() => pokemonApi.searchPokemonByName(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - number', () =>{
            const query = 12
            expect(() => pokemonApi.searchPokemonByName(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - Array', () =>{
            const query = [12, 22]
            expect(() => pokemonApi.searchPokemonByName(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - Undefined', () =>{
            const query = undefined
            expect(() => pokemonApi.searchPokemonByName(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - null', () =>{
            const query = null
            expect(() => pokemonApi.searchPokemonByName(query).toThrowError())
        })
    })

    describe('search for pokemon by type', () => {
        it('should succeed on retrieving pokemon type', () =>{
            let query = 'fire';
            return pokemonApi.searchPokemonsByType(query)
                .then((result) => {
                    expect(result.length).toBe(76)
                })
                .catch(error => expect(error).toBeUndefined())
        })
        it('It should fail on a wrong query parameter - boolean', () =>{
            expect(() => pokemonApi.searchPokemonsByType(false).toThrowError())
        })
        it('It should fail on a wrong query parameter - object', () =>{
            const query = {}
            expect(() => pokemonApi.searchPokemonsByType(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - number', () =>{
            const query = 12
            expect(() => pokemonApi.searchPokemonsByType(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - Array', () =>{
            const query = [12, 22]
            expect(() => pokemonApi.searchPokemonsByType(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - Undefined', () =>{
            const query = undefined
            expect(() => pokemonApi.searchPokemonsByType(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - null', () =>{
            const query = null
            expect(() => pokemonApi.searchPokemonsByType(query).toThrowError())
        })
    })
    describe('search for pokemon by ability', () => {
        it('should succeed on retrieving pokemon ability', () =>{
            let query = 'limber';
            return pokemonApi.searchPokemonsByAbility(query)
                .then((result) => {
                    expect(result.name).toBe('limber')
                    expect(result.pokemon.length).toBe(12)
                })
                .catch(error => expect(error).toBeUndefined())
        })
        it('It should fail on a wrong query parameter - boolean', () =>{
            expect(() => pokemonApi.searchPokemonsByAbility(false).toThrowError())
        })
        it('It should fail on a wrong query parameter - object', () =>{
            const query = {}
            expect(() => pokemonApi.searchPokemonsByAbility(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - number', () =>{
            const query = 12
            expect(() => pokemonApi.searchPokemonsByAbility(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - Array', () =>{
            const query = [12, 22]
            expect(() => pokemonApi.searchPokemonsByAbility(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - Undefined', () =>{
            const query = undefined
            expect(() => pokemonApi.searchPokemonsByAbility(query).toThrowError())
        })
        it('It should fail on a wrong query parameter - null', () =>{
            const query = null
            expect(() => pokemonApi.searchPokemonsByAbility(query).toThrowError())
        })
    })
})
