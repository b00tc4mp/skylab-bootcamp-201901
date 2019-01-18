function Horroy() {
    this.length = arguments.length;

    if (arguments.length)
        for (var i = 0; i < arguments.length; i++)
            // this.push(arguments[i]); // WARN should avoid (if possible) calling member methods in a constructor (push)
            this[i] = arguments[i];
};

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

Horroy.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++)
        callback(this[i]);
};

Horroy.prototype.toString = function() {
    var string = '';

    for(var i = 0; i < this.length - 1; i++)
        string += this[i] + ',';
    
    string += this[this.length - 1];

    return string;
};

Horroy.prototype.pop = function(variable) {
    var variable
    if (this.length === 0) {
        return undefined;
    } else {
        var variable = this[this.length -1];
        this.length = this.length -1;
        return variable;
    };
};

Horroy.prototype.slice = function(a, b) {
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
    
};

Horroy.prototype.fill = function(value, start, end) {
    if (arguments.length > 4) throw Error('too many arguments');

    if (!(this instanceof Horroy))
        throw new TypeError(this + ' is not an horroy');

    start = start === undefined ? 0 : (start < 0 ? this.length + start : start);
    end = end === undefined ? horroy.length : (end < 0 ? array.length + end : end);

    for (var i = start; i < end; i++)
        array[i] = value;

    return array;
};


