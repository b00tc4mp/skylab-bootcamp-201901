const path = require('path');
const Component = require('../component');

class DuckDetail  extends Component {
  constructor(props) {
    super(path.join(__dirname, 'index.html'), props);
  }
}

module.exports = DuckDetail;