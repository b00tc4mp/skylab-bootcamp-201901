const fs = require('fs')
const path = require('path')

function feedback(message) {
    if (message) {
        const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
    
        const html = template.replace('${message}', message)
    
        return html
    } else return ''
}

module.exports = feedback