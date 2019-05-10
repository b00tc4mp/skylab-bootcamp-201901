const path = require('path')
const Component = require('../component')
const Search = require('../search')
const Results = require('../results')

class Home extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }

    beforeRender(html, props) {
        const { ducks: items, query, message } = props
        
        html = html.replace('<search />', new Search().render({ query, message }))
        html = html.replace('<results />', new Results().render({ items }))

        return html
    }
}

module.exports = Home