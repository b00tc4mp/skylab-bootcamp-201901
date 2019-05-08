import itunesApi from '.'
import {ValueError, RequirementError } from '../../common/errors'

describe('itunes api', ()=>{
    describe('search music',() =>{
        const term='Pop'
        const media='music'
        const limit=3
        const _kind= 'song'
        it('should succeed on correct query', () => itunesApi.searchMusic(term, media, limit)
                .then(music =>{ 
                    expect(music).toBeDefined()
                    const {results}=music
                    expect(results.length==limit).toBeTruthy()
                    results.forEach(e => {
                        const { kind , primaryGenreName}=e
                        expect(_kind).toBe(kind)
                        expect(primaryGenreName).toBe(term)

                    })                   
                })
        )
        it('should return an empty array in case of inexistent term', () => itunesApi.searchMusic('alternativeaold', media, limit)
                .then(music =>{ 
                    expect(music).toBeDefined()
                    const {results}=music
                    expect(results.length==0).toBeTruthy()
                })
        )

        it('should fail on undefined term', () => {
            const term = undefined
            expect(() => itunesApi.searchMusic(term, media, limit)).toThrowError(RequirementError, `term is not optional`)
        })
        it('should fail on null term', () => {
            const term = null
            expect(() => itunesApi.searchMusic(term, media, limit)).toThrowError(RequirementError, `term is not optional`)
        })
        it('should fail on empty term', () => {
            const term = ''
            expect(() => itunesApi.searchMusic(term, media, limit)).toThrowError(ValueError, `term is empty`)
        })
        it('should fail on blank term', () => {
            const term = ' \t    \n'

            expect(() => itunesApi.searchMusic(term, media, limit)).toThrowError(ValueError, 'username is empty')
        })
        it('should return 50 results in case of undefined limit', () => {
            const limit=undefined
            return itunesApi.searchMusic(term, media, limit)

            .then(music =>{ 
                expect(music).toBeDefined()
                const {results}=music
                expect(results.length==50).toBeTruthy()
            })
        })
        it('should return 50 results in case of null limit', () => {
            const limit=null
            return itunesApi.searchMusic(term, media, limit)

            .then(music =>{ 
                expect(music).toBeDefined()
                const {results}=music
                expect(results.length==50).toBeTruthy()
            })
        })
        it('should returns in case of inexistent media', () => {
            const media='musicu'
            return itunesApi.searchMusic(term, media, limit)

            .then(music =>{ 
                expect(music).toBeDefined()
                const {errorMessage}=music
                expect(errorMessage).toBe('Invalid value(s) for key(s): [mediaType]')
            })
        })
        it('should return differents kind of results in case of empty media', () => {
            const media=''
            const term= 'Concert Film'
            const limit=3
            return itunesApi.searchMusic(term,media, limit)

            .then(music =>{ 
                expect(music).toBeDefined() 
                const {results}=music
                expect( results.some(e => {
                    const { kind }=e
                    return kind!=='song'
                }) ).toBeTruthy()
            })
        })
    })
})