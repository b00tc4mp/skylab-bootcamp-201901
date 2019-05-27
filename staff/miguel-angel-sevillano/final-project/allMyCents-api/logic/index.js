const validate = require('../common/validate')
const { LogicError, FormatError } = require('../common/errors')
const { User, Item } = require('../data/models')
const bcrypt = require('bcryptjs');




const logic = {
    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {

            const users = await User.find({ email })
            if (users.length) throw new LogicError(`user with email "${email}" already exists`)
            password = await bcrypt.hashSync(password, 8);
            await User.create({ name, surname, email, password })

        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            let users = await User.findOne({ email, password })
            if (!users) throw new LogicError("non existing user")
            return users.id
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            let user = await User.findById(id)

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            return user

        })()
    },

    updateUser(id, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: "object", notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)

            await User.findByIdAndUpdate(id, {
                tickets: user.tickets,
                name: data.name || user.name,
                surname: data.surname || user.surname,
                email: data.email || user.email,
            })


        })()
    },
    deleteUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
        ])

        return (async () => {

            await User.findByIdAndRemove(id)

        })()
    },

    addPrivateTicket(id, ticket) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'ticket', value: ticket, type: "object", notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(id)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)
            user.tickets.push(ticket)
            await user.save()
        })()

    },
    retrivePrivateTicket(id, position) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'position', value: position, type: 'number', notEmpty: true }

        ])

        return (async () => {
            let user = await User.findById(id)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)
            return user.tickets[position]

        })()

    },
    retrivePrivateTicketsByDates(id, initDate, endDate) {

        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            /*  { name: "init", value: init, type: 'string', notEmpty: true },
             { name: "end", value: end, type: 'string',optional:true } */

        ])

        return (async () => {
            let user = await User.findById(id)
            const { tickets } = user

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            let retrivedTickets = []
            let init = false
            let end = false


           /*  retrivedTickets = tickets.map(ticket => {


                
            }) */

            for (let i = 0; i < tickets.length; i++) {

                let inDate = tickets[i].indexOf(initDate)
                let enDate = tickets[i].indexOf(endDate)

                if (inDate >= 0 && init === false) {
                    retrivedTickets.push(tickets[i])
                    init = true
                }
                else if (enDate >= 0 && init === true) {
                    retrivedTickets.push(tickets[i])
                    end = true
                }
                else if (init === true && end == false) retrivedTickets.push(tickets[i])
            }


            return retrivedTickets

        })()

    },

    removePrivateTicket(id, position) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'position', value: position, type: 'number', notEmpty: true }

        ])

        return (async () => {
            let user = await User.findById(id)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)
            user.tickets.splice(position, 1)
            await User.findByIdAndUpdate(id, { tickets: user.tickets })
        })()

    },

    removeAllPrivateTickets(id, position) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'position', value: position, type: 'number', notEmpty: true }

        ])

        return (async () => {
            let user = await User.findById(id)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)
            user.tickets = []
            await User.findByIdAndUpdate(id, { tickets: user.tickets })
        })()

    },


    listPrivateTickets(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)
            return user.ticket
        })()

    },


    addItem(item) {
        validate.arguments([
            { name: 'item', value: item, type: 'object', notEmpty: true }
        ])

        return (async () => {
            const { text } = item
            const _item = await Item.findOne({ text: item.text })
            if (_item) throw new LogicError('Item already exist')
            let newItem = await Item.create({ text })
            return newItem
        })()
    },


    listItems() {

        return (async () => {
            let list = await Item.find()
            if (!list) throw new LogicError("List empty")
            return list
        })()
    }
}

module.exports = logic