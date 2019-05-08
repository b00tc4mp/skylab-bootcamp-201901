'use strict'

describe('duck api', () => {
    describe('search ducks', () => {
        it('should succeed on correct query', (done) => {
            duckApi.searchDucks('yellow', (ducks) => {
                expect(ducks).toBeDefined()
                expect(ducks instanceof Array).toBeTruthy()
                expect(ducks.length).toBe(13)

                done()
            })
        })
    })
})

describe('retrive ducks', () => {
    it('should succeed on correct query', (done) => {
        duckApi.retrieveDuck('5c3853aebd1bde8520e66e11', (ducks) => {
            expect(ducks).toBeDefined()
            expect(ducks instanceof Object).toBeTruthy()

            done()
        })

        // TODO fail cases
    })
})
