const path = require('path')
const Component = require('../component')
const Search = require('../search')
const Results = require('../results')
const Detail = require('../detail')

class Home extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }

    beforeRender(html, props) {
        const { query = '', ducks: items, duck: item } = props

        html = html.replace('<search />', new Search().render({ query }))

        html = html.replace('<results />', items ? new Results().render({ items }) : '')

        html = html.replace('<detail />', item ? new Detail().render({ ...item }) : '')

        return html
    }
}

module.exports = Home