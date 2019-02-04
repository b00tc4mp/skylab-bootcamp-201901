'use strict'

import omdbApi from '.'

const { env: { OMDB_API } } = process

omdbApi.api = 'ef8a2f56'

describe('ombd-api' , () => {
    
    describe('searchItems', () => {
        
        it ('should succeed on matching query', () => {
            const query = 'titanic'
            return omdbApi.searchItems(query)
                .then(items => {
                    expect(items).toBeDefined()
                    expect(items instanceof Array).toBeTruthy()
                    expect(items.length).toBe(10)
                }) 
        })
    
        it ('should fail on empty query', () => {
            const query = ''
            expect(() => omdbApi.searchItems(query).toThrowError('query is empty'))
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
        const itemId = expectedResult.imdbID

        //DUDA: xq hace un return aquí?
        it('should retrieve a movie or serie item object with valid id', () => { 
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
        it('should fail on empty itemID', () => {
            const itemId = ''
            expect(() => omdbApi.retrieveItem(itemId)).toThrowError('itemId is empty')
        })

        it('should fail on wrong itemID parameter', () => {
            const itemId = 'wwwwwwwww'
            expect(() => omdbApi.retrieveItem(itemId).toThrowError('Movie not found!'))
        })
    })
})
