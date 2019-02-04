import userApi from '../user-api'
import edamamApi from '../edamam-api'
/**
 * Logic for the smart-fridge app
 */
const logic = {
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
     * @param {number} calA 
     * @param {number} calB 
     * @param {string} diet 
     * @param {string} health 
     * 
     * @throws {Error} - On non-existing required params
     * @throws {TypeError} - On query data type different than string
     */
    search(query, calA, calB, diet, health) {
        
        if (calA === undefined || calB === undefined) throw Error('Calories range was not input')

        if (typeof calA === 'number' && typeof calB === 'number') {
            if (calA > calB) throw Error('Cannot calculate this range of calories')
        }

        if (diet) {
            if (typeof diet !== 'string') throw TypeError(diet + ' is not a string')
        }

        if (health) {
            if (typeof health !== 'string') throw TypeError(health + ' is not a string')
        }

        return edamamApi.search(query, calA, calB, diet, health)
    }
}

export default logic