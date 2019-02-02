'use strict'

import omdbApi from '.'

//const { env: { OMDB_API } } = process

omdbApi.api = 'ef8a2f56'

describe('searchItems', () => {
    const query = 'titanic'
    it ('should succeed on matching query', () => {
        return omdbApi.searchItems(query)
            .then(items => {
                expect(items).toBeDefined()
                //expect(items instanceof 'Array').toBeTruthy()
                //expect(items.length).toBe(10)
            }) 
    })
})
