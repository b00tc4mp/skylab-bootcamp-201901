import validate from '../../common/validate'
import call from '../../common/call'

const weatherApi = {
    __url__: 'https://api.openweathermap.org/data/2.5/weather?q=',
    __timeout__: 0,
    __appid__: '5f7570680b709b073eda85e8a922950b',

    retrieve(city) {
        validate.arguments([
            { name: 'city', value: city, type: 'string', notEmpty: true},
        ])

        return call(`${this.__url__}${city}&appid=${this.__appid__}`, {
            headers: { 'Content-Type': 'application/json' },
            timeout: this.__timeout__
        })
            .then(response => response.json())
    }
}

export default weatherApi