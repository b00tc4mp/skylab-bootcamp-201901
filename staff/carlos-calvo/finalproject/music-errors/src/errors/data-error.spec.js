'use strict'

const { expect } = require('chai')
const { DataError } = require('.')

describe('data error', () => {
    const message = 'hola mundo'
    
    it('should instantiate with message', () => {
        const error = new DataError(message)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(message)
    })

    it('should instantiate without message', () => {
        const error = new DataError()

        expect(error instanceof Error).to.be.true
        expect(error.message).to.be.empty
    })

    it('should instantiate with error', () => {
        const genericError = new Error(message)

        const error = new DataError(genericError)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(genericError.toString())
    })
})