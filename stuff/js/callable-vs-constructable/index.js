function WtfError(message) {
    if (this instanceof WtfError) {
        this.message = message
        // this.stack = (new Error()).stack
        // if (Error.captureStackTrace)
        // 	Error.captureStackTrace(this, this.constructor)
    } else return new WtfError(message)
}

WtfError.prototype = Object.create(Error.prototype)
WtfError.prototype.constructor = WtfError

WtfError.prototype.toString = function () {
    return this.constructor.name + ': ' + this.message
}

// with new

new WtfError('hola mundo').toString()

// same as without new

WtfError('hola mundo').toString()
