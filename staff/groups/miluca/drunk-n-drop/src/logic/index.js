import normalize from '../common/normalize'
import validate from '../common/validate'
import userApi from '../data/user-api'
import cocktailApi from '../data/cocktail-api'
import { LogicError } from '../common/errors'
import call from '../common/call';


const logic = {

    set __userId__(id) {
        sessionStorage.userId = id
    },

    get __userId__() {
        return normalize.undefinedOrNull(sessionStorage.userId)
    },

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!(this.__userId__ && this.__userToken__)
    },


    registerUser(name, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return userApi.create(email, password, { name })
            .then(response => {
                if (response.status === 'OK') return

                throw new LogicError(response.error)
            })
    },

    logoutUser() {
        sessionStorage.clear()
    },

    retrieveUser() {

        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                if(response.status === 'OK') {
                    const {data: {username: email, name, favorites, creations}} = response
 
                    return {email, name, favorites, creations}
                } else throw new LogicError(response.error)
            })
    },

    loginUser(email, password) {
        validate.arguments([
            {name: 'email', value: email, type: 'string', notEmpty: true},
            {name: 'password', value: password, type: 'string', notEmpty: true}
        ])

        validate.email(email)
    
        return userApi.authenticate(email, password) 
            .then(response => {
            
                if (response.status === 'OK') {
            
                    const { data: { id, token } } = response
                    
                    this.__userId__ = id
                    this.__userToken__ = token
                } else throw new LogicError(response.error)
            })
    },
    
    toggleFavoriteCocktail(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ]) 

        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                const { status, data } = response
                if (status === 'OK') {
                    const { favorites = [] } = data
                    const index = favorites.indexOf(id)
                    if (index < 0) favorites.push(id)
                    else favorites.splice(index, 1)
                    return userApi.update(this.__userId__, this.__userToken__, { favorites })
                        .then(() => { })
                }

                throw new LogicError(response.error)
            })
    },

    searchByCategory(query) {
        validate.arguments([
            {name : 'query ' , value: query , type : 'string'}
        ])

        return cocktailApi.searchByCategory(query)
        .then(response =>{
            const categories=response.drinks
            return categoryFilter(categories)
        })
        
            
    },
    retriveFavorites(){

        return userApi.retrieve(this.__userId__,this.__userToken__)
        .then(response => {
            
            const {status ,data } = response

            if(data.favorites.length>0){
                
                const {favorites = [] } = data
                   
                 return filterDetails(favorites)
            }
            else throw Error('No existen favoritos')

            
        })
       

    },
    cocktailbyGlass(query){
        validate.arguments([
            {name: 'query', value: query, type: 'string', notEmpty: true},
           ])

        return cocktailApi.searchByGlass(query)
           .then(response => {
               if (response.length > 0){
                   return
               }
               else throw new LogicError(response.error)
               
           })
    },

    popularCocktails(){
        return cocktailApi.listPopular()
            .then(({drinks}) =>{
               
                return filter(drinks)
            })
    },

    cocktailbyName(query){
        validate.arguments([
            {name: 'query', value: query, type: 'string', notEmpty: false},
           ])
           
        
        return cocktailApi.searchCocktail(query)
                 
           .then((response) => {
               const {drinks} = response

               if(drinks.length)
               return filter(drinks)

            })
            .catch(() =>{
                
                throw Error('NO EXISTEN COINCIDENCIAS')
             })
           
    
    },
    cocktailDetail(id){
        validate.arguments([
            {name: 'id', value: id, type: 'string', notEmpty: true},
           ])

        return cocktailApi.searchById(id)
        
           .then(response => {
               if (response.drinks.length > 0){
                  
                    return filter(response.drinks)
               }
               else throw new LogicError(response.error)
               
           })
    
    }

}

function categoryFilter(rawcategories){
    let drinks=[]
    for(let i=0 ; i<rawcategories.length ; i++){
        drinks.push({
            id:rawcategories[i].idDrink,
            name:rawcategories[i].strDrink,
            image:rawcategories[i].strDrinkThumb
        })
    }
    return drinks
}


function filterDetails(details){

    if(details.length){
        const calls = details.map((id) => cocktailApi.searchById(id)
            .then(({drinks}) => {
                drinks.forEach(drink => {
                    Object.keys(drink).forEach(key => {
                        if(drink[key] === null  || drink[key].trim() == '') {
                            delete drink[key]
                        } 
                    })
                })
                
                return drinkFormater(drinks)
            })
            
        )
        return Promise.all(calls)
    }
}


function filter(drinks){
    let calls =[]
    
    if(drinks.length){
        calls = drinks.forEach(drink => {
                    Object.keys(drink).forEach(key => {
                        if(drink[key] === null  || drink[key].trim() === '') {
                            delete drink[key]
                        } 
                    })
                })
    
                return drinkFormater(drinks)
            }
        
        return Promise.all(calls)
}


function drinkFormater(rawdrinks){ //array
    let drinks = []
    let ingredients
    let drinkdetails
    for(let j=0 ; j<rawdrinks.length ; j++){
        drinkdetails=rawdrinks[j]
        ingredients =[]
        const drinkeys = Object.keys(drinkdetails)
        const ingredientindex = drinkeys.indexOf('strIngredient1')
        const measuresindex = drinkeys.indexOf('strMeasure1')
        for( let i=0;i < drinkeys.length; i++){
            if(i >= ingredientindex && i < measuresindex)ingredients.push({
                ingredientName: drinkdetails[drinkeys[i]],
                measure: drinkdetails[drinkeys[(i-ingredientindex)+measuresindex]],
                image: `https://www.thecocktaildb.com/images/ingredients/${drinkdetails[drinkeys[i]]}.png`
            })
        }

        drinks.push({
            id: drinkdetails.idDrink,
            name: drinkdetails.strDrink,
            category: drinkdetails.strCategory, 
            alcohol:  drinkdetails.strAlcoholic, 
            glass: drinkdetails.strGlass,
            instructions:  drinkdetails.strInstructions,  
            image:  drinkdetails.strDrinkThumb, 
            ingredients
        })
       if(rawdrinks.length === 1) return drinks[0]
    }
    return drinks
}

export default logic