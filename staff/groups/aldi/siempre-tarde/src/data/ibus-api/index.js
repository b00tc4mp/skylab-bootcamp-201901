import validate from '../../common/validate'
import call from '../../common/call'
import { NotFoundError, ConnectionError, NoDataError } from '../../common/errors';

const iBusApi = {
    APP_ID: null,
    APP_KEY: null,

    __url__: 'https://api.tmb.cat/v1/ibus',
    __timeout__: 0,

    retrieveStopId(stop_id) {
        validate.arguments([
            { name: 'stop', value: stop_id, type: 'number', notEmpty: true, optional: false }
        ])
        
        return call(`${this.__url__}/stops/${stop_id}?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`, {
            timeout: this.__timeout__
        })
        .then(response => {
            if (response.status === 200) { 
                return response.json()
            }  
            if (response.status === 404) throw new NotFoundError('cannot found')
            if (response.status === 403) throw new ConnectionError('cannot connect')  
        })
        .then( response =>{
            const {data:{ibus}} = response
            if (ibus === undefined){ 
                throw new NoDataError('no data recived')
            } else { return response }
        })

    },

    retrieveLineId(stop_id, line_id) {
        validate.arguments([
            { name: 'stop', value: stop_id, type: 'number', notEmpty: true, optional: false },
            { name: 'line', value: line_id, type: 'number', notEmpty: true, optional: false }
        ])

        return call(`${this.__url__}/lines/${line_id}/stops/${stop_id}?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`, {
            timeout: this.__timeout__
        })
        .then(response => {
            if (response.status === 200) { 
                return response.json()
            }  
            if (response.status === 404) throw new NotFoundError('cannot found')
            if (response.status === 403) throw new ConnectionError('cannot connect') 
        })
        .then( response =>{
                
            const {data:{ibus}} = response
            if (ibus === undefined){ 
                throw new NoDataError('no data recived')             
            } else { return response }
        })
    }
}

export default iBusApi