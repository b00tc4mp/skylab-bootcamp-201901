module.exports = (err, data) => {
    if (!err) {
        return data.toString().split('\n').length - 1
    } else {
        throw Error('Async error found')
    }
}