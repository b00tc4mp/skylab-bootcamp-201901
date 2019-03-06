const { expect } = require('chai')
const asyncIo = require('./async-io')

describe('my first async io', () => {
    it('should succeed on correct data', () => {
        const myText = 'Hello \n World'

        const res = asyncIo(null, myText)

        const expected = 1

        expect(res).to.equal(expected)
    })
    it('should fail on defined error', () => {
        const myText = 'Hello \n World'
        const res = () => asyncIo(true, myText)

        expect(res).to.throw(Error, 'Async error found')
    })
})