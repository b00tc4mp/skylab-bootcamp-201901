const { EmptyError, } = require('flyme-errors')

function validate(params) {
    params.forEach(({ key, value, type, optional }) => {
        switch (type) {
            case String:
                if (optional && value == null) break

                if (typeof value !== 'string') throw TypeError(`${value} is not a string`)

                if (!value.trim().length) throw new EmptyError(`${key} is empty or blank`)

                break
            case Boolean:
                if (optional && value == null) break

                if (typeof value !== 'boolean') throw TypeError(`${value} is not a boolean`)

                break
            case Number:
                if (optional && value == null) break

                if (typeof value !== 'number') throw TypeError(`${value} is not a number`)

                break
            case Object:
                if (!(value instanceof Object)) throw new TypeError(`${value} is not an Object`)

                if (value instanceof Function) throw new TypeError(`${value} is a Function`)

                if (value instanceof Array) throw new TypeError(`${value} is an array`)

                if (Object.keys(value).length === 0) throw new EmptyError(`${key} is empty or blank`)
        }
    })
}

module.exports = validate