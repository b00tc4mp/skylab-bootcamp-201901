'use strict'

import youtubeApi from '.'

describe('tutubo api', () => {
    describe('search', () => {
        it('should succeed on valid query', () => {
            const query = 'viral videos'

            return youtubeApi.search(query)
                .then(items => {
                    expect(items).toBeDefined()
                    expect(items.length).toBe(20)
                    expect(items).toBeInstanceOf(Array)
                })

        })

        it('should fail on no matching results', () => {
            youtubeApi.search('fmgfsmg adksnffkaobnfadkfmkbmgkolañlkxpdknsfdjkfmkscmbjdfnfnvknsdkzmfc')
            .then(() => {
                throw Error('should not have passed by here')
            })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error.message).toBe('no results')
            })
        })

        it('should fail on empty query', () => {
            expect(() => youtubeApi.search('')).toThrowError('query is empty')
                
        })

        it('should fail on object for query', () => {
            expect(() => youtubeApi.search({})).toThrowError('[object Object] is not a string')
        })
    })

    describe('most popular', () => {
        it('should succeed on valid key', () =>{
            return youtubeApi.mostPopular()
                .then(items => {
                    expect(items).toBeDefined()
                    expect(items).toBeInstanceOf(Array)
                })
        })
    })
})