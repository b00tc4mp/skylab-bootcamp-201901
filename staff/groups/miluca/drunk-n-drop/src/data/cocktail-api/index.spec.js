import cocktailApi from '../cocktail-api/index'



describe('search by ingredient', () => {

    it('should succed on correct query', () =>

        cocktailApi.searchByingredient('Lime')
            .then(response => {
                expect(response).toBeDefined()
                expect(response.drinks instanceof Array).toBeTruthy()
                expect(response.drinks.length).toBeGreaterThan(0)
            })


    )

    it('should return empty result on unexisting drink ', () => {

        cocktailApi.searchByingredient('ghyd')
            .then(response => {
                expect(response.length).toBe(0)

            })
    })
})


describe('search by name', () => {

    it('Shoudl succeed on correct query', () =>
        cocktailApi.searchCocktail('Gin Rickey')
            .then(response=> {
                expect(response).toBeDefined()
                expect(response instanceof Object).toBeTruthy()
                expect(response.drinks.length).toBe(1)
                
            }) 
    )

    it('Should fail on empty search', () => {            
        expect(() => cocktailApi.searchCocktail('').toThrowError(ValueError, `search is empty`))
                  
    })        
})



describe('search by category' , () =>{

    it('should succed on correct query' , () => 
        cocktailApi.searchByCategory('Ordinary_Drink')
            .then(response => {
                expect(response).toBeDefined()
                expect(response.drinks.length).toBeGreaterThan(0)
            })
    
    )

})






