const path = require('path')
const { expect } = require('chai')
const numOfBreaksFromFileContent = require('./num-of-breaks-from-file-content')

describe('number of breaks from file content', () => {
    it('should succeed on correct file path', done => {
        // const filePath = `${__dirname}/index.html`
        const filePath = path.join(__dirname, 'index.html')
        const expected = 11

        numOfBreaksFromFileContent(filePath, (error, numOfBreaks) => {
            if (error) throw error

            expect(numOfBreaks).to.equal(expected)

            done()
        })
    })

    it('should fail on wrong file path', done => {
        const filePath = path.join(__dirname, 'i-do-not-exist')
        const expected = 11

        numOfBreaksFromFileContent(filePath, (error, numOfBreaks) => {
            expect(error).to.exist

            done()
        })
    })
})