import validate from '../../common/validate'
import call from '../../common/call'


//https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin


const cocktailApi = {

     __url__: 'https://www.thecocktaildb.com/api/json/v1/1',

        searchByingredient(query){
            validate.arguments([
                {name: 'query' , value :query , type: 'string'}
            ])

            return call(`${this.__url__}/filter.php?i=${query}`)
            .then(response => response.json())
        },


        searchCocktail(query) {
            validate.arguments([
                {name: 'query', value: query, type: 'string'}
            ])
            
            return call(`${this.__url__}/search.php?s=${query}`)
            .then(response => response.json())
        }

        


}



export default cocktailApi









