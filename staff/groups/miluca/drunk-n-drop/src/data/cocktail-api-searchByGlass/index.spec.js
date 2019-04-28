import  cocktailApiSearchByGlass from '.'


describe('cocktail api', () => {
    describe('cocktail api search by glass', () => {
        it('Should succeed on correct query', () => {
            cocktailApiSearchByGlass.searchByGlass('Nick and Nora Glass')
                .then(response => {
                    expect(response).toBeDefined()
                    expect(response instanceof Object).toBeTruthy()
                    expect(response.drinks.length).toBe(3)

                })
        })
        it('Should fail on empty search', () => {            
            expect(() => cocktailApiSearchByGlass.searchByGlass('').toThrowError(ValueError, `search is empty`))
                      
        })   
        it('Should return empty search on unexisting glass', () => {
            cocktailApiSearchByGlass.searchByGlass('vaso')
            .then(response => {
                expect(response).toBeUndefined()
                expect(response.drinks.length).toBe(0)
            })
        })
    })
})