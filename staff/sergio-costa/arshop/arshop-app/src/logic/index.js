'use strict'

import arshopApi from '../arshop-api'
import { type } from 'os';

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
    registerUser(name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return arshopApi.registerUser(name, surname, email, password, passwordConfirmation)
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

        return arshopApi.authenticateUser(email, password)
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

    /**
     * Retrieves a User
     */
    retrieveUser() {
        return arshopApi.retrieveUser(this.__userApiToken__)
            .then(({ id, name, surname, email, products = [], favoriteProducts = [], imageUrl = null, coversations = [] }) => ({
                id,
                name,
                surname,
                email,
                products,
                favoriteProducts,
                imageUrl,
            }))
    },

    /**
     * Updates user info
     * 
     * @param {Object} data 
     */
    updateUser(data) {
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return arshopApi.updateUser(this.__userApiToken__, data)
            .then((user) => user)
    },

    /**
     * Create a Product a put his id into user.products
     * 
     * @param {Object} product 
     */
    createProduct(product) {
        if (product.constructor !== Object) throw TypeError(`${product} is not an object`)

        return arshopApi.createProduct(this.__userApiToken__, product)
    },

    /**
     * Retrieves all Products
     */
    retrieveProducts() {
        return arshopApi.retrieveProducts()
    },

    /**
     * Retrieves a Product by his Id
     * 
     * @param {string} productId 
     */
    retrieveProduct(productId) {
        if (typeof productId !== 'string') throw TypeError(productId + ' is not a string')
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return arshopApi.retrieveProduct(productId)
    },

    /**
     * Retrieves a Product of user
     */
    retrieveUserProducts() {
        return arshopApi.retrieveUserProducts(this.__userApiToken__)
    },

    /**
     * Updates a porduct user
     * 
     * @param {string} productId 
     * @param {Object} data 
     */
    updateProduct(productId, data) {
        if (typeof productId !== 'string') throw TypeError(productId + ' is not a string')
        if (!productId.trim().length) throw Error('productId cannot be empty')

        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return arshopApi.updateProduct(this.__userApiToken__, productId, data)
    },

    /**
     * toogle true of false of product.sold
     * 
     * @param {string} productId 
     */
    toogleSold(productId) {
        if (typeof productId !== 'string') throw TypeError(productId + ' is not a string')
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return arshopApi.toogleSold(this.__userApiToken__, productId)
    },

    /**
     * add and delete product from favorites
     * 
     * @param {string} productId 
     */
    toogleFav(productId) {

        if (typeof productId !== 'string') throw TypeError(productId + ' is not a string')
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return arshopApi.toogleFav(this.__userApiToken__, productId)
    },

    /**
     * retrieves all favorites products from user
     * 
     */
    retrieveFavs() {
        return arshopApi.retrieveFavs(this.__userApiToken__)
    },

    /**
     * search products by query
     * 
     * @param {string} q 
     * @param {string} qcategory 
     * @param {string} qcity 
     */
    searchProducts(q, qcategory, qcity) {
        if (q !== undefined || null) {
            if (typeof q !== 'string') throw TypeError(`${q} is not a string`)
            if (!q.trim().length) throw Error('query cannot be empty')
        }
        if (qcategory !== undefined || null) {
            if (typeof qcategory !== 'string') throw TypeError(`${qcategory} is not a string`)
            if (!qcategory.trim().length) throw Error('category cannot be empty')
        }
        if (qcity !== undefined || null) {
            if (typeof qcity !== 'string') throw TypeError(`${qcity} is not a string`)
            if (!qcity.trim().length) throw Error('city cannot be empty')
        }
        return arshopApi.searchProducts(q, qcategory, qcity)
    },

    /**
     * save a product image
     * 
     * @param {string} productId 
     * @param {Object} data 
     */
    uploadProductImg(productId, data) {
        if (typeof productId !== 'string') throw TypeError(productId + ' is not a string')
        if (!productId.trim().length) throw Error('productId cannot be empty')

        if (!data) throw Error('data is empty')
        // if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return arshopApi.uploadProductImg(this.__userApiToken__, productId, data)
            // .then(({ product }) => product)
    },

    /**
     * save a user image
     * 
     * @param {Object} data 
     */
    uploadUserImg(data) {
        if (!data) throw Error('data is empty')
        // if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return arshopApi.uploadUserImg(this.__userApiToken__, data)
            // .then(({ product }) => product)
    },

    /**
     * Retrieve the owner of a product
     * 
     * @param {string} productId 
     */
    retrieveUserFromProducts(productId){
        if (typeof productId !== 'string') throw TypeError(productId + ' is not a string')
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return arshopApi.retrieveUserFromProducts(productId)
    },

    /**
     * retrieve user by his Id
     * 
     * @param {string} userId 
     */
    retrieveUserWithId(userId){
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return arshopApi.retrieveUserWithId(userId)
    },

    /**
     * retrieve all products from a user
     * 
     * @param {string} userId 
     */
    retrieveProductsFromUserId(userId){
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return arshopApi.retrieveProductsFromUserId(userId)
    },

    /**
     * create a chat with two users
     * 
     * @param {string} userId 
     */
    createChat(userId){
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return arshopApi.createChat(this.__userApiToken__, userId)
    },

    /**
     * send a message
     * 
     * @param {string} chatId 
     * @param {string} text 
     */
    sendMessage(chatId, text){

        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId cannot be empty')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)
        if (!text.trim().length) throw Error('text cannot be empty')

        return arshopApi.sendMessage(this.__userApiToken__, chatId, text)
    },
    
    /**
     * Retrieve all chats from a user
     */
    retrieveChats() {
        return arshopApi.retrieveChats(this.__userApiToken__)
    },

    /**
     * Retrieve messages from a chat with his Id
     * 
     * @param {string} chatId 
     */
    retrieveMessagesFromChat(chatId){
        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId cannot be empty')

        return arshopApi.retrieveMessagesFromChat(this.__userApiToken__, chatId)
    },

    /**
     * Save a 3d Object
     * 
     * @param {string} productId 
     * @param {file} object3d 
     */
    saveObject3d(productId, object3d) {
        if(typeof productId !== 'string')throw Error(`${productId} is not a string`)
        if(!productId.trim().length)throw Error('productId cannot be empty')

        return arshopApi.saveObject3d(this.__userApiToken__, productId, object3d)
    },
}

export default logic