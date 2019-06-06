const axios = require('axios')
const { ConnectionError, TimeoutError, HttpError } = require('../errors')
// import validate from '../validate'

// import { validate, ReactJoiValidations } from 'react-joi-validation';
// import Joi from 'joi-browser'



function call(url, options) {
    debugger
    const { method , headers, data, timeout = 0 } = options


        return (async () => {
            try {
                debugger
                const result = await axios({
                    url,
                    method,
                    headers,
                    data,
                    timeout
                })
                return result
            } catch (err) {
                debugger
                if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') throw new ConnectionError('cannot connect')

                if (!err.response) throw err
                const { response: { data: { error } } } = err
                if (error) err.message = error

                throw err
            }
        })()
}

module.exports= call;