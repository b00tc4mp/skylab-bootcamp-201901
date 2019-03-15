const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
// const salute = require('.')
const vm = require('vm')

chai.use(sinonChai)

const { expect } = chai

const answer = "var name = 'nico'; console.log(name);"

describe('log to console', () => {
   const name = `Manuel-${Math.random()}`
   const expected = `Hello, ${name}!`

   it(`should output salutation for random name: "${expected}"`, () => {
        sinon.spy(console, 'log')

        //salute(name)

        vm.runInThisContext(answer)

        expect(console.log).to.have.been.calledWith(expected)
   })
})



// function salute(name) {
//     console.log(`Hello, ${name}!`)
// }


// function checkAnswer(answer, test) {

//     validate([
//         { key: 'answer', value: answer, type: String },
//         { key: 'test', value: test, type: String }
//     ])
    
//     test = test.replace(/\n/gi, "")

//     const context = { expect }
//     vm.createContext(context)

//     vm.runInContext(answer, context)

//     return vm.runInContext(test, context)
// }