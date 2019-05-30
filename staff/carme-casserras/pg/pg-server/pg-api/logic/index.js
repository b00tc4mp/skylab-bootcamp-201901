const validate = require('../../common/validate')
const { LogicError } = require('../../common/errors')
const { models, mongoose: { Types: { ObjectId } } } = require('pg-data')
const bcrypt = require('bcrypt')

const { UserData, Thing, Location } = models

const logic = {

    registerUser(name, email, password) {

        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const users = await UserData.find({ email })

            if (users.length) throw new LogicError(`user with email ${email} already exists`)

            const encryptPassword = await bcrypt.hash(password, 5)

            await UserData.create({ name, email, password: encryptPassword })
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
            const user = await UserData.findOne({ email })

            if (!user) throw new LogicError(`user with email ${email} does not exist`)

            if (!await bcrypt.compare(password, user.password)) throw new LogicError('wrong credentials')

            return user.id
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {

            const user = await UserData.findById(id).select('name email').lean()
            if (!user) throw new LogicError(`user with id ${id} does not exist`)
            return user
        
        })()
    },

    addPublicThing(category, description, userId, locId) {

        validate.arguments([
            // { name: 'image', value: image, type: 'object', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'locId', value: locId, type: 'string', notEmpty: true },
        ])

        return (async () => {
            
            await Thing.create({ category, description, owner: userId, loc: locId}) 
            
        })()
    },
    
    updatePublicThing(userId, id, status) {
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'status', value: status, type: 'number'}
        ])

        return (async () => {

            try {                
                const thing = await Thing.findById(id).select('status').lean()
                if (!thing) throw new LogicError(`thing with id ${id} does not exist`)
                return thing
            }
            catch (err) {
                throw new LogicError(err)
            }
        })()
    },

    searchByCategory(userId, category) {
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return (async () => await Thing.find({category}).select('description').lean())()
    },

    searchByLocation(userId, locId) {
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'location', value: locId, type: 'string', notEmpty: true }
        ])
        return (async () =>  {
            try {
            const user = await UserData.findById(userId)
            
            if (!user) throw new LogicError(`user with id ${id} does not exist`)

            return await Thing.find({loc: locId})

            } catch (err) {
                throw new LogicError(err.message)
            }
        })()    

    },

    retrivePrivateThings(userId) { 
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            
        ])
        
        return (async() => await Thing.find({owner:userId}).populate('owner','-_id -__v' ).lean())()
    },
}
module.exports = logic