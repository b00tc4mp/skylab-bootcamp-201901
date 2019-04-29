import validate from '../../common/validate'
import call from '../../common/call'
import { NotFoundError, ConnectionError } from '../../common/errors';


const transitApi = {
    __url__: 'https://api.tmb.cat/v1/transit/linies/bus',
    __timeout__: 0,

    
    retrieveBusLine(app_id, app_key, line_id) {
        validate.arguments([
            { name: 'id', value: app_id, type: 'string', notEmpty: true, optional: false },
            { name: 'key', value: app_key, type: 'string', notEmpty: true, optional: false },
            { name: 'line', value: line_id, type: 'number', notEmpty: true, optional: true }
        ])

        let path = ''
        if (line_id) path = line_id
        return call(`${this.__url__}/${path}?app_id=${app_id}&app_key=${app_key}`, {
            timeout: this.__timeout__
        })
        .then(response => {
            if (response.status === 404) throw new NotFoundError('cannot found')
            if (response.status === 403) throw new ConnectionError('cannot connect')
            if (response.status === 200 && response.totalFeatures === 0) throw new NotFoundError('cannot found')

            return response.json()
        })

    },

    
    retrieveBusLineRoute(app_id, app_key, line_id) {
        validate.arguments([
            { name: 'id', value: app_id, type: 'string', notEmpty: true, optional: false },
            { name: 'key', value: app_key, type: 'string', notEmpty: true, optional: false },
            { name: 'line', value: line_id, type: 'number', notEmpty: true, optional: false }
        ])

        return call(`${this.__url__}/${line_id}/recs?app_id=${app_id}&app_key=${app_key}`, {
            timeout: this.__timeout__
        })
        .then(response => {
            if (response.status === 404) throw new NotFoundError('cannot found')
            if (response.status === 403) throw new ConnectionError('cannot connect')
            if (response.status === 200 && response.totalFeatures === 0) throw new NotFoundError('cannot found')

            return response.json()
        })
    },


    
    retrieveBusStops(app_id, app_key, line_id) {
        validate.arguments([
            { name: 'id', value: app_id, type: 'string', notEmpty: true, optional: false },
            { name: 'key', value: app_key, type: 'string', notEmpty: true, optional: false },
            { name: 'line', value: line_id, type: 'number', notEmpty: true, optional: false }
        ])

        let path = ''
        if (line_id) path = line_id
        return call(`${this.__url__}/${line_id}/parades?app_id=${app_id}&app_key=${app_key}`, {
            timeout: this.__timeout__
        })
        .then(response => {
            if (response.status === 404) throw new NotFoundError('cannot found')
            if (response.status === 403) throw new ConnectionError('cannot connect')
            if (response.status === 200 && response.totalFeatures === 0) throw new NotFoundError('cannot found')

            return response.json()
        })
    },


}

export default transitApi