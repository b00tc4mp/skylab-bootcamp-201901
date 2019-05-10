const path = require('path')
const Component = require('../component')

class Home extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }
}

module.exports = Home