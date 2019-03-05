import userApi from '../user-api'

/**
 * Abstraction of business logic.
 */
const logic = {
    __userId__: null,
    __userApiToken__: null,

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, age, description, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof age !== 'string') throw TypeError(age + ' is not a string')

        if (!age.trim().length) throw Error('age cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')

        if (!description.trim().length) throw Error('description cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return userApi.register(name, surname,age,description, email, password, passwordConfirmation)
            .then(() => { })
    },

    /**
     * Logs in the user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    logInUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')
        debugger
        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(email, password)
        .then(token => this.__userApiToken__ = token)
    },

     /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__userApiToken__ = null
    },

    createEvent(title, description, date, ubication, category,token){
        
        if (typeof title !== 'string') throw TypeError(title + ' is not a string')
        
        if (!title.trim().length) throw Error('title cannot be empty')
        
        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        
        if (!description.trim().length) throw Error('description cannot be empty')
        
        if (typeof date !== 'string') throw TypeError(date + ' is not a string')
        
        if (!date.trim().length) throw Error('date cannot be empty')
        
        if (typeof ubication !== 'string') throw TypeError(ubication + ' is not a string')
        
        if (!ubication.trim().length) throw Error('ubication cannot be empty')
        debugger
        if (typeof category !== 'string') throw TypeError(category + ' is not a string')
        
        if (!category.trim().length) throw Error('category cannot be empty')
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string')

        if (!token.trim().length) throw Error('token cannot be empty')
        
        return userApi.createEventUser(token,title, description, date, ubication, category)
            .then(() => {})
    }
}

export default logic
