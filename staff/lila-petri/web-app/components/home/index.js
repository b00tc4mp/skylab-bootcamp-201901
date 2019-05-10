const path = require('path')
const Component = require('../component')
const Search = require('../search')
const Results = require('../results')

class Home extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }
    render(props = { query: '', ducks: '' }) {
        return super.render(props)
    }

    beforeRender(html, props) {
        const { query, ducks } = props

        html = html.replace('<search />', new Search().render())
        html = html.replace('<results />', new Results().render({ducks}))

        return html
    }

}

module.exports = Home