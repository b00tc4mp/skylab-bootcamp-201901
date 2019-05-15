import React from 'react'
import validate from '../../common/validate'
import { ConnectionError, TimeoutError } from "../../common/errors"

const duckApi = {
    __url__: 'https://duckling-api.herokuapp.com/api',
    __timeout__: 0,

    searchDucks(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' }
        ])
        
        const controller =  new AbortController();
        let signal;
        if (this.__timeout__) {
          signal = controller.signal;
          const timeout = setTimeout(() => controller.abort(), this.__timeout__);
        }

        return fetch(`${this.__url__}/search?q=${query}`, {
          signal,
        })
          .then(res => res.json())
          .catch(error => { 
            if (error instanceof TypeError) throw new ConnectionError('cannot connect')
            else if (error instanceof DOMException) throw new TimeoutError(`time out, exceeded limit of ${this.__timeout__}ms`)
            else throw error;
          })
    },

    retrieveDuck(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        const controller =  new AbortController();
        let signal;
        if (this.__timeout__) {
          signal = controller.signal;
          const timeout = setTimeout(() => controller.abort(), this.__timeout__);
        }

        return fetch(`${this.__url__}/ducks/${id}`, {
          signal
        })
          .then(res => res.json())
          .catch(error => { 
            if (error instanceof TypeError) throw new ConnectionError('cannot connect')
            else if (error instanceof DOMException) throw new TimeoutError(`time out, exceeded limit of ${this.__timeout__}ms`)
            else throw error;
          })
    }
}

export default duckApi