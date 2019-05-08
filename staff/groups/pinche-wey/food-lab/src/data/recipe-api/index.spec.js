import recipeApi from '.'
import { arrayExpression } from '@babel/types';
import { ValueError, RequirementError} from '../../common/errors'

describe('recipe api', () => {

    describe('search recipes', () => {

        //Search meal by name
        // => https://www.themealdb.com/api/json/v1/1/search.php?s=paella

        it('should succeed on correct query and selector search by name', () => {
            recipeApi.searchRecipes('poutine', 'search.php?s=')
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    expect(recipe.meals.length).toBe(1)
                    expect(recipe.meals instanceof Array).toBeTruthy()
                })

        })
        it('should succed on correct query and selector search by name', () => {
            recipeApi.searchRecipes('chocolate gateau', 'search.php?s=')
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    expect(recipe.meals.length).toBe(1)
                    expect(recipe.meals instanceof Array).toBeTruthy()
                })
        }) 

        it('should succed on correct query and selector search by name', () => {
            recipeApi.searchRecipes('wontons', 'search.php?s=')
            .then(recipe => {
                expect(recipe).toBeDefined()
                expect(recipe instanceof Object).toBeTruthy()
                expect(recipe.meals.length).toBe(1)
                expect(recipe.meals instanceof Array).toBeTruthy()

            })

        }) 
        
        // list all ingredients => https://www.themealdb.com/api/json/v1/1/list.php?i=list
        it('should succeed on correct query and selector filter for main ingredient', () =>
            recipeApi.searchRecipes('tomato', 'filter.php?i=') // ?i=tomato search por ingrediente
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    expect(recipe.meals.length).toBe(6)
                    expect(recipe.meals instanceof Array).toBeTruthy()
                })
        )

        it('should succed on correct query and selector filter for main ingredient', () => {
            recipeApi.searchRecipes('salmon', 'filter.php?i=')
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    expect(recipe.meals.length).toBe(5)
                    expect(recipe.meals instanceof Array).toBeTruthy()
                })
        }) 

        it('should succed on correct query and selector filter for main ingredient', () => {
            recipeApi.searchRecipes('avocado', 'filter.php?i=')
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    expect(recipe.meals.length).toBe(5)
                    expect(recipe.meals instanceof Array).toBeTruthy()
                })

        })

        // => list all areas => https://www.themealdb.com/api/json/v1/1/list.php?a=list
        it('should succeed on correct query and selector filter for area', () => {
            recipeApi.searchRecipes('spanish', 'filter.php?a=') // ?a=spanish search por área
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    expect(recipe.meals.length).toBe(3)
                    expect(recipe.meals instanceof Array).toBeTruthy()
                })
        })

        it('should succeed on correct query and selector filter for area', () => {
            recipeApi.searchRecipes('canadian', 'filter.php?a=') // ?a=spanish search por área
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    expect(recipe.meals.length).toBe(13)
                    expect(recipe.meals instanceof Array).toBeTruthy()
                })
        })

        it('should succeed on correct query and selector filter for area', () => {
            recipeApi.searchRecipes('chinese', 'filter.php?a=') // ?a=spanish search por área
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    expect(recipe.meals.length).toBe(12)
                    expect(recipe.meals instanceof Array).toBeTruthy()
                })
        })

        // list all categories => https://www.themealdb.com/api/json/v1/1/list.php?c=list
        it('should succeed on correct query and selector filter for category', () =>
            recipeApi.searchRecipes('breakfast', 'filter.php?c=')
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    expect(recipe.meals.length).toBe(7)
                    expect(recipe.meals instanceof Array).toBeTruthy()
                })
        )

        it('should succeed on correct query and selector filter for category', () =>
            recipeApi.searchRecipes('pasta', 'filter.php?c=')
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    expect(recipe.meals.length).toBe(6)
                    expect(recipe.meals instanceof Array).toBeTruthy()
                })
        )

        it('should succeed on correct query and selector filter for category', () =>
            recipeApi.searchRecipes('vegan', 'filter.php?c=')
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    expect(recipe.meals.length).toBe(3)
                    expect(recipe.meals instanceof Array).toBeTruthy()
                })
        )

        // TESTS para comprobar que el método esté lanzando errores correctamente
        describe('should throw errors', () => {

            it('TypeError - query is number', () => {
    
                expect(
                    () => {
                        recipeApi.searchRecipes(123, 'filter.php?c=')
                    }
                ).toThrowError(TypeError)

                expect(
                    () => {
                        recipeApi.searchRecipes(123, 'filter.php?c=')
                    }
                ).toThrowError('query 123 is not a string')

            })

            it('TypeError - query is array', () => {
                
                expect(
                    () => {
                        recipeApi.searchRecipes([1, 2, 3], 'filter.php?c=')
                    }
                ).toThrowError(TypeError)
                
                expect(
                    () => {
                        recipeApi.searchRecipes([1, 2, 3], 'filter.php?c=')
                    }
                ).toThrowError(`query ${[1, 2, 3]} is not a string`)
                                           
            })
            
            it ('TypeError - query is undefined', () => {

                expect(
                    () => {
                        recipeApi.searchRecipes(undefined, 'filter.php?c=')
                    }
                ).toThrowError(RequirementError)
                expect(
                    () => {
                        recipeApi.searchRecipes(undefined, 'filter.php?c=')
                    }
                ).toThrowError(`query is not optional`)
            })
             
            it('TypeError - query is empty', () => {
                
                expect(
                    () => {
                        recipeApi.searchRecipes('', 'filter.php?c=' )
                    }
                ).toThrowError(ValueError)
            
                expect(
                    () => {
                        recipeApi.searchRecipes('', 'filter.php?c=')
                    }
                ).toThrowError(`query is empty`)
            })

            // ****TEST PARA EL SELECTOR***
            it('TypeError - selector is number', () => {
                // esta es la estructura para ver si el método lanza un error
                // primero un expect para comprobar el tipo de Error
                expect(
                    () => {
                        recipeApi.searchRecipes('chinese', 123)
                    }
                ).toThrowError(TypeError)

                // segundo un expect para comprobar el mensaje de Error
                expect(
                    () => {
                        recipeApi.searchRecipes('chinese', 123)
                    }
                ).toThrowError(`selector ${123} is not a string`)

            })

            it('TypeError - selector is array', () => {
                
                expect(
                    () => {
                        recipeApi.searchRecipes('chinese', [1, 2, 3])
                    }
                ).toThrowError(TypeError)
                
                expect(
                    () => {
                        recipeApi.searchRecipes('chinese', [1, 2, 3],)
                    }
                ).toThrowError(`selector ${[1, 2, 3]} is not a string`)
                                           
            })

            it ('TypeError - selector is undefined', () => {

                expect(
                    () => {
                        recipeApi.searchRecipes('chinese', undefined)
                    }
                ).toThrowError(RequirementError)
                
                expect(
                    () => {
                        recipeApi.searchRecipes('chinese', undefined)
                    }
                ).toThrowError(`selector is not optional`)

            })
             

            it('TypeError - selector is empty', () => {

                expect(
                    () => {
                        recipeApi.searchRecipes('chinese', '')
                    }
                ).toThrowError(Error)
        
                expect(
                    () => {
                        recipeApi.searchRecipes('chinese', '')
                    }
                ).toThrowError(`selector is empty`)

            })
        })
    })

    describe('retrieve recipe', () => {
        //=> https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
        it('should succeed on correct id', () =>
            recipeApi.retrieveRecipe('52772')
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    expect(recipe.meals instanceof Array).toBeTruthy()
                    expect(recipe.meals.length).toBe(1)
                    expect(recipe.meals[0] instanceof Object).toBeTruthy()
                    expect(recipe.meals[0].idMeal).toBe('52772')
                })
        )

        describe('should throw errors', () => {

            it('TypeError - id is array', () => {
                expect( 
                    () => {
                        recipeApi.retrieveRecipe([])
                    }
                ).toThrowError(Error)
                expect(
                    () => {
                        recipeApi.retrieveRecipe([])
                    }
                ).toThrowError(`id  is not a string`)
            })
            
            it('TypeError - id is undefined', () => {
                expect( 
                    () => {
                        recipeApi.retrieveRecipe(undefined)
                    }
                ).toThrowError(Error)
                expect(
                    () => {
                        recipeApi.retrieveRecipe(undefined)
                    }
                ).toThrowError(`id is not optional`)
            })

            it('TypeError - id is empty', () => {
                expect( 
                    () => {
                        recipeApi.retrieveRecipe('')
                    }
                ).toThrowError(Error)
                expect(
                    () => {
                        recipeApi.retrieveRecipe('')
                    }
                ).toThrowError(`id is empty`)
            })
        })
    })
})

