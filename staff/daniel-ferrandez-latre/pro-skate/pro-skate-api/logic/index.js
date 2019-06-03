//@ts-check
const  { models, mongoose } = require('pro-skate-data')
const argon2 = require('argon2')
const validate = require('../common/validate')
const { LogicError, UnauthorizedError} = require('../common/errors')



const { User, Product } = models

const logic = {
    registerUser(name, surname, email, password, age, imageUrl ) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'imageUrl', value: imageUrl, type: 'string'},
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'age', value: age, type: 'string', notEmpty: true }
        ])
        validate.email(email)
        const _age = parseInt(age)

        
        return (async () => {
            const userDb = await User.findOne({email})

            if (userDb) throw new LogicError(`user with email "${email}" already exists`)
            const hash = await argon2.hash(password)

            debugger
            await User.create({ name, surname, email, password: hash, age: _age, imageUrl })
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)
        return (async () => {
            const user = await User.findOne({ email })

            if (!user) throw new LogicError(`user with email "${email}" does not exist`)
            
            if (await argon2.verify(user.password, password)) {
                
                return user.id
            } else{
                
                throw new LogicError('wrong credentials')
            }

        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])
        return (async () => {
            const userDb = await User.findById(id)
            if(!userDb) throw new LogicError(`User with id ${id} doesn't exist`)
            const { name, surname, email, age } = userDb

            return { name, surname, email, age }
        })()
    },

    updateUser(id, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }

        ])
        return (async () => {
            let userDb = await User.findById(id).lean()

            if(!userDb) throw new LogicError( `That user doesn't exist` )

            // const userUpdated = Object.assign(userDb, data)
  
            await User.findByIdAndUpdate(id, data, {new: true})

            return true
        })()
    },

    deleteUser(id){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])
        return ( async ()=> {
            
            const userDb = await User.findById(id)
            
            if(!userDb) throw new LogicError(`This user doesn't exist`)
            await User.findByIdAndDelete(id)
    
            return true
        })()
 
    },

    createProduct(userId, product){
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'product', value: product, type: 'object', notEmpty: true }
        ])
        return ( async ()=> {
            const userDb = await User.findById(userId)
            if(!userDb) throw new LogicError(`This user can not create a new product`)
            if(!userDb.isAdmin) throw new UnauthorizedError(`You need admin permissions to perform this action`)
            
            try{
                await Product.create(product)
            }catch(err){
                if(err.code === 11000) throw new LogicError(`Product ${product.name} already exist and can not duplicate`)
            }
            return true
        })()

    },
    
    retrieveProduct(id){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return(async ()=>{
            const productDb = await Product.findById(id)
            if(!productDb) throw new LogicError(`Product with id ${id} doesn't exist`)
            return productDb
        })()
    },

    retrieveAllProducts(){
        return(async ()=>{
            const allProducts = await Product.find()
            if(!allProducts) return []
            return allProducts
        })()

    },

    retrieveProductsByTag(tag){
        validate.arguments([
            { name: 'tag', value: tag, type: 'string', notEmpty: true }
        ])
        return(async ()=>{
            const allProducts = await Product.find()
            const productsByTag = allProducts.filter( product => {
                if(product.tag.includes(tag)) return product
            })
            return productsByTag
        })()

    },

    retrieveProductsByPrice(price){
        validate.arguments([
            { name: 'price', value: price, type: 'string', notEmpty: true }
        ])
        return(async ()=>{
            const allProducts = await Product.find()
            const productsByPrice = allProducts.filter( product => {
                if(parseFloat(product.price) === parseFloat(price)) return product
            })
            return productsByPrice
        })()
    },

    toggleWhishProduct(idUser, idProduct){
        validate.arguments([
            { name: 'idUser', value: idUser, type: 'string', notEmpty: true },
            { name: 'idProduct', value: idProduct, type: 'string', notEmpty: true }
        ])

        return( async ()=>{
            const userBd = await User.findById(idUser)
            if (!userBd) throw new LogicError(`user with id "${idUser}" doesn't exists`)
            const productDB = await Product.findById(idProduct)
            if (!productDB) throw new LogicError(`product with id "${idProduct}" doesn't exists`)
            const isInWishList = userBd.wishlist.some( product =>  product._id.toString() === idProduct)
            if(!isInWishList) {
                userBd.wishlist.push(productDB._id)}
            else {userBd.wishlist = userBd.wishlist.filter( product =>  product._id.toString() !== idProduct)}
            await userBd.save()
        })()
    },

    addProductToCart(idUser, idProduct, quantity){
        validate.arguments([
            { name: 'idUser', value: idUser, type: 'string', notEmpty: true },
            { name: 'idProduct', value: idProduct, type: 'string', notEmpty: true },
            { name: 'quantity', value: quantity, type: 'string', notEmpty: true }
        ])

        return( async ()=>{
            const userBd = await User.findById(idUser)
            if (!userBd) throw new LogicError(`user with id "${idUser}" doesn't exists`)
            const productDB = await Product.findById(idProduct)
            if (!productDB) throw new LogicError(`product with id "${idProduct}" doesn't exists`)
            const isInCart = userBd.cart.some( product =>  product.productId.toString() === idProduct  )
            if(!isInCart) {
                userBd.cart.push({quantity, productId: productDB._id })
            }else {
                if( quantity === '0' ) 
                    userBd.cart = userBd.cart.filter( product => product.productId.toString() !== idProduct)
                else
                userBd.cart.forEach( product =>  {
                    if(product.productId.toString() === idProduct)
                        product.quantity = quantity
                })
            }
            await userBd.save()
        })()
    },

    retrieveCart(idUser){
        validate.arguments([
            { name: 'idUser', value: idUser, type: 'string', notEmpty: true },
        ])
        return( async ()=>{
            const userBd = await User.findById(idUser)
            if (!userBd) throw new LogicError(`user with id "${idUser}" doesn't exists`)
            if(userBd.cart.length === 0) throw new LogicError(`User with id "${idUser}" doesn't have any product on his cart`)
            
            return userBd.cart
        })()
    },

    checkoutCart(idUser){
        validate.arguments([
            { name: 'idUser', value: idUser, type: 'string', notEmpty: true },
        ])
        return( async ()=>{
            const userBd = await User.findById(idUser)
            if (!userBd) throw new LogicError(`user with id "${idUser}" doesn't exists`)
            if(userBd.cart.length === 0) throw new LogicError(`User with id "${idUser}" doesn't have any product on his cart`)
            userBd.cart.forEach( product => {
                userBd.historic.push(product) 
            })
            userBd.cart = []
            await userBd.save()
            return true
        })()

    },

    retrieveHistoric(idUser){
        validate.arguments([
            { name: 'idUser', value: idUser, type: 'string', notEmpty: true },
        ])
        return( async ()=>{
            const userBd = await User.findById(idUser)
            if (!userBd) throw new LogicError(`user with id "${idUser}" doesn't exists`)
            if(userBd.historic.length === 0) throw new LogicError(`User with id "${idUser}" doesn't have any product on his cart`)

            return userBd.historic
        })()

    }
}

module.exports = logic