const {expect} =require('chai')
const filterByExtension = require('./filter-by-extension')

describe('filtered-ls', ()=>{
    it ('should succeed on correct dir', done =>{
        const dir = __dirname + "/test";

        filterByExtension(dir, 'js', (error, filteredList)=>{
            expect(error).to.equal(null)
            expect(filteredList.toString()).to.equal(['marti.js', 'oriol.js'].toString())    
            done()
        })

    })

    it ('should return an empty array with no found extension', done =>{
        const dir = __dirname + "/test";

        filterByExtension(dir, 'html', (error, filteredList)=>{
            expect(error).to.equal(null)
            expect(filteredList.toString()).to.equal([].toString())    
            done()
        })
    })

    it ('should throw Error', () =>{
        const dir = __dirname + "/test2" 

        res= done => filterByExtension(dir, 'html', (error, filteredList)=>{
            expect(error).to.exist
            expect(filteredList).to.not.exist
            done()
        })
    })
})