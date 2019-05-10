const fs = require('fs')
const path = require('path')

let template

function home(name) {
    template = template || fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')

    const html = template.replace('${name}', name)

    return html
}

module.exports = home