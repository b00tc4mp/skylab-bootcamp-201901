const { validate, call } = require('allMyCents-utils')




const restApi = {
    __url__: 'http://localhost:8080/api',
    __timeout__: 0,

    //---------------------------------------------------------------------------------------USER--------------------------------------------

    registerUser(name, surname, email, password) {
        
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password }),
            timeout: this.__timeout__
        })
    },


    authenticate(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            timeout: this.__timeout__
        })
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user/retrieve`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })

    },
    updateUser(token, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/user/update`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            timeout: this.__timeout__
        })

    },
    deleteUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])

        return call(`${this.__url__}/user/delete`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })

    },


    //---------------------------------------------------------------------------------------TICKETS---------------------------------------------



    addPrivateTicket(token, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/ticket/addTicket`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            timeout: this.__timeout__
        })

    },
    updatePrivateTicket(token, ticketId, data, position) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true },
            { name: 'ticketId', value: ticketId, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true },
            { name: 'position', value: position, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/ticket/update/${ticketId}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ data, position }),
            timeout: this.__timeout__
        })

    },
    retrievePrivateTicket(token, ticketId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'ticketId', value: ticketId, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/ticket/retrieve/${ticketId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })

    },
    listPrivateTickets(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])

        return call(`${this.__url__}/tickets`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })

    },
    removePrivateTicket(token, ticketId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'ticketId', value: ticketId, type: 'string', notEmpty: true },
        ])

        return call(`${this.__url__}/ticket/delete/${ticketId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })

    },
    removeAllPrivateTickets(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])

        return call(`${this.__url__}/ticket/delete`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })

    },
    retrivePrivateTicketsByDates(token, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/ticket/retrieve-dates`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ data }),
            timeout: this.__timeout__
        })

    },


    //---------------------------------------------------------------------------------------PRODUCTS---------------------------------------------

    retrieveByCategory(token, category) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/prodcuts/retrieveByCat`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ category }),
            timeout: this.__timeout__
        })

    },
    retrieveAmountByProdcut(token, product) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'product', value: product, type: 'string', notEmpty: true }
        ])


        return call(`${this.__url__}/prodcuts/retrieveAmountByProduct`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ product }),
            timeout: this.__timeout__
        })

    },


    addAlert(token, alert) {
        
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'alert', value: alert, type: 'object', notEmpty: true }
        ])


        return call(`${this.__url__}/alert/addAlert`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(alert),
            timeout: this.__timeout__
        })

    },

    listAlerts(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])


        return call(`${this.__url__}/alert/listAlerts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })

    },

    listItems() {

        return call(`${this.__url__}/listItems`, {
            method: "GET",
            timeout: this.__timeout__
        })

    },

    edditAlert(token, alertId, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'alertId', value: alertId, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])


        return call(`${this.__url__}/alert/update/${alertId}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            timeout: this.__timeout__
        })

    },

    deleteAlert(token, alertId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'alertId', value: alertId, type: 'string', notEmpty: true }
        ])


        return call(`${this.__url__}/alert/delete/${alertId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })

    },

    deleteAllAlerts(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])


        return call(`${this.__url__}/alert/delete`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })

    },







}



module.exports = restApi