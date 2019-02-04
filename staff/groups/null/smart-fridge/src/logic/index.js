import userApi from '../user-api'
import edamamApi from '../edamam-api'
/**
 * Logic for the smart-fridge app
 */
const logic = {
    /**
     * Calculate the total amount of diary calories
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

    register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate, lifeStyle) {

        if (arguments.length < 10) throw Error('All arguments were not introduced in the function')

        if (arguments.length > 10) throw Error('Too many arguments were introduced in the function')

        return userApi.register(name, surname, username, password, passwordConfirm, gender, birthDate, height, weight, lifeStyle)
    },

    login(email, password) {

        if (arguments.length < 2) throw Error('All arguments were not introduced in the function')

        if (arguments.length > 2) throw Error('Too many arguments were introduced in the function')

        return userApi.authenticate(email, password)
    },

    retrieve(id, token) {

        if (arguments.length < 2) throw Error('All arguments were not introduced in the function')

        if (arguments.length > 2) throw Error('Too many arguments were introduced in the function')

        return userApi.retrieve(id, token)
    },

    update(id, token, data) {
        if (arguments.length < 3) throw Error('All arguments were not introduced in the function')

        if (arguments.length > 3) throw Error('Too many arguments were introduced in the function')

        return userApi.update(id, token, data)
    },

    remove(id, token, username, password) {
        if (arguments.length < 4) throw Error('All arguments were not introduced in the function')

        if (arguments.length > 4) throw Error('Too many arguments were introduced in the function')

        return userApi.remove(id, token, username, password)
    }, 
    search(query, calA, calB, diet, health) {
        
        if (calA === undefined || calB === undefined) throw Error('Calories range was not input')

        if (typeof calA === 'number' && typeof calB === 'number') {
            if (calA > calB) throw Error('Cannot calculate this range of calories')
        }

        if (diet) {
            if (typeof diet !== 'string') throw Error(diet + ' is not a string')
        }

        if (health) {
            if (typeof health !== 'string') throw Error(health + ' is not a string')
        }

        return edamamApi.search(query, calA, calB, diet, health)
    }
}

export default logic