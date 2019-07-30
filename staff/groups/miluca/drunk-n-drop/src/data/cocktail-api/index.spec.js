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
    
    describe('cocktail api search by glass', () => {
        it('Should succeed on correct query', () => {
            cocktailApi.searchByGlass('Nick and Nora Glass')
                .then(response => {
                    expect(response).toBeDefined()
                    expect(response instanceof Object).toBeTruthy()
                    expect(response.drinks.length).toBe(3)

                })
        })
        it('Should fail on empty search', () => {            
            expect(() => cocktailApi.searchByGlass('').toThrowError(ValueError, `search is empty`))
                      
        })   
        it('Should return empty search on unexisting glass', () => {
            cocktailApi.searchByGlass('vaso')
            .then(response => {
                expect(response).toBeUndefined()
                expect(response.drinks.length).toBe(0)
            })
        })
    })

    describe('search by multi Ingedient' , () =>{
        
        it('should succed on correct query' , () => {
            cocktailApi.searchByMultiIngredient('Lime,Gin')
            .then(response => {
                expect(response).toBeDefined()
                expect(response.drinks.length).toBeGreaterThan(0)
            })
        })
    })
    
    describe('search cocktail details by ID' , () =>{
        
        it('should succed on correct query' , () => {
            cocktailApi.searchById('11007')
            .then(response => {
                expect(response).toBeDefined()
                expect(response.drinks.strDrink).toBe("Margarita")
            })
        })
    })
    describe('list popular cocktails' , () =>{
        
        it('should succed retrive popular cocktails' , () => {
            cocktailApi.listPopular()
            .then(response => {
                expect(response).toBeDefined()
                expect(response.drinks.strDrink).toBe("Mojito")
            })
        })
    })
})

    
    
    
    
    
    