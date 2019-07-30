const validate = require('auction-validate')
const { ConnectionError, TimeoutError } = require('auction-errors')

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
        { name: 'url', value: url, type: String, notEmpty: true },
        { name: 'method', value: method, type: String, notEmpty: true },
        { name: 'headers', value: headers, type: Object, optional: true },
        { name: 'body', value: body, type: Object, notEmpty: true, optional: true },
        { name: 'timeout', value: timeout, type: Number, notEmpty: true, optional: true },
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
            if(err.code === 'ENOTFOUND') throw new ConnectionError('can not connect')

            const { response } = err
            
            if(!response) throw err 
            
            const { response: {data: { error }}} = err
            
            if(error) err.message = error
            
            throw err
        })
}

module.exports = call