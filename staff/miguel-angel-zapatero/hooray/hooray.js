"use strict";

/**
 * Constructor function to create new Hoorays!!!
 */
function Hooray() {
    var first = arguments[0];

    if (arguments.length === 1 && typeof first === "number")
        if (parseInt(first) !== first) throw RangeError("Invalid hooray");
        else return (this.length = first);

    for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
    this.length = arguments.length;
}

/**
 * Determines if the passed value is an hooray or not.
 *
 * @returns {boolean} True if is an hooray, otherwise false.
 */
Hooray.isHooray = function(value) {
    if (value instanceof Hooray) return true;
    return false;
}

/**
 * Adds a value at the end of an hooray, incrementing its length by 1.
 *
 * @param {*} value The value to push in the hooray.
 *
 * @returns {number} The length of the hooray after adding the new value.
 */
Hooray.prototype.push = function(value) {
    if (arguments.length > 0)
        for (var i = 0; i < arguments.length; i++)
            this[this.length++] = arguments[i];

    return this.length;
}

/**
 * Iterates the current hooray and evaluates an expression on each of its values.
 *
 * @param {Function} callback The expression to evaluate.
 */
Hooray.prototype.forEach = function(callback) {
    if (typeof callback !== "function")
        throw TypeError(callback + " is not a function");

    var self = this;

    this.length &&
        (function forEach(index) {
            callback(self[index], index);

            if (++index < self.length) forEach(index);
        })(0);
}

/**
 * Iterate diferents horrays to concatenate the values into a new horray.
 *
 * @param  {[arguments]} arguments The horray (or horrays) to concatenate
 *
 * @returns {Horray} 
 */
Hooray.prototype.concat = function() {
    var result = new Hooray();
    
    for(var i = 0; i < this.length; i++) {
        result[result.length++] = this[i];
    }

    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            if (!(arguments[i] instanceof Hooray)) {
                result[result.length++] = arguments[i];
            } else {
                for (var j = 0; j < arguments[i].length; j++) {
                    result[result.length++] = arguments[i][j];
                }
            }
        }
    }

    return result;
}

/**
 * Iterate an hooray and evaluate an expression on each of its values, returning true if all of them match it, otherwise false.
 * 
 * @param {Function} callback The expression to evaluate.
 * 
 * @returns {boolean} True if all values macth the expression, otherwise false.
 */
Hooray.prototype.every = function(callback) {
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for(var i = 0; i < this.length; i++) {
        if(!callback(this[i])) return false;
    }
    return true;
}

/**
 * Fills (modifies) all the elements of an horray from a start index (default zero) to an end index (default horray length) with a static value. It returns the modified horray.
 * 
 * @param {*} value The static value to fill.
 * @param {[Number]} s The start point to fill.
 * @param {[Number]} e The end point to stop the fill.
 * 
 * @return {Horray} the modified horray.
 */
Hooray.prototype.fill = function(value, s, e) {
    var start;
    var end;

    if(s) {
        start = s;
    } else {
        start = 0;
    }

    if(e) {
        end = e;
        if (end > this.length) {
            end = this.length;
        }
    } else {
        end = this.length;
    }

    for(var i = start; i < end; i++) {
        this[i] = value;
    }

    return this;
}

/**
 * Iterate an horray and evaluate an expression on each of its values, returning a new horray with the values that match it.
 * 
 * @param {Function} callback The expression to evaluate.
 * 
 * @returns {Horray} The new horray.
 */
Hooray.prototype.filter = function(callback) {
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    var result = new Hooray();

    for(var i = 0; i < this.length; i++) {
        if(callback(this[i])) {
            result[result.length++] = this[i];
        }
    }
    return result;
}

/**
 * Iterate an hooray and evaluate an expression on each of its values, returning the first matched index of the hooray, otherwise return -1
 * 
 * @param {Function} callback The expression to evaluate
 * 
 * @returns {any} The matched index, otherwise -1
 */
Hooray.prototype.findIndex = function(callback) {
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for(var i = 0; i < this.length; i++) {
        if(callback(this[i])) return i;
    }
    return -1;
}

/**
 * Iterate an hooray and evaluate an expression on each of its values, returning the first matched value of the hooray, otherwise return undefined
 * 
 * @param {Function} callback The expression to evaluate
 * 
 * @returns {any} The matched value, otherwise undefined
 */
