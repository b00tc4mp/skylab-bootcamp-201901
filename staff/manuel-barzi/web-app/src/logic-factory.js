const Logic = require('./logic')

module.exports = {
    create(req) {
        try {
            const { session } = req

            const logic = new Logic(session)

            logic.logOutUser = function () {
                // logic.__proto__.logOutUser() // WARN __proto__ is a different context from logic instance itself!

                // Logic.prototype.logOutUser.call(logic)
                Logic.prototype.logOutUser.call(this)

                session.destroy()
            }

            return logic
        } catch ({ message }) {
            throw Error(`error instantiating a new logic: ${message}`)
        }
    }
}