class EmptyError extends Error {
    constructor(messageOfError){
        super(messageOfError)
    }
}

module.exports = EmptyError