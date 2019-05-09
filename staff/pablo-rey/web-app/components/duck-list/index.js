const path = require('path');
const Component = require('../component');
const CardDuck = require('../card-duck');

class DuckList extends Component {
  constructor() {
    super(path.join(__dirname, 'index.html'));
  }

  render({ listDucks = [], query = '' }) {
    const list = listDucks.length === 0
        ? ''
        : listDucks.map(({id, imageUrl, price, title }) => new CardDuck().render({id, imageUrl, title, price, query}))
            .join('');
    return super.render({ list });
  }
}

module.exports = DuckList;
