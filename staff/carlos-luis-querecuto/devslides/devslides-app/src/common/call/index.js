import validate from '../validate'
import { ConnectionError, HttpError } from '../errors'
import axios from 'axios'

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
        { name: 'data', value: data, type: 'object', optional: true }
    ])

    validate.url(url)

    return (async () => {
        try {
            const response = await axios({
                headers,
                method,
                url,
                data
            })

            return response.data
        } catch (err) {
            if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') throw new ConnectionError('cannot connect')

            if (!err.response) throw err
            const { response: { data: { error } } } = err
            if (error) err.message = error

            throw err
        }
    })()
}

export default call