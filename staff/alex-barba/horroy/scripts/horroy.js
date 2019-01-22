/**
 * Abstraction of an array.
 * 
 * Creates a version of an array,
 * 
 * @param {*} - Optional. Horroy elements.
 * 
 * @throws {RangeError} - When arguments.length === 1, if that number is not integer.
 * 
 * @returns {Horroy}
 */

function Horroy(){
    if (arguments.length === 1 && typeof arguments[0] === 'number'){
    if(!(Number.isInteger(arguments[0]))) throw new RangeError('invalid horroy length');
       this.length = arguments[0];
    } else {
        this.length = arguments.length;
        for (var i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
        }
    }
};

/**
 * Abstraction of .fill
 * 
 * Functions as .fill() for an array but for a horroy.
 * 
 * @param {*} - value. Value to fill a horroy.
 * @param {Number} - start. Optional. Start index.
 * @param {Number} - end. Optional. End index.
 * 
 * @throws {Error} - When arguments > 3.
 * @throws {TypeError} - When start or end are not Numbers.
 * 
 * @returns {Horroy} - The modified horroy.
 */

Horroy.prototype.fill = function(value, start, end) {
    if (arguments.length > 4) throw Error('too many arguments');

    start = start === undefined ? 0 : (start < 0 ? this.length + start : start);
    end = end === undefined ? this.length : (end < 0 ? this.length + end : end);

    if (typeof start !== 'number' || typeof end !== 'number'  ) throw TypeError (start + ' or ' + end + ' is not a number');
    
        for (var i = start; i < end; i++) {
            this[i] = value;
        }
    return this;
};

/**
 * Abstraction of .filter
 * 
 * Functions as .filter for an array but for a horroy.
 * 
 * @param {Function} - A predicate to iterate through the horroy..
 * 
 * @throws {TypeError} - When callback is not a Function.
 * 
 * @returns {Horroy} - New horroy.
 */

Horroy.prototype.filter = function(callback){
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');
    
    var res = new Horroy();
    
    for (var i = 0; i < this.length; i++) {
        if(callback(this[i]) === true) {
            res[res.length] = this[i];
            res.length++;
        }
    }
    return res;
};

/**
 * Abstraction of .find
 * 
 * Functions as .find for an array but for a horroy.
 * 
 * @param {Function} - To execute on each value of the the horroy.
 * 
 * @throws {Error} - When arguments > 1.
 * @throws {TypeError} - When callback is not a Function.
 * 
 * @returns {*} - Value of the first element in the horro that satifies the provided testing function.
 */

Horroy.prototype.find = function(callback) {
    if (arguments.length > 1) throw Error('too many arguments');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for (var i = 0; i < this.length; i++) {
        var value = this[i];
        if(callback(value) === true) return value;
    }    
};

/**
 * Abstraction of .forEach
 * 
 * Functions as .forEach for an array but for a horroy.
 * 
 * @param {Function} - To execute on each value of the the horroy.
 * 
 * @throws {TypeError} - When callback is not a Function.
 * 
 * @returns {*} - Undefined.
 */

Horroy.prototype.forEach = function(callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    for (var i = 0; i < this.length; i++) callback(this[i]);
};

/**
 * Abstraction of .indexOf
 * 
 * Functions as .indexOf for an array but for a horroy.
 * 
 * @param {*} - element. Element to locate in the horroy.
 * @param {Number} - start. Optional. Index to start the search at.
 * 
 * @throws {TypeError} - When start is not a Number.
 * 
 * @returns {*} - The first index of the element in the horroy; -1 if not found.
 */

Horroy.prototype.indexOf = function(element, start) {
    if (!(typeof start === 'number' || start !== 'undefined')) throw new TypeError(start + ' is not a number.')

    start = start? start : 0;

    for(var i=start; i<this.length; i++) {
        if (this[i] === element){
            return i;
        }
    }
    return -1;
};

/**
 * Abstraction of .join
 * 
 * Functions as .join for an array but for a horroy.
 * 
 * @param {*} - Optional. Specifies a string to separate each pair of adjacent elements of the array. The separator is converted to a string if necessary.
 * 
 * @throws {TypeError} - If separator is not a string.
 * 
 * @returns {*} - A string with all horroy elements joined.
 */

Horroy.prototype.join = function(separator) {
    if (!(typeof separator === 'string')) throw TypeError ('separator is not a string');
    
    var result = '';

    for (let i=0; i<this.length; i++) {
        if(this[i] === null || this[i] === undefined) this[i] = '';
        separator = separator? separator : '';

        result += this[i];
        
        if (i == this.length-1) {
            return result;
        }
        result += separator;
    }
    return result;
};

