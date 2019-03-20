module.exports = {
    handleHerperError(error,res) {
        let status = 400
        if (error instanceof EmptyError)
            status = 412

        res.status(status).json({
            error: error.message
        })
    }
}
