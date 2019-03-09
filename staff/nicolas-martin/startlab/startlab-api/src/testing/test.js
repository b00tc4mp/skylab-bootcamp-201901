const expect = require('chai').expect
const vm = require('vm')
const capcon = require('capture-console')

function checkAnswer(answer, test) {
  // 1. clean test
  //test = test.replace(/\n/gi, "")

  if (typeof answer !== 'string') throw Error(`${answer} is not a string`)
  if (!answer.trim().length) throw Error(`${answer} is empty`)

  if (typeof test !== 'string') throw Error(`${test} is not a string`)
  if (!test.trim().length) throw Error(`${test} is empty`)

  const context = { capcon }
  vm.createContext(context)

  var output = ''

  capcon.startCapture(process.stdout, function (stdout) {
    vm.runInContext("console.log('Holaaa')", context)
    output += process.stdout
  })

  capcon.stopCapture(process.stdout)

  console.log('Capturing stdout:', output)

  //return vm.runInContext(test, context)
}

// ***************************
// Testing several expects

var answer = "var numbers = [2, 5]"
var test = "expect(numbers).to.be.an('array');expect(numbers[0]).to.equal(2);expect(numbers[1]).to.equal(5)"


// ***************************
// Testing several expects and several lines of answer

var answer = "var name = []; function createArray() {name[0] = 2; name[1] = 5;}createArray()"
var test = "expect(name).to.be.an('array');expect(name[0]).to.equal(2);expect(name[1]).to.equal(5)"


// ***************************
// Testing console.log
// Declara tu nombre y muéstralo por consola

var answer = "var name = 'nico'; console.log(name);console.log('second console.log')"
var test = "expect(name).to.be.an('array');expect(name[0]).to.equal(2);expect(name[1]).to.equal(5)"


try {
  var result = checkAnswer(answer, test)
} catch (error) {
  console.log('Error:',error)
}

//console.log(result)


// when answer pass the tests we get:

// Assertion {
//   __flags:
//    [Object: null prototype] {
//      ssfi: [Function: proxyGetter],
//      lockSsfi: undefined,
//      object: [],
//      message: undefined } }