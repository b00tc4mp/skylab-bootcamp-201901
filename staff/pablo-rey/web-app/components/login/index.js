const path = require('path');
const Feedback = require('../feedback');
const Component = require('../component');

class Login extends Component {
  constructor(props = { email: '', message: '' }) {
    super(path.join(__dirname, 'index.html'), props);
  }

  beforeRender(html) {
    const { message } = props;
    html = html.replace('<feedback />', message ? new Feedback().render({ message }) : '');
    return html;
  }
}

module.exports = Login;
