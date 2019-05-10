const Component = require('../component')
const path = require('path')

class Search extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }

    render(props = { query: '', message: ''}) {
        return super.render(props)
    }

    beforeRender(html, props) {
        const { message } = props
        
        html = html.replace('<feedback />', message ? new Feedback().render({ message }) : '')

        return html
    }
}

module.exports = Search