const path = require('path')
const Component = require('../component')

class Detail extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }
}

module.exports = Detail