const logicFactory = require('../../logic-factory')

module.exports = (req, res) => {
    const logic = logicFactory.create(req)

    logic.logOutUser()

    res.redirect('/')
}