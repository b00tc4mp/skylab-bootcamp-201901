const vm = require('vm')
const expect = require('chai').expect

const ex = {
    // { code = x = 40; var y = 17; }
    // { test = expect(x).to.equal(40) }
    checkCode(code, test) {
        // context with expect to execute the test
        const context = { expect }

        debugger

        vm.createContext(context)

        vm.runInContext(code, context) // context = { expect, x: 40, y: 17 }

        return vm.runInContext(test, context)

        return result

        //Returns: <any> the result of the very last statement executed in the script.

        // expect(x).to.equal(40)
    }
}

module.exports = ex