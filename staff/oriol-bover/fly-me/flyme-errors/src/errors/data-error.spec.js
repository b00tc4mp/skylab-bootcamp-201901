'use strict'

const { expect } = require('chai')
const { DataError } = require('.')

describe('Auth Error', () => {
    const message = "Hello World"

    it('should initiate with message', () => {
        const error = new DataError(message)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(message)
    })

    it('should initiate with empty message', () => {
        const error = new DataError()

        expect(error instanceof Error).to.be.true
        expect(error.message).to.be.empty
    })

    it('should initiate with error', () => {
        const genericError = new Error(message)

        const error = new DataError(genericError)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(genericError.toString())
    })
})