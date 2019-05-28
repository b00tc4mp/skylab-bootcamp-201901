const validate = require('../../common/validate')
const { ValueError } = require('../../common/errors')

const userData = {
    __col__: null,

    create(user) {
        validate.arguments([
            { name: 'user', value: user, type: 'object', optional: false }
        ])

        return (async () => {
            await this.__col__.insertOne(user)
        })()
    },

    list() {
        return this.__col__.find().toArray()
    },

    retrieve(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'object', notEmpty: true, optional: false }
        ])

        return this.__col__.findOne(id)
    },

    find(criteria) {
        validate.arguments([
            { name: 'criteria', value: criteria, type: 'function', notEmpty: true, optional: false }
        ])

        return (async () => {
            const cursor = await this.__col__.find()

            const users = []

            await cursor.forEach(user => {
                if (criteria(user))
                    users.push(user)
            })

            return users
        })()
    },

    update(id, data, replace) {
        validate.arguments([
            { name: 'id', value: id, type: 'object', notEmpty: true },
            { name: 'data', value: data, type: 'object' },
            { name: 'replace', value: replace, type: 'boolean', optional: true }
        ])

        if (data._id && id.toString() !== data._id.toString()) throw new ValueError('data id does not match criteria id')

        return (async () => {
            // if (replace)
            //     await users.findOneAndReplace(id, data)
            // else
            //     await users.findOneAndUpdate(id, { $set: data })

            await (replace ? this.__col__.findOneAndReplace({ _id: id }, data) : this.__col__.findOneAndUpdate({ _id: id }, { $set: data }))
        
        })()
    }
}

module.exports = userData