function Horroy() {
    this.length = arguments.length;

    if (arguments.length)
        for (var i = 0; i < arguments.length; i++)
            // this.push(arguments[i]); // WARN should avoid (if possible) calling member methods in a constructor (push)
            this[i] = arguments[i];
}

Horroy.from = function (value) {
    var horr = new Horroy

    horr.length = value.length

    if (typeof value === 'string')
        for (var i = 0; i < value.length; i++)
            horr[i] = value[i]

    return horr
};

Horroy.prototype.push = function (value) {
    this[this.length++] = value;
};

Horroy.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++)
        callback(this[i]);
};
