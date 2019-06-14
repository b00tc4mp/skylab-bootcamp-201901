'use strict'

const { expect } = require('chai')
const { MatchingError } = require('.')

describe('matching error', () => {
    const message = 'hola mundo'
    
    it('should instantiate with message', () => {
        const error = new MatchingError(message)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(message)
    })

    it('should instantiate without message', () => {
        const error = new MatchingError()

        expect(error instanceof Error).to.be.true
        expect(error.message).to.be.empty
    })

    it('should instantiate with error', () => {
        const genericError = new Error(message)

        const error = new MatchingError(genericError)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(genericError.toString())
    })
})