/**
 * Abstraction of .map
 * 
 * Functions as .map for an array but for a horroy.
 * 
 * @param {Function} - Function that produces an element of the new horroy.
 * 
 * @throws {TypeError} - When callback is not a Function.
 * 
 * @returns {Horroy} - A new horroy with each element being the result of the callback function.
 */

Horroy.prototype.map = function(callback) {
    if (!(callback instanceof Function)) throw TypeError (callback + ' is not a function');

    var res = new Horroy();

    for (var i = 0; i < this.length; i++) {
        res[i] = callback(this[i]) 
        res.length++;
    }
    return res;
};

/**
 * Abstraction of .pop
 * 
 * Functions as .pop for an array but for a horroy.
 * 
 * @returns {Horroy} - The removed element from the horroy; undefined if the horroy is empty.
 */

Horroy.prototype.pop = function(){
    if (this.length === 0) return undefined

    var res = this[this.length-1];

    delete this[this.length-1];

    this.length--;

    return res;
};

/**
 * Abstraction of .push
 * 
 * Functions as .push for an array but for a horroy.
 * 
 * @param {*} - element. The element to add at the end of the horroy.
 * 
 * @returns {Number} - The new length of the horroy.
 */

Horroy.prototype.push = function(element) {
    for (var i = 0; i<arguments.length; i++) {
        this[this.length] = arguments[i];
        this.length++;
    }
    return this.length;
};

/**
 * Abstraction of .reduce
 * 
 * Functions as .reduce for an array but for a horroy.
 * 
 * @param {Function} - Reducer function to execute on each element.
 * 
 * @throws {TypeError} - When callback is not a Function.
 * 
 * @returns {*} - Single output value.
 */

Horroy.prototype.reduce = function(callback, accumulator) {
    if (!(callback instanceof Function)) throw TypeError(callback + ' is not an function');

    var i = 0;

    if (accumulator === undefined) {
        accumulator = this[0];
        i = 1;
    }

    for (; i < this.length; i++) {
        var item = this[i];
        accumulator = callback(accumulator, item);
    }
    return accumulator;
};

/**
 * Abstraction of .reverse
 * 
 * Functions as .reverse for an array but for a horroy.
 * 
 * @returns {Horroy} - The reversed horroy.
 */

Horroy.prototype.reverse = function() {
    var duplicate = new Horroy();

    for (var i = 0; i < this.length; i++) {
        duplicate[i] = this[i];
        duplicate.length++
    }

    for (var i = duplicate.length; i > 0; i--){
        this[i-1] = duplicate[this.length-i];
    }
    return this;
};

/**
 * Abstraction of .shift
 * 
 * Functions as .shift for an array but for a horroy.
 * 
 * @returns {*} - The removed element of the horroy. Undefined if horroy is empty.
 */

Horroy.prototype.shift = function() {
    if (this.length === 0) return undefined;

    var res = this[0];
    var copy = new Horroy();

    for (var i = 1; i < this.length; i++) {
        copy[copy.length] = this[i];
        copy.length++;
    }

    this.length = copy.length;

    for (var i = 0; i < copy.length; i++) {
        this[i] = copy[i];
    }
    return res;
};

/**
 * Abstraction of .slice
 * 
 * Functions as .slice for an array but for a horroy.
 * 
 * @param {Number} - start. Optional. Index where to begin  extraction.
 * @param {Number} - end. Optional. Index before which to end extraction.
 * 
 * @returns {Horroy} - A new horroy with the extracted elements.
 */

Horroy.prototype.slice = function(start, end) {
    var res = new Horroy();
        
    start = start ? start : 0;

    end = end ? end : this.length;

    if (end > this.length){ end = this.length};

    for (var i = start; i < end; i++) {
        res[res.length]= this[i];
        res.length++;
    }
    return res;
};

/**
 * Abstraction of .some
 * 
 * Functions as .some for an array but for a horroy.
 * 
 * @param {Function} - Function to test for each element.
 * 
 * @throws {TypeError} - When callback is not a Function.
 * 
 * @returns {Boolean} 
 */

Horroy.prototype.some = function(callback){
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for (var i =0; i < this.length; i++) {
        if (callback(this[i]) === true) return true; 
    }
    return false;
};

