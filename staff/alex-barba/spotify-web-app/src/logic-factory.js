const Logic = require('./logic')

module.exports = {
    create(req) {
        try {
            const { session } = req

            const logic = new Logic(session)

            logic.logOutUser = function () {
                Logic.prototype.logOutUser.call(this)

                session.destroy()
            }

            return logic
        } catch ({ message }) {
            throw Error(`error instantiating a new logic: ${message}`)
        }
    }
}