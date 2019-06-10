import validate from 'pg-validate'
import { ConnectionError, HttpError } from 'pg-errors'
import axios from 'axios'

/**
 * Makes an HTTP call.
 * 
 * @param {*} url 
 * @param {*} callback 
 * @param {*} options 
 * 
 * @version 1.0.0
 */
function call(url, options = {}) {
    const { method = 'GET', headers, body, timeout = 0 } = options
    
    validate.arguments([
        { name: 'url', value: url, type: 'string', notEmpty: true },
        { name: 'method', value: method, type: 'string', notEmpty: true },
        { name: 'headers', value: headers, type: 'object', optional: true },
        { name: 'body', value: body, type: 'object', optional: true },
        { name: 'timeout', value: timeout, type: 'number', notEmpty: true, optional: true },
    ])

    validate.url(url)
    
    return (async () => {
        
        try {
            const response = await axios({
                url,
                method,
                headers,
                data: body,
                timeout

            })
            
            return response.data
        } catch (error) {
            if (error.code === 'ENOTFOUND') throw new ConnectionError('cannot connect')

            const { response } = error

            if (response && response.status) {
                const err = new HttpError()

                err.status = response.status
                // por que axios modifica los errores que viene de abajo
                err.message = response.data.error

                throw err
            }

            throw error
        }
    })()
}
export default call
// module.exports = call