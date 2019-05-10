const path = require('path')
const Search = require('../search')
const Component = require('../component')

class Home extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }

    // beforeRender(html, props) {
    //     const { query } = props
    //     html = html.replace('<search />', message ? new Feedback().render({ message }) : '')
    //     return html
    // }


}

module.exports = Home