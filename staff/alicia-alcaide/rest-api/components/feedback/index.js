const Component = require('../component')
const path = require('path')

class Feedback extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }
}

module.exports = Feedback