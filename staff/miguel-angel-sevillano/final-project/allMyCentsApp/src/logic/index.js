import { TesseractWorker } from 'tesseract.js';

const { validate, check } = require('allMyCents-utils')
const restApi = require('../data/rest-api/index')




const logic = {





    register(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])


        return (async () => {
            try {
                return await restApi.registerUser(name, surname, email, password)

            } catch (error) { throw  Error(error) }

        })()




    },

    logIn(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {
                return await restApi.authenticate(email, password)

            } catch (error) { throw  Error(error) }

        })()
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])

        return (async () => {
            try {
                return await restApi.retrieveUser(token)

            } catch (error) { throw  Error(error) }

        })()

    },

    updateUser(token, updateInfo) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'updateInfo', value: updateInfo, type: 'object', notEmpty: true },

        ])
        return (async () => {
            try {
                return await restApi.updateUser(token, updateInfo)

            } catch (error) { throw  Error(error) }

        })()

    },

    deleteUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])


        return (async () => {
            try {
                return await restApi.deleteUser(token)

            } catch (error) { throw  Error(error) }

        })()
    },


    saveTicket(token, ticket) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'ticket', value: ticket, type: 'object', notEmpty: true },
        ])


        return (async () => {
            try {
                return await restApi.addPrivateTicket(token, ticket)

            } catch (error) { throw  Error(error) }

        })()
    },

    getTicket(token, ticketId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'ticketId', value: ticketId, type: 'string', notEmpty: true },
        ])

        return (async () => {
            try {
                return await restApi.retrievePrivateTicket(token, ticketId)

            } catch (error) { throw  Error(error) }

        })()
    },

    editTicket(token, ticketId, data, position) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'ticketId', value: ticketId, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true },
            { name: 'position', value: position, type: 'string', notEmpty: true },
        ])



        return (async () => {
            try {
                return await restApi.updatePrivateTicket(token, ticketId, data, position)

            } catch (error) { throw  Error(error) }

        })()
    },


    retrieveTicketsByDates(token, dates) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'dates', value: dates, type: 'object', notEmpty: true },
        ])

        return (async () => {
            try {
                const res = await restApi.retrivePrivateTicketsByDates(token, dates)
                return res
            } catch (error) { throw  Error(error) }

        })()


    },

    deleteTicket(token, ticketId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'ticketId', value: ticketId, type: 'string', notEmpty: true },
        ])

        return (async () => {
            try {
                return await restApi.removePrivateTicket(token, ticketId)

            } catch (error) { throw  Error(error) }

        })()
    },

    listTickets(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])

        return (async () => {
            try {
                return await restApi.listPrivateTickets(token)

            } catch (error) { throw  Error(error) }

        })()
    },



    deleteAllTickets(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])


        return (async () => {
            try {
                return await restApi.removeAllPrivateTickets(token)

            } catch (error) { throw  Error(error) }

        })()
    },

    getAmountByProduct(token, product) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'product', value: product, type: 'string', notEmpty: true },
        ])


        return (async () => {
            try {
                return await restApi.retrieveAmountByProdcut(token, product)

            } catch (error) { throw  Error(error) }

        })()
    },

    getProductByCategory(token, category) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true },
        ])


        return (async () => {
            try {
                
                return await restApi.retrieveByCategory(token, category)

            } catch (error) { throw  Error(error) }

        })()
    },

    listItems() {

        return (async () => {
            try {
                return await restApi.listItems()

            } catch (error) { throw  Error(error) }

        })()
    },

    addAlert(token, alert) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'alert', value: alert, type: 'object', notEmpty: true },
        ])


        return (async () => {
            try {
                return await restApi.addAlert(token, alert)

            } catch (error) { throw  Error(error) }

        })()
    },

    editAlert(token, alertId, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'alertId', value: alertId, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true },
        ])


        return (async () => {
            try {
                return await restApi.edditAlert(token, alertId, data)

            } catch (error) { throw  Error(error) }

        })()
    },

    deleteAlert(token, alertId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'alertId', value: alertId, type: 'string', notEmpty: true },

        ])


        return (async () => {
            try {
                return await restApi.deleteAlert(token, alertId)

            } catch (error) { throw  Error(error) }

        })()
    },


    deleteAllAlerts(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])


        return (async () => {
            try {
                return await restApi.deleteAllAlerts(token)

            } catch (error) { throw  Error(error) }

        })()
    },

    listAlerts(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])


        return (async () => {
            try {
                return await restApi.listAlerts(token)

            } catch (error) { throw  Error(error) }

        })()
    },



    globalTicket(token) {

        return (async () => {

            let globalChart = []
            let conincidence = false
            let itemPushed = false

            const tickets = await restApi.listPrivateTickets(token)
            for (let i = 0; i < tickets.length; i++) {

                tickets[i].items.forEach(item => {

                    if (!itemPushed) {
                        conincidence = false

                        globalChart.forEach(product => {
                            if (item.name === product.name) {
                                product.Euro += item.Euro
                                conincidence = true
                            }
                        })

                        if (!conincidence) {
                            globalChart.push({ name: item.name, Euro: item.Euro })
                            conincidence = false
                        }
                    } else itemPushed = true

                })

            }
            return globalChart

        })()


    },




    scanTicket(scanedTicket) {


        return (async () => {

            const checkInfo = await logic.listItems()

            let imgToTxt = new TesseractWorker()
            const result = await imgToTxt.recognize(scanedTicket, 'spa+ita+fra')

            let rawTicket = result.words
            let filteredTicket = []
            let finalTicket = []
            let check = 0

            rawTicket.forEach(items => {

                const { text } = items

                const text1 = text.toLowerCase()

                const isNumber = Number(text1.replace(/,/g, "."))
                if (isNaN(isNumber) === false && check === 1) {
                    filteredTicket.push(isNumber)

                    check = 0
                }

                else if (check === 0) {
                    checkInfo.forEach(item => {
                        if (item.text === text1) {
                            filteredTicket.push(text1)
                            check = 1
                        }
                    })
                }

            })
            for (let i = 0; i < filteredTicket.length; i++) { if (typeof filteredTicket[i] === 'string') finalTicket.push({ name: filteredTicket[i], Euro: filteredTicket[i + 1] }) }



            return finalTicket


        })()

    },


}


//FOR REACT

export default logic

//FOR TESTING 
//module.exports = logic