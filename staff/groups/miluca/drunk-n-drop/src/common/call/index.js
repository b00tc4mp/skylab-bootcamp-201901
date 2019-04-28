import validate from '../validate'
import { ConnectionError, TimeoutError } from '../errors'

/**
 * Makes an HTTP call.
 * 
 * @param {*} url 
 * @param {*} callback 
 * @param {*} options 

 * @version 1.0.0
 */
function call(url, options = {}) {
    const { method = 'GET', headers, body, timeout = 0 } = options

    validate.arguments([
        { name: 'url', value: url, type: 'string', notEmpty: true },
        { name: 'method', value: method, type: 'string', notEmpty: true },
        { name: 'headers', value: headers, type: 'object', optional: true },
        { name: 'body', value: body, type: 'string', notEmpty: true, optional: true },
        { name: 'timeout', value: timeout, type: 'number', notEmpty: true, optional: true },
    ])

    validate.url(url)

    let signal

    if (timeout) {
        const controller = new AbortController
        signal = controller.signal
        setTimeout(() => controller.abort(), timeout)
    }

    return fetch(url, {
        method,
        headers,
        body,
        signal
    })
        .catch(error => {
            if (error instanceof TypeError) throw new ConnectionError('cannot connect')
            else if (error instanceof DOMException) throw new TimeoutError(`time out, exceeded limit of ${timeout}ms`)
            else throw error
        })
}

export default call