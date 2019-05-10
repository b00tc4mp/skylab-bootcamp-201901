const path = require('path');
const Feedback = require('../feedback');
const Component = require('../component');

class Register extends Component {
  constructor(props = { name: '', surname: '', email: '', message: '' }) {
    super(path.join(__dirname, 'index.html'), props);
  }

  beforeRender(html) {
    const { message } = this.props;
    html = html.replace('<feedback />', message ? new Feedback().render({ message }) : '');
    return html;
  }
}

module.exports = Register;
