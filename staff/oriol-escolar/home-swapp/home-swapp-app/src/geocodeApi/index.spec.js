'use strict'

require('dotenv').config()


import expect from 'expect'
import geocodeApi from './index'

describe('geocodeApi ', () => {


    describe('retrieve spanish location', () => {


        it('should succeed on valid spanish data', () => {

            let city = 'badalona'
            let country = 'spain'
            let street = 'tamariu'
            let number = '29'

            return geocodeApi.retrievePoint(number,street,city,country)
            .then(location => {

                expect(location).toBeDefined()
                expect(location.lat).toBeDefined()
                expect(location.lng).toBeDefined()

            })


        })

        it('should succeed on valid usa data', async () => {

            let city = 'Los Angeles'
            let country = 'usa'
            let number = '3649'
            let street = 'Wilson Street'

            const location = await geocodeApi.retrievePoint(number,street,city,country)

            expect(location.lat).toBeDefined()
            expect(location.lng).toBeDefined()


        })

        it('should fail on undefined number', () => {
            let city = 'badalona'
            let country = 'spain'
            let street = 'tamariu'
            let number = '29'
            try {
                geocodeApi.retrievePoint(undefined,street,city,country)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined street', () => {
            let city = 'badalona'
            let country = 'spain'
            let street = 'tamariu'
            let number = '29'
            try {
                geocodeApi.retrievePoint(number,undefined,city,country)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })
        it('should fail on undefined city', () => {
            let city = 'badalona'
            let country = 'spain'
            let street = 'tamariu'
            let number = '29'
            try {
                geocodeApi.retrievePoint(number,street,undefined,country)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })
        it('should fail on undefined country', () => {
            let city = 'badalona'
            let country = 'spain'
            let street = 'tamariu'
            let number = '29'
            try {
                geocodeApi.retrievePoint(number,street,city,undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined country', () => {
           let number = 'sjbdjkasbdj'
           let street = 'sjbdjkasbdj'
           let city = 'sjbdjkasbdj'
           let country = 'sjbdjkasbdj'
            try {
                geocodeApi.retrievePoint(number,street,city,country)

            } catch (error) {
                expect(error).toBeDefined()
            }
        })
    })
})