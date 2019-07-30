const axios = require('axios')
const validate = require('../../common/validate')

const gMaps = {

    getData(url) {
        validate.arguments([
            { name: 'url', value: url, type: 'string', notEmpty: true },
        ])

        validate.url(url)

        return (async () => {
            const { data } = await axios.get(url)
            return data
        })()
    },
}

module.exports = gMaps
