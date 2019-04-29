/* eslint-disable no-useless-constructor */
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

class PasswordError extends Error {
    constructor(message) {
        super(message)
    }
}
class NotFoundError extends Error {
    constructor(message) {
        super(message)
    }
}

export {
    ValueError,
    FormatError,
    RequirementError,
    ConnectionError,
    TimeoutError,
    LogicError,
    PasswordError,
    NotFoundError
}