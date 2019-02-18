'use strict'

import edamamApi from '.'

describe('edamam api', () => {
    describe('search recipes', () => {
        let query = 'chicken'
        let calories = '&calories=700-900'
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
        it('should fail on empty query instead of string',() => {

            query = ''

            expect(() => 
                edamamApi.search(query, calories, diet, health)
            ).toThrow(TypeError(`query is empty`))
        })
        it('should fail on boolean query instead of string',() => {

            query = true

            expect(() => 
                edamamApi.search(query, calories, diet, health)
            ).toThrow(TypeError(`${query} is not a string`))
        })
        it('should fail on object query instead of string',() => {

            query = {}

            expect(() => 
                edamamApi.search(query, calories, diet, health)
            ).toThrow(TypeError(`${query} is not a string`))
        })
        it('should fail on undefined query instead of string',() => {

            query = undefined

            expect(() => 
                edamamApi.search(query, calories, diet, health)
            ).toThrow(TypeError(`${query} is not a string`))
        })
        it('should fail on null query instead of string',() => {

            query = null

            expect(() => 
                edamamApi.search(query, calories, diet, health)
            ).toThrow(TypeError(`${query} is not a string`))
        })
        it('should fail on empty calories instead of string',() => {

            query = 'chicken'
            calories = ''

            expect(() => 
                edamamApi.search(query, calories, diet, health)
            ).toThrow(TypeError(`calories is empty`))
        })
        it('should fail on boolean calories instead of string',() => {

            calories = true

            expect(() => 
                edamamApi.search(query, calories, diet, health)
            ).toThrow(TypeError(`${calories} is not a string`))
        })
        it('should fail on undefined calories instead of string',() => {

            calories = undefined

            expect(() => 
                edamamApi.search(query, calories, diet, health)
            ).toThrow(TypeError(`${calories} is not a string`))
        })
        it('should fail on null calories instead of string',() => {

            calories = null

            expect(() => 
                edamamApi.search(query, calories, diet, health)
            ).toThrow(TypeError(`${calories} is not a string`))
        })
        it('should fail on number calories instead of string',() => {

            calories = 4

            expect(() => 
                edamamApi.search(query, calories, diet, health)
            ).toThrow(TypeError(`${calories} is not a string`))
        })
        it('should fail on object calories instead of string',() => {

            calories = {}

            expect(() => 
                edamamApi.search(query, calories, diet, health)
            ).toThrow(TypeError(`${calories} is not a string`))
        })
    })
})