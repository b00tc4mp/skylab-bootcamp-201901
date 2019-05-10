const path = require('path')
const Feedback = require('../feedback')
const Component = require('../component')

class Login extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }

    render(props = { email: '', message: '' }) {
        return super.render(props)
    }

    beforeRender(html, props) {
        const { message } = props

        html = html.replace('<feedback />', message ? new Feedback().render({ message }) : '')

        return html
    }
}

module.exports = Login