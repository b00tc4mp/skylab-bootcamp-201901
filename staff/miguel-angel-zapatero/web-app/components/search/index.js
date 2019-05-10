const Component = require('../component')
const path = require('path')

class Search extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }

    render(props = { query: '' }) {
        return super.render(props)
    }

}

module.exports = Search