/**
 * Abstraction of .splice
 * 
 * Functions as .splice for an array but for a horroy.
 * 
 * @param {Number} - start. Index where to begin  extraction.
 * @param {Number} - deleteCount. Optional. The number of element to remove.
 * @param {Number} - item. Optional. Elements to add to the horroy.
 * 
 * @returns {Horroy} - A new horroy with the removed elements.
 */

Horroy.prototype.splice = function(start, deleteCount, item){
    if (deleteCount > (this.length-start) || deleteCount === undefined) { deleteCount = this.length-start};

    var original = new Horroy();
    var items = new Horroy();
    var initial = new Horroy();
    var end = new Horroy();
    var final = new Horroy();
    var res = new Horroy();

    if (arguments.length >3) {
        for (var i = 3; i<arguments.length; i++) {
            items[items.length] = arguments[i];
            items.length++;
        }
    }
    
    for (let i = 0; i < start; i++) {
        initial[initial.length] = this[i]
        initial.length++;
    };

    for (let i = (start + deleteCount); i < this.length; i++) {
        end[end.length] = this[i]
        end.length++;
    };

    for (let i = start; i < (start+deleteCount); i++){
        res[res.length] = this[i]
        res.length++;
    };

    for (let i = 0; i < initial.length; i++) {
        final[final.length] = initial[i];
        final.length++;
    }
    for (let i = 0; i < items.length; i++) {
        final[final.length] = items[i];
        final.length++;
    }
    for (let i = 0; i < end.length; i++) {
        final[final.length] = end[i];
        final.length++;
    }

    this.length = final.length;

    for (let i = 0; i < final.length; i++) {
        this[i] = final[i];
    }
    return res;
};

/**
 * Abstraction of .unshift
 * 
 * Functions as .unshit for an array but for a horroy.
 * 
 * @param {*} - element. Elements to add at the begining of the horroy.
 * 
 * @returns {Number} - New length of the horroy.
 */

Horroy.prototype.unshift = function(element){
    var copy = new Horroy();

    for (var i = 0; i < arguments.length; i++) {
        copy[copy.length] = arguments[i];
        copy.length++;
    }

    for (var i = 0; i < this.length; i++) {
        copy[copy.length] = this[i]
        copy.length++;
    }

    this.length = copy.length;

    for (var i = 0; i < copy.length; i++) {
        this[i] = copy[i];
    };

    return this.length;
};

/**
 * Abstraction of .toString
 * 
 * Functions as .toString for an array but for a horroy.
 * 
 * @returns {String} - A string representing the elements of the array.
 */

Horroy.prototype.toString = function() {
    var string = '';
    
    for (var i = 0; i < this.length; i++) {
        if (i === this.length-1) {
            string += this[i]
        } else {
            string += this[i] + ','
        }
    }
    return string
};

/**
 * .toRainbow
 * 
 * Joins horroy and prints console.log in Rainbow format
 */

Horroy.prototype.toRainbow = function(){
    console.log('%c ' + this.join(), 'font-weight: bold; font-size: 50px; color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
};

/**
 * Abstraction of .from
 * 
 * Functions as .from for an array but for a horroy.
 * 
 * @param {*} - value. An iterable object to convert to a horroy.
 * 
 * @throws {TypeError} - When element is not an Object.
 * 
 * @returns {Hoory} - A new horroy.
 */

Horroy.from = function(value) {
    if(value === undefined || value === null) throw new TypeError (value + ' is not an Object');
    var hor = new Horroy();

    if (typeof value === 'string' || value instanceof Array || value instanceof Horroy) {
        hor.length = value.length;
        for(var i = 0; i < value.length; i++){
            hor[i] = value[i];
        }
        return hor;
    }
    return hor
};

/**
 * Abstraction of .isHorroy
 * 
 * Functions as .isHorroy for an array but for a horroy.
 * 
 * @param {*} - value. Value to be checked.
 * 
 * @returns {Boolean}
 */

Horroy.isHorroy = function(value){
    return value instanceof Horroy ? true : false;
};

/**
 * Abstraction of .of
 * 
 * Functions as .of for an array but for a horroy.
 * 
 * @param {*} - value. Element of which create the horroy.
 * 
 * @returns {Horroy} - A new horroy instance.
 */

Horroy.of = function(value) {
    var hor = new Horroy;
    hor.length = arguments.length;

    for (var i = 0; i < arguments.length; i++) {
        hor[i] = arguments[i];
    }
    return hor;
};

/**
 * Abstraction of .concat
 * 
 * Functions as .concat for an array but for a horroy.
 * 
 * @returns {Horroy} - A new horroy instance.
 */

Horroy.prototype.concat = function () {
    var hor = new Horroy;

    for(var i = 0; i<this.length; i++){
        hor[hor.length++] = this[i];
    }

    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Array || arguments[i] instanceof Horroy) {
            for (var j = 0; j<arguments[i].length; j++) {
                hor[hor.length++] = arguments[i][j];
            }
        } else {
            hor[hor.length++] = arguments[i];
        }
    }
    return hor;
};

