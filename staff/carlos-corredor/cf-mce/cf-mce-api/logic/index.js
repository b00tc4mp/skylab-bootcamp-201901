// const { Schema } = require('mongoose')
const { models} = require('cf-mce-data')
const { validate, errors: {LogicError, UnauthorizedError, ValueError}  } = require('cf-mce-common')
const argon2 = require('argon2')

const { User, Customer, ElectronicControlModule, Product, Note } = models

const logic = {
    
    registerUser(name, surname, email, password, category) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])
        validate.email(email)
        validate.category(category)

        return (async () => {
            const user = await User.findOne({email: email}).lean()

            if (user) throw new LogicError(`user with email "${email}" already exists`)

            const hash = await argon2.hash(password)

            await User.create({ name, surname, email, password: hash, category })
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
            if(!user) throw new LogicError(`user with email "${email}" does not exist`)

            if (await argon2.verify(user.password, password)) return user.id
            else throw new UnauthorizedError('wrong credentials')
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(id)

         return (async () => {
            const user = await User.findById(id)
            if(!user) throw new LogicError(`user with id "${id}" does not exist`)
 
            return await User.findById(id).select('name surname email category -_id').lean()

        })()
    },

    update(id, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object' }
        ])
        validate.idMongodb(id)
        
        if (data.id && id !== data.id) throw new ValueError('data id does not match criteria id')

        return (async () => {
                 await User.findByIdAndUpdate(id, data)
        })()
    },

    delete(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])
        validate.idMongodb(id)

         return (async () => {
            const user = await User.findById(id)
            if(!user) throw new LogicError(`user with id "${id}" does not exist`)
 
            await User.findByIdAndRemove(id)

        })()
    },

    registerCustomer(name, surname, phone, address, nid, email) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true, optional: true },
            { name: 'phone', value: phone, type: 'string', notEmpty: true, optional: true },
            { name: 'address', value: address, type: 'string', notEmpty: true, optional: true },
            { name: 'nid', value: nid, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true, optional: true }
        ])
        if (email != null) validate.email(email)

        return (async () => {
            const customer = await Customer.findOne({nid}).lean()

            if (customer) throw new LogicError(`customer with nid "${nid}" already exists`)

            await Customer.create({ name, surname, phone, address, nid, email })
        })()
    },
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
