function Horroy() {
    if (arguments.length === 1 && typeof arguments[0] === 'number') {
        if (!(Number.isInteger(arguments[0]))) throw RangeError('Invaled Horroy length')

        this.length = arguments[0]
    } else {
        this.length = arguments.length;
        for (var i = 0; i < arguments.length; i++)
            // this.push(arguments[i]); // WARN should avoid (if possible) calling member methods in a constructor (push)
            this[i] = arguments[i];
    }

}

/**
 * Abstraction of from
 * 
 * it creates a Horroy from a iterable value
 * 
 * @param {string} value - string made by horroy parameters
 * 
 * @return {Horroy} - created horroy
 */
Horroy.from = function (value) {
    var h = new Horroy

    if ((typeof value === 'undefined')) throw TypeError('Cannot convert undefined or null to object')
    if ((value === null)) throw TypeError('Cannot convert undefined or null to object')

    if (typeof value === 'string' || value instanceof Array || value instanceof Horroy) {
        h.length = value.length
        for (var i = 0; i < value.length; i++) {
            h[i] = value[i];
        }
    }
    return h
}

//------------------------HORROY.IS HORROY---------------//

/**
 * Abstraction of ishorroy
 * 
 * it says true if is horry or false if its not
 * 
 * @param {Horroy} value - horroy to evaluate
 * 
 * @return {Boolean} - true is is horroy, false if its not
 */
Horroy.isHorroy = function (value) {
    return value instanceof Horroy ? true : false
}

//------------------------HORROY.OF------------------------//
/**
 * Abstraction of of
 * 
 * it creates a Horroy with input values
 * 
 * 
 * @return {Horroy} - New horroy created with the value iputs
 */

Horroy.of = function () {
    var h = new Horroy
    h.length = arguments.length;
    for (var i = 0; i < arguments.length; i++)
        // this.push(arguments[i]); // WARN should avoid (if possible) calling member methods in a constructor (push)
        h[i] = arguments[i];
    return h
}

//-------------------TO-STRING--------------------//
/**
 * Abstraction of string.
 * 
 * Converts the horroy in a string
 * 
 * 
 * @return {string} - string made by horroy parameters
 */

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

//--------------------FILL------------------------//

/**
 * Abstraction of fill.
 * 
 * Fills an array from one position to other.
 * 
 * @param {*} value 
 * @param {number} start 
 * @param {number} end 
 * 
 * @return {Horroy} - new horroy filled
 */

Horroy.prototype.fill = function (value, start, end) {

    //TODO!!! if start and end are not vallues

    var start = start === undefined ? 0 : (start < 0 ? this.length + start : start);
    var end = end === undefined ? this.length : (end < 0 ? this.length + end : end);

    for (var i = start; i < end; i++)
        this[i] = value;

    return this;
}

//------------------FILTER---------------//

/**
 * Abstraction of filter
 * 
 * The filter() method creates a new horror with all elements 
 * that pass the test implemented by the provided function.
 * 
 * @param {Function} callback - function to satisfy to filter
 * 
 * @throws {TypeError} - when callback is not a function
 * 
 * @return {Horroy} - new array with filtered results
 */

Horroy.prototype.filter = function (callback) {

    if (!(callback instanceof Function)) throw TypeError(callback + ' should be a function ')

    var res = new Horroy()

    for (var i = 0; i < this.length; i++) {
        var value = this[i];
        if (callback(value)) res[res.length++] = value
    }

    return res
}

//---------------------FOR-EACH----------------------//
/**
 * Abstraction of for-each.
 * 
 * Iterates an array evaluating and expression on each of its values.
 * 
 * @param {Function} callback - The expression to evaluate.
 * 
 * @throws {TypeError} - when array is not an Array
 * @throws {TypeError} - when callback is not a Function
 * 
 */
Horroy.prototype.forEach = function (callback) {
    if (typeof callback !== 'function')
        throw new TypeError(callback + ' is not a function');

    for (var i = 0; i < this.length; i++)
        callback(this[i]);
};

//------------------INDEX-OF--------------------------//
/** 
 * Abstraction of index of.
 *
 * This method return the first index at which a given element can be found in the array,
 * or -1 if it is not present
 *
 * @param {any} value - static value to find
 * 
 *@return {number} - The index of the finded value or -1 if the value is not found
 */

