const {expect}= require('chai')
const logic =require ('./logic')

describe('logic', ()=>{
    describe ('unixtime', () =>{
        it('should succeed on correct timestamp', () =>{
            const timestamp= '2013-08-10T12:10:15.474'
            const expectedTime = 1376129415474

            expect(logic.unixtime(timestamp)).to.equal(expectedTime)
        })
    })
})