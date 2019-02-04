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

    describe('retrieveItem', () => {
        
        const expectedResult = {
            Title: 'Raise the Titanic',
            Actors: 'Jason Robards, Richard Jordan, David Selby, Anne Archer',
            Runtime: '115 min',
            imdbID: 'tt0081400',
            imdbRating: '4.8'
        }
        var itemId = expectedResult.imdbID

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
            var emptyId = ' '
            expect(() => omdbApi.retrieveItem(emptyId)).toThrowError('itemId is empty')
        })

        it('should fail on empty itemID', () => {
            var emptyId = ''
            expect(() => omdbApi.retrieveItem(emptyId)).toThrowError('itemId is empty')
        })

        it('should fail on wrong itemID parameter', () => {
            var newId = '123qdsad'

            return omdbApi.retrieveItem(newId)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(({message}) =>  expect(message).toBe('Incorrect IMDb ID.'))
        })
    })
})
