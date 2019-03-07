const { expect } = require('chai')
const sum = require('./sum')

describe('baby steps', () => {
    it('should succeed on correct numbers', () => {
        const a = 10, b = 5

        const res = sum(a, b)

        expect(res).to.equal(a + b)
    })
})

