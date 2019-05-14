const validate = require('../validate')
const { ConnectionError, HttpError } = require('../errors')
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
    const { method = 'GET', headers, data } = options

    validate.arguments([
        { name: 'url', value: url, type: 'string', notEmpty: true },
        { name: 'method', value: method, type: 'string', notEmpty: true },
        { name: 'headers', value: headers, type: 'object', optional: true },
        { name: 'data', value: data, type: 'string', notEmpty: true, optional: true }
    ])

    validate.url(url)

    return axios({
        headers,
        method,
        url,
        data
    })
        .catch(error => {
            if (error.code === 'ENOTFOUND')  throw new ConnectionError('cannot connect')
            
            const { response } = error

            if (response && response.status) {
                const err = new HttpError()

                err.status = response.status

                throw err
            }
             
            throw error
        })
}

module.exports = call