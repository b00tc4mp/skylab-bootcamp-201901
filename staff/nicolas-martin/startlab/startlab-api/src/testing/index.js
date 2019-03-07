const vm = require('vm')
const expect = require('chai').expect
const { EmptyError } = require('../errors')

const ex = {

    checkAnswer(answer, test) {
        if (typeof answer !== 'string') throw TypeError(`${answer} is not a string`)
        if (!answer.trim().length) throw new EmptyError(`${answer} is empty`)

        if (typeof test !== 'string') throw TypeError(`${test} is not a string`)
        if (!test.trim().length) throw new EmptyError(`${test} is empty`)

        const context = { expect }
        vm.createContext(context)
        vm.runInContext(answer, context)
        return vm.runInContext(test, context)
    }
}

module.exports = ex