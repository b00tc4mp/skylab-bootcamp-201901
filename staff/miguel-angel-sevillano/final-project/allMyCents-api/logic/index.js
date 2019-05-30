
const { errors: { LogicError }, validate } = require('allMyCents-utils')
const { models: { User, Item, Ticket, Alert, Cat } } = require('allMyCents-data')
const bcrypt = require('bcryptjs');




const logic = {



    //CRUD------------------------------------------------------------------------------------------------------

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

            let user = await User.findOne({ email })

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

            const user = await User.findByIdAndRemove(id)

            if (user) return ("User succesfully deleted")

        })()
    },


    //USER TICKETS----------------------------------------------------------------------------------------------------

    addPrivateTicket(id, ticket) {                                                      //ADD TICKET--------------------------------
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'ticket', value: ticket, type: "object", notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            user.tickets.push(new Ticket({ items: ticket }))

            if (user.alerts) {
                ticket.forEach(item => {
                    user.alerts.forEach(product => {
                        if (item.name === product.name) product.Euro += item.Euro
                    })
                })
            }

            await user.save()

            return ("Ticket succesfully added")
        })()

    },
    retrivePrivateTicket(id, ticketId) {                                                    //RETRIVE TICKET--------------------------------
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'ticketId', value: ticketId, type: 'string', notEmpty: true }

        ])

        return (async () => {

            let user = await User.findById(id)
            let rTicket


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

    updatePrivateTicket(id, ticketId, data, position) {                                 //UPDATE TICKET-------------------------------
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

            if (user.alerts.length) {

                user.alert.forEach(item => {
                    if (item.name === data.name) item.Euro += data.Euro
                })
            }

            await user.save()
            return ("tikcet succecfuly updated")
        })()

    },

    retrivePrivateTicketsByDates(id, data) {                                                 //GET TICKETS BY DATES--------------------------


        validate.arguments([
            { name: "data", value: data, type: 'object', notEmpty: true },
            { name: "id", value: id, type: 'string', notEmpty: true },
        ])


        return (async () => {

            let user = await User.findById(id)
            const { tickets } = user

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            let retrivedTickets = []
            let init = false
            let end = false


            if (data.month) {

                tickets.forEach((item, index) => {

                    if (item.month === data.month) retrivedTickets.push(tickets[index])
                })

                return retrivedTickets
            }
            if (data.day) {

                tickets.forEach((item, index) => {

                    if (item.date === data.day) retrivedTickets.push(tickets[index])
                })

                return retrivedTickets
            }

            if (data.init && data.end) {

                tickets.forEach((item, index) => {

                    if (item.date === data.init && init === false) retrivedTickets.push(tickets[index]), init = true
                    else if (item.date === data.end && init === true) retrivedTickets.push(tickets[index]), end = true
                    else if (init === true && end === false) retrivedTickets.push(tickets[index])
                })

                return retrivedTickets
            }


        })()

    },

    listPrivateTickets(id) {                                                        //LIST ALL TICKETS----------------------------------

        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            if(user.tickets.length) return user.tickets
            else throw new LogicError("No tickets found")
        })()

    },



    removePrivateTicket(id, ticketId) {                                                      //DELETE TICKET-----------------------------------
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
            return ("ticket succesfully deleted")
        })()

    },

    removeAllPrivateTickets(id) {                                                            //DELETE ALL TICKETS-----------------------
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            let user = await User.findById(id)

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            user.tickets = []

            await User.findByIdAndUpdate(id, { tickets: user.tickets })
            return ("all tickets succesfully removed")
        })()

    },

    //TICKET ITEMS----------------------------------------------------------------------------------------------


    retrieveAmountByProdcut(id, product) {                                                  //GET AMOUNT BY ITEM QUERY--------------------------


        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'product', value: product, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            let amount = 0

            user.tickets.forEach(ticket => {
                ticket.items.forEach(item => {
                    if (item.name === product) amount += item.Euro
                })

            })
            return amount
        })()


    },


    retrieveByCategory(id, category) {                                                  //GET ITEMS BY CATEGORY QUERY--------


        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true },
        ])

        return (async () => {

            let results = []
            const user = await User.findById(id)


            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            const { items } = await Cat.findOne({ category }).lean()

            user.tickets.forEach(ticket => {
                ticket.items.forEach(first => {

                    for (let i = 0; i < items.length; i++) {
                        if (first.name === items[i]) {


                            if (results.length) {
                                results.forEach(resItems => {


                                    if (resItems.name === first.name) resItems.Euro += first.Euro
                                    else results.push({ name: first.name, Euro: first.Euro })

                                })
                            } else results.push({ name: first.name, Euro: first.Euro })

                        }

                    }

                })


            })

            if (results.length) return results
            else return ("No results")

        })()

    },


    //USER ALERTS -------------------------------------------------------------------------------------------------

    addAlert(id, alert) {                                                               //ADD AN ALERT---------------------------------
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'alert', value: alert, type: 'object', notEmpty: true }
        ])

        return (async () => {

            const { name, maxValue } = alert

            const user = await User.findById(id)
            const list = await Item.findOne({ text: name })

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)


            if (typeof user.alerts[0] != "undefined") {

                user.alerts.forEach(item => {

                    if (item.name === name) throw new LogicError("Alert already added")
                    else {

                        list ? user.alerts.push(new Alert({ name: name, maxValue: maxValue })) : new LogicError(`${name} dont exist`)
                    }
                })
            } else {
                list ? user.alerts.push(new Alert({ name: name, maxValue: maxValue })) : new LogicError(`${name} dont exist`)

            }

            await user.save()
            return ("Alert succesfully added")
        })()
    },


    listAlerts(id) {                                                               //LIST ALERTS---------------------------------
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
        ])

        return (async () => {

            let user = await User.findById(id)
            const { alerts } = user

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            if (alerts.length) return alerts
            else throw new LogicError("No alerts found")


        })()
    },

    editAlert(id, alertId, data) {                                                                  //EDIT ALERT------------------------

        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'alertId', value: alertId, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)
            let { alerts } = user
            let added = false


            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            alerts.forEach(item => {

                if (item.id === alertId) {
                    item.maxValue = data.maxValue
                    added = true
                }
            })
            if (!added) throw new LogicError("Alert dosen't exist")

            await user.save()
            return ("Alert succesfully updated")

        })()
    },

    deleteAlert(id, alertId) {                                                                      //DELETE ALERT-----------------------
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'alertId', value: alertId, type: 'string', notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)
            let { alerts } = user
            let deleted = false

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            alerts.forEach((items, index) => {
                if (items._id.toString() === alertId) {
                    alerts.splice(index, 1)
                    deleted = true
                }
            })

            await user.save()
            deleted ? ("Alert succesfully deleted") : new LogicError("Alert dosen't exist")

        })()
    },


    deleteAllAlerts(id) {                                                                           //DELETE ALL ALERTS

        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
        ])

        return (async () => {

            let user = await User.findById(id)
            let alerts = []

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)
            if (user.id != id) throw new LogicError(`worng credentials `)

            await User.findByIdAndUpdate(id, { alerts: alerts })
            await user.save()
            return ("Alerts succesfully deleted")

        })()


    },


    //ITEMS--------------------------------------------------------------------------------------------------

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