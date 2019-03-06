const path = require('path')
const {expect} =require('chai')
const countLines = require('./count-lines')

describe('my-first-async-io', ()=>{
    
    it ('should succeed on correct numbers', done =>{
        // const file = __dirname + "/test.txt";
        const file=path.join(__dirname,'test.txt')

        countLines(file, (error, data) => {
            expect(error).to.equal(null)
            expect(data).to.equal(3)
            done()
        })
    })

    it ('should return 0 with no line string', done =>{
        const file = __dirname + "/test0.txt";

        countLines(file, (error, data) => {
        expect(error).to.equal(null)
        expect(data).to.equal(0)
        done()
        })
    })


    it ('should throw Error', done =>{
        const file = __dirname + "/test1.txt";

        countLines(file, (error, data) => {
            expect(error).to.exist
            expect(data).to.not.exist
            done()
        })
    })
})