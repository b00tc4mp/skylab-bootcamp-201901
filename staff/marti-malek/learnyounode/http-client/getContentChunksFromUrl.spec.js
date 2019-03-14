const { expect } = require('chai')
const getContentChunksFromUrl = require('./getContentChunksFromUrl')

describe('http-client', () => {
    describe('getContentChunksFromUrl', () => {
        it('should succeed on correct url', () => {
            let url = "./"
            getContentChunksFromUrl(url, (error, chunk) => {
                expect(chunk).to.exist()
            })
        })
        //TODO
        /* it('should succeed on correct url', () => {
            let url = "./"
            getContentChunksFromUrl(url, (error, chunk) => {
                expect(chunk).to.exist()
            })
        }) */
    })
})