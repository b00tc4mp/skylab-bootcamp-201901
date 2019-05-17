const random = Math.random

Math.random = function() {
    if (!arguments.length) return random()
    else if (arguments.length === 1)
        return Math.floor(random() * (arguments[0] + 1))
    else if (arguments.length === 2)
        return Math.floor(arguments[0] + random() * (arguments[1] - arguments[0] + 1))
}