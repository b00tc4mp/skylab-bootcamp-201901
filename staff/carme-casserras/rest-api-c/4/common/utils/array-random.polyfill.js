require('./math-random.polyfill')

Array.prototype.random = function () {
    return this[Math.random(this.length - 1)]
}