Hooray.prototype.find = function(callback) {
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for(var i = 0; i < this.length; i++) {
        if(callback(this[i])) return this[i];
    }
    return undefined;
}

/**
 * Iterate an hooray to find the value into the hooray, returning true if match it, otherwise false.
 *  
 * @param {*} value The value to find
 * 
 * @returns {boolean} True if the value is matched, otherwise false.
 */
Hooray.prototype.includes = function(value) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === value) return true;
    }
    return false;
}

/**
 * Returns the first index at which a given element can be found in the hooray, or -1 if it is not present.
 * 
 * @param {*} elem The element to be finded.
 * @param {[Number]} index The index to start the search at.
 * 
 * @returns {Number} The index of the element finded.
 */
Hooray.prototype.indexOf = function(elem, index) {
    if(typeof index !== 'number' && index !== undefined) throw TypeError(index + ' is not a number');

    if(!index) index = 0;
    if(index < 0) index = this.length + index;
    for(var i = index; i < this.length; i++) {
        if(elem === this[i]) return i;
    }
    return -1;
}

/** creates and returns a new string by concatenating all of the elements in an hooray, separated by commas or a specified separator string. If the hooray has only one item, then that item will be returned without using the separator.
 * 
 * @param {[*]} separator The specified separator string.
 * 
 * @returns {String} The concatenating string.
 */
Hooray.prototype.join = function(separator) {
    var result = '';
    
    for(var i = 0; i < this.length; i++) {
        result += this[i];
        if(separator && this.length > 1 && i < this.length-1) {
            result += separator;
        } else if(separator === undefined && i < this.length-1) {
            result += ',';
        }
    }
    
    return result;
}

/**
 * Returns the last index at which a given element can be found in the hooray, or -1 if it is not present.
 * 
 * @param {*} elem The element to be finded.
 * @param {[Number]} i The index to start the search at.
 * 
 * @returns {Number} The index of the element finded.
 */
Hooray.prototype.lastIndexOf = function(elem, index) {
    if(typeof index !== 'number' && index !== undefined) throw TypeError(index + ' is not a number');
    
    if(!index) index = this.length;
    if(index < 0) index = this.length + index;
    for(var i = index; i > 0; i--) {
        if(elem === this[i]) return i;
    }
    return -1;
}

/**
 * creates a new hooray with the results of calling a provided function on every element in the calling hooray.
 * 
 * @param {Function} callback The function to be provided.
 * 
 * @returns {Hooray} The results of the provided function results.
 */
Hooray.prototype.map = function(callback) {
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    var newArr = new Hooray();
    for(var i = 0; i < this.length; i++) {
        newArr[newArr.length++] = callback(this[i]);
    }
    return newArr;
}

/**
 * Removes the last element and return it. 
 */
Hooray.prototype.pop = function() {
    if (this.length) {
        var result = this[this.length - 1];
        
        delete this[this.length - 1];
        this.length--;

        return result;
    }
    return undefined;
}

/**
 * Executes a reducer function (that you provide) on each member of the hooray resulting in a single output value from right to left.
 * 
 * @param {Function} callback the fucntion provided
 * @param {[*]} value Optional first value
 */
Hooray.prototype.reduceRight = function(callback, value) {
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');
    
    var acc = value || this[this.length - 1];
    var index = typeof value !== 'undefined' ? this.length - 1 : this.length - 2;

    for(var i = index; i >= 0; i--) {
        acc = callback(acc, this[i]); 
    }
    return acc;
}

/**
 * Executes a reducer function (that you provide) on each member of the hooray resulting in a single output value.
 * 
 * @param {Function} callback The function provided.
 * @param {[*]} value Optional first value.
 * 
 * @return {*} the single value.
 */
Hooray.prototype.reduce = function(callback, value) {
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    var acc = value || this[0];
    var index = typeof value !== 'undefined' ? 0 : 1;
    
    for(var i = index; i < this.length; i++) {
        acc = callback(acc, this[i])  
    }
    return acc;
}

/**
 * Iterate an hooray and change the order, the first hooray's element becomes the last and the last hooray's element becomes the first.
 */
