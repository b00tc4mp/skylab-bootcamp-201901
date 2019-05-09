const path = require('path');
const Component = require('../component');
const DuckList = require('../duck-list');

class Home extends Component {
  constructor() {
    super(path.join(__dirname, 'index.html'));
  }

  beforeRender(html, { listDucks = [], query = '' }) {
    html = html.replace(
      '<DuckList />',
      listDucks.length !== 0 ? new DuckList().render({ listDucks, query }) : ''
    );

    return html;
  }

  render({ name = '', listDucks = [], query = '' }) {
    return super.render({ name, listDucks, query });
  }
}

module.exports = Home;
