/* import userApi from '../user-api' */
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
     * @param {string} activity
     * 
     * @throws {Error} - On empty values
     * @throws {TypeError} - On different data types
     *
     */
    caloriesCounter(gender, height, weight, birthdateString, activity) { 

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
        
        if (typeof activity !== 'string') throw TypeError(activity + ' is not a string')
        
        if (!activity.trim().length) throw Error('activity cannot be empty')
        

        var totalCalories
        
        if(gender === "male"){
            const bmr =  (10 * weight) + (6.25 * height) - (5 * age) + 5
            
            if(activity === "sedentary"){
                totalCalories =  bmr * 1.53

            }else if(activity === "active"){

                totalCalories =  bmr * 1.76

            }else{
                totalCalories =  bmr * 2.25
            }

        }else if(gender === "female") {
            const bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161

            if(activity === "sedentary"){

                totalCalories =  bmr * 1.53

            }else if(activity === "active"){
                totalCalories =  bmr * 1.76

            }else{
                totalCalories =  bmr * 2.25
            }
        }    
        return Math.floor(Math.round(totalCalories)) 
    }   
}

export default logic