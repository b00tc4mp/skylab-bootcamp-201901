/**
 * @jest-environment node
*/

const { FormatError, ValueError } = require('../../common/errors')
const gMaps = require('.');

describe('maps', () => {
    describe('Html fetch', () => {
        it('should fetch correctly data from the given url', async () => {
            const url = 'https://maps.googleapis.com/maps/api/directions/json?origin=41.353172,2.1028038&destination=41.4418285,2.1993901&key=AIzaSyDUJnlk-inpNkXenyzldRXMGWOAPjZR2S4&mode=walking'
            const html = await gMaps.getData(url)

            expect(html).toBeDefined()
            expect(typeof html).toBe('object')
        }),

        it('should fail on incorrect given url', () => {
            const url = 'haskdjhsakdhjlsakjd'
            expect(() => gMaps.getData(url)).toThrowError(FormatError, `${url} is not a url`)
        })

        it('should fail on incorrect given url', () => {
            const url = ''
            expect(() => gMaps.getData(url)).toThrowError(ValueError, `${url} is empty`)
        })
    })
})
