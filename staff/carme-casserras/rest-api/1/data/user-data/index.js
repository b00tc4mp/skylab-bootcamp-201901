const fs = require('fs').promises
const path = require('path')
const uuid = require('uuid/v4')
const validate = require('../../common/validate')

const userData = {
    __file__: path.join(__dirname, 'users.json'),

    create(user) {
        validate.arguments([
            { name: 'user', value: user, type: 'object', optional: false }
        ])

        user.id = uuid()

        return fs.readFile(this.__file__, 'utf8')
            .then(content => {
                const users = JSON.parse(content)

                users.push(user)

                const json = JSON.stringify(users)

                return fs.writeFile(this.__file__, json)
            })
    },

    list() {
        return fs.readFile(this.__file__, 'utf8')
            .then(JSON.parse)
    },

    retrieve(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', optional: false }      
        ])
        return fs.readFile(this.__file__, 'utf8')
            .then(JSON.parse)    
    },

    update(data) {
        validate.arguments([
            { name: 'data', value: data, type: 'object', optional: false }      
        ])
    }


}

module.exports = userData