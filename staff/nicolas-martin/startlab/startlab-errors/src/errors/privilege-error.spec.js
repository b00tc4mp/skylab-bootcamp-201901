'use strict'

const { expect } = require('chai')
const { PrivilegeError } = require('.')

describe('not found error', () => {
    const message = 'hola mundo'
    
    it('should instantiate with message', () => {
        const error = new PrivilegeError(message)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(message)
    })

    it('should instantiate without message', () => {
        const error = new PrivilegeError()

        expect(error instanceof Error).to.be.true
        expect(error.message).to.be.empty
    })

    it('should instantiate with error', () => {
        const genericError = new Error(message)

        const error = new PrivilegeError(genericError)

        expect(error instanceof Error).to.be.true
        expect(error.message).to.equal(genericError.toString())
    })
})