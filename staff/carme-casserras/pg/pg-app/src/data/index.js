import validate from '../../../common/validate'
import call from '../../../common/call'

const pgApi = {

    __url__: 'https://localhost:3000/api/',
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
            body: JSON.stringify({name, email, password}),
            timeout: this.__timeout__
        })

        .then(res => res.json())
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
            body: JSON.stringify({email, password}),
            timeout: this.__timeout__
        })

        .then(res => res.json())
    },

    retrieveUser(token) {

        validate.arguments([
            { name: 'taken', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users/${id}`, {
            headers: { Authorization: `Bearer ${token}`},           
            timeout: this.__timeout__
        })

        .then(res => res.json())
    },

    addThing(category, description, token, locId) {

        validate.arguments([
            // { name: 'image', value: image, type: 'object', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'locId', value: locId, type: 'string', notEmpty: true },
        ])

        return call(`${this.__url__}/things`, {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
            body: JSON.stringify({category, description, locId}),
            timeout: this.__timeout__
        })

        .then(res => res.json())
    },

    updateThing(token, id, status) {

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
            body: JSON.stringify({id, status}),
            timeout: this.__timeout__
        })

        .then(res => res.json())
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

        .then(res => res.json())
    },

    searchByLocation(location) {

        validate.arguments([           
            { name: 'location', value: location, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/search/locations//${location}`, {
            headers: { 'Content-Type': 'application/json'},
            timeout: this.__timeout__
        })

        .then(res => res.json())
    },

    retrivePrivateThings(token) { 
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ]) 

        return call(`${this.__url__}/search/user/things`, {
            headers: { Authorization: `Bearer ${token}`},           
            timeout: this.__timeout__
        })

        .then(res => res.json())
    },
    
    retrieveThing(thingId) {
        
        validate.arguments([          
            { name: 'thingId', value: thingId, type: 'string', notEmpty: true },
        ])

        return call(`${this.__url__}/thing/${thingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
            timeout: this.__timeout__
        })
        .then(res => res.json())
    }
}

export default pgApi