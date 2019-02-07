import userApi from '../user-api'
import edamamApi from '../edamam-api'
/**
 * Logic for the smart-fridge app
 */
const logic = {
    setUserId(id) {
        this.___userId___ = id
    },

    getUserId() {
        return this.___userId___
    },

    setUserApiToken(token) {
        this.___userApiToken___ = token
    },

    getUserApiToken() {
        return this.___userApiToken___
    },

    setUser(user) {
        this.___user___ = user
    },

    getUser() {
        return this.___user___
    },

    set __userId__(id) {
        this.setUserId(id)
    },

    get __userId__() {
        return this.getUserId()
    },

    set __userApiToken__(token) {
        this.setUserApiToken(token)
    },

    get __userApiToken__() {
        return this.getUserApiToken()
    },

    set __user__(user) {
        this.setUser(user)
    },

    get __user__() {
        return this.getUser()
    },

    get userLoggedIn() {
        return (!!this.__userId__ && !!this.__userApiToken__)
    },

    logout() {
        this.__userId__ = null
        this.__userApiToken__ = null
        this.__user__ = null
    },
    /**
     * 
     * Toggles between pushing and deleting an id of a song to the array of favourite songs.
     * 
     * @param {object} recipe
     * @param {string} email 
     * @param {function} callback 
     */
    toggleFavourite(id, token, recipe) {

        let favArray = [recipe]

        this.retrieve(id, token).bind(this) 
            .then(user => {
                if (!user.favourites) {
                    let favourites = {}
                    favourites.favArray = favArray
                    logic.update(id, token, favourites)
                } else {
                    if (user.favourites.favArray) {
                        let userFavourites = user.favourites.favArray
                        userFavourites.push(favArray)
                        logic.update(id, token, userFavourites)
                    }
                }
            })

        // if (user.favourites.includes(recipe)) {
        //     const position= user.favourites.indexOf(recipe)

        //     user.favourites.splice(position, 1)
        // } else {
        //     user.favourites.push(recipe)
        // }
    },
    /**
     * Calculate the total amount of daily calories that the user needs based on his params.
     *
     * @param {string} gender
     * @param {number} height - cm
     * @param {number} weight - Kg
     * @param {string} birthYear - Y/M/D
     * @param {string} lifeStyle
     * 
     * @throws {Error} - On empty values
     * @throws {TypeError} - On different data types
     *
     */
    caloriesCounter(gender, height, weight, birthdateString, lifeStyle) { 

        const birthdate = new Date(birthdateString);
        const cur = new Date();
        const diff = cur-birthdate; // This is the difference in milliseconds
        const age = Math.floor(diff/31557600000); 

        if (typeof gender !== 'string') throw TypeError(gender + ' is not a string')

        if (!gender.trim().length) throw Error('gender cannot be empty')

        if (typeof height !== 'number') throw TypeError(height + ' is not a number')

        if (!(50 < height && height < 250)) throw Error(height + ' should be a number between 50 and 230')

        if (typeof weight !== 'number') throw TypeError(weight + ' is not a number')

        if (!(20 < weight && weight < 400)) throw Error(weight + ' should be a number between 20 and 400')
 
        if (typeof birthdateString !== 'string') throw TypeError(birthdateString + ' is not a string')
        
        if (!birthdateString.trim().length) throw Error('birthDate cannot be empty')
        
        if (typeof age !== 'number') throw TypeError(age + ' is not a number')

        if (!(15 < age && age < 120)) throw Error(age + ' must be between 15 and 120')
        
        if (typeof lifeStyle !== 'string') throw TypeError(lifeStyle + ' is not a string')
        
        if (!lifeStyle.trim().length) throw Error('lifeStyle cannot be empty')
        

        var totalCalories
        
        if(gender === "male"){
            const bmr =  (10 * weight) + (6.25 * height) - (5 * age) + 5
            
            if(lifeStyle === "sedentary"){
                totalCalories =  bmr * 1.53

            }else if(lifeStyle === "active"){

                totalCalories =  bmr * 1.76

            }else{
                totalCalories =  bmr * 2.25
            }

        }else if(gender === "female") {
            const bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161

            if(lifeStyle === "sedentary"){

                totalCalories =  bmr * 1.53

            }else if(lifeStyle === "active"){
                totalCalories =  bmr * 1.76

            }else{
                totalCalories =  bmr * 2.25
            }
        }    
        return Math.floor(Math.round(totalCalories)) 
    },
    /**
     * 
     * Registers a user.
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} username 
     * @param {string} password 
     * @param {string} passwordConfirm 
     * @param {string} gender 
     * @param {number} height 
     * @param {number} weight 
     * @param {string} birthDate 
     * @param {string} lifeStyle 
     * 
     * @throws {Error} - When length of arguments differs from 10
     */
    register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate, lifeStyle) {

        if (arguments.length < 10) throw Error('All arguments were not introduced in the function')

        if (arguments.length > 10) throw Error('Too many arguments were introduced in the function')

        return userApi.register(name, surname, username, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
            .then(id => {
                this.__userId__ = id
            })
    },
    /**
     * 
     * Logs In a user.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @throws {Error} - When length of arguments differs from 2
     */
    login(email, password) {

        if (arguments.length < 2) throw Error('All arguments were not introduced in the function')

        if (arguments.length > 2) throw Error('Too many arguments were introduced in the function')

        return userApi.authenticate(email, password)
            .then(({ id, token }) => {
                this.__userId__ = id
                this.__userApiToken__ = token
            })
    },
    /**
     * 
     * Retrieves data of a user.
     * 
     * @param {string} id 
     * @param {string} token 
     * 
     * @throws {Error} - When length of arguments differs from 2
     */
    retrieve(id, token) {

        if (arguments.length < 2) throw Error('All arguments were not introduced in the function')

        if (arguments.length > 2) throw Error('Too many arguments were introduced in the function')

        return userApi.retrieve(id, token)
            .then((user) => {
                this.__user__ = user
            })
    },
    /**
     * 
     * Updates user information.
     * 
     * @param {string} id 
     * @param {string} token 
     * @param {object} data 
     * 
     * @throws {Error} - When length of arguments differs from 3
     */
    update(id, token, data) {
        if (arguments.length < 3) throw Error('All arguments were not introduced in the function')

        if (arguments.length > 3) throw Error('Too many arguments were introduced in the function')

        return userApi.update(id, token, data)
    },
    /**
     * 
     * Removes a user from the database.
     * 
     * @param {string} id 
     * @param {string} token 
     * @param {string} username 
     * @param {string} password 
     * 
     * @throws {Error} - When length of arguments differs from 4
     */
    remove(id, token, username, password) {
        if (arguments.length < 4) throw Error('All arguments were not introduced in the function')

        if (arguments.length > 4) throw Error('Too many arguments were introduced in the function')

        return userApi.remove(id, token, username, password)
    }, 
    /**
     * 
     * Searches for recipes with the desired query.
     * 
     * @param {string} query 
     * @param {string} calories
     * @param {string} diet 
     * @param {Array} healthArray
     * 
     * @throws {Error} - On non-existing required params
     * @throws {TypeError} - On query data type different than string
     */
    search(query, calories, diet, healthArray) {

        
        if (calories === undefined) throw Error('Calories range was not input')
        
        if (typeof calories !== 'string') throw TypeError(calories + ' is not a string')

        let myDiet
        
        if (diet) {
            if (typeof diet !== 'string') throw TypeError(diet + ' is not a string')

            else if (diet === 'indifferent') {
                myDiet = ''
            } else {
                myDiet = '&diet=' + diet
            }
        }
        
        let health

        if (healthArray.length > 0 || healthArray.length === undefined) {
            if (!(healthArray instanceof Array)) throw TypeError(healthArray + ' is not an array')
            const res = []
            
            healthArray.forEach(element => {
                res.push('&health=' + element)
            });
            
            health = res.join('')
        } else {
            health = ''
        }
        
        const toCalories = `&calories=${Math.round(calories/2)}-` + calories

        return edamamApi.search(query, toCalories, myDiet, health)
    },












































/**
 * 
 * find the recipeUri amound all the recipes
 * 
 * @param {string} recipeUri 
 * @param {array} recipes 
 * 
 * @throws {Error} wheh recipeUri is not found in recipes
 * @throws {TypeError} - On different argument types
 * 
 * @return {Object} - Recipe found
 */
    detail(recipeUri, recipes){

        if (typeof recipeUri !== 'string') throw TypeError(recipeUri + ' is not a string')

        if (!recipeUri.trim().length) throw Error(recipeUri + ' cannot be empty')

        if (recipes.constructor !== Array) throw TypeError(recipes + ' is not an array')

        let recipe=null
        
        recipes.find( element => {
            if(element.recipe.uri===recipeUri){
                recipe=element.recipe
            }
        })
        if (!!recipe) return recipe
        else throw Error('Details are not found')
    },

  /**
   * 
   * @param {array} ingredientsRecipe 
   * @param {array} ingredientsQuery 
   * 
   * @throws {Error} wheh recipeUri is not found in recipes
   * @throws {TypeError} - On different arguments types
   * 
   * @return {object} - fridge and shopping creates
   */
    generateLists(ingredientsRecipe, ingredientsQuery){

        if (ingredientsRecipe.constructor !== Array) throw TypeError(ingredientsRecipe + ' is not an array')

        if (ingredientsRecipe.length <1) throw Error(ingredientsRecipe + ' cannot be empty')

        if (ingredientsQuery.constructor !== Array) throw TypeError(ingredientsQuery + ' is not an array')

        if (ingredientsQuery.length <1) throw Error(ingredientsQuery + ' cannot be empty')
    
        let fridge =[]
        let shopping=[]

        ingredientsRecipe.forEach(ingredientRecipe=>{
            let compare= ingredientsQuery.find(ingredientQuery=>{
                return ingredientRecipe.toLowerCase().includes(ingredientQuery.toLowerCase()) 
            })
            if (compare) fridge.push(ingredientRecipe)
            else(shopping.push(ingredientRecipe))
        })

        return {fridge, shopping}
    }
}

export default logic