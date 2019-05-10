const fs = require('fs')

class Component {
    constructor(templateFile) {
        this.template = fs.readFileSync(templateFile, 'utf8')
    }

    render(props = {}) {
        const keys = Object.keys(props)

        let html = this.template

        keys.forEach(key => {
            html = html.replace('${' + key + '}', props[key])
        })

        return this.beforeRender(html, props)
    }

    beforeRender(html) {
        return html
    }
}

module.exports = Component