const path = require('path')
const Component = require('../component')
const Search = require('../search')

class Home extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }

    beforeRender(html, props) {
        html = html.replace('<search />', new Search().render())

        return html
    }
}

module.exports = Home