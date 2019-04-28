import  cocktailApiSearchByName from '.'

describe('cocktail api', () => {
    describe('search by name', () => {

        it('Shoudl succeed on correct query', () =>
            cocktailApiSearchByName.searchCocktail('Gin Rickey')
                .then(cocktail => {
                    expect(cocktail).toBeDefined()
                    expect(cocktail instanceof Object).toBeTruthy()
                    expect(cocktail.drinks.length).toBe(1)
                    
                }) 
        )

        it('Should fail on empty search', () => {            
            expect(() => cocktailApiSearchByName.searchCocktail('').toThrowError(ValueError, `username is empty`))
                      
        })        
    })
}) 