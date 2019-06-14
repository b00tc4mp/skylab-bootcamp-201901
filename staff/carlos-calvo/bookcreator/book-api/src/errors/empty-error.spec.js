'use strict'

const { expect } = require('chai')
const { EmptyError } = require('.')

describe('empty error', () => {
    const message = 'hola mundo'
    
    it('should instantiate with message', () => {
        const error = new EmptyError(message)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(message)
    })

    it('should instantiate without message', () => {
        const error = new EmptyError()

        expect(error instanceof Error).to.be.true
        expect(error.message).to.be.empty
    })

    it('should instantiate with error', () => {
        const genericError = new Error(message)

        const error = new EmptyError(genericError)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(genericError.toString())
    })
})