const expect = require('chai').expect
const vm = require('vm')
var stdout = require("test-console").stdout

function checkAnswer(answer, test) {

    test = test.replace(/\n/gi, "").trim()

    if (typeof answer !== 'string') throw Error(`${answer} is not a string`)
    if (!answer.trim().length) throw Error(`${answer} is empty`)

    if (typeof test !== 'string') throw Error(`${test} is not a string`)
    if (!test.trim().length) throw Error(`${test} is empty`)

    console.log(answer)
    console.log(test)

    const context = { expect }
    vm.createContext(context)

    output = stdout.inspectSync(function() {
        vm.runInContext(answer, context)
        vm.runInThisContext(answer)
    })

    context.stdout = output

    console.log('Context: ', context)
    console.log('Output: ', output)

    return vm.runInContext(test, context) 
}

// Declara tu nombre en una variable llamada name y muéstralo por consola

var answer = `var name = 'nico';console.log(name)`

var test = `
            expect(name).not.to.be.undefined;
            expect(typeof name).to.equal('string');
            expect(name.trim()).not.to.be.empty;
            expect(stdout[0]).to.be.an('arraycd ..
            ')
            `

try {
  var result = checkAnswer(answer, test)
} catch (error) {
  console.log('Error:',error)
}