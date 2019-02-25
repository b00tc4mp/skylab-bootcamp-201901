'use strict'

const { mongoose, models: { User, Category, Product, Order } } = require('data')

const logic = {

    /**
     * 
     * This function registers a new user and saves it into the data base
     * 
     * @param {string} name - user's name
     * @param {string} surname - user's password
     * @param {string} address - an address
     * @param {string} email - a email to log in 
     * @param {string} password - a password to log in
     * 
     * @throws {Error} - If invalid type of input or if user already exists
     * 
     * @returns {Promise<boolean>}
     */
    registerUser(name, surname, address, email, password) {
        return Promise.resolve()
            .then(() => {

                if (typeof name !== 'string') throw Error('name is not a string')

                if (!(name = name.trim()).length) throw Error('name is empty or blank')

                if (typeof surname !== 'string') throw Error('surname is not a string')

                if (!(surname = surname.trim())) throw Error('surname is empty or blank')

                if (typeof address !== 'string') throw Error('address is not a string')

                if ((address = address.trim()).length === 0) throw Error('address is empty or blank')

                if (typeof email !== 'string') throw Error('email is not a string')

                if ((email = email.trim()).length === 0) throw Error('email is empty or blank')

                if (typeof password !== 'string') throw Error('password is not a string')

                if ((password = password.trim()).length === 0) throw Error('password is empty or blank')


                return User.findOne({ email })
                    .then(user => {
                        if (user) throw Error(`user with email ${email} already exists`)

                        return User.create({ name, surname, address, email, password })
                            .then(() => true)
                    })
            })
    },

    /**
     * 
     * This function logs a registered user
     * 
     * @param {string} email - user's email
     * @param {string} password - user's password
     * 
     * @throws {Error} - Throws error on invalid type of input or wrong credentials
     * 
     * @returns {Promise<string>}
     */
    authenticateUser(email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                return user.id
            })
    },


    /**
     *
     * This function retrieves a user stored in the database
     * 
     * @param {string} id - The id of the user
     * 
     * @throws {Error} - If no valid id is found or if id not found
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser(id) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                return User.findById(id).select({ _id: 0, name: 1, surname: 1, address: 1, email: 1, phone: 1, orders: 1 })
            })
            .then(user => {
                if (!user) throw Error(`no user found with id ${id}`)

                return user
            })
    },

    /**
     * 
     * This function updates user's information and adds an extra parameter (phone) 
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} phone 
     * @param {string} address 
     * @param {string} email 
     * @param {string} password 
     * @param {string} newEmail 
     * @param {string} newPassword 
     * 
     * @throws {Error} - If invalid type of input on the parameters or if email and password credentials are wrong
     * 
     * @returns {Promise<User>}
     */
    updateUser(id, name, surname, phone, address, email, password, newEmail, newPassword) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

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

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

                if (newEmail) {
                    return User.findOne({ email: newEmail })
                        .then(_user => {
                            if (_user && _user.id !== id) throw Error(`user with email ${newEmail} already exists`)

                            return user
                        })
                }

                return user
            })
            .then(user => {
                user.name = name
                user.surname = surname
                user.phone = phone
                user.address = address
                user.email = newEmail ? newEmail : email
                user.password = newPassword ? newPassword : password

                return user.save()
            })
            .then(() => true)
    },

    /**
     * 
     * This function eliminates a stored user from the database
     * 
     * @param {string} id 
     * @param {string} email 
     * @param {string} password 
     * 
     * @throws {Error} - If invalid type of input or wrong email/password are introduced
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser(id, email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

                return user.remove()
            })
            .then(() => true)
    },

    /**
     * 
     * This function lists product categories stored in the database
     * 
     * @throws {Error} - If no categories are found in the database
     * 
     * @returns {Promise<[Category]>}
     */
    listCategories() {
        return Promise.resolve()
            .then(() => {
                return Category.find({})
                    .then(category => {
                        if (!category) throw Error(`no categories where found`)

                        return category.map(category => category)
                    })
            })
    },

    /**
     * 
     * This function lists the products contained in a specific category using the category id as an identifier.
     * 
     * @param {string} category
     * 
     * @throws {Error} - If no products are found in a specific category
     * 
     * @returns {Promise<[Product]>}
     */
    listProducts(category) {
        return Promise.resolve()
            .then(() => {

                return Product.find({ category })
                    .then((products) => {
                        if (!products) throw Error(`no products where found`)

                        return products
                    })
            })
    },

    /**
     * 
     * This function retrieves a product stored in the database 
     * 
     * @param {string} productId
     * 
     * @throws {Error} - on invalid type of input or if no products are found in a specific category
     * 
     * @returns {Promise<[Product]>} 
     */
    retrieveProduct(productId) {
        return Promise.resolve()
            .then(() => {
                if (typeof productId !== 'string') throw Error('user productId is not a string')

                if (!(productId = productId.trim()).length) throw Error('user productId is empty or blank')

                return Product.findById(productId)
            })
            .then(product => {
                if (!product) throw Error(`no product found with id ${productId}`)

                return product
            })
    },

    /**
     * 
     * This function lists products stored in the database
     * 
     * @throws {Error} - If no products are found in the database
     * 
     * @returns {Promise<[Product]>}
     */
    listAllProducts() {
        return Promise.resolve()
            .then(() => {
                return Product.find()
                    .then(products => {
                        if (!products) throw Error(`no products where found`)

                        return products
                    })
            })
    },

    /**
     * This function receives an array of product ids and lists that products
     * 
     * @param {array} ids
     * 
     * @throws {Error} - If no if no products match the array of ids introduced as a parameter
     * 
     * @returns {Promise<[Product]>}
    */
    listProductsByIds(ids) {
        const idsArray = ids.split(',')

        return Promise.resolve()
            .then(() => {
                return Product.find({
                    _id: { $in: idsArray }
                })
                    .then(products => {
                        if (!products) throw Error(`no products where found`)

                        return products
                    })
            })
    },

    /**
    * 
    * This function creates a payment order, stores it in the database and pushes the order info into a user matching userId
    * 
    * @param {string} paymentMethod
    * @param {string} status 
    * @param {string} products 
    * @param {string} userId
    * @param {string} orderAdress
    * @param {string} submitDate 
    * 
    * @throws {Error} - if invalid type of input is introduced 
    * 
    * @returns {Promise<string>}
    */
    createOrder(paymentMethod, status, products, userId, orderAdress, submitDate) {
        return Promise.resolve()
            .then(() => {
                if (typeof paymentMethod !== 'string') throw Error('paymentMethod is not a string')

                if (!(paymentMethod = paymentMethod.trim())) throw Error('paymentMethod is empty or blank')

                if (typeof status !== 'string') throw Error('status is not a string')

                if ((status = status.trim()).length === 0) throw Error('status is empty or blank')

                if (!Array.isArray(products)) throw Error('products should be an array')

                if (!products.length) throw Error('no products where found')

                if (orderAdress !== undefined) {
                    if (typeof orderAdress !== 'string') throw Error('orderAdress is not a string')

                    if ((orderAdress = orderAdress.trim()).length === 0) throw Error('orderAdress is empty or blank')
                }

                if (submitDate !== undefined) {
                    if (typeof submitDate !== 'string') throw Error('submitDate is not a string')

                    if (!(submitDate = submitDate.trim()).length) throw Error('submitDate is empty or blank')
                }

                return Order.create({ paymentMethod, status, products, userId, orderAdress, submitDate })
                    .then(order => {

                        return User.findByIdAndUpdate(userId, { $push: { orders: order } })
                            .then(() => order.id)

                        // Alternative way push orders into the user:
                        // return User.findById(userId)
                        //     .then(user => {
                        //         user.orders.push(order)
                        //         user.save()
                        //     })    
                    })

            })
    }
}

module.exports = logic