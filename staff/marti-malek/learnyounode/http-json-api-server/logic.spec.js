const { expect } = require('chai')
const logic = require('./logic')

describe('logic', () => {
    describe('unixtime', () => {
        it('should succeed on correct timestamp', () => {
            const timestamp = '2013-08-10T12:10:15:474Z'
            const expectedUnixtime = 1376136615474

            expect(logic.unixtime(timestamp)).to.equal(expectedUnixtime)
        })
        it('should fail on bad timestamp', () => {
            const timestamp = null

            expect(logic.unixtime(timestamp)).to.throw(Error)
        })
    })
})