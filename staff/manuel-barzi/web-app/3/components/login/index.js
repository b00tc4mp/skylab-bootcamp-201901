const fs = require('fs')
const path = require('path')
const feedback = require('../feedback')

function login(email = '', message = '') {
    const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')

    const html = template.replace('${email}', email).replace('<feedback />', feedback(message))

    return html
}

module.exports = login