"use strict";

/**
 *
 * @params {any|number} if number and only 1 parameter construct a empty horray with length = number given
 * else hooray with all elements provided
 * 
 */
function Hooray() {
  if (arguments.length === 1 && typeof arguments[0] === "number") {
    this.length = arguments[0];
  } else {
    for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
    this.length = arguments.length;
  }
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
};

/**
 * Returns a new hooray with elements between start and end(not included)
 *
 * @param {number} begin Optional. Default 0
 * @param {number} end Optional. Default length of hooray
 *
 * @returns {Horray} new hooray with elements between start and end(not included)
 */
Hooray.prototype.slice = function (begin, end) {
  var start = begin || 0;
  var last = end || this.length;
  var result = new Hooray();
  for (var i = start; i < last; i++) {
    result.push(this[i]);
  }
  return result;
}

/**
 * Returns a new hooray with all elements of array1 and array2
 *
 * @param {*} ... elements to concatenate
 *
 * @return {Hooray} All elements of array1 and array2
 */

Hooray.prototype.concat = function() {
  var result = this.slice();
  for (var a = 0; a < arguments.length; a++) {
    var elem = arguments[a];
    if (elem instanceof Hooray) {
      for (var i = 0; i < elem.length; i++) {
        result.push(elem[i]);
      }
    } else {
      result.push(elem);
    }
  }
  return result;
};

/**
 * Iterates an hooray and evaluates an expression on each of its values, returning true if all of them match it. Otherwise returns false.
 * 
 * @param {Function} callbackfn The expression to evalute.
 * 
 * @returns {boolean} True if all values match the expression, otherwise false.
 */
Hooray.prototype.every = function (callbackfn, _this) {
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");
        
  for (var k = 0; k < this.length; k++) {
      if (!callbackfn.call(_this, this[k])) {
          return false;
      }
  }
  return true;
}

/**
 * Modifies the hooray given to replace the values from start to end indexes
 * 
 * @param {*} value 
 * @param {number} start Index to start. Default 0
 * @param {number} end End index (not included). Default the length of hooray
 */
Hooray.prototype.fill = function (value, start, end) {
  var relativeStart = parseInt(start);
  if (isNaN(relativeStart)) {
    relativeStart = 0;
  } 
  var len = this.length;
  var k = (relativeStart < 0) ? Math.max(len + relativeStart,0) : Math.min(relativeStart, len);
  var relativeEnd = (typeof end === "undefined") ? len : parseInt(end);
  var final = (relativeEnd < 0) ? Math.max(len+relativeEnd,0) : Math.min(relativeEnd, len);

  while (k < final) {
    this[k] = value;
    k++;
  }
  return this;
}

/**
 * Returns a new hooray with all values where the evaluation returns true
 * 
 * @param {Function} callbackfn 
 * 
 * @returns {Hooray} New hooray with all values that evaluation function returns true
 */
Hooray.prototype.filter = function (callbackfn, _this) {
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

  var result = new Hooray;
  for (var k = 0; k < this.length; k++) {
    if (callbackfn.call(_this, this[k], k, this)) {
      result.push(this[k]);    
    }    
  }
  return result;
}

/**
 * Returns the index of the first element that fill the condition in callback function
 * 
 * @param {Function} callbackfn 
 * 
 * @returns {number} Index of first occurrence
 */
Hooray.prototype.findIndex = function (callbackfn, _this) {
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

  for (var k = 0; k < this.length;  k++) {
    if (callbackfn.call(_this, this[k], k, this)) return k;
  }
  return -1;
}

/**
 * Returns the value of the first element that fill the condition in callback function
 * 
 * @param {Function} callbackfn 
 * 
 * @returns {*} Element of first occurrence
 */
Hooray.prototype.find = function (callbackfn, _this) {
  if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");
    
  for (var k = 0; k < this.length;  k++) {
    if (callbackfn.call(_this, this[k], k, this)) return this[k];
  }
}

/**
 * Iterates the current hooray and evaluates an expression on each of its values.
 *
 * @param {Function} callback The expression to evaluate.
 */
Hooray.prototype.forEach = function(callbackfn) {
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");


  var self = this;

  this.length &&
    (function forEach(index) {
      callbackfn(self[index], index);

      if (++index < self.length) forEach(index);
    })(0);
};

/**
 * Returns true if the hooray includes the value
 * 
 * @param {*} value 
 * 
 * @returns {boolean} True if the hooray includes the value
 */
Hooray.prototype.includes = function (value) {
  if (arguments.length === 0) return false;

  for (var i = 0; i < this.length; i++ ) {
      if (this[i] === value) return true;
  }
  return false;
}

/**
 * Returns the index of first occurrence where the element is equal to the given value. Otherwise -1
 * 
 * @param {*} value 
 * @param {number} start Index to start 
 * 
 * @returns {number} Index of first occurrence. -1 if not present
 */
Hooray.prototype.indexOf = function (value, start) {
  for (var k = parseInt(start) || 0; k < this.length; k++) {
    if (this[k] === value) return k;
  }
  return -1;
}

/**
 * Concatenate all elements  in a string separated by the separator
 * 
 * @param {string} separator Optional. Inserted between each element. Default: ,
 * 
 * @returns {string} All elements concatenated with the separator between
 */
Hooray.prototype.join = function (separator) {
  var result = String(this[0]);
  var _separator = arguments.length === 0 ? ',' : String(separator);
  for (var k = 1; k < this.length; k++) {
    result = result + _separator + this[k];
  }
  return result;
}

