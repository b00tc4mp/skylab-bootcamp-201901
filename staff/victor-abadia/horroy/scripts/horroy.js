function Horroy() {
    this.length = arguments.length;

    if (arguments.length)
        for(var i = 0; i < arguments.length; i++)
            // this.push(arguments[i]); // WARN should avoid (if possible) calling member methods in a constructor (push)
            this[i] = arguments[i];
}

Horroy.prototype.push = function(value) {
    if (!value) throw Error('undefined element to push')
    this[this.length++] = value;
};

Horroy.prototype.forEach = function(callback) {
    if (typeof callback !== 'function') throw new TypeError('callback is not a function');
    for(var i = 0; i < this.length; i++)
        callback(this[i]);
};

Horroy.prototype.pop = function() {
    var result = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return result;
};
