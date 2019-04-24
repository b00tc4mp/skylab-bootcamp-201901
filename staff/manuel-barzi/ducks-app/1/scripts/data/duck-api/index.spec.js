'use strict'

describe('duck api', () => {
    describe('search ducks', () => {
        it('should succeed on correct query', (done) => {
            duckApi.searchDucks('yellow', (error, ducks) => {
                expect(error).toBeUndefined()

                expect(ducks).toBeDefined()
                expect(ducks instanceof Array).toBeTruthy()
                expect(ducks.length).toBe(13)

                done()
            })

            // TODO fail cases
        })
    })

    // TODO test retrieve duck
})