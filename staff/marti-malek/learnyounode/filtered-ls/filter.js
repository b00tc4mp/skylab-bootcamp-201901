var path = require('path')

module.exports = (err, list, extension) => {
    if (err) throw Error('Async error found')
    return list.filter(file => path.extname(file) === '.' + extension)
}