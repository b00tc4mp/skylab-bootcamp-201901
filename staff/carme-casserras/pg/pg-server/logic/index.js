const validate = require('../common/validate')
const {LogicError} = require('../common/errors')
const {UserData, Thing} = require('../data/models')
const bcrypt = require('bcrypt')


const logic = {

    registerUser(name, email, password) {

        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async() => {
            const users = await UserData.find({email})

            if(users.length) throw new LogicError(`user with email ${email} already exists`)

            const encryptPassword = await bcrypt.hash(password,5)

            await UserData.create({name, email, password: encryptPassword})
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])
        
        validate.email(email)

        return (async () => {

            // el find no s'utiliza, el findOne et retorna un objecte
            const user = await UserData.findOne({email})

            if (!user) throw new LogicError(`user with email ${email} does not exist`)

            if (!await bcrypt.compare(password,user.password)) throw new LogicError('wrong credentials')

            return user.id
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
                 
            try {
                const user =  await UserData.findById(id).select('name email').lean()
                if(!user) throw new LogicError(`user with id ${id} does not exist`)
                return user
            } 
            catch (err) {
                throw new LogicError(err.message)
            }           
        })()
    },

    addPublicThing(image, category, description, location, owner) {
        validate.arguments([
            { name: 'image', value: image, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true },
            { name: 'location', value: location, type: 'string', notEmpty: true },
            { name: 'owner', value: owner, type: 'string', notEmpty: true }
        ])
        
        return (async() => {
            await Thing.create({image, category, description,  location, owner: userId})
        })()
    },

    deletePublicThing(id, owner) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'owner', value: owner, type: 'string', notEmpty: true }
        ])
    },

    retrievePrivateThing(owner) {
        validate.arguments([
        { name: 'owner', value: owner, type: 'string', notEmpty: true }
        ])
    },

    toggleGetThing(id, userId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'userId', value: userId, type: 'string', notEmpty: true }
        ])
    }

}
module.exports = logic