Horroy.prototype.indexOf = function (value, start) {

    var start = start === undefined ? 0 : start

    for (var i = start; i < this.length; i++) {
        if (this[i] === value) {
            return i
        }
    }
    return -1

}

//----------------------------JOIN-----------------------//

/** 
 * Abstraction of join.
 *
 * This method creates an return a new string by concatenating all of the elements, separated by commas
 * or a specified separator string.
 * If the element is one item, that result would return without separator
 *
 * @param {String} separator - static value to separate the string
 * 
 *@returns {string} - string joining the array compoennts
 */

Horroy.prototype.join = function (separator) {
    var res = ''

    var separator = separator === undefined ? ',' : separator + ''

    for (var i = 0; i < this.length - 1; i++) {
        res += this[i] + separator
    }

    res += this[this.length - 1]
    return res
}

//--------------------------------MAP------------------------//

/**
 * Abstraction of map.
 * 
 * Iterates a horroy evaluating an expression on each of its values. 
 * The result is located and returned in a new horroy.
 * 
 * @param {Function} callback - The expression to evaluate.
 * 
 * @throws {TypeError} - when callback is not a Function
 * 
 * @returns {Array} - A new array with the resulting values.
 */

Horroy.prototype.map = function (callback) {

    if (!(callback instanceof Function)) throw TypeError(callback + ' should be a function')

    var res = new Horroy;
    for (var i = 0; i < this.length; i++)
        res[res.length++] = callback(this[i]);

    return res;
}

//-----------------------------POP-------------------------------//

/** 
 * 
 * Abstraction of pop.
 *
 * This method removes the last element of a Horroy and returns that element.
 * This method changes the length of the Horroy
 * 
 *  
 *@return {*} - Delated item from the array
 */

Horroy.prototype.pop = function () {

    var last = this[this.length - 1]

    delete this[this.length - 1]
    this.length--
    return last
}

//-----------------------PUSH----------------------//

/** 
 * 
 * Abstraction of push.
 *
 * This method adds one or more elements tot the end of a Horroy
 * and return the new length of the Horroy
 *
 * @param {*} value - static value to push. It can have infinite arguments
 * 
 * @return {Number} - The length od the new horroy
 */

Horroy.prototype.push = function (value) {

    for (var i = 0; i < arguments.length; i++)
        this[this.length++] = arguments[i]

    return this.length

};

/**
 * Abstraction of reduce
 * 
 * this method method executes a reducer function 
 * (that you provide) on each member of the horroy resulting 
 * in a single output value.
 * 
 * @param {Function} callback  - The expression to evaluate
 * @param {*} accumulator - the accumulator of the reduction value
 * 
 * @throws {TypeError} - when callback is not an Function
 * 
 * @return {*} - The reduction value
 */

Horroy.prototype.reduce = function (callback, accumulator) {

    if (!(callback instanceof Function)) throw TypeError(callback + 'should be a function ')

    var i;

    if (accumulator === undefined) {
        accumulator = this[0];
        i = 1;

    } else { i = 0 }

    for (; i < this.length; i++) {
        var item = this[i];

        accumulator = callback(accumulator, item);
    }
    return accumulator
}

//----------------REVERSE----------------//

/** 
 * Abstraction of reverse.
 *
 * This method reverses a Horroy in place. The first Horroy element becomes the last,
 * and the last Horroy element becomes the first
 *
 *
 *@return {Horroy} - Horroy revertida

 */

Horroy.prototype.reverse = function () {

    var res = Object.assign([], this)

    for (var i = 0; i < this.length; i++) {
        this[i] = res[res.length - 1 - i]
    }

    return this
}


//-------------------SLICE--------------------//

/**
 * 
 * Abstraction of SLICE.
 * 
 * Returns a shallow copy of a portion of a horroy into a new horroy object selected
 * from begin to end (end not included). 
 * The original horroy will not be modified.
 * 
 * @param {number} start - start value to cut.
 * @param {number} end - end value to cut
 * 
 * 
 * @return {Horroy} - cut horroy
 */