/**
 * Returns the index of last occurrence where the element is equal to the given value. Otherwise -1
 * 
 * @param {*} value 
 * @param {number} fromIndex Index to start the backward search
 * 
 * @returns {number} Index of last occurrence. -1 if not present
 */
Hooray.prototype.lastIndexOf = function (value, fromIndex) {
  var len = this.length;
  if (len === 0) return -1;
  var n = (arguments.length > 1) ? parseInt(fromIndex) : (len - 1);
  var k = (n >= 0) ? Math.min(n, len - 1) : (len - Math.abs(n));

  while (k >= 0) {
    if (this[k] === value) return k;
    k--;
  }
  return -1;
}

/**
 * Returns New hooray with the value returned by the callback for each element
 * 
 * @param {Function} callbackfn 
 * 
 * @returns {Hooray} New hooray with the value returned by the callback for each element
 */
Hooray.prototype.map = function (callbackfn, _this) {
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

  var result = new Hooray();
  for (var k = 0; k < this.length; k++) {
    result.push(callbackfn.call(_this, this[k], k, this));
  }
  return result;
}

/**
 * Remove the last elementof an hooray
 * 
 * @returns element deleted
 */
Hooray.prototype.pop = function () {
  var result = this[this.length-1];
  delete this[this.length-1];
  this.length = this.length - 1;
  return result;
}

/**
 * Apply the callback reducer to each element backwards begging from the end of array. Returns the last value
 * 
 * @param {Function} callbackfn 
 * @param {*} initialValue 
 * 
 * @returns {*} the last value of the reduction
 */
Hooray.prototype.reduceRight = function (callbackfn, initialValue) {
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

  var start = this.length - 1;
  var accumulator;
  if (arguments.length === 2) {
    accumulator = initialValue
  } else {
    accumulator = this[start];
    start = start - 1;    
  }
  for (var k=start; k >= 0; k--) {
    accumulator = callbackfn(accumulator, this[k], k, this);
  }
  return accumulator;
}

/**
 * Apply the callback reducer to each element. Returns the last value
 * 
 * @param {Array} array 
 * @param {Function} callbackfn 
 * @param {*} initialValue 
 * 
 * @returns {*} the last value of the reduction
 */
Hooray.prototype.reduce = function (callbackfn, initialValue) {
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

  var start = 0;
  var accumulator;
  if (arguments.length > 2) {
    accumulator = initialValue
  } else {
    start = 1;
    accumulator = this[0];
  }

  for (var i=start; i < this.length; i++) {
    accumulator = callbackfn(accumulator, this[i], i, this);
  }
  return accumulator;
}

/**
 * Removes the first element of an array and returns it
 * 
 * @returns {*} The element removed
 */
Hooray.prototype.shift = function() {
  var len = this.length;
  var result = this[0];
  for(var i = 0; i < len - 1; i++) {
    this[i] = this[i+1];
  }
  this.pop();
  return result;
}

/**
 * Iterates an hooray and evaluates an expression on each of its values, returning true if any of them match it. Otherwise returns false.
 * 
 * @param {Function} callbackfn The expression to evaluate.
 * 
 * @returns {boolean} True if at least one value match the expression, otherwise false.
 */
Hooray.prototype.some = function (callbackfn) {
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

    for (var i = 0; i < this.length; i++) {
        if (callbackfn(this[i], i, this))  {
            return true;
        }
    }
    return false;
}

/**
 * 
 * Sort in place the array. If no compare function, the default comparison is the standar comparison > not MDN documentation UTF16)
 * 
 * @param {Function} comparefn function to compare (a,b) 
 */

Hooray.prototype.sort = function (comparefn) {
	if (arguments.length > 0 && !(comparefn instanceof Function)) throw new TypeError("undefined is not a function");

  var compare = comparefn || function (a, b) { return String(a) > String(b); };
  for (var i = this.length - 1; i >= 0; i--) {
    for (var j = 0; j < i; j++ ) {
      if (compare(this[j], this[j+1]) > 0) {
        var temp = this[j];
        this[j] = this[j+1];
        this[j+1] = temp;
      }
    }
  }
  return this;
}

/**
 * Chop the original hooray from start in deleteCount number of elements, Add in that hole item1, item2... 
 * 
 * @param {number} start start of cutting
 * @param {number} deleteCount number of elements to delete
 * @param {any} item1, item2,... All items to add instead of chopped elements 
 * 
 * @returns {Hooray} Modified hooray
 */
Hooray.prototype.splice = function (start, deleteCount) {
  var len = this.length;
  var actualStart = start < 0 ? Math.max(len+start,0) : Math.min(start, len);
  var actualDeleteCount = Math.min(Math.max(deleteCount,0), len - actualStart);

  var returnResult = new Hooray();
  for (var k=0; k < actualDeleteCount; k++) {
    returnResult.push(this[actualStart+k]);
  }

  var result = new Hooray();
  for (var i = 0; i < Math.min(actualStart, len); i++) {
    result.push(this[i]);
  }
  for (var i = 2; i < arguments.length; i++) {
    result.push(arguments[i]);
  }
  for (var i = actualStart + deleteCount; i < len; i++) {
    result.push(this[i])
  }

  while (this.length !== result.length) {
    if (this.length < result.length) {
      this.push(null);
    } else {
      this.pop()
    }
  }

  for (var i = 0; i < this.length; i++) {
    this[i] = result[i]; 
  }
  return returnResult;
}

