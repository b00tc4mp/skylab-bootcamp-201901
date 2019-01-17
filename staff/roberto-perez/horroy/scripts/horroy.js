function Horroy() {
    this.length = arguments.length;

    if (arguments.length)
        for(var i = 0; i < arguments.length; i++)
            this[i] = arguments[i];
}

/**
 * Adds one or more elements to the end of an array and returns the new length of the array.
 * 
 * @param {*} value 
 * 
 * @returns {number} - The length of the array modified
 */
Horroy.prototype.push = function(value) {
    this[this.length++] = value;
    return this.length;
};

/**
 * Executes the indicated function once for each element of the array.
 * 
 * @param {Function} callback 
 * 
 * @returns {undefined}
 */
Horroy.prototype.forEach = function(callback) {
    if(!(callback instanceof Function)) throw new TypeError('Argument is not a function');
    
    for(var i = 0; i < this.length; i++)
        callback(this[i]);
};

/**
 * Creates a new array with the results of the call to the indicated function applied to each of its elements.
 * 
 * @param {Function} callback 
 * 
 * @returns {Array} - The new generated array
 */
Horroy.prototype.map = function(callback) {
    if(!(callback instanceof Function)) throw new TypeError('Argument is not a function');

    var arrayMaped = new Horroy();

    for(var i = 0; i < this.length; i++){
        arrayMaped[i] = callback(this[i]);
    }

    arrayMaped.length = this.length;

    return arrayMaped;
};

Horroy.prototype.toString = function() {
    var string = '';
    
    for (var i = 0; i < this.length; i++) {
        if (i === this.length-1) string += this[i]
        else string += this[i] + ','
    }
    return string
};

Horroy.prototype.fill = function(value, start, end) {
    start = start || 0;
    end = end || this.length;
};