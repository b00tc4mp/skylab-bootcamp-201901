'use strict'

import omdbApi from '.'
omdbApi.api = 'ef8a2f56'

describe('ombd-api' , () => {
    describe('searchItems', () => {
        it ('should succeed on matching query', () => {
            let query = 'titanic'
            return omdbApi.searchItems(query)
                .then(items => {
                    expect(items).toBeDefined()
                    expect(items instanceof Array).toBeTruthy()
                    expect(items.length).toBe(10)
                }) 
        })

        it ('should throw an error on empty query', () => {
            let query = ''

            //esta es la forma correcta pero no veo por qué le pasamos la función 
            //al expect
            expect(() => omdbApi.searchItems(query)).toThrowError('query is empty')
            
            //DUDA: esta construcción de aquí parece que no está llegando bien
            //he probado con cambiarle el mensaje a ver si peta el test
            //y sigue pasando exactamente lo mismo
            //expect(() => omdbApi.searchItems(query).toThrowError('query is empty'))
        })

        it ('should returns an empty array when no results found', () => {
            let query = 'asdfasdf'
            return omdbApi.searchItems(query)
            .then(items => {
                expect(items).toBeDefined()
                expect(items instanceof Array).toBeTruthy()
                expect(items.length).toBe(0)
            }) 
        })

        it ('should throw an error using an array instead of query string', () => {
            let query = []
            expect(() => omdbApi.searchItems(query)).toThrowError(`${query} is not a string`) 
        })

    })


    // DUDA: cómo manejar estas mayúcuslas?
    // tenemos que convertir las keys del objeto a toLowerCase()

    describe('retrieveItem', () => {
        
        // expected object - test some fields
        const expectedResult = {
            Title: "Raise the Titanic",
            Actors: "Jason Robards, Richard Jordan, David Selby, Anne Archer",
            Runtime: "115 min",
            imdbID: "tt0081400",
            imdbRating: "4.8"
        }
        var itemId = expectedResult.imdbID

        it('should retrieve a movie or serie item object with valid id', () => { //DUDA: xq hace un return aquí?
            return omdbApi.retrieveItem(itemId)
                    .then(({ Title, Actors, Runtime, imdbID, imdbRating }) => {
                        expect(Title).toBe(expectedResult.Title)
                        expect(Actors).toBe(expectedResult.Actors)
                        expect(Runtime).toBe(expectedResult.Runtime)
                        expect(imdbID).toBe(expectedResult.imdbID)
                        expect(imdbRating).toBe(expectedResult.imdbRating)
                    })
        })

        // DUDA: qué es lo que hace el try catch aquí? el expect o el it?
        it('should fail using a space as query for itemID', () => {
            var emptyId = ' '
            expect(() => omdbApi.retrieveItem(emptyId)).toThrowError('itemId is empty')
        })

        it('should fail on empty itemID', () => {
            var emptyId = ''
            expect(() => omdbApi.retrieveItem(emptyId)).toThrowError('itemId is empty')
        })

        it('should fail on wrong itemID parameter', () => {
            var newId = '123qdsad'
            //expect(() => omdbApi.retrieveItem(newId)).toThrowError('Incorrect IMDb ID.')

            //expect(() => omdbApi.retrieveItem(newId)).toThrowError('Incorrect IMDb ID.')
        })
    })
})
