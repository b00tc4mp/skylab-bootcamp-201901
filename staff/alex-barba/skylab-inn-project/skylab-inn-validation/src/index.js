function validate(params) {
    params.forEach(({ key, value, type, optional }) => {
        switch (type) {
            case String:
                if (optional && value == null) break

                if (typeof value !== 'string') throw TypeError(`${value} is not a string`)

                if (!value.trim().length) throw new Error(`${key} is empty`)

                break
            case Boolean:
                if (optional && value == null) break

                if (typeof value !== 'boolean') throw TypeError(`${value} is not a boolean`)

                if (!value) throw new Error(`${key} is empty`)

                break
            case Number:
                if (optional && value == null) break

                if (typeof value !== 'number') throw TypeError(`${value} is not a number`)

                if (!value) throw new Error(`${key} is empty`)

                break
            case Object:
                if (optional && value == null) break

                if (!value) throw new Error(`${key} is empty`)
                
                if (value.constructor !== Object) throw new TypeError(`${value} is not an object`)

                break
            case Array:
                if (optional && value == null) break
                
                if (!(value instanceof Array)) throw new TypeError(`${value} is not an array`)

                if (!value.length) throw new Error(`${key} is empty`)
                
                break
            case Blob:
                if (optional && value == null) break

                if (!value) throw new Error(`${key} is empty`)
                
                if (!(value instanceof Blob)) throw new TypeError(`${value} is not a blob`)

                break
        }
    })
}

module.exports = validate