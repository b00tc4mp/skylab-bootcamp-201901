const logicFactory = require('../../logic-factory')
const { pullFeedback } = require('../helpers')

module.exports = (req, res) => {
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        res.redirect('/home')
    } else {
        const feedback = pullFeedback(req)

        res.render('login', { feedback })
    }
}