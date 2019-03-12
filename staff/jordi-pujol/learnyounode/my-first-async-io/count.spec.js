const { expect } = require ('chai')
const count = require ('./count')

describe ('my first i/o', () => {

    it('should succeed on jumping lines', (done) => {

            const path = __dirname + '/index.html'

            count(path, (err, input) =>{ 
                expect(input).to.equal(11)
                done()
            })
    })
})