Horroy.prototype.slice = function (start, end) {

    var start = start === undefined ? 0 : start;
    var end = end === undefined ? this.length : end;

    var res = new Horroy
    for (var i = start; i < end; i++) {
        res[res.length++] = this[i]
    }

    return res
}

//----------------------------SOME----------------------//

/**
 * 
 * Abstraction some
 * 
 * this method tests whether at least one element in the horroy 
 * passes the test implemented by the provided function.
 * 
 * @param {Function} callback - function to satisfy
 * 
 * @throws {TypeError} - when callback is not a Function
 * 
 * @returns {Boolean} - true is there is some, false if theres is any
 */

Horroy.prototype.some = function (callback) {

    if (!(callback instanceof Function)) throw TypeError(callback + ' should be a function')

    for (var i = 0; i < this.length; i++) {
        var value = this[i]
        if (callback(value)) return true
    }

    return false
}

//-------------------------------FIND---------------------//

/**
 * Abstraction of find.
 *
 * This metod return the value of the first element in the Horroy that satisfies the provided testing function.
 * The result is the found value
 *
 * @param {Function} callback - testing funtion
 * 
 * @throws {TypeError} - when callback is not a Function
 * 
 * 
 *@return {*} - The found value. Undefined if value is not found
 */

Horroy.prototype.find = function (callback) {


    if (!(callback instanceof Function)) throw TypeError(callback + ' should be a function')

    for (var i = 0; i < this.length; i++) {
        var value = this[i]
        if (callback(value)) return value
    }

}





//---------------------EVERY------------------//
/**
 * Abstract of every
 * 
 * The every() method tests whether all elements in the Horroy 
 * pass the test implemented by the provided function.
 * 
 * @param {Function} callback - callback to evaluate
 *
 * 
 * @return {Boolean} - true if every elelemtn satisfies the callback. False if not
 * 
 */
Horroy.prototype.every = function (callback) {

    if (!(callback instanceof Function)) throw TypeError(callback + ' is not a function')

    for (var i = 0; i < this.length; i++)
        if (callback(this[i]) === false) return false

    return true


}

//---------------------FIND INDEX------------------//
/**
 * Abstract of findIndex
 * 
 *The findIndex() method returns the index of the first element in the horroy
  that satisfies the provided testing function. 
  Otherwise, it returns -1, indicating no element passed the test.

 * @param {number} target - Element to start to copy
 *
 * 
 * @return {number} - index of the fund element or -1 if element is not found
 * 
 */
Horroy.prototype.findIndex = function (callback) {

    if (!(callback instanceof Function)) throw TypeError(callback + ' is not a function')

    for (var i = 0; i < this.length; i++)
        if (callback(this[i]) === true) return i

    return -1
}


//---------------------INCLUDES-----------------//
/**
 * Abstract of includes
 *
 * The includes() method determines whether a horroy includes a certain value 
 * among its entries, returning true or false as appropriate.
 * 
 *  
 * @return {Boolean} - true if includes, false if not.
 * 
 */
Horroy.prototype.includes = function (value) {

    for (var i = 0; i < this.length; i++)
        if (this[i] === value) return true

    return false
}

//---------------------LAST INDEXOF-----------------//
/**
 * Abstract of lastIndexOf
 *
 * this methos returns the last index ath which a given element can be found in the array,
 * or -1 if it is not present. Th horroy is searched backwards, starting fromIndex
 * 
 * @param {*} searchElement - element to search
 * @param {number} fromIndex - Index to start to search bakwards
 *  
 * @return {number} - index found
 * 
 */
Horroy.prototype.lastIndexOf = function (searchElement, fromIndex) {

    var fromIndex = fromIndex === undefined ? this.length - 1 : fromIndex

    for (var i = fromIndex; i >= 0; i--)
        if (this[i] === searchElement) return i

    return -1
}





/**
 * Abstract of tosource
 *
 * The toSource() method returns a string representing the source code of the Horroy.
 *  
 * @return {string} - string of the source code
 * 
 */
Horroy.prototype.toSource = function () {

    var string='['
    for (var i = 0; i<this.length-1; i++)
        string+=this[i]+',';
    string+=this[this.length-1]+']'

    return string
}
