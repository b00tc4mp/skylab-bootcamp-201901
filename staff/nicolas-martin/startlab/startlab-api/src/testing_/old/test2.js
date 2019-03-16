const vm = require('vm')
const capcon = require('capture-console')

function checkAnswer(answer, test) {
  // 1. clean test
  //test = test.replace(/\n/gi, "")

  if (typeof answer !== 'string') throw Error(`${answer} is not a string`)
  if (!answer.trim().length) throw Error(`${answer} is empty`)

  if (typeof test !== 'string') throw Error(`${test} is not a string`)
  if (!test.trim().length) throw Error(`${test} is empty`)

  var stdout = capcon.captureStdout(function scope() {
    vm.runInThisContext(answer)
  })

  console.log('Capturing stdout:', stdout)

}

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