const expect = require('chai').expect
const vm = require('vm')

const validate = require('startlab-validation')


const ex = {

    checkAnswer(answer, test) {

        validate([
            { key: 'answer', value: answer, type: String },
            { key: 'test', value: test, type: String }
        ])
        
        test = test.replace(/\n/gi, "")

        const context = { expect }
        vm.createContext(context)

        vm.runInContext(answer, context)

        return vm.runInContext(test, context)
    }
}

module.exports = ex