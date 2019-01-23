function Horroy() {
    if (arguments.length === 1 && typeof arguments[0] === 'number') {
        if (!(Number.isInteger(arguments[0]))) throw RangeError('Invalid horroy length')

        this.length = arguments[0]
    } else {
        this.length = arguments.length;
        for (var i = 0; i < arguments.length; i++)

            this[i] = arguments[i];
    }


    Horroy.prototype.from = function (value) {
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

    Horroy.prototype.pop = function () {
        if (!(this instanceof Horroy)) throw TypeError(this + ' is not an horroy');
        if (arguments.length > 1) throw Error('too many arguments');
        var popped = this[this.length - 1];
        this.length = this.length - 1;
        return popped;
    }

    Horroy.prototype.forEach = function (callback) {
        for (var i = 0; i < this.length; i++)
            callback(this[i]);
    };

    Horroy.prototype.toString = function () {
        var string = '';

        for (var i = 0; i < this.length - 1; i++)
            string += this[i] + ',';

        string += this[this.length - 1];

        return string;
    };

    Horroy.prototype.slice = function (a, b) {
        var newHorroy = new Horroy;
        if (a === undefined) {
            a = 0;
        }
        if (b === undefined) {
            b = (this.length - 1);
        };
        if (a < 0) {
            a = (this.length + a);
        }
        if (b < 0) {
            b = ((this.length - 1) + b);
        }
        if (b > this.length) {
            b = (this.length - 1)
        }
        if (a > this.length) {
            newHorroy = [];
            return newHorroy;
        } else {
            for (var i = a; i < (b + 1); i++) {
                newHorroy[i - a] = this[i];
            };
            return newHorroy;
        };

    };

    Horroy.prototype.fill = function (value, start, end) {
        if (arguments.length > 4) throw Error('too many arguments');

        if (!(this instanceof Horroy))
            throw new TypeError(this + ' is not an horroy');

        start = start === undefined ? 0 : (start < 0 ? this.length + start : start);
        end = end === undefined ? horroy.length : (end < 0 ? this.length + end : end);

        for (var i = start; i < end; i++)
            this[i] = value;

        return this;
    };

    Horroy.prototype.filter = function (callback) {
        if (!(this instanceof Horroy)) throw TypeError(this + ' is not an horroy');
        var newHorroy = new Horroy;
        var count = 0;
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i])) {
                newHorroy[count] = this[i];
                count++;
            }
        }
        return newHorroy;
    }

    Horroy.prototype.find = function (callback) {
        if (!(this instanceof Horroy)) throw TypeError(this + ' is not an horroy');
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i])) {
                return this[i];
            };
        };
    }

    Horroy.prototype.findIndex = function (callback) {
        if (!(this instanceof Horroy)) throw TypeError(this + ' is not an horroy');
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i])) {
                return i;
            };
        };
        return -1;
    }

    Horroy.prototype.join = function (separator) {
        var result = '';
        if (!(this instanceof Horroy)) throw TypeError(this + 'is not an horroy');
        separator = (separator === undefined) ? ',' : separator;
        for (var i = 0; i < this.length; i++) {
            var element = this[i];
            result += (i !== this.length - 1) ? element + separator : element;
        }
        return result;
    }

    Horroy.prototype.reduce = function (callback, counter) {
        if (!(this instanceof Horroy)) throw TypeError(this + ' is not an horroy');
        if (!(callback instanceof Function)) throw TypeError(callback + ' is not an function');
        var i = 0;
        if (counter === undefined) {
            counter = this[0];
            i = 1;
        };
        for (; i < this.length; i++) {
            var item = this[i];
            counter = callback(counter, item);
        };
        return counter;
    }

    Horroy.prototype.reverse = function () {
        if (!(this instanceof Horroy)) throw TypeError(this + ' is not an horroy');
        var reversed = [];
        counter = this.length - 1
        for (var i = 0; i < this.length; i++) {
            reversed[counter] = this[i];
            counter--;
        };
        return reversed;
    }

    Horroy.prototype.shift = function () {
        var firstElement = "";
        if (this === undefined) {
            return undefined;
        };
        firstElement = this[0];
        counter = 0;
        for (var i = 1; i < this.length; i++) {
            this[counter] = this[i];
            counter++;
        };
        this.length = this.length - 1;
        return firstElement;
    }

    Horroy.prototype.some = function (callback) {
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i])) {
                return true;
            };
        };
        return false;

    }

};
