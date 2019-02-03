import logic from './logic'

describe('logic testing', ()=>{

    describe('search characters', () => {

        let query = 'Hulk'

        it('should fail on empty query', () => {
            expect(()=> logic.searchCharacter('')).toThrowError('query is empty')
        })

        it('should fail when query is a number', () => {
            expect(()=> logic.searchCharacter(1)).toThrowError(`1 is not a string`)
        })

        it('should fail when query is a boolean', () => {
            expect(()=> logic.searchCharacter(true)).toThrowError(`true is not a string`)
        })

        it('should fail when query is an array', () => {
            expect(()=> logic.searchCharacter([1,2,3])).toThrowError(`1,2,3 is not a string`)
        })

        it('should get characters on matching query', () =>{
            return logic.searchCharacter(query)
                .then((data) =>{
                    expect(data).toBeDefined()
                    expect(typeof data === 'object').toBeTruthy()
                    const {count, results} = data
                    expect(count).toBe(1)
                    expect(results[0].name).toEqual(query)
                })
        })

        it('should fail on returning 0 characters', () =>{
            logic.searchCharacter('12312313123')
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`No characters found`)
                })
        })
        
    })

    describe('retrieve character', () =>{

        let characterId = '1011334'

        it('should fail on empty characterId', () => {
            expect(()=> logic.retrieveCharacter('')).toThrowError('characterId is empty')
        })

        it('should fail when characterId is a number', () => {
            expect(()=> logic.retrieveCharacter(1)).toThrowError(`1 is not a string`)
        })

        it('should fail when characterId is a boolean', () => {
            expect(()=> logic.retrieveCharacter(true)).toThrowError(`true is not a string`)
        })

        it('should fail when characterId is an array', () => {
            expect(()=> logic.retrieveCharacter([1,2,3])).toThrowError(`1,2,3 is not a string`)
        })

        it('should fail on missmatching characterId', () =>{
            logic.retrieveCharacter('12312313123')
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`We couldn't find that character`)
                })
        })

        it('should get a character on matching id', () =>{
            return logic.retrieveCharacter(characterId)
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
            expect(()=> logic.retrieveComic('')).toThrowError('comicId is empty')
        })

        it('should fail when comicId is a number', () => {
            expect(()=> logic.retrieveComic(1)).toThrowError(`1 is not a string`)
        })

        it('should fail when comicId is a boolean', () => {
            expect(()=> logic.retrieveComic(true)).toThrowError(`true is not a string`)
        })

        it('should fail when comicId is an array', () => {
            expect(()=> logic.retrieveComic([1,2,3])).toThrowError(`1,2,3 is not a string`)
        })

        it('should fail on missmatching comicId', () =>{
            logic.retrieveComic('12312313123')
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`We couldn't find that comic_issue`)
                })
        })

        it('should get a comic on matching id', () =>{
            return logic.retrieveComic(comicId)
                .then((data) =>{
                    expect(data).toBeDefined()
                    expect(typeof data === 'object').toBeTruthy()
                    const {count} = data
                    expect(count).toBe(1)
                })
        })
    })
 })