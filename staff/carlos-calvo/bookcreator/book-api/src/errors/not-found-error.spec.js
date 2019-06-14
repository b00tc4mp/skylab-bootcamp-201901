'use strict'

const { expect } = require('chai')
const { NotFoundError } = require('.')

describe('not found error', () => {
    const message = 'hola mundo'
    
    it('should instantiate with message', () => {
        const error = new NotFoundError(message)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(message)
    })

    it('should instantiate without message', () => {
        const error = new NotFoundError()

        expect(error instanceof Error).to.be.true
        expect(error.message).to.be.empty
    })

    it('should instantiate with error', () => {
        const genericError = new Error(message)

        const error = new NotFoundError(genericError)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(genericError.toString())
    })
})