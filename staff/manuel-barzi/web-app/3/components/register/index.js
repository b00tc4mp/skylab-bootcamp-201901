const fs = require('fs')
const path = require('path')
const feedback = require('../feedback')

function register(props = { name: '', surname: '', email: '', message: '' }) {
    const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')

    const keys = Object.keys(props)

    let html = template

    keys.forEach(key => {
        html = key !== 'message' ? html.replace('${' + key + '}', props[key]) : html.replace('<feedback />', feedback(props[key]))
    })

    return html
}

module.exports = register