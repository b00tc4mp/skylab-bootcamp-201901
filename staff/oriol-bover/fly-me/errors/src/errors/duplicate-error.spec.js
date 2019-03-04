'use strict'

const { expect } = require('chai')
const { DuplicateError } = require('.')

describe('duplicate error', () => {
    const message = 'hola mundo'

    it('should instantiate with message', () => {
        const error = new DuplicateError(message)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(message)
    })

    it('should instantiate without message', () => {
        const error = new DuplicateError()

        expect(error instanceof Error).to.be.true
        expect(error.message).to.be.empty
    })

    it('should instantiate with error', () => {
        const genericError = new Error(message)

        const error = new DuplicateError(genericError)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(genericError.toString())
    })
})