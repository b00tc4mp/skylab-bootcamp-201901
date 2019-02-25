const singingLabApi = require('api')

singingLabApi.url = 'https://shrouded-peak-12234.herokuapp.com/api'
// singingLabApi.url = 'https://localhost:4000/api'

const logic = {
    _userId: null,

    _date: 'no-date',

    _orderStatus: 'unpaid',

    _cart: [],


    /**
     * Setter/getter function: 
     * 
     * Sets a user when the function is called with a parameter and get's it when no parameter is introduced  
     * 
     * @param {string} userId
     * 
     * @returns {<string>}
    */
    userId(userId) {
        if (userId !== undefined) {
            this._userId = userId

            return
        }

        return this._userId
    },

    /**
     * Setter/getter function: 
     * 
     * Sets a user when the function is called with a parameter and get's it when no parameter is introduced  
     * 
     * @param {Array} cart
     * 
     * @returns {<[Cart]>}
    */
    cart(cart) {
        if (cart !== undefined) {
            this._cart = cart

            return
        }

        return this._cart
    },

    /**
     * Creates a date and turns it into a string (for the order)
     * 
     * @returns {<string>}
    */
    getDateOrder() {
        // let hours = new Date().getHours()
        this._date = Date.now()
        return this._date.toString()

    },

    /**
     * Pushes a productId into the cart
     * 
     * @param {string} productId
     * 
     * @returns {<boolean>}
    */
    addProductToCart(productId) {
        return Promise.resolve()
            .then(() => {
                const any = this.cart().some(_productId => _productId === productId)

                if (any) throw Error('product already in cart')

                this.cart().push(productId)

                this.cart(this.cart())

                return true
            })
    },

    /**
     * Removes a product from the cart and updates it
     * 
     * @param {string} productId
     * 
     * @returns {<[Array]>}
    */
    removeProductFromCart(productId) {
        return this.cart(this.cart().filter(id => {
            return id !== productId
        }))
    },

    /**
     * Clears cart content (sets its content to null)
    */
    clearCart() {
        this.cart(null)
    },

    /**
     * Lists products by id
     * 
     * @returns {<[Array]>}
    */
    listProductsByIds() {

        return singingLabApi.listProductsByIds(this.cart())
    },

    /**
     * Registers an user
     * 
     * @param {string} name - User's username
     * @param {string} surname - User's surname
     * @param {string} address - User's address
     * @param {string} email - User's email
     * @param {string} password - User's Password
     * 
     * @returns {Promise<boolean>}
     */
    registerUser(name, surname, address, email, password) {

        return singingLabApi.registerUser(name, surname, address, email, password)
    },

    /**
    * Logs an user
    * 
    * @param {string} email - User's email
    * @param {string} password - User's password
    * 
    * @returns {Promise<boolean>}
    */
    login(email, password) {
        return singingLabApi.authenticateUser(email, password)
            .then(id => {
                this.userId(id)

                return true
            })
    },

    get loggedIn() {
        return !!this.userId()
    },

    logout() {
        this.userId(null)
    },

    /**
     * Retrieves an user
     * 
     * @returns {Promise<User>}
     */
    retrieveUser() {
        return singingLabApi.retrieveUser(this.userId())
            .then(res => res)
    },

    /**
     * Updates an user
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} phone 
     * @param {string} address 
     * @param {string} email 
     * @param {string} password 
     * @param {string} newEmail 
     * @param {string} newPassword 
     * 
     * @returns {Promise<boolean>}
     */
    updateUser(name, surname, phone, address, email, password, newEmail, newPassword) {

        if (typeof name !== 'string') throw Error('user name is not a string')

        if (!(name = name.trim()).length) throw Error('user name is empty or blank')

        if (typeof surname !== 'string') throw Error('user surname is not a string')

        if ((surname = surname.trim()).length === 0) throw Error('user surname is empty or blank')

        if (typeof phone !== 'string') throw Error('user phone is not a string')

        if ((phone = phone.trim()).length === 0) throw Error('user phone is empty or blank')

        if (typeof address !== 'string') throw Error('user address is not a string')

        if ((address = address.trim()).length === 0) throw Error('user address is empty or blank')

        if (typeof email !== 'string') throw Error('user email is not a string')

        if (!(email = email.trim()).length) throw Error('user email is empty or blank')

        if (typeof password !== 'string') throw Error('user password is not a string')

        if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

        return singingLabApi.updateUser(this.userId(), name, surname, phone, address, email, password, newEmail, newPassword)
            .then(res => {
                return true
            })
    },

    /**
     * 
     * Unregisters an user
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser(email, password) {
        return singingLabApi.unregisterUser(this.userId(), email, password)
            .then(() => {
                this.logout()

                return true
            })
    },

    /**
     * 
     * Lists all categories
     * 
     * @returns {Promise<[Categories]>}
     */
    listCategories() {
        return singingLabApi.listCategories()
            .then(categories => categories)
    },

    /**
     * 
     * Lists all products from a category
     * 
     * @returns {Promise<[Product]>}
     */
    listProducts(category) {
        return singingLabApi.listProducts(category)
            .then(products => {
                return products
            })
    },

    /**
    * 
    * Retrieves a product
    * 
    * @returns {Promise<Product>}
    */
    retrieveProduct(productId) {
        return singingLabApi.retrieveProduct(productId)
            .then(product => product)
    },

    /**
     * 
     * Lists all products
     * 
     * @returns {Promise<[Product]>}
     */
    listAllProducts() {
        return singingLabApi.listAllProducts()
            .then(products => products)
    },

    /**
    * 
    * Creates an order
    * 
    * @param {string} paymentMethod
    * @param {string} products 
    * @param {string} orderAdress
    * 
    * @returns {Promise<Order>}
    */
    createOrder(paymentMethod, products, orderAdress) {

        return singingLabApi.createOrder(paymentMethod, this._orderStatus, products, this.userId(), orderAdress, this.getDateOrder())
    }
}

module.exports = logic
//export default logic