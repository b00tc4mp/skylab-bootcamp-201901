const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const { expect } = chai

describe('log to console', () => {
    const name = `Manuel-${Math.random()}`
    const expected = `Hello Peter!`

    beforeEach(() => sinon.spy(console, 'log'))

    it(`should output salutation for random name: "${expected}"`, () => {
        target()

        expect(console.log).to.have.been.calledWith(expected)
    })

    afterEach(() => console.log.restore())
})