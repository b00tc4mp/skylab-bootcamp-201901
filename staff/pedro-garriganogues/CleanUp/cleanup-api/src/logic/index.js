'use strict'

const { User, Product } = require('../model')

const logic = {

    async registerUser(name, surname, email, password, passwordConfirmation) {

        if (typeof email !== 'string') throw Error('email is not a string')

        const user = await User.findOne({ email })

        if (user) throw Error(`user with email ${email} already exists`)

        await User.create({ name, surname, email, password, passwordConfirmation })

    },

    async authenticateUser(email, password) {

        if (typeof email !== 'string') throw Error('user email is not a string')

        if (!(email = email.trim()).length) throw Error('user email is empty or blank')

        if (typeof password !== 'string') throw Error('user password is not a string')

        if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

        const user = await User.findOne({ email, password })

        if (!user) throw Error('wrong credentials')

        return user.id
    },

    async retrieveUser(id) {

        if (typeof id !== 'string') throw Error('user id is not a string')

        const user = await User.findById(id).select({ _id: 0, name: 1, surname: 1, address: 1, email: 1, phone: 1, orders: 1 })

        if (!user) throw Error(`no user found with id ${id}`)

        return user
    },

    // async updateUser(id, name, surname, phone, address, email, password, newEmail, newPassword) {

    //     if (typeof id !== 'string') throw Error('user id is not a string')

    //     const user = await User.findOne({ email, password })

    //     if (!user) throw Error('wrong credentials')

    //     if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

    //     if (newEmail) {
    //         const user = await User.findOne({ email: newEmail })

    //         if (_user && _user.id !== id) throw Error(`user with email ${newEmail} already exists`)

    //         return user
    //     }

    //     then(() => {
    //         user.name = name
    //         user.surname = surname
    //         user.phone = phone
    //         user.address = address
    //         user.email = newEmail ? newEmail : email
    //         user.password = newPassword ? newPassword : password

    //         return user.save()
    //     })
    //     then(() => true)
    // },

    // async unregisterUser(id, email, password) {

    //     if (typeof id !== 'string') throw Error('user id is not a string')

    //     const user = User.findOne({ email, password })


    //     if (!user) throw Error('wrong credentials')

    //     if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

    //     return user.remove()


    async listProducts(category) {

        const products = await Product.find({ category })

        if (!products) throw Error(`no products found`)

        return products


    },

    async retrieveProduct(productId) {

        if (typeof productId !== 'string') throw Error('user productId is not a string')

        if (!(productId = productId.trim()).length) throw Error('user productId is empty or blank')

        const product = await Product.findById(productId)

        if (!product) throw Error(`no product found with id ${productId}`)

        return product

    },


    async listAllProducts() {

        const products = await Product.find()

        if (!products) throw Error(`no products found`)

        return products

    },

    async listProductsByIds(ids) {

        const idsArray = ids.split(',')

        const products = await Product.find({
            _id: { $in: idsArray }
        })

        if (!products) throw Error(`no products found`)

        return products


    },
}

module.exports = logic

// Call mode 1:

// async function login(email, password) {
//     return await logic.authenticateUser(email, password)
// }

// Call mode 2: 

// login = async (email, password) => await logic.authenticateUser(email, password)

