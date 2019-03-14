const { expect } = require('chai')
const sum = require('./sum.js')

describe('baby steps', () => {
    it('should succeed on correct numbers', () => {
        const a = 10
        const b = 5
        const res = sum(a, b)

        const expected = a + b

        expect(res).to.equal(expected)
    })
})