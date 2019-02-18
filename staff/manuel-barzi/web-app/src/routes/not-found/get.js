const { renderPage } = require('../helpers')

module.exports = (req, res) =>
    res.status(404).send(renderPage(`<section class="not-found">
<h2>NOT FOUND</h2>

Go <a href="/">Home</a>
</section>`))