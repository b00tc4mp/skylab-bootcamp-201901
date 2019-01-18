function Horroy() {
    this.length = arguments.length;

    if (arguments.length)
        for (var i = 0; i < arguments.length; i++)
            // this.push(arguments[i]); // WARN should avoid (if possible) calling member methods in a constructor (push)
            this[i] = arguments[i];
}


//-------------------TO-STRING--------------------//
/* Abstraction of toString */

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

    start = start === undefined ? 0 : (start < 0 ? this.length + start : start);
    end = end === undefined ? this.length : (end < 0 ? this.length + end : end);

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

    start = start === undefined ? 0 : start

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

    separator = separator === undefined ? ',' : separator + ''

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

//---------------------SHIFT-------------------//
/**
 * Abstraction of Shift
 * 
 * This method removed the first element from a horroy and
 * returns that removed element. This methos changes the length of the horroy.
 * 
 * 
 * 
 * @return {Array} - Array shifted
 */

Horroy.prototype.shift = function (array) {

    var first = this[0];
    var copy = Object.assign([], this)

    this.length--
    for (var i = 0; i < this.length; i++) {
        this[i] = copy[i + 1]
    }

    return first
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

    start = start === undefined ? 0 : start;
    end = end === undefined ? this.length : end;

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

//-----------------------UNSHIFT-------------------------//
/**
 * Abstraction of Unshift
 * 
 * This method adds one or more items in the begggining of a horroy
 * and returns the length of the new horroy
 * 
 * 
 * 
 * @return {number} - new length of the array
 */

Horroy.prototype.unshift = function () {


    var copy = Object.assign([], this);
    countCopy = 0;

    this.length += arguments.length;
    var i;

    for (i = 0; i < arguments.length; i++) {
        this[i] = arguments[i];
    }

    for (i = arguments.length; i < this.length; i++) {
        this[i] = copy[countCopy];
        countCopy++
    }

    return this.length

}

//------------------------SPLICE------------------------//

/**
 * Abstraction of splice.
 * 
 * this method changes the contents of a Horroy by removing or replacing existing 
 * elements and/or adding new elements.
 * 
 * @param {number} start -number to start to splice
 * @param {number} delated - number of elements to delate
 * @param {*} items - items that I want to add. The number of items can be infinit.
 * 
 * @throws {TypeError} - when del or start are not numbers
 * 
 * @return {Horroy} - cut Horroy
 */

Horroy.prototype.splice = function (start, delated) {

    //WARN: The original does not detect if its a number (exemple: start=true is taken as start=1)
    // if (  start !== undefined && typeof start!=="number") throw TypeError(start+' is not a number');
    // if ( delated !== undefined && typeof delated!=="number") throw TypeError(delated+' is not a number');

    delated = delated === undefined ? this.length : delated

    var res = new Horroy;
    var orig = [];
    var final = [];
    var items = [];

    var countFinal = 0;
    var countItems = 0;
    var horroyLength = this.length


    //Look how maney items I have
    if (arguments.length > 2) {
        items.length = arguments.length - 2;

        for (var i = 0; i < arguments.length - 2; i++) {
            items[i] = arguments[i + 2];

        }
    }

    //Separation of the input Horray
    for (var i = 0; i < this.length; i++) {
        if (i >= start && i < (delated + start)) {
            res[res.length++] = this[i];

        } else if (i >= (delated + start)) {
            final[final.length] = this[i];

        } else {
            orig[orig.length] = this[i];
        }
    }

    // Creation of the Horroy
    this.length = orig.length + items.length + final.length;
    for (var i = this.length; i < horroyLength; i++) delete this[i]

    for (var i = 0; i < this.length; i++) {
        if (i >= start && countItems < items.length) {
            this[i] = items[countItems];
            countItems++;


        } else if (i >= start && countItems === items.length) {
            this[i] = final[countFinal];
            countFinal++;
        } else {
            this[i] = orig[i];
        }
    }
    return res
};