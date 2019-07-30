const duckApi = require('.')

xdescribe('duck api', () => {
    describe('search ducks', () => {
        it('should succeed on correct query', async () => {
            const ducks = await duckApi.searchDucks('yellow')

            expect(ducks).toBeDefined()
            expect(ducks instanceof Array).toBeTruthy()
            expect(ducks.length).toBe(13)
        })
    })

    // TODO other cases
})