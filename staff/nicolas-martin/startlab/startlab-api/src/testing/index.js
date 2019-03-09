const expect = require('chai').expect
const vm = require('vm')

const { EmptyError } = require('startlab-errors')


const ex = {

    checkAnswer(answer, test) {

        test = test.replace(/\n/gi, "")

        if (typeof answer !== 'string') throw TypeError(`${answer} is not a string`)
        if (!answer.trim().length) throw new EmptyError(`${answer} is empty`)

        if (typeof test !== 'string') throw TypeError(`${test} is not a string`)
        if (!test.trim().length) throw new EmptyError(`${test} is empty`)

        const context = { expect }
        vm.createContext(context) // {a: 45, expect: expect()}

        vm.runInContext(answer, context)

        return vm.runInContext(test, context)
    }
}

module.exports = ex