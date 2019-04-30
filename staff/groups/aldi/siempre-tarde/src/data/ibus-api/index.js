import validate from '../../common/validate'
import call from '../../common/call'
import { NotFoundError, ConnectionError, NoDataError } from '../../common/errors';

const iBusApi = {
    __url__: 'https://api.tmb.cat/v1/ibus',
    __timeout__: 0,

    retrieveStopId(app_id, app_key, stop_id) {
        validate.arguments([
            { name: 'id', value: app_id, type: 'string', notEmpty: true, optional: false },
            { name: 'key', value: app_key, type: 'string', notEmpty: true, optional: false },
            { name: 'stop', value: stop_id, type: 'number', notEmpty: true, optional: false }
        ])

        return call(`${this.__url__}/stops/${stop_id}?app_id=${app_id}&app_key=${app_key}`, {
            timeout: this.__timeout__
        })
        .then(response => {


            const { status, data: { ibus } } = response

            if (status === 200 && ibus === undefined) throw new NoDataError('no data recived')
            if (status === 404) throw new NotFoundError('cannot found')
            if (status === 403) throw new ConnectionError('cannot connect')
            return response.json()
        })
    },

    retrieveLineId(app_id, app_key, stop_id, line_id) {
        validate.arguments([
            { name: 'id', value: app_id, type: 'string', notEmpty: true, optional: false },
            { name: 'key', value: app_key, type: 'string', notEmpty: true, optional: false },
            { name: 'stop', value: stop_id, type: 'number', notEmpty: true, optional: false },
            { name: 'line', value: line_id, type: 'number', notEmpty: true, optional: false }
        ])

        return call(`${this.__url__}/lines/${line_id}/stops/${stop_id}?app_id=${app_id}&app_key=${app_key}`, {
            timeout: this.__timeout__
        })
            .then(response => {
                const { status, data: { ibus } } = response

                if (status === 200 && ibus === undefined) throw new NoDataError('no data recived')
                if (status === 404) throw new NotFoundError('cannot found')
                if (status === 403) throw new ConnectionError('cannot connect')
                return response.json()
            })

    }
}

export default iBusApi