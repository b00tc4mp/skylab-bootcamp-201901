import pokemonApi from '.';
const path = require('path');

describe('pokemon API', () => {

    describe('search AllPokemons', () => {
        it('should succeed on retrieving allpokemons', () => {

            let query = 'pikachu';
            return pokemonApi.searchAllPokemons(query)
                .then((result) => {
                    expect(result instanceof Object).toBe(true)
                    expect(result.length).toBe(pokemonApi.limit)
                })

        })


        describe('search for an pokemon by name', () => {
            it('should succeed on retrieving data from a pokemon', () => {

                let query = 'pikachu';
                return pokemonApi.searchPokemonByName(query)
                    .then((result) => {
                        expect(result.name == query).toBe(true)
                        expect(result.types[0].type.name).toBe('electric')
                    })
                    .catch(error => expect(error).toBeUndefined())
            })

            it('should fail on retrieving data from a randomname', () => {
                let query = 'modafoca';
                return pokemonApi.searchPokemonByName(query)
                    .then((result) => {
                    })
                    .catch(error => expect(error).toBeDefined())
            })

            it('should fail on empty query', () => {
                let query = true;
                try {

                    pokemonApi.searchPokemonByName(query)
                }
                catch (error) {
                    expect(error.message).toBe(`${query} is not a string`)
                }
            })

            it('should fail on empty query', () => {
                let query = '';
                try {

                    pokemonApi.searchPokemonByName(query)
                }
                catch (error) {
                    expect(error.message).toBe('query is empty')
                }
            })


            it('It should fail on a wrong query parameter - boolean', () => {
                expect(() => pokemonApi.searchPokemonByName(false).toThrowError())
            })
            it('It should fail on a wrong query parameter - object', () => {
                const query = {}
                expect(() => pokemonApi.searchPokemonByName(query).toThrowError())
            })
            it('It should fail on a wrong query parameter - number', () => {
                const query = 12
                expect(() => pokemonApi.searchPokemonByName(query).toThrowError())
            })
            it('It should fail on a wrong query parameter - Array', () => {
                const query = [12, 22]
                expect(() => pokemonApi.searchPokemonByName(query).toThrowError())
            })
            it('It should fail on a wrong query parameter - Undefined', () => {
                const query = undefined
                expect(() => pokemonApi.searchPokemonByName(query).toThrowError())
            })
            it('It should fail on a wrong query parameter - null', () => {
                const query = null
                expect(() => pokemonApi.searchPokemonByName(query).toThrowError())
            })
        })

    })
})