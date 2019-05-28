const { User, Note } = require('../data/models')
const { LogicError } = require('../common/errors')
const validate = require('../common/validate')

const logic = {
    registerUser(name, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () =>{
            const user = await User.findOne({email}).lean()

            if(user) throw new LogicError(`user with email ${email} already exists`)

            await User.create({name, email, password})
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () =>{
            const user = await User.findOne({email})
            
            if(!user) throw new LogicError(`user with email ${email} doesn't exists`)

            if(user.password !== password) throw new LogicError('wrong credentials')

            return user.id
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(id).select('-_id name email notes').lean()

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            
            return user
        })()
    },

    addPrivateNote(text, id) {
        validate.arguments([
            { name: 'text', value: text, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(id)
            user.notes.push(new Note({text, author: id}))
            await user.save()
        })()
    },

    retrievePrivateNotes(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        //TODO
        return (async () => {
            const notes = Note.find()
        })()
    },

    deletePrivateNote(id, noteId) {
        //TODO
    },

    addPublicNote(text, id) {
        validate.arguments([
            { name: 'text', value: text, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            await Note.create({text, author: id})
        })()
    },

    retrievePublicNotes(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const notes = await Note.find().populate('author', 'id name', 'User').lean()
            debugger
            return notes
        })()
    },

    deletePublicNote(id, noteId) {
        //TODO
    }
}

module.exports = logic