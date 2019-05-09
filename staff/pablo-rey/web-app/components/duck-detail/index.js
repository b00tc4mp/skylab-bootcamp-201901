const path = require('path');
const Component = require('../component');

class DuckDetail  extends Component {
  constructor() {
    super(path.join(__dirname, 'index.html'));
  }
}

module.exports = DuckDetail;