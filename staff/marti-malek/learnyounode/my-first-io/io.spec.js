const { expect } = require('chai')
const io = require('./io')

describe('my first io', () => {
    it('should succeed on correct data', () => {
        const myText = 'Hello \n World'

        const res = io(myText)

        const expected = 1

        expect(res).to.equal(expected)
    })
})