import validate from 'pg-validate'
import call from 'pg-call'

const pgApi = {

    __url__: 'http://localhost:8080/api',
    __timeout__: 0,

    registerUser(name, email, password) {

        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)
        
        return call(`${this.__url__}/users`, {
            
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: {name, email, password},
            timeout: this.__timeout__
        })
        
    },

    authenticateUser(email, password) {

        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)        

        return call(`${this.__url__}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: {email, password},
            timeout: this.__timeout__
        })
        
        // con axios no es necesario
        // .then(res => res)
    },

    retrieveUser(token) {

        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            
        ])

        return call(`${this.__url__}/users`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
        })
        // con axios no es necesario
        // .then(res => res.json())
    },

    addPublicThing(formData, token) {

        validate.arguments([
            { name: 'formData', value: formData, type: 'object', optional: false },          
            { name: 'token', value: token, type: 'string', notEmpty: true },            
        ])

        return call(`${this.__url__}/things`, {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'},
            body: formData,
            timeout: this.__timeout__
        })
    },

    updatePublicThing(token, id, status) {

        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'status', value: status, type: 'number'}
        ])

        return call(`${this.__url__}//things/update/${id}`, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
            body: ({id, status}),
            timeout: this.__timeout__
        })
    },

    searchByCategory(token, category) {

        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/search/category/${category}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
            timeout: this.__timeout__
        })
    },

    searchByLocation(token, location) {

        validate.arguments([           
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'location', value: location, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/search/locations/${location}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
            timeout: this.__timeout__
        })
    },

    retrivePrivateThings(token) { 
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ]) 

        return call(`${this.__url__}/search/user/things`, {
            headers: { Authorization: `Bearer ${token}`},           
            timeout: this.__timeout__
        })
    },
    
    retrieveThing(token, thingId) {
        
        validate.arguments([          
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'thingId', value: thingId, type: 'string', notEmpty: true },
        ])

        return call(`${this.__url__}/thing/${thingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
            timeout: this.__timeout__
        })
    }
}

export default pgApi