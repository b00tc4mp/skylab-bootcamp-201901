const { expect } = require('chai')
const filter = require('./filter')

describe('filtered-ls', () => {
    it('should succed on correct params', () => {
        const list = ['example.js', 'example2.js', 'example3.md']

        const res = filter(null, list, 'js')

        const expected = ['example.js', 'example2.js']

        expect(res.toString()).to.equal(expected.toString())
    })
    it('should fail on wrong params', () => {
        //TODO
        const list = ['example.js', 'example2.js', 'example3.md']

        const res = filter(null, list, 'js')

        const expected = ['example.js', 'example2.js']

        expect(res.toString()).to.equal(expected.toString())
    })
})