import validate from '../../common/validate'
import call from '../../common/call'

const cocktailApiSearchByGlass = {

    __url__ : 'https://www.thecocktaildb.com/api/json/v1/1',

    searchByGlass(query) {
        validate.arguments([
            {name: 'query', value: query, type: 'string'}
        ])        

        return call(`${this.__url__}/filter.php?g=${query}`)
        .then(response => response.json())
    }
}

export default cocktailApiSearchByGlass