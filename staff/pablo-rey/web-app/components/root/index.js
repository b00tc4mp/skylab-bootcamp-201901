const path = require('path')
const Component = require('../component')

class Root extends Component {
    constructor(logic, props) {
      super(path.join(__dirname, 'index.html'))
      this.logic = logic
    }

    beforeRender(html, props) {
      const logout = this.logic.isUserLoggedIn ? `<form method="post" action="/logout"><button type="submit">Logout</button></form>`: '';
      html = html.replace('<Logout />', logout);
      return html;
    }

    render(html) {
      return super.render({ body: html })
    }

}

module.exports = Root