import recipeApi from '.'

describe('recipe api', () => {
    describe('search recipes', () => {
        fit('should succeed on correct query and selector for ingredients', () =>
            recipeApi.searchRecipes('tomato','filter.php?i=')
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    // expect(recipe.length).toBe(13)
                })
        )
    })

    describe('search recipes', () => {
        fit('should succeed on correct id', () =>
            recipeApi.retrieveRecipe('52772')
                .then(recipe => {
                    expect(recipe).toBeDefined()
                    expect(recipe instanceof Object).toBeTruthy()
                    // expect(recipe.length).toBe(13)
                })
        )
    })

    // TODO other cases
})