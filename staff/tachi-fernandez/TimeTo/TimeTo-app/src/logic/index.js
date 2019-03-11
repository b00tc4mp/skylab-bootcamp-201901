import userApi from '../user-api'
import ListComments from '../components/List-comments';

/**
 * Abstraction of business logic.
 */
const logic = {
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

        debugger
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
        
        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(email, password)
        .then(token => this.__userApiToken__ = token)
    },

     /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        //TODO validation
        return !!this.__userApiToken__
    },

    /**
     * Logs out the user.
     */
    logOutUser() {
        debugger
        this.__userApiToken__ = null
        
    },

    retrieveUser() {
        debugger
        return userApi.retrieveUser(this.__userApiToken__)
            .then(({id,name, surname,age,description, email,events = []}) => ({
                id,
                name,
                surname,
                age,
                description,      
                email,
                events
            }))
    },

    retrieveUserById(usersId) {
        if (typeof usersId !== 'string') throw TypeError(usersId + ' is not a string')

        if (!usersId.trim().length) throw Error('usersId cannot be empty')

        return userApi.retireveUserById(usersId,this.__userApiToken__)
            .then(({id,name, surname,age,description, email,events = []}) => ({
                id,
                name,
                surname,
                age,
                description,      
                email,
                events
            }))
    },



    createEvent(title, description, date, ubication, category){

        
        if (typeof title !== 'string') throw TypeError(title + ' is not a string')
        
        if (!title.trim().length) throw Error('title cannot be empty')
        
        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        
        if (!description.trim().length) throw Error('description cannot be empty')
        
        if (typeof date !== 'string') throw TypeError(date + ' is not a string')
        
        if (!date.trim().length) throw Error('date cannot be empty')
        
        if (typeof ubication !== 'string') throw TypeError(ubication + ' is not a string')
        
        if (!ubication.trim().length) throw Error('ubication cannot be empty')

        if (typeof category !== 'string') throw TypeError(category + ' is not a string')
        
        if (!category.trim().length) throw Error('category cannot be empty')
    
        
        return userApi.createEventUser(title, description, date, ubication, category, this.__userApiToken__)
            .then(() => {})
    },

    listEventsByQuery(query){
        if (typeof query !== 'string') throw TypeError(query + ' is not a string')
        
        if (!query.trim().length) throw Error('query cannot be empty')

        return userApi.listEventsByQuery(query, this.__userApiToken__)
            .then(response => response )
    },

    listEventsByCategory(categoryId){
        if (typeof categoryId !== 'string') throw TypeError(categoryId + ' is not a string')
        
        if (!categoryId.trim().length) throw Error('categoryId cannot be empty')

        return userApi.listEventsByCategory(categoryId,this.__userApiToken__)
            .then(response => response )
    },

    listEventById(eventId){
        if (typeof eventId !== 'string') throw TypeError(eventId + ' is not a string')
        
        if (!eventId.trim().length) throw Error('eventId cannot be empty')

        return userApi.listEventById(eventId,this.__userApiToken__)
            .then(response => response )
    },

    createComment(eventId,text){
        if (typeof eventId !== 'string') throw TypeError(eventId + ' is not a string')
        
        if (!eventId.trim().length) throw Error('eventId cannot be empty')

        if (typeof text !== 'string') throw TypeError(text + ' is not a string')
        
        if (!text.trim().length) throw Error('text cannot be empty')
        return userApi.createComment(eventId , text,this.__userApiToken__)    
        .then(() => {})
    },

    listComments(eventId){
        if (typeof eventId !== 'string') throw TypeError(eventId + ' is not a string')
        
        if (!eventId.trim().length) throw Error('eventId cannot be empty')

        return userApi.listComments(eventId,this.__userApiToken__)
            .then(response =>{
               return  response
            }) 
    },

    deleteComment(eventId,commentId){
        if (typeof eventId !== 'string') throw TypeError(eventId + ' is not a string')
        
        if (!eventId.trim().length) throw Error('eventId cannot be empty')

        if (typeof commentId !== 'string') throw TypeError(commentId + ' is not a string')
        
        if (!commentId.trim().length) throw Error('commentId cannot be empty')

        return userApi.deleteComment(eventId,commentId,this.__userApiToken__)
            .then(() => {})
    },

    toogleEvent(eventId){
        if (typeof eventId !== 'string') throw TypeError(eventId + ' is not a string')
        
        if (!eventId.trim().length) throw Error('eventId cannot be empty')

        return userApi.toogleEvent(eventId,this.__userApiToken__)
            .then(response =>{
               return  response
            }) 
    },

}

export default logic