/**
 * Abstraction of .copyWhithin
 * 
 * Functions as .copyWhithin for an array but for a horroy.
 * 
 * @param {Number} - target. Index at which to copy the sequence to.
 * @param {Number} - start. Optional. Index at which to start copying elements from.
 * @param {Number} - end. Optional. Index at which to end copying elements from.
 * 
 * @returns {Horroy} - The modified horroy.
 */

Horroy.prototype.copyWithin = function(target, start, end){
    if (target >= this.length-1) return this;
    start = start ? start : 0;

    var copy = new Horroy;

    var index = 0;

    if (arguments.length === 1) {
        for (var i = 0; i < target; i++) {
            copy[copy.length++] = this[i];
        }
        for (var i = target; i < (target+copy.length); i++){
            this[i]=copy[index++];
        }
        return this;
    } else if (arguments.length === 2) {
        for (var i = start; i < this.length; i++) {
            copy[copy.length++] = this[i];
        }
        for (var i = target; i < (target+copy.length); i++){
            this[i]=copy[index++];
        }
        return this;
    } else if (arguments.length >= 3) {
        for (var i = start; i < end; i++) {
            copy[copy.length++] = this[i];
        }
        for (var i = target; i < (target+copy.length); i++){
            this[i]=copy[index++];
        }
        return this;
    } else {
        return this;
    }
};

/**
 * Abstraction of .every
 * 
 * Functions as .every for an array but for a horroy.
 * 
 * @param {Function} - Function to test for each element.
 * 
 * @throws {TypeError} - When callback is not a Function.
 * 
 * @returns {Boolean} 
 */

Horroy.prototype.every = function(callback){
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for (var i =0; i < this.length; i++) {
        if (!callback(this[i])) return false; 
    }
    return true;
};

/**
 * Abstraction of .findIndex
 * 
 * Functions as .findIndex for an array but for a horroy.
 * 
 * @param {Function} - Function to test for each element.
 * 
 * @throws {TypeError} - When callback is not a Function.
 * 
 * @returns {*} - An index in the horroy if an element passes the test; otherwise, -1.
 */

Horroy.prototype.findIndex = function(callback) {
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for (var i = 0; i < this.length; i++) {
        var value = this[i];
        if(callback(value)) return i;
    }
    return -1;    
};

/**
 * Abstraction of .includes
 * 
 * Functions as .includes for an array but for a horroy.
 * 
 * @param {*} - element. The value to search for.
 * @param {Number} - start. Optional. Index at which to begin searching.
 * 
 * @returns {Boolean}
 */

Horroy.prototype.includes = function(element, start) {
    start = start ? start : 0;

    for (var i = start; i < this.length; i++) {
        var value = this[i];
        if(value === element) return true;
    }
    return false;    
};

/**
 * Abstraction of .lastIndexOf
 * 
 * Functions as .lastIndexOf for an array but for a horroy.
 * 
 * @param {*} - element. Element to locate in the horroy.
 * @param {Number} - start. Optional. Index at which to begin searching backwards.
 * 
 * @returns {*} - The last index of the element in the array; -1 if not found.
 */

Horroy.prototype.lastIndexOf = function(value, start) {
    start = start? start : this.length-1;

    for(var i= start; i>0; i--) {
        if (this[i] === value){
            return i;
        }
    }
    return -1;
};

/**
 * Abstraction of .reduceRight
 * 
 * Functions as .reduceRight for an array but for a horroy.
 * 
 * @param {Function} - Reducer function to execute on each element from right to left.
 * 
 * @throws {TypeError} - When callback is not a Function.
 * 
 * @returns {*} - Single output value.
 */

Horroy.prototype.reduceRight = function(callback, accumulator) {
    if (!(callback instanceof Function)) throw TypeError(callback + ' is not an function');

    var i = this.length-1;

    if (accumulator === undefined) {
        accumulator = this[this.length-1];
        i = this.length-2;
    };

    for (; i >= 0; i--) {
        var item = this[i];
        accumulator = callback(accumulator, item);
    };
    return accumulator;
};