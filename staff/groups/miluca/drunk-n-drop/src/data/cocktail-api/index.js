import validate from '../../common/validate'
import call from '../../common/call'



const cocktailApi = {

     __url__: 'https://www.thecocktaildb.com/api/json/v2/8673533',

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
        },

        searchByCategory(query) {
            validate.arguments([
                {name : 'query ' , value: query , type : 'string'}
            ])

            return call(`${this.__url__}/filter.php?c=${query}`)
            .then(response => response.json())
        },

        searchByAlcoholics(query) {
            validate.arguments([
                {name : 'query ' , value: query , type : 'string'}
            ])

            return call(`${this.__url__}/filter.php?a=${query}`)
            .then(response => response.json())
        },   
        
        searchByGlass(query) {
            validate.arguments([
                {name: 'query', value: query, type: 'string'}
            ])        
    
            return call(`${this.__url__}/filter.php?g=${query}`)
            .then(response => response.json())
        },

        searchByMultiIngredient(query) {
            validate.arguments([
                {name: 'query', value: query, type: 'string'}
            ])        
    
            return call(`${this.__url__}/filter.php?i=${query}`)
            .then(response => response.json())
        },
        searchById(query){
            validate.arguments([
                {name: 'query', value: query, type: 'string'}
            ])
            
            return call(`${this.__url__}/lookup.php?i=${query}`)
            .then(response => response.json())

        },

        listPopular(){
            return call(`${this.__url__}/popular.php`)
            .then(response => response.json())

        }
}


export default cocktailApi









