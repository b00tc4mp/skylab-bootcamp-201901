import pokemonApi from '.';
const path = require('path');

describe('pokemon API', () => {
    describe('search for an pokemon by name', () => {
        it('should succeed on retrieving data from a pokemon', () =>{
            let query = 'pikachu';
            return pokemonApi.searchPokemonByName(query)
                .then((result) => {
                    expect(result.name).toBe(query)
                    expect(result.image).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png')
                    expect(result.types[0]).toBe('electric')
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
            let query = 'pikachu';
            return pokemonApi.searchPokemonByName(query)
                .then((result) => {
                    expect(result.name).toBe(query)
                })
                .catch(error => expect(error).toBeUndefined())
        })
    })
})
