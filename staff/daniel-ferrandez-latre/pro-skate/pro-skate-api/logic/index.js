//@ts-check
const  { models } = require('pro-skate-data')
const argon2 = require('argon2')
const validate = require('../common/validate')
const { LogicError, UnauthorizedError} = require('../common/errors')


const { User, Product } = models

const logic = {
    registerUser(name, surname, email, imageUrl, password, age ) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'imageUrl', value: imageUrl, type: 'string'},
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'age', value: age, type: 'string', notEmpty: true }
        ])
        validate.email(email)
        age = parseInt(age)

        
        return (async () => {
            const userDb = await User.findOne({email})

            if (userDb) throw new LogicError(`user with email "${email}" already exists`)
            const hash = await argon2.hash(password)


            await User.create({ name, surname, email, imageUrl, password: hash, age })
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
        // TODO implement logic
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

            if(!userDb) throw new LogicError( ` That user doesn't exist` )

            const userUpdated = Object.assign(userDb, data)
  
            await User.findByIdAndUpdate(id, userUpdated)

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

    createNewProduct(userId, product){
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'product', value: product, type: 'object', notEmpty: true }
        ])
        return ( async ()=> {
            const userDb = await User.findById(userId)
            if(!userDb) throw new LogicError(`This user can not create a new product`)
            if(!userDb.isAdmin) throw new UnauthorizedError(`You need admin permissions to perform this action`)
            
            await Product.create(product)
            return true
        })()

    },

    addFavProduct(userId, productId){
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'productId', value: productId, type: 'object', notEmpty: true }
        ])

        return(async ()=>{
            const userDb = await User.findById(userId)
            if(!userDb) throw new LogicError(`This user can not create a new product`)

    
            await userDb.wishlist.push(productId)
        })()

    }

    






    // addPublicNote(userId, text) {
    //     // TODO validate inputs

    //     // TODO implement logic

    //     // return Note.create({ author: userId, text }).then(() => {})

    //     return (async () => {
    //         await Note.create({ author: userId, text })
    //     })()
    // },

    // removePublicNote(userId, notedId) {
    //     // TODO validate inputs

    //     // TODO implement logic
    // },

    // retrievePublicNotes(userId) {
    //     // TODO validate inputs

    //     // TODO implement logic
    //     return (async () => {
    //         const notes = await Note.find({ author: userId }).populate('author', 'name').lean()

    //         if (notes.length) {
    //             const [{ author }] = notes
    //             author.id = author._id.toString()
    //             delete author._id

    //             notes.forEach(note => {
    //                 note.id = note._id.toString()
    //                 delete note._id
    //             })
    //         }


    //         return notes
    //     })()
    // },

    // retrieveAllPublicNotes() {
    //     // TODO validate inputs

    //     // TODO implement logic
    //     return (async () => {
    //         const notes = await Note.find().populate('author', 'name').lean()

    //         notes.forEach(note => {
    //             note.id = note._id.toString()
    //             delete note._id

    //             const { author } = note

    //             if (!author.id) {
    //                 author.id = author._id.toString()
    //                 delete author._id
    //             }
    //         })

    //         return notes
    //     })()
    // },

    // addPrivateNote(userId, text) {
    //     // TODO validate inputs

    //     // TODO implement logic
    //     return (async () => {
    //         const user = await User.findById(userId)

    //         user.notes.push(new Note({ text, author: userId }))

    //         await user.save()
    //     })()
    // },

    // removePrivateNote(userId, noteId) {
    //     // TODO validate inputs

    //     // TODO implement logic
    // },

    // retrievePrivateNotes(userId) {
    //     // TODO validate inputs

    //     // TODO implement logic
    //     return (async () => {
    //         const { notes } = await User.findById(userId).select('notes').lean()

    //         notes.forEach(note => {
    //             note.id = note._id.toString()
    //             delete note._id

    //             note.author = note.author.toString()
    //         })

    //         return notes
    //     })()
    // }
}

module.exports = logic