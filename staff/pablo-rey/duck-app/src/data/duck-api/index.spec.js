import duckApi from '.'

describe('duck api', () => {
    describe('search ducks', () => {
        it('should succeed on correct query', (done) => {
            duckApi.searchDucks('yellow')
                .then(ducks => {
                    expect(ducks).toBeDefined()
                    expect(ducks instanceof Array).toBeTruthy()
                    expect(ducks.length).toBe(13)
    
                    done()
                })
                .catch(done)

            // TODO fail cases
        })
    })

    // TODO test retrieve duck
})