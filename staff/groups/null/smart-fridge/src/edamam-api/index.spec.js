'use strict'

import edamamApi from '.'

/* const { env: { REACT_APP_EDAMAM_API_ID } } = process

.token = REACT_APP_EDAMAM_API_ID */

describe('edamam api', () => {
    describe('search recipes', () => {
        let query = 'chicken'
        let calories = ''
        let diet = '&diet=balanced'
        let health = ['vegan','vegetarian']
        it('should succeed on matching query', () => {
            
            return edamamApi.search(query, calories, diet, health)
                .then(recipes => {
                    expect(recipes).toBeDefined()
                    expect(recipes instanceof Array).toBeTruthy()
                    expect(recipes.length).toBeGreaterThan(0)
                })
        })
    })
})