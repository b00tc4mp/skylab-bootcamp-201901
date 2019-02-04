'use strict'

import edamamApi from '.'

/* const { env: { REACT_APP_EDAMAM_API_ID } } = process

.token = REACT_APP_EDAMAM_API_ID */

describe('edamam api', () => {
    describe('search recipes', () => {
        it('should succeed on matching query', () => {
            const query = 'chicken'
            const calA = 591
            const calB = 722
            
            return edamamApi.search(query, calA, calB)
                .then(recipes => {
                    expect(recipes).toBeDefined()
                    /* expect(recipes instanceof Array).toBeTruthy() */
                    expect(recipes.length).toBeGreaterThan(0)
                })
        })
    })
})