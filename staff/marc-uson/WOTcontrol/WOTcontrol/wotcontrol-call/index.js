const validate = require('wotcontrol-validate')
const { ConnectionError, HttpError } = require('wotcontrol-errors')
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
    let timeout = 15000
    validate.arguments([
        { name: 'url', value: url, type: 'string', notEmpty: true },
        { name: 'method', value: method, type: 'string', notEmpty: true },
        { name: 'headers', value: headers, type: 'object', optional: true },
        { name: 'data', value: data, type: 'object', optional: true }
    ])

    validate.url(url)

    return (async () => {
        try {
            const response = await axios({
                headers,
                method,
                url,
                timeout: timeout,
                data
            })
            return response.data
        } catch (error) {

            if(error.code == `ECONNABORTED`) throw new ConnectionError(`Connection timed out`)
            if(error.code == `ECONNREFUSED`) throw new ConnectionError(`Connection refused`)
            if (error.response) throw error.response.data.error
            else throw error
        }
    })()
}

module.exports = call