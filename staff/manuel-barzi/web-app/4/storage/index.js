const storage = {
    __storage__: {},

    get(id) {
        return this.__storage__[id] || (this.__storage__[id] = {})
    }
}

module.exports = storage