import marvelApi from './index'

const { REACT_APP_MARVEL_API_KEY, REACT_APP_MARVEL_PRIVATE_API_KEY } = process.env

marvelApi.apiKey = REACT_APP_MARVEL_API_KEY

marvelApi.privateApiKey = REACT_APP_MARVEL_PRIVATE_API_KEY

/**
 * 
 * Marvel API Testing
 * 
 */

describe('marvel api testing', ()=>{

    describe('search characters', () => {

        let query = 'Hulk'

        it('should fail on empty query', () => {
            expect(()=> marvelApi.searchCharacter('')).toThrowError('query is empty')
        })

        it('should fail when query is a number', () => {
            expect(()=> marvelApi.searchCharacter(1)).toThrowError(`1 is not a string`)
        })

        it('should fail when query is a boolean', () => {
            expect(()=> marvelApi.searchCharacter(true)).toThrowError(`true is not a string`)
        })

        it('should fail when query is an array', () => {
            expect(()=> marvelApi.searchCharacter([1,2,3])).toThrowError(`1,2,3 is not a string`)
        })

        it('should get characters on matching query', () =>{
            return marvelApi.searchCharacter(query).then((data) =>{
                    expect(data).toBeDefined()
                    expect(typeof data === 'object').toBeTruthy()
                    const {count, results} = data
                    expect(count).toBe(1)
                    expect(results[0].name).toEqual(query)
                })
        })

        it('should fail on missmatching character', () =>{
            marvelApi.searchCharacter('12312313123').then(() => {
                    throw Error('should not pass by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toEqual(`No characters found`)
                })
        })
        
    })

    describe('retrieve character', () =>{

        let characterId = '1011334'

        it('should fail on empty characterId', () => {
            expect(()=> marvelApi.retrieveCharacter('')).toThrowError('characterId is empty')
        })

        it('should fail when characterId is a number', () => {
            expect(()=> marvelApi.retrieveCharacter(1)).toThrowError(`1 is not a string`)
        })

        it('should fail when characterId is a boolean', () => {
            expect(()=> marvelApi.retrieveCharacter(true)).toThrowError(`true is not a string`)
        })

        it('should fail when characterId is an array', () => {
            expect(()=> marvelApi.retrieveCharacter([1,2,3])).toThrowError(`1,2,3 is not a string`)
        })

        it('should fail on missmatching characterId', () =>{
            marvelApi.retrieveCharacter('12312313123')
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`We couldn't find that character`)
                })
        })

        it('should get a character on matching id', () =>{
            return marvelApi.retrieveCharacter(characterId)
                .then((data) =>{
                    expect(data).toBeDefined()
                    expect(typeof data === 'object').toBeTruthy()
                    const {count} = data
                    expect(count).toBe(1)
                })
        })
    })

    describe('retrieve comic', () =>{

        let comicId = '6958'

        it('should fail on empty comicId', () => {
            expect(()=> marvelApi.retrieveComic('')).toThrowError('comicId is empty')
        })

        it('should fail when comicId is a number', () => {
            expect(()=> marvelApi.retrieveComic(1)).toThrowError(`1 is not a string`)
        })

        it('should fail when comicId is a boolean', () => {
            expect(()=> marvelApi.retrieveComic(true)).toThrowError(`true is not a string`)
        })

        it('should fail when comicId is an array', () => {
            expect(()=> marvelApi.retrieveComic([1,2,3])).toThrowError(`1,2,3 is not a string`)
        })

        it('should fail on missmatching comicId', () =>{
            marvelApi.retrieveComic('12312313123')
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`We couldn't find that comic_issue`)
                })
        })

        it('should get a comic on matching id', () =>{
            return marvelApi.retrieveComic(comicId)
                .then((data) =>{
                    expect(data).toBeDefined()
                    expect(typeof data === 'object').toBeTruthy()
                    const {count} = data
                    expect(count).toBe(1)
                })
        })
    })
})

