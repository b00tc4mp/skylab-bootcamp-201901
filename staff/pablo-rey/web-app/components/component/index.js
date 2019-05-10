const fs = require('fs');

class Component {
  constructor(templateFile, props = {}) {
    this.template = fs.readFileSync(templateFile, 'utf8');
    this.props = props;
  }

  render() {
    const keys = Object.keys(this.props);

    let html = this.template;
    keys.forEach(key => {
      html = html.replace('${' + key + '}', this.props[key]);
    });

    return this.beforeRender(html);
  }

  beforeRender(html) {
    return html;
  }
}

module.exports = Component;
