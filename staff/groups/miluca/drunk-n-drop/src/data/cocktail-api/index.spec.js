import cocktailApi from '../cocktail-api/index'


describe('Cocktail-Api', () => {
    describe('search by ingredient', () => {
    
        it('should succed on correct query', () =>{
    
            cocktailApi.searchByingredient('Lime')
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
    
    describe('search by Alcoholics', () => {
        
        it('should succed on correct query with alcohol', () =>{
            
            cocktailApi.searchByAlcoholics('Alcoholic')
            .then(({drinks}) => {
                expect(drinks).toBeDefined()
                expect(drinks instanceof Array).toBeTruthy()
                expect(drinks.length).toBeGreaterThan(0)
            })
            
        })
        
        it('should return empty result on unexisting alcohol query ', () => {
            
            cocktailApi.searchByAlcoholics('ghyd')
            .then(({drinks}) => {
                xpect(drinks).toBeDefined()
                expect(drinks.length).toBe(0)
                
            })
            
        })
    })
    
    describe('search by name', () => {
        
        it('Shoudl succeed on correct query', () =>{
        cocktailApi.searchCocktail('Gin Rickey')
        .then(response=> {
            expect(response).toBeDefined()
            expect(response instanceof Object).toBeTruthy()
            expect(response.drinks.length).toBe(1)
            
            }) 
        })
        
        it('Should fail on empty search', () => {            
            expect(() => cocktailApi.searchCocktail('').toThrowError(ValueError, `search is empty`))
            
        })        
    })
    
    describe('search by category' , () =>{
        
        it('should succed on correct query' , () => {
            cocktailApi.searchByCategory('Ordinary_Drink')
            .then(response => {
                expect(response).toBeDefined()
                expect(response.drinks.length).toBeGreaterThan(0)
            })
        })
    })
})

    
    
    
    
    
    