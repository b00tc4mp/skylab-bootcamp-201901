'use strict'

class ValueError extends Error {
    constructor(message) {
        super(message)
    }
}

class FormatError extends Error {
    constructor(message) {
        super(message)
    }
}

class RequirementError extends Error {
    constructor(message) {
        super(message)
    }
}

class ConnectionError extends Error {
    constructor(message) {
        super(message)
    }
}

class TimeoutError extends Error {
    constructor(message) {
        super(message)
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
        // this.status = 406
    }
}

class HttpError extends Error {
    constructor(message) {
        super(message)
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = {
    ValueError,
    FormatError,
    RequirementError,
    ConnectionError,
    TimeoutError,
    LogicError, 
    HttpError,
    UnauthorizedError
}