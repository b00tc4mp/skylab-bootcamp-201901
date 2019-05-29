const validate = require('auction-validate')
// const { ConnectionError, TimeoutError } = require('auction-errors')

const axios = require('axios')

/**
 * Makes an HTTP call.
 * 
 * @param {*} url 
 * @param {*} callback 
 * @param {*} options 
 * 
 * @version 4.0.0
 */
function call(url, options = {}) {
    const { method = 'GET', headers, body, timeout = 0 } = options

    validate.arguments([
        { name: 'url', value: url, type: 'string', notEmpty: true },
        { name: 'method', value: method, type: 'string', notEmpty: true },
        { name: 'headers', value: headers, type: 'object', optional: true },
        { name: 'body', value: body, type: 'object', notEmpty: true, optional: true },
        { name: 'timeout', value: timeout, type: 'number', notEmpty: true, optional: true },
    ])

    validate.url(url)
    
    return axios({
        url, 
        method,
        headers,
        data: body,
        timeout
    })
        .then(response => response.data)
        .catch(err => {
            // debugger
            if(!err.response) throw err 
            const { response: {data: { error }}} = err
            if(error) err.message = error
            // if (err instanceof TypeError) throw new ConnectionError('cannot connect')
            // else if (err instanceof DOMException) throw new TimeoutError(`time out, exceeded limit of ${timeout}ms`)
            throw err
        })
}

module.exports = call