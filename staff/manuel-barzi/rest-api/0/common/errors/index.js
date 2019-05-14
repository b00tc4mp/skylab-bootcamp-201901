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
    }
}

class HttpError extends Error {
    constructor(message) {
        super(message)
    }
}

class UnknownError extends Error {
    constructor(message) {
        super(message)
    }
}

class UnexpectedError extends Error {
    constructor(message) {
        super(message)
    }
}

class UnhandledError extends Error {
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
    UnknownError,
    UnexpectedError,
    UnhandledError,
    UnauthorizedError
}