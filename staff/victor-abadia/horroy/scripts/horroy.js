function Horroy() {
    this.length = arguments.length;

    if (arguments.length)
        for (var i = 0; i < arguments.length; i++)
            // this.push(arguments[i]); // WARN should avoid (if possible) calling member methods in a constructor (push)
            this[i] = arguments[i];
}

Horroy.prototype.push = function (value) {
    if (!value) throw Error('undefined element to push')

    this[this.length++] = value;
};

Horroy.prototype.forEach = function (callback) {
    if (typeof callback !== 'function') throw new TypeError('callback is not a function');

    for (var i = 0; i < this.length; i++)
        callback(this[i]);
};

Horroy.prototype.pop = function () {
    var result = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return result;
};

Horroy.from = function (value) {
    var horr = new Horroy
    horr.length = value.length

    if (typeof value === String) {

        for (var i = 0; i < value.length; i++)
            horr[i] = value[i]
        return horr
    }
};

Horroy.prototype.toString = function () {

    var string = '';

    for (var i = 0; i < this.length; i++) {
        if (i === this.length - 1) {
            string += this[i]
        } else {
            string += this[i] + ','
        }
    }
    return string
};

Horroy.prototype.filter = function (callback) {
    if (typeof callback !== 'function') throw Error('callback is not a function');

    var result = [];
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result[result.length] = this[i];
        }
    }
    return result ? result : -1;
};

Horroy.prototype.find = function (callback) {

    if (typeof callback !== 'function') throw new Error(callback + ' is not a function');

    for (var i = 0; i < this.length; i++) {
        if (callback(this[i])) { return this[i]; }
    }
    return undefined;
}

Horroy.prototype.map = function (callback) {
    if (typeof callback !== 'function') throw new TypeError('callback is not a function');

    var result = new Horroy();
    for (var i = 0; i < this.length; i++) {
        result[i] = callback(this[i], i, this);
        result.length++;
    }
    return result;
};