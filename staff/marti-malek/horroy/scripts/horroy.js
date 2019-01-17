/**
 *Constructor function for an abstraction of an this
 */
function Horroy() {
    this.length = arguments.length;

    if (arguments.length)
        for(var i = 0; i < arguments.length; i++)
            /* this.push(arguments[i]); */
            this[i] = arguments[i];
}
/**
 * 
 * Abstraction of push
 * 
 * Adds the value to the end of the horroy
 * 
 * @param {*} value
 */
Horroy.prototype.push = function(value) {
    this[this.length++] = value;
};

/**
 * Abstraction of forEach
 * 
 * Calls a function for every argument of an horroy
 * 
 * @param {function} callback
 * 
 */
Horroy.prototype.forEach = function(callback) {
    for(var i = 0; i < this.length; i++)
        callback(this[i]);
};

/**
 * Abstraction of pop.
 * 
 * Deletes the last element of an horroy.
 * 
 */
Horroy.prototype.pop = function() {
    if (this.length === 0) return undefined;

    var res = this[this.length-1];

    delete this[this.length-1];
    this.length = this.length-1;
    return res;
};

Horroy.prototype.fill = function(value, start, end) {

    start = start === undefined ? 0 : (start < 0 ? this.length + start : start);
    end = end === undefined ? this.length : (end < 0 ? this.length + end : end);

    for (var i = start; i < end; i++)
        this[i] = value;

    return this;
};

Horroy.prototype.filter = function(func) {
    var res = [];
    var j = 0;

    if (arguments.length > 2) throw Error ('too many arguments');

    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) {
            res[j] = this[i]
            j++;
        }
    }
    return res;
};

Horroy.prototype.find = function(callback) {

    for (var i = 0; i < this.length; i++) {
        var value = this[i];

        if(callback(value)) return value;
    }
};

Horroy.prototype.forEach = function(callback) {

    for (var i = 0; i < this.length; i++) callback(this[i]);
};