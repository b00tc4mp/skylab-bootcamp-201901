const {expect} =require('chai')
const countLines = require('./countLines')

describe('my-first-io', ()=>{
    it ('should succeed on correct numbers', () =>{
        const string='El marti es \n un cap \n de bassa.\n'

        const res= countLines(string)

        expect(res).to.equal(3)
    })

    it ('should return 0 with no line string', () =>{
        const string='El marti es un cap  de bassa.'

        const res= countLines(string)

        expect(res).to.equal(0)
    })
})