import cocktailApi from '../cocktail-api/index'



describe('search by ingredient', () => {

    it('should succed on correct query', () =>

        cocktailApi.searchByingredient('Lime')
            .then(drinks => {
                expect(drinks).toBeDefined()
                expect(drinks.drinks instanceof Array).toBeTruthy()
                expect(drinks.drinks.length).toBeGreaterThan(0)
            })


    )
    it('should retrive all dirnks only with liquid ingredients on empty query ', () => {

        cocktailApi.searchByingredient('')
            .then(drinks => {
                expect(drinks).toBeDefined()
                expect(drinks.drinks instanceof Array).toBeTruthy()
                expect(drinks.drinks.length).toBeGreaterThan(0)

            })
    })

    it('should return empty result on unexisting drink ', () => {

        cocktailApi.searchByingredient('ghyd')
            .then(drinks => {
                expect(drinks.length).toBe(0)

            })
    })
})


describe('search by name', () => {

    it('Shoudl succeed on correct query', () =>
        cocktailApi.searchCocktail('Gin Rickey')
            .then(cocktail => {
                expect(cocktail).toBeDefined()
                expect(cocktail instanceof Object).toBeTruthy()
                expect(cocktail.drinks.length).toBe(1)
                
            }) 
    )

    it('Should fail on empty search', () => {            
        expect(() => cocktailApi.searchCocktail('').toThrowError(ValueError, `search is empty`))
                  
    })        
})






