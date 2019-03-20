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

    updateUser(data) {
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return arshopApi.updateUser(this.__userApiToken__, data)
            .then((user) => user)
    },

    createProduct(product) {
        if (product.constructor !== Object) throw TypeError(`${product} is not an object`)

        return arshopApi.createProduct(this.__userApiToken__, product)
    },

    retrieveProducts() {
        return arshopApi.retrieveProducts()
    },

    retrieveProduct(productId) {
        if (typeof productId !== 'string') throw TypeError(productId + ' is not a string')
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return arshopApi.retrieveProduct(productId)
    },

    retrieveUserProducts() {
        return arshopApi.retrieveUserProducts(this.__userApiToken__)
    },

    updateProduct(productId, data) {
        if (typeof productId !== 'string') throw TypeError(productId + ' is not a string')
        if (!productId.trim().length) throw Error('productId cannot be empty')

        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return arshopApi.updateProduct(this.__userApiToken__, productId, data)
    },

    toogleSold(productId) {
        if (typeof productId !== 'string') throw TypeError(productId + ' is not a string')
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return arshopApi.toogleSold(this.__userApiToken__, productId)
    },

    toogleFav(productId) {

        if (typeof productId !== 'string') throw TypeError(productId + ' is not a string')
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return arshopApi.toogleFav(this.__userApiToken__, productId)
    },

    retrieveFavs() {
        return arshopApi.retrieveFavs(this.__userApiToken__)
    },

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

    uploadProductImg(productId, data) {
        if (typeof productId !== 'string') throw TypeError(productId + ' is not a string')
        if (!productId.trim().length) throw Error('productId cannot be empty')

        if (!data) throw Error('data is empty')
        // if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return arshopApi.uploadProductImg(this.__userApiToken__, productId, data)
            // .then(({ product }) => product)
    },

    uploadUserImg(data) {
        if (!data) throw Error('data is empty')
        // if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return arshopApi.uploadUserImg(this.__userApiToken__, data)
            // .then(({ product }) => product)
    },

    retrieveUserFromProducts(productId){
        if (typeof productId !== 'string') throw TypeError(productId + ' is not a string')
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return arshopApi.retrieveUserFromProducts(productId)
    },

    retrieveUserWithId(userId){
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return arshopApi.retrieveUserWithId(userId)
    },

    retrieveProductsFromUserId(userId){
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return arshopApi.retrieveProductsFromUserId(userId)
    },

    createChat(userId){
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return arshopApi.createChat(this.__userApiToken__, userId)
    },

    sendMessage(chatId, text){

        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId cannot be empty')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)
        if (!text.trim().length) throw Error('text cannot be empty')

        return arshopApi.sendMessage(this.__userApiToken__, chatId, text)
    },
    
    retrieveChats() {
        return arshopApi.retrieveChats(this.__userApiToken__)
    },

    retrieveMessagesFromChat(chatId){
        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId cannot be empty')

        return arshopApi.retrieveMessagesFromChat(this.__userApiToken__, chatId)
    },

    saveObject3d(productId, object3d) {
        if(typeof productId !== 'string')throw Error(`${productId} is not a string`)
        if(!productId.trim().length)throw Error('productId cannot be empty')

        return arshopApi.saveObject3d(this.__userApiToken__, productId, object3d)
    },
}

export default logic