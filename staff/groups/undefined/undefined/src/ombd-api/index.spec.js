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
            expect(() => omdbApi.searchItems(query)).toThrowError('query is empty')
        })

    // DUDA: cómo manejar estas mayúcuslas?
    // tenemos que convertir las keys del objeto a toLowerCase()
    describe('retrieveItem', () => {
        
        const expectedResult = {
            Title: 'Raise the Titanic',
            Actors: 'Jason Robards, Richard Jordan, David Selby, Anne Archer',
            Runtime: '115 min',
            imdbID: 'tt0081400',
            imdbRating: '4.8'
        }
        const itemId = expectedResult.imdbID

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

        it('should fail using a space as query for itemID', () => {
            const emptyId = ' '
            expect(() => omdbApi.retrieveItem(emptyId)).toThrowError('itemId is empty')
        })

        it('should fail on empty itemID', () => {
            const itemId = ''
            expect(() => omdbApi.retrieveItem(itemId)).toThrowError('itemId is empty')
        })

        it('should fail on wrong itemID parameter', () => {
            const newId = '123qdsad'

            return omdbApi.retrieveItem(newId)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(({message}) =>  expect(message).toBe('Incorrect IMDb ID.'))
        })
    })
})
