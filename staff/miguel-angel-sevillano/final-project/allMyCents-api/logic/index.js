
const { errors:{LogicError },validate} = require('allMyCents-utils')
const { models:{User, Item, Ticket, Alert, TicketItem} } = require('allMyCents-data')
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

            password = await bcrypt.hash(password, 8);

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
            debugger
            let user = await User.findOne({email})
    
            if (!user) throw new LogicError("wrong credentials")
            if (!await bcrypt.compare(password, user.password)) throw Error('wrong credentials')

            else return user.id
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            let user = await User.findById(id).lean()

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            delete user._id
            delete user.password
            delete user.__v
            return user

        })()
    },

    updateUser(id, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: "object", notEmpty: true }
        ])

        return (async () => {


            let mail
            let user = await User.findById(id)

            if (data.mail) mail = await User.findOne(data.email)

            if (mail) throw new LogicError(`email ${mail} already registered`)
            else {

                await User.findByIdAndUpdate(id, {
                    alerts: user.alerts,
                    tickets: user.tickets,
                    name: data.name || user.name,
                    surname: data.surname || user.surname,
                    email: data.email || user.email,
                })
                return ("User succesfully updated")
            }


        })()
    },
    deleteUser(id) {

        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
        ])


        return (async () => {

            await User.findByIdAndRemove(id)

            deleted = await User.findById(id)

            if (!deleted) return ("User succesfully deleted")

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

            user.tickets.push(new Ticket({ items: ticket }))
            await user.save()

            return ("Ticket succesfully added")
        })()

    },
    retrivePrivateTicket(id, ticketId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'ticketId', value: ticketId, type: 'string', notEmpty: true }

        ])

        return (async () => {

            let user = await User.findById(id)
            let rTicket
            debugger

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            user.tickets.forEach((item, index) => {
                if (item._id.toString() === ticketId.toString())

                    rTicket = user.tickets[index]
            }
            )

            return rTicket
        })()

    },
    updatePrivateTicket(id, ticketId, data, position) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'ticketId', value: ticketId, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true },
            { name: 'position', value: position, type: 'string', notEmpty: true }

        ])

        return (async () => {


            let user = await User.findById(id)
            let { tickets } = user

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            tickets.forEach(ticket => {
                if (ticket._id.toString() === ticketId.toString()) {

                    if (data.name) ticket.items[Number(position)].name = data.name
                    if (data.Euro) ticket.items[Number(position)].Euro = data.Euro
                }
            })

            await user.save()
            return("tikcet succecfuly updated")
        })()

    },
    retrivePrivateTicketsByDates(id, data) {


        validate.arguments([
            { name: "data", value: data, type: 'object', notEmpty: true },
            { name: "id", value: id, type: 'string', notEmpty: true },
        ])


        return (async () => {


            if (data.month) {

                let user = await User.findById(id)
                const { tickets } = user

                if (!user) throw new LogicError(`user with id "${id}" does not exist`)
                if (user.id != id) throw new LogicError(`worng credentials `)

                let retrivedTickets = []


                tickets.forEach((item, index) => {

                    if (item.month === data.month) retrivedTickets.push(tickets[index])
                })

                return retrivedTickets
            }
            if (data.day) {

                let user = await User.findById(id)
                const { tickets } = user

                if (!user) throw new LogicError(`user with id "${id}" does not exist`)
                if (user.id != id) throw new LogicError(`worng credentials `)

                let retrivedTickets = []


                tickets.forEach((item, index) => {

                    if (item.date === data.day) retrivedTickets.push(tickets[index])
                })

                return retrivedTickets
            }

            if (data.init && data.end) {

                let user = await User.findById(id)
                const { tickets } = user

                if (!user) throw new LogicError(`user with id "${id}" does not exist`)
                if (user.id != id) throw new LogicError(`worng credentials `)

                let retrivedTickets = []
                let init = false
                let end = false


                tickets.forEach((item, index) => {

                    if (item.date === data.init && init === false) retrivedTickets.push(tickets[index]), init = true
                    else if (item.date === data.end && init === true) retrivedTickets.push(tickets[index]), end = true
                    else if (init === true && end === false) retrivedTickets.push(tickets[index])
                })

                return retrivedTickets
            }


        })()

    },

    removePrivateTicket(id, ticketId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'ticketId', value: ticketId, type: 'string', notEmpty: true }

        ])

        return (async () => {
            let user = await User.findById(id)

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            user.tickets.forEach((item, index) => {
                if (item._id.toString() === ticketId.toString())
                    user.tickets.splice(index, 1)
            })

            await User.findByIdAndUpdate(id, { tickets: user.tickets })
            return("ticket succesfully deleted")
        })()

    },

    removeAllPrivateTickets(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            let user = await User.findById(id)

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            user.tickets = []

            await User.findByIdAndUpdate(id, { tickets: user.tickets })
            return("all tickets succesfully removed")
        })()

    },


    listPrivateTickets(id) {

        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            return user.tickets
        })()

    },

    addAlert(id, alert) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'alert', value: alert, type: 'object', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            user.alerts.push(new Alert({ name: alert.name, value: alert.value }))

            await user.save()
        })()
    },

    deleteAlert(id, alertId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'alertId', value: alertId, type: 'string', notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)
            let { alerts } = user
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            alerts.forEach((items, index) => {
                if (items._id.toString() === alertId) alerts.splice(index, 1)

            })

            await user.save()
        })()
    },
    editAlert(id, alertId, data) {

        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'alertId', value: alertId, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)
            let { alerts } = user


            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            alerts.forEach(alert => {
                if (alert._id.toString() === alertId) {

                    if (data.name) alert.name = data.name
                    if (data.value) alert.value = data.value
                }
            })

            await user.save()
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