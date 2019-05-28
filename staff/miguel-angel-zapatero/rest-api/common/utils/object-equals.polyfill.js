require('./object-matches.polyfill')

Object.prototype.equals = function(object) {
    if (Object.keys(this).length !== Object.keys(object).length) return false

    return this.matches(object)
}