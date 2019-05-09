const path = require('path');
const Component = require('../component');

class CardDuck  extends Component {
  constructor() {
    super(path.join(__dirname, 'index.html'));
  }
}

module.exports = CardDuck;