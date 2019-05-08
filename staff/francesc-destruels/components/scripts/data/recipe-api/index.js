import validate from '../../common/validate'
import call from '../../common/call'

const recipeApi = {
    __url__: 'https://www.themealdb.com/api/json/v1/1/',

    searchRecipes(query,selector) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' },
            { name: 'selector', value: selector, type: 'string' }
        ])
        
        return call(`${this.__url__}${selector}${query}`)
            .then(response => response.json())
    },

    retrieveRecipe(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        return call(`${this.__url__}lookup.php?i=${id}`)
            .then(response => response.json())
    }
}

export default recipeApi