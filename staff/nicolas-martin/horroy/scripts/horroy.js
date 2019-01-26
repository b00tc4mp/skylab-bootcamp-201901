function Horroy() {
    this.length = arguments.length;
    for (var i = 0; i < arguments.length; i++)
        this[i] = arguments[i];
}

/**
* Tests is anything is a horroy Type
* 
* @param {*} horr - anything to test if is a horroy
* @returns {boolean} - true if horr is horroy type and false otherwise
*/

Horroy.isHorroy = function (horr) {
    return (horr instanceof Horroy);
}

/**
* Creates a new horroy where every item will be fill with every argument
* 
* @param {*} - arguments to creates the horroy
* @returns {horroy} - horroy returned with all items in arguments
*/

Horroy.of = function () {
    var horr = new Horroy;
    for (var i = 0; i < arguments.length; i++) {
        horr.push(arguments[i]); 
    }
    return horr;
}

/**
* Creates a new Horroy copy from an array-like or iterable object.
* 
* @param {*} - value to split and creates the horroy
* @returns {horroy} - a new horroy instance
*/

Horroy.from = function (value) {
    var horr = new Horroy;
    horr.length = value.length;
    if (typeof value === 'string')
        for (var i = 0; i < value.length; i++)
            horr[i] = value[i];
    return horr;
};

/**
 * JOIN - Creates and returns a new string by concatenating all of the elements in a Horroy
 * with separator between them
 * 
 * @param {*} sep - will be converted to string. If is undefined a comma sepator will be used
 * @returns {string} result - string resulting of concatenate all items. If horroy is empty 
 * an empty string will be returned
 *
 */

Horroy.prototype.join = function(sep) {
    var separator = (sep !== undefined) ? String(sep) : (!this.length) ? '' : ',';
    var result = '';
    for (var i = 0; i < this.length; i++) 
        result += (i !== this.length-1) ? this[i] + separator : this[i];  
    return result;
}

/**
 * Returns the value of the first item in the horroy that satisfies the callback function. 
 * Otherwise undefined is returned 
 * 
 * @param {function} callback - function with condition to test in every item
 * @returns {*} first item found that satisfy the callback function
 * @throws {TypeError} if callback is not a function
 */

Horroy.prototype.find = function (callback) {
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
    for (var i = 0; i < this.length; i++){
        if (callback(this[i])) return this[i]
    }
    return undefined;
}

/**
 * Creates a new array with all elements that pass the test implemented by callback. 
 * 
 * @param {function} callback - function with the test
 * @returns {horroy} horroy with items that passed the condition implemented by callback function
 * @throws {TypeError} if callback is not a function
 */

Horroy.prototype.filter = function(callback) {
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
    var horr = new Horroy;
    for (var i = 0; i < this.length; i++)
        if (callback(this[i])) horr.push(this[i])
    return horr;
}


/**
* Creates a new horroy with the results of calling a provided function on every element in the calling array. 
* 
 * @param {function} callback - function to apply in every item
 * @returns {horroy} horroy with items with callback applied
 * @throws {TypeError} if callback is not a function
 */

Horroy.prototype.map = function (callback) {
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
    var horr = new Horroy;
    for (var i=0; i < this.length; i++) horr.push(callback(this[i]));
    return horr;
}

/**
* Returns first index at which a given element can be found in the horroy 
* -1 if it is not present.
* 
* @param {*=} searchElement - element to search in horroy
* @param {*=} fromIndex - index to start from
* @returns {number} - index where searchElement was found
* @throws {TypeError} - if fromIndex is not a number
* @throws {Error} - if more than 2 arguments are passed
*/

Horroy.prototype.indexOf = function (searchElement, fromIndex) {
    if (arguments.length > 2) throw Error("too many arguments");
    if ((typeof fromIndex !== 'number') && (fromIndex !== undefined))  throw TypeError(fromIndex + ' is not a number');
    fromIndex = (fromIndex === undefined) ? 0 : fromIndex;
    for (var i=fromIndex; i < this.length; i++) {
        if (searchElement === this[i]) return i;
    }
    return -1;
}

/**
* Tests whether all elements in the horroy pass 
* the test implemented by callback function. 
* 
* @param {function} callback - function with the test
* @returns {boolean} - true if any item satisfy the condition implemented by callback,
* false otherwise or if horroy is empty
* @throws {TypeError} - if callback is not a function
*/

Horroy.prototype.every = function (callback){
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
    for (var i=0; i < this.length; i++) {
        if (!callback(this[i])) return false;
    }
    return true;
}

/**
* Merge two or more horroys. Does not change the original horroy
* 
* @returns {horroy} horr - a horroy with all items concatenated
*/

Horroy.prototype.concat = function() {
    var horr = new Horroy;
    for (var i=0; i < arguments.length; i++) {
        for (var j=0; j < arguments[i].length; j++) 
            horr.push(arguments[i][j])
    }
    return horr;
}

/**
* Adds one or more elements to the end of a Horroy and returns the new length
* this method changes the original horroy
* 
* @param {*} value - value to add at the end of the horroy
* @returns {number} - the length of the new horroy
*/

Horroy.prototype.push = function (value) {
    this[this.length++] = value;
    return this.length;
};

/**
* Executes a provided function (callback) once for each array element.
* 
* @param {function=} callback - function to execute in every item from horroy
* @returns {undefined}
* @throws {TypeError} if callback is not a function
*/

Horroy.prototype.forEach = function (callback) {
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
    for (var i = 0; i < this.length; i++)
        callback(this[i]);
};

/**
* Returns a string representing the specified array and its elements.
* 
* @returns {string} string - a new string with all items in horroy 
* converted to string
*/

Horroy.prototype.toString = function() {
    var string = '';
    for (var i = 0; i < this.length; i++) 
        string += i !== this.length - 1 ? this[i] + ',' : this[i];
    return string;
};