Hooray.prototype.reverse = function() {
    var newArr = new Hooray();
    
    for(var i = 0; i < this.length; i++) {
        newArr[i] = this[(this.length-1) - i];
    }
    
    for(var i = 0; i < this.length; i++) {
        this[i] = newArr[i];
    }
    
    return this;
}

/**
 * Removes the first element and return it.
 */
Hooray.prototype.shift = function() {
    var newArr = new Hooray();
    
    if (this.length) {
        var result = this[0];
        delete this[0];

        for (var i = 1; i < this.length; i++) {
            newArr[newArr.length++] = this[i];
            delete this[i];
        }

        this.length = 0;
        for (var i = 0; i < newArr.length; i++) {
            this[this.length++] = newArr[i];
        }

        return result;
    }
}

/**
 * Returns a shallow copy of a portion of an hooray into a new hooray
 * 
 * @param {[Number]} start The start index of the hooray.
 * @param {[Number]} end The final index of the hooray.
 * 
 * @returns {Hooray} New hooray. Empty if start is greater than the length of the hooray.
 */
Hooray.prototype.slice = function(start, end) {
    if(typeof start !== 'number' && start !== undefined) throw TypeError(start + ' is not a number');
    if(typeof end !== 'number' && end !== undefined) throw TypeError(end + ' is not a number');

    var newArr = new Hooray;
    if (start === undefined) start = 0;
    if (end === undefined || end > this.lenght) end = this.length;
    if (start < 0) start = this.length + start;
    if (end < 0) end = this.length + end;
    if(start > this.length) return newArr;
    for (var i = start; i < end; i++) {
        newArr[newArr.length++] = this[i];
    }
    return newArr;
}

/**
 * Itarate an hooray and evaluate an expression on each of its values, returning true if one of them match it, otherwise false.
 * 
 * @param {Function} callback the expression to evaluate.
 * 
 * @returns {boolean} True if one of the values match it, otherwise false.
 */
Hooray.prototype.some = function(callback) {
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    if(!this.length) return false;
    
    for(var i = 0; i < this.length; i++) {
        if(callback(this[i])) return true;
    }
    return false;
}

/**
 * Iterate an hooray to change its order values from min to max changing the original hooray.
 */
Hooray.prototype.sort = function() {
    for(var i = 0; i < this.length; i++) {
        var a = this[i];
        var b = this[i+1];
        if(''+this[i] > ''+this[i+1]) {
            this[i] = b;
            this[i+1] = a;
            i = -1;
        }
    }
    return this
}

/**
 * Changes the contents of an hooray by removing or replacing existing elements and/or adding new elements in place.
 * 
 * @param {number} start The index to start the changes.
 * @param {[*]} end The final index to end the changes.
 * @param {[*]} value The value to add/change into the hooray.
 * 
 * @returns {hooray} A new hooray with the values erased.
 */
Hooray.prototype.splice = function(start, end, value) {
    if((typeof start !== 'number' && start !== undefined)) throw TypeError(start + ' is not a number');
    if((typeof start !== 'number' && start !== undefined)) throw TypeError(end + ' is not an number');

    var hoorayStart = new Hooray();
    var hoorayEnd = new Hooray()
    var hoorayElem = new Hooray();
    var hoorayDelete = new Hooray()
    
    if(arguments.length > 2) {
        for(var i = 2; i < arguments.length; i++) {
            hoorayElem[hoorayElem.length++] = arguments[i];
        };
    }
    
    if(start < 0) {
        start = this.length + start;
    }
    if(!end || end >= this.length - start) {
        end = this.length;
    }
    if(end <= 0) end = start;

    for(var i = 0; i < start; i++) {
        hoorayStart[hoorayStart.length++] = this[i];
        delete this[i]; 
    }

    for(var i = start; i < end; i++) {
        hoorayDelete[hoorayDelete.length++] = this[i]; 
        delete this[i];
    }

    for(var i = end; i < this.length; i++) {
        hoorayEnd[hoorayEnd.length++] = this[i];
        delete this[i]; 
    }

    this.length = 0;
    var totalHooray = new Hooray(hoorayStart, hoorayElem, hoorayEnd);
    for(var i = 0; i < totalHooray.length; i++) {
        if(totalHooray[i].length !== 0) {
            for(var j = 0; j < totalHooray[i].length; j++) {
                this[this.length++] = totalHooray[i][j];
            }
        }
    }
    
    return hoorayDelete; 
}