'use strict'

describe('duck api', () => {
    describe('search ducks', () => {
        it('should succeed on correct query', (done) => {
            duckApi.searchDucks('yellow', 
              (ducks) => {
                expect(ducks).toBeDefined()
                expect(ducks instanceof Array).toBeTruthy()
                expect(ducks.length).toBe(13)
                done()
              },
              () => {done()}
            )          
        })


        it('should fail on no results', (done) => {
            const query = '1234dswfhhyt'
            duckApi.searchDucks(query,
              () => {done()},
              (ducksError) => {
                expect(ducksError).toBeDefined()
                expect(ducksError.error).toBe(`There are not results for this query: ${query}`);
                done()
              }
            )
        })


        describe('on validate parameters', () => {
            it('should fail on undefined query', () => {
                const query = undefined
                expect(() => duckApi.searchDucks(query, () => { }, () => { })).toThrowError(RequirementError, `query is not optional`)
            })
    
            it('should fail on null query', () => {
                const query = null
                expect(() => duckApi.searchDucks(query, () => { }, () => { })).toThrowError(RequirementError, `query is not optional`)
            })
    
            it('should fail on empty query', () => {
                const query = ''
                expect(() => duckApi.searchDucks(query, () => { }, () => { })).toThrowError(ValueError, 'query is empty')
            })
    
            it('should fail on blank query', () => {
                const query = ' \t    \n'
                expect(() => duckApi.searchDucks(query, () => { }, () => { })).toThrowError(ValueError, 'query is empty')
            })
    
            it('should fail if callback is not a function', () => {
                const query = 'yellow'
                const valueCallback = []
                expect(() => duckApi.searchDucks(query, valueCallback, () => { } )).toThrowError(TypeError, `callback ${valueCallback} is not a function`)
            }) 

            it('should fail if callbackError is not a function', () => {
                const query = 'yellow'
                const valueCallback = []
                expect(() => duckApi.searchDucks(query, () => { }, valueCallback )).toThrowError(TypeError, `callbackError ${valueCallback} is not a function`)
            }) 

        })
    })


    describe('search duck detail', () => {

        describe('on an existing data for a query', () => {
            let duckId
            beforeEach(done => 
                duckApi.searchDucks('yellow', 
                    (ducks) => {
                        duckId = ducks[0].id
                        done()
                    },
                    () => {done()}
                )
            )
                        
            it('should succeed', (done) => {
                duckApi.retrieveDuck(duckId, 
                    (duck) => {
                        expect(duck).toBeDefined()
                        expect(duck.id).toBe(duckId)
                        done()
                    },
                    () => {done()}
                )          
            })
    
        })

        it('should fail on no results for a query', (done) => {
            const id = '1234dswfhhyt'
            duckApi.retrieveDuck(id, 
                () => {done()},
                (duckError) => {
                    expect(duckError).toBeDefined()
                    expect(duckError.error).toBe(`duck with id ${id} not found`)
                    done() 
                }
            )          
        })

        describe('on validate parameters', () => {
            it('should fail on undefined id', () => {
                const id = undefined
                expect(() => duckApi.retrieveDuck(id, () => { }, () => { })).toThrowError(RequirementError, `id is not optional`)
            })
    
            it('should fail on null id', () => {
                const id = null
                expect(() => duckApi.retrieveDuck(id, () => { }, () => { })).toThrowError(RequirementError, `id is not optional`)
            })
    
            it('should fail on empty id', () => {
                const id = ''
                expect(() => duckApi.retrieveDuck(id, () => { }, () => { })).toThrowError(ValueError, 'id is empty')
            })
    
            it('should fail on blank id', () => {
                const id = ' \t    \n'
                expect(() => duckApi.retrieveDuck(id, () => { }, () => { })).toThrowError(ValueError, 'id is empty')
            })
    
            it('should fail if callback is not a function', () => {
                const id = '123456'
                const valueCallback = []
                expect(() => duckApi.retrieveDuck(id, valueCallback, () => { } )).toThrowError(TypeError, `callback ${valueCallback} is not a function`)
            }) 

            it('should fail if callbackError is not a function', () => {
                const id = '123456'
                const valueCallback = []
                expect(() => duckApi.retrieveDuck(id, () => { }, valueCallback )).toThrowError(TypeError, `callbackError ${valueCallback} is not a function`)
            }) 

        })
    })

})