const { call, validate } = require('pro-skate-common')
require('dotenv').config()

// const {
//     env: { REACT_APP_SERVER: url }
//   } = process;

const dataApi = {
    __url__: 'http://localhost:8080/api',
    __timeout__: 0,


    /** CRUD USER */

    createUser(name, surname, email, password, age, imageUrl ) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'age', value: age, type: 'string', notEmpty: true }
        ])
        return (async ()=> {
            const isCreated = await call(`${this.__url__}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: { name, surname, email, password, age }
            })
                return isCreated
        })()
    },

    authenticate(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])
        return( async () => {
            
            const res = await call(`${this.__url__}/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: { email, password }
            })
            const { token } = res
            return token

        })()

    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])
        return ( async ()=>{
            const res = await call(`${this.__url__}/users`, {
                headers: { Authorization: `Bearer ${token}` },
                timeout: this.__timeout__
            })
            return res
        })()
    },

    updateUser(token, name, surname, email, age, imageUrl) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'age', value: age, type: 'string'}
        ])

        return ( async ()=> {
            const res = await call(`${this.__url__}/users`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: { name, surname, email, age, imageUrl },
                timeout: this.__timeout__
            }
        )
        return res
        
        })()
    },

    deleteUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])
        return ( async ()=> {
            const res = await call(`${this.__url__}/users`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: this.__timeout__
            }
        )
        return res
        })()
    },

    /**  PRODUCT METHODS */

    retrieveProduct(productId){
        validate.arguments([
            { name: 'productId', value: productId, type: 'string', notEmpty: true }
        ])
        return ( async ()=> {
            const res = await call(`${this.__url__}/products/${productId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const product  = res
            return product
        })()

    },

    retrieveAllProducts(){
        return ( async ()=> {
            const res = await call(`${this.__url__}/products`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const products  = res
            return products
        })()
    },

    toggleWhishProduct(token, productId){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'productId', value: productId, type: 'string', notEmpty: true }
        ])
        return( async () => {
            const res = await call(`${this.__url__}/users/whishlist`, {
                method: 'POST',
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: { productId }
            })
            const { message } = res
            return message
        })()
    },

    retrieveWishList(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])
        return( async () => {
            
            const res = await call(`${this.__url__}/users/whishlist`, {
                method: 'GET',
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            })
            const  whishlist  = res
            return whishlist
        })()
    },

    retrieveWishList(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])
        return( async () => {
            debugger
            const res = await call(`${this.__url__}/users/whishlist`, {
                method: 'GET',
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            })
            const  whishlist  = res
            return whishlist
        })()
    },

    addProductToCart(token, quantity ,productId){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'quantity', value: quantity, type: 'number', notEmpty: true },
            { name: 'productId', value: productId, type: 'string', notEmpty: true }
        ])
        debugger
        const quantityStr = quantity.toString() 
        debugger
        return( async () => {
            const res = await call(`${this.__url__}/users/cart`, {
                method: 'POST',
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: { productId , quantity: quantityStr }
            })
            const { message } = res
            return message
        })()
    },

    retrieveCart(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])
        return( async () => {
            debugger
            const res = await call(`${this.__url__}/users/cart`, {
                method: 'GET',
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            })
            const  cart  = res
            return cart
        })()
    },

    checkoutCart(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])
        return( async () => {
            const res = await call(`${this.__url__}/users/checkout`, {
                method: 'POST',
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            })
            const  { message }  = res
            return message
        })()
    },

    retrieveHistoric(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])
        return( async () => {
            const res = await call(`${this.__url__}/users/historic`, {
                method: 'GET',
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            })
            const  historic  = res
            return historic
        })()
    },

    retrieveProductsByTag(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])
        debugger
        return( async () => {
            const res = await call(`${this.__url__}/products/?tag=`, {
                method: 'GET',
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            })
            const  productsByTag  = res
            return productsByTag
        })()
    }

}

module.exports = dataApi