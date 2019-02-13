const { expect } = require('chai')
const logic = require('./logic')

describe('logic', () => {
    describe('unixtime', () => {
        it('should succeed on correct timestamp', () => {
            const timestamp = '2013-08-10T12:10:15.474Z'
            const expected = 1376136615474

            expect(logic.unixtime(timestamp)).to.equal(expected)
        })
    })

    describe('parsetime', () => {
        it('should succeed on correct timestamp', () => {
            const timestamp = '2013-08-10T12:10:15.474Z'
            const expected = { h: 14, m: 10, s: 15 }

            const { h, m, s } = logic.parsetime(timestamp)

            expect(h).to.equal(expected.h)
            expect(m).to.equal(expected.m)
            expect(s).to.equal(expected.s)
        })
    })
})