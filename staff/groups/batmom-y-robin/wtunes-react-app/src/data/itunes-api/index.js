import validate from '../../common/validate'
import call from '../../common/call'

const itunesApi = {
    __url__: 'https://skylabcoders.herokuapp.com/proxy?url=https://itunes.apple.com',

    searchMusic(term, media, limit){
    
        validate.arguments([
            { name: 'term', value: term, type: 'string', notEmpty: true },  
            { name: 'media', value: media, type: 'string', optional: true },
            { name: 'limit', value: limit, type: 'number', optional: true}
        ])

        return call(`${this.__url__}/search?term=${term}&media=${media}&limit=${limit}`)
            .then(response => response.json())
    }

}

export default itunesApi