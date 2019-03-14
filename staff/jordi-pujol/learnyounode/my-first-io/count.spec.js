const { expect } = require('chai')
const count = require('./count')

describe ('my first i/o', () => {

    it('should succeed on jumping lines', () => {
        
        const string = `dasdasda\ndsadsadadas\ndfsdfsdfsd\nsdasd`

        const res = count(string)

        expect(res).to.equal(3)
    })
})