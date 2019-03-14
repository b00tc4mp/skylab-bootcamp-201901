const logicFactory = require('../../logic-factory')
const { renderPage, pullFeedback } = require('../helpers')

module.exports = (req, res) => {
    try {
        const logic = logicFactory.create(req)

        const feedback = pullFeedback(req)

        if (logic.isUserLoggedIn)
            logic.retrieveUser()
                .then(user => res.send(renderPage(`<section class="home">
        Welcome, ${user.name}!
        ${feedback ? `<section class="feedback feedback--error">
            ${feedback}
        </section>` : ''}
        <form action="/logout" method="post">
            <button type="submit">Logout</button>
        </form>
    </section>`)))
                .catch(({ message }) => {
                    req.session.feedback = message

                    res.redirect('/home')
                })
        else res.redirect('/login')
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/home')
    }
}