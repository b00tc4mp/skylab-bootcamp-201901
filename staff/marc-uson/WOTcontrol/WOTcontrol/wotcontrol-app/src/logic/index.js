const validate = require ('wotcontrol-validate')
const restApi = require ('../rest-api')
import { LogicError, RequirementError, ValueError, FormatError } from 'wotcontrol-errors'




const logic = {

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    registerUser(name, surname, email, password, admin = false) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'admin', value: admin, type: 'boolean', optional: true }
        ])
        email = email.toLowerCase()
        validate.email(email)

        return (async () => {
            restApi.registerUser()
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])
        let _email = email.toLowerCase()
        validate.email(_email)

        return (async () => {
            const user = await Users.findOne({email: _email})

            if (!user) throw new LogicError(`user with email "${email}" does not exist`)

            const pass = bcrypt.compareSync(password, user.password)

            if(!pass) throw new LogicError('wrong credentials')

            return user.id
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await Users.findById(id)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            const { name, surname, email } = user

            return { name, surname, email }
        })()
    },

    updateUser(id, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object'}

        ])

        let _email

        return (async () => {

            if(data.email){
                _email = data.email.toLowerCase()
                const _user = await Users.findOne({_email})
                if (_user) throw new LogicError(`user with email "${_email}" already exists`)
            }

            const user = await Users.findById(id)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            const { admin, name, surname, email, password } = user

            await Users.findByIdAndUpdate(id,{
                admin: data.admin || admin,
                name: data.name || name,
                surname: data.surname || surname,
                email: _email || email,
                password: data.password ? bcrypt.hashSync(data.password, 10) : password
            })

            return `User succesfully updated`
        })()
    },

    deleteUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {

            const user = await Users.findById(id)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            await Users.findByIdAndDelete(id)

            return `User succesfully deleted`
        })()
    }
}

module.exports = logic