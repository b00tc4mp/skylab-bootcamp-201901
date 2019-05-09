const fs = require('fs')

module.exports = function (file, options) {
    return function (req, res, next) {
        fs.readFile(file, 'utf-8', (err, content) => {
            res.body = content

            for(let prop in options) {
                let regex = '\${'+ prop + '}'
                debugger
                res.body = res.body.replace(regex, options[prop])
            }
            debugger
            res.htmlBody = res.htmlBody.match(/<.+>/gm)
            const index = res.htmlBody.indexOf('</body>')
            res.htmlBody.splice(index, 0, res.body)
            res.htmlBody = res.htmlBody.join('')
            next()
        })
    }
}