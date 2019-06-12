import validate from 'gelato-validation'
import { ConnectionError, LogicError, TimeoutError } from 'gelato-errors'
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
function call (url, options = {}) {
  const { method = 'GET', headers, body, timeout = 0 } = options

  validate.arguments([
    { name: 'url', value: url, type: 'string', notEmpty: true },
    { name: 'method', value: method, type: 'string', notEmpty: true },
    { name: 'headers', value: headers, type: 'object', optional: true },
    { name: 'body', value: body, type: 'object', optional: true },
    { name: 'timeout', value: timeout, type: 'number', notEmpty: true, optional: true }
  ])
  debugger
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
      if (!err.response) throw err
      const { response: { data: { error } } } = err
      if (error) err.message = error
      if (err instanceof TypeError) throw new ConnectionError('cannot connect')
      else if (err instanceof window.DOMException) throw new TimeoutError(`time out, exceeded limit of ${timeout}ms`)
      else throw new LogicError(err.message)
    })
}

export default call
