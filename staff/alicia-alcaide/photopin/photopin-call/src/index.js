/*
import validate from 'photopin-validate'
import { ConnectionError, HttpError } from 'photopin-errors'
import axios from 'axios'
*/
const validate = require('photopin-validate')
const { ConnectionError, HttpError } = require('photopin-errors')
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
        } catch (error) {
            if (error.code === 'ENOTFOUND') throw new ConnectionError('cannot connect')

            const { response } = error

            if (response && response.status) {
                const err = new HttpError()

                err.status = response.status

                throw err
            }

            throw error
        }
    })()
}


module.exports = call