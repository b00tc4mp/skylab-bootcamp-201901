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

        it('should succeed on valid spanish data', async () => {

            let city = 'Los Angeles'
            let country = 'usa'
            let number = '3649'
            let street = 'Wilson Street'

            const location = await geocodeApi.retrievePoint(number,street,city,country)

            expect(location.lat).toBeDefined()
            expect(location.lng).toBeDefined()


        })
    })
})