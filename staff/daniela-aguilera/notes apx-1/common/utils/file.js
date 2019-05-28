const fs = require('fs')

const file = {
    readFile(path, encoding) {
        return Promise.resolve(fs.readFileSync(path, encoding))
    },

    writeFile(path, content) {
        return Promise.resolve()
            .then(() => fs.writeFileSync(path, content))
    }
}

module.exports = file