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
    retrieve(id){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true, optional: false }
        ])
        return fs.readFile(this.__file__, 'utf8')
            .then(content => {
                const users = JSON.parse(content)
                
                let user=users.find(user=> user.id===id)
                if (!user) throw  Error ('User not found')
                else return user 
            })

    },
    update(userId, userData) {
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', optional: false },
            { name: 'userData', value: userData, type: 'object', optional: false }
        ])

        return fs.readFile(this.__file__, 'utf8')
            .then(content => {
                const users = JSON.parse(content)
                userData.id=userId
                let user=users.findIndex(user=> user.id===userId)
                
                if(user<0)throw  Error ('User not found')
                users[user]=userData
            
                const json = JSON.stringify(users)

                return fs.writeFile(this.__file__, json)
            })
    }
    
}

module.exports = userData