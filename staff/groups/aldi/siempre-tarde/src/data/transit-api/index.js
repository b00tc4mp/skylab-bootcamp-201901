import validate from '../../common/validate'
import call from '../../common/call'
import { NotFoundError, ConnectionError } from '../../common/errors';


const transitApi = {
    APP_ID: null,
    APP_KEY: null,


    __url_lines__: 'https://api.tmb.cat/v1/transit/linies/bus',
    __url_stops__ : 'https://api.tmb.cat/v1/transit/parades/',
    __timeout__: 0,

    
    retrieveBusLine(line_id) {
        validate.arguments([
            { name: 'line', value: line_id, type: 'number', notEmpty: true, optional: true }
        ])

        let path
        line_id ? path = line_id : path = ''
        return call(`${this.__url_lines__}/${path}?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`, {
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
                if (response.totalFeatures === 0){ 
                    throw new NotFoundError('cannot found')
                }else { return response }
            })

    },

    
    retrieveBusLineRoute(line_id) {
        validate.arguments([
            { name: 'line', value: line_id, type: 'number', notEmpty: true, optional: false }
        ])

        return call(`${this.__url_lines__}/${line_id}/recs?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`, {
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
            if (response.totalFeatures === 0){ 
                throw new NotFoundError('cannot found')
            }else { return response }
        })
    },


    
    retrieveBusStops(line_id) {
        validate.arguments([
            { name: 'line', value: line_id, type: 'number', notEmpty: true, optional: false }
        ])

        let path = ''
        if (line_id) path = line_id
        return call(`${this.__url_lines__}/${line_id}/parades?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`, {
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
            if (response.totalFeatures === 0){ 
                throw new NotFoundError('cannot found')
            }else { return response }
        })
    },


    retrieveStop(stop_id) {
        validate.arguments([
            { name: 'stop', value: stop_id, type: 'number', notEmpty: true, optional: false }
        ])
        
        return call(`${this.__url_stops__}/${stop_id}?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`, {
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
            if (response.totalFeatures === 0){ 
                throw new NotFoundError('cannot found')
            }else { return response }
        })
    },



}

export default transitApi