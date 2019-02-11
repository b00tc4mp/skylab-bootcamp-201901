function Horroy() {
  var length =
    arguments.length > 1 || arguments.length === 0
      ? arguments.length
      : arguments[0];

  for (var i = 0; i < length; i++) {
    this[i] = length === arguments.length ? arguments[i] : "";
  }

  this.length = length;
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
 * @param {Function} callback - The expression to evaluate.
 *
 * @returns {undefined}
 */
Horroy.prototype.forEach = function(callback) {
  if (!(callback instanceof Function))
    throw new TypeError("Argument is not a function");

  for (var i = 0; i < this.length; i++) callback(this[i]);
};

/**
 * Creates a new horroy with the results of the call to the indicated function applied to each of its elements.
 *
 * @param {Function} callback - The expression to evaluate.
 *
 * @returns {Horroy} - The new generated horroy
 */
Horroy.prototype.map = function(callback) {
  if (!(callback instanceof Function))
    throw new TypeError(callback + " is not a function");

  var res = new Horroy();

  for (var i = 0; i < this.length; i++) {
    res[i] = callback(this[i]);
  }

  res.length = this.length;

  return res;
};

/**
 * Creates a string of characters representing the horroy
 *
 * @returns {String} - The string of characters
 */
Horroy.prototype.toString = function() {
  var string = "";

  for (var i = 0; i < this.length; i++) {
    if (i === this.length - 1) string += this[i];
    else string += this[i] + ",";
  }
  return string;
};

/**
 *
 * Fills all the elements of an horroy from the start index to the end index, with the static value.
 *
 * @param {*} value - Value with which you will fill the horroy.
 * @param {number} [start] - Initial index, by default is 0.
 * @param {number} [end] - Final index, by default is horroy.length.
 *
 * @throws {TypeError} - If horroy is not a array
 */
Horroy.prototype.fill = function(value, start, end) {
  if (!(typeof start === "number")) {
    throw new TypeError(start + " is not a number");
  }
  if (!(typeof end === "number")) {
    throw new TypeError(end + " is not a number");
  }
  start = Math.floor(start) || 0;
  end = Math.floor(end) || this.length;

  start = start < 0 ? this.length + start : start;
  end = end < 0 ? this.length + end : end;

  for (var i = start; i < end; i++) this[i] = value;

  return this;
};

/**
 *
 * Create a new horroy with all the elements that meet the condition implemented by the given function
 *
 * @param {Function} callback - The expresion to evaluate
 *
 * @throws {TypeError} - when horroy is not an Horroy
 * @throws {TypeError} - when callback is not a function
 *
 * @return {boolean} - A new horroy with the elements that meet the condition. If no element meets the condition, an empty horroy will be returned.
 */
Horroy.prototype.filter = function(callback) {
  if (!(this instanceof Horroy)) {
    throw new TypeError(this + " is not an horroy");
  }

  if (!(typeof callback === "function")) {
    throw new TypeError(callback + " is not a function");
  }

  var newArr = [];
  var k = 0;
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i])) newArr[k++] = this[i];
  }

  return newArr;
};

/**
 * Create a new instance of Horroy from other iterable object
 *
 * @param {Function} value
 * @param {Array-Like} callback - The expression to evaluate.
 *
 * @returns {Horroy} - The string of characters
 */
Horroy.from = function(value, callback) {
  if (callback && !(callback instanceof Function))
    throw new TypeError(callback + " is not a function");

  var res = new Horroy();

  res.length = !value.length ? 0 : value.length;

  for (var i = 0; i < value.length; i++) {
    if (callback) res[i] = callback(value[i]);
    else res[i] = value[i];
  }

  return res;
};

/**
 * Determines if the argument is a Horroy
 *
 * @param {*} value - The object to evaluate
 *
 * @returns {Boolean} - If the argument is a Horroy
 */
Horroy.isHorroy = function(value) {
  return value instanceof Horroy;
};

/**
 * Create a new Horroy instance with a variable number of elements
 *
 * @returns {Boolean} - A new Horroy instance
 */
Horroy.of = function() {
  var res = new Horroy();

  for (var i = 0; i < arguments.length; i++) res[i] = arguments[i];
  res.length = arguments.length;

  return res;
};

/**
 * Concat two or more horroys
 *
 * @param {Horroy} arguments - Horroy and/or values to concat in the new horroy.
 *
 * @returns {Horroy} - A new Horroy instance
 */
Horroy.prototype.concat = function() {
  if (arguments.length === 1 && arguments[0].length === 0) return this;

  var res = new Horroy();

  for (var i = 0; i < this.length; i++) res[i] = this[i];

  res.length = this.length;

  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] instanceof Horroy)
      for (var j = 0; j < arguments[i].length; j++)
        res[res.length++] = arguments[i][j];
    else res[res.length++] = arguments[i];
  }

  return res;
};

/**
 * Transfer a flat copy from one section to another within the same horroy
 *
 * @param {number} target - Index that establishes where the copied sequence will be inserted.
 * @param {number} [start] - Index from which to start the copy of elements.
 * @param {number} [end] - Index to which the elements will be copi
 */
Horroy.prototype.copyWithin = function(target, start, end) {
  if (target < 0) target = this.length + target;

  if (start < 0) start = this.length + start;
  else if (start === undefined) start = 0;

  if (end < 0) end = this.length + end;
  else if (end === undefined) end = this.length;

  var elementsToCopy = [];

  for (var i = start; i < end; i++) {
    var value = this[i];
    elementsToCopy[elementsToCopy.length] = value;
  }

  for (var i = 0; i < this.length; i++) {
    if (i === target) {
      for (var j = 0; j < elementsToCopy.length; j++) {
        this[i++] = elementsToCopy[j];
      }
    }
  }
};

/**
 * Returns a new Horroy Iterator object that contains the key/value pairs for each index in the horroy.
 *
 * @returns {Horroy iterator} - A new Horroy Iterator object.
 */
Horroy.prototype.entries = function() {
  var iterator = {};

  for (var i = 0; i < this.length; i++) {
    var value = this[i];
    iterator[i] = value;
  }

  return iterator;
};

/**
 * Tests whether all elements in the horroy pass the test implemented by the provided function.
 *
 * @param {Function} callback - The expression to evaluate.
 *
 * @returns {Boolean} - True if whether all elements in the horroy pass the test.
 */
Horroy.prototype.every = function(callback) {
  if (!(callback instanceof Function))
    throw new TypeError(callback + " is not a function");

  for (var i = 0; i < this.length; i++) {
    var value = this[i];
    if (!callback(value)) return false;
  }

  return true;
};

/**
 *
 * Returns the value of the first element of the horroy that fulfills the test function provided
 *
 * @param {Function} callback - The expression to evaluate.
 *
 * @returns {*} - An item if found, otherwise undefined
 */
Horroy.prototype.find = function(callback) {
  if (!(this instanceof Horroy)) {
    throw new TypeError(this + " is not an horroy");
  }

  if (!(typeof callback === "function")) {
    throw new TypeError(callback + " is not a function");
  }

  for (var i = 0; i < this.length; i++) {
    var value = this[i];
    if (callback(value)) return value;
  }
};

/**
 *
 *  Returns the last index at which a given element can be found in the horroy, or -1 if it is not present
 *
 * @param {Function} callback - The expression to evaluate.
 *
 * @returns {*} - An item if found, otherwise undefined
 */
Horroy.prototype.findIndex = function(callback) {
  if (!(this instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }

  if (!(typeof callback === "function")) {
    throw new TypeError(callback + " is not a function");
  }

  for (var i = 0; i < this.length; i++) {
    var value = this[i];
    if (callback(value)) return i;
  }
};

/**
 * Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 *
 * @param {Number} [depth] - The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
 *
 * @returns {Horroy} - A new horry with the sub-array elements concatenated into it.
 */
Horroy.prototype.flat = function(depth) {
  depth = depth === undefined ? 1 : depth;

  var result = new Horroy();

  var recursive = function(arr, currentDepth) {
    var currentDepth = currentDepth || 0;

    if (arr instanceof Horroy && currentDepth <= depth) {
      currentDepth++;

      for (var i = 0; i < arr.length; i++) {
        recursive(arr[i], currentDepth);
      }
    } else {
      result[result.length++] = arr;
    }
  };

  recursive(this);

  return result;
};

/**
 * Abstraction of pop.
 *
 * Removes the last element of an array and returns it
 *
 * @returns {Number} - The removed element from the horroy; undefined if the horroy is empty.
 */
Horroy.prototype.pop = function(arr) {
  if (!(this instanceof Horroy)) {
    throw new TypeError(this + " is not an array");
  }
  var lastItem = this[this.length - 1];
  this.length = this.length - 1;
  return lastItem;
};

/**
 * Determines whether an horroy includes a certain value among its entries
 *
 * @param {*} searchElement - The value to search for.
 * @param {Number} fromIndex - The position in this horroy at which to begin searching
 *
 * @returns {Boolean} - true or false as appropriate
 *
 *
 */
Horroy.prototype.includes = function(searchElement, fromIndex) {
  if (fromIndex !== undefined && !(typeof fromIndex === "number")) {
    throw new TypeError(fromIndex + " is not a number");
  }

  fromIndex = fromIndex || 0;

  for (var i = fromIndex; i < this.length; i++) {
    if (searchElement === this[i]) return true;
  }

  return false;
};

/**
 * Returns a new Horroy Iterator object that contains the keys for each index in the array.
 *
 * @returns {Horroy} - A new Horroy iterator object.
 */
Horroy.prototype.keys = function() {
  var newHorroy = new Horroy();

  newHorroy.length = this.length;

  for (var i = 0; i < this.length; i++) newHorroy[i] = i;

  return newHorroy;
};

/**
 * Maps each element using a mapping function, then flattens the result into a new array
 *
 * @param {Function} callback - Function that produces an element of the new Horry
 *
 * @returns {Horroy} - A new array with each element being the result of the callback function and flattened to a depth of 1.
 */
Horroy.prototype.flatMap = function(callback) {
  return this.map(callback).flat();
};

/**
 *
 * Returns the first index in which a given element can be found in the horroy
 *
 * @param {*} searchElement - Element to find in the horroy.
 * @param {Number} [fromIndex] - The index by which the search is started.
 *
 * @throws {TypeError} - arr is not an Horroy
 * @throws {Error} - The second argument is necessary
 *
 *@return {number} - The index of the finded value or -1 if the value is not found
 */
Horroy.prototype.indexOf = function(searchElement, fromIndex) {
  if (arguments.length <= 0) return -1;

  if (!(this instanceof Horroy)) {
    throw new TypeError(this + " is not an horroy");
  }

  if (!searchElement) {
    throw new Error("The second argument is necessary");
  }

  if (fromIndex >= this.length) return -1;
  if (this == null) return -1;

  fromIndex = fromIndex || 0;

  var i = fromIndex < 0 ? this.length + fromIndex : fromIndex;

  if (i >= this.length) {
    return -1;
  }

  while (i < this.length) {
    if (this[i] === searchElement) {
      return i;
    }
    i++;
  }

  return -1;
};

/**
 *
 * Joins all the elements of a array
 *
 * @param {String} [separator] - String used to separate each of the horroy elements
 */
Horroy.prototype.join = function(separator) {
  if (!(this instanceof Horroy)) {
    throw new TypeError(this + " is not an horroy");
  }
  if (this.length <= 0) {
    return "";
  }
  var stringJoined = "";
  separator = separator || "";
  for (var i = 0; i < this.length - 1; i++) {
    stringJoined += this[i] + separator;
  }
  return stringJoined + this[this.length - 1];
};

/**
 * Returns the last index at which a given element can be found in the array, or -1 if it is not present.
 *
 * @param {Number} searchElement - Element to locate in the array.
 * @param {Number} [fromIndex] - The index at which to start searching backwards.
 *
 * @returns {Number} - The last index of the element in the array; -1 if not found.
 */
Horroy.prototype.lastIndexOf = function(searchElement, fromIndex) {
  if (fromIndex !== undefined && !(typeof fromIndex === "number")) {
    throw new TypeError(fromIndex + " is not a number");
  }

  if (fromIndex < 0) {
    fromIndex = this.length + fromIndex;
  } else if (typeof fromIndex === "undefined") {
    fromIndex = this.length - 1;
  }

  for (var i = fromIndex; i >= 0; i--) {
    if (this[i] === searchElement) return i;
  }

  return -1;
};

/**
 * Reverses an array
 *
 * @returns {Array} - Array reverse
 */
Horroy.prototype.reverse = function(arr) {
  if (!(this instanceof Horroy)) {
    throw new TypeError(this + " is not an array");
  }

  var start = 0;
  var end = this.length - 1;

  while (start < end) {
    var temp = this[start];
    this[start] = this[end];
    this[end] = temp;
    start++;
    end--;
  }

  return arr;
};

/**
 *
 * Removes the first element of the horroy.
 *
 *
 * @throws {TypeError} - when arr is not an Horroy
 *
 * @return {boolean} - returns the element
 */
Horroy.prototype.shift = function(arr) {
  if (!(this instanceof Horroy)) {
    throw new TypeError(this + " is not an horroy");
  }

  var newArr = [];
  var result = this[0];

  var k = 0;
  for (var i = 1; i < this.length; i++) {
    newArr[k++] = this[i];
  }
  this.length = newArr.length;

  for (var i = 0; i < newArr.length; i++) {
    var element = newArr[i];
    this[i] = element;
  }

  this.length = newArr.length;

  return result;
};

Horroy.prototype.slice = function(start, end) {
  if (!(this instanceof Horroy)) {
    throw new TypeError(this + " is not an horroy");
  }

  if (start >= this.length) return new Horroy();

  if (!start) {
    start = 0;
  } else if (start < 0) {
    start = this.length + start;
  }

  if (!end || end > this.length) {
    end = this.length;
  } else if (end < 0) {
    end = this.length + end;
  }

  var newArr = [];
  var j = 0;

  for (var i = start; i < end; i++) {
    newArr[j] = this[i];
    j++;
  }

  return newArr;
};

/**
 * Executes a reducer function (that you provide) on each member of the array resulting in a single output value.
 *
 * @param {Function} callback- Function to execute on each element in the horroy.
 * @param {*} valorInicial - Value to use as the first argument to the first call of the callback
 *
 * @returns {*} - The value that results from the reduction.
 */
Horroy.prototype.reduce = function(callback, valorInicial) {
  if (!(this instanceof Array)) {
    throw new TypeError(this + " is not an array");
  }

  if (!(callback instanceof Function)) {
    throw new TypeError(this + " is not a function");
  }

  if (this.length <= 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  var valorAnterior = 0;
  var indice = 1;
  var valorActual = this[indice];
  var vector = this;

  if (valorInicial) {
    valorAnterior = valorInicial;
    indice = 0;
    valorActual = this[indice];
  }

  for (var i = indice; i < this.length; i++) {
    valorActual = this[i];
    valorAnterior = callback(valorAnterior, valorActual, i, vector);
  }

  return valorAnterior;
};

/**
 * applies a function against an accumulator and each value of the horroy (from right-to-left) to reduce it to a single value.
 *
 * @param {Function} callback - Function to execute on each value in the horroy
 * @param {*} valorInicial - Object to use as the first argument to the first call of the callback
 *
 * @returns {*} - The value that results from the reduction.
 */
Horroy.prototype.reduceRight = function(callback, valorInicial) {
  if (!(this instanceof Horroy)) {
    throw new TypeError(this + " is not an array");
  }

  if (!(callback instanceof Function)) {
    throw new TypeError(this + " is not a function");
  }

  if (this.length <= 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  var valorAnterior = this[this.length - 1];
  var indice = this.length - 2;
  var vector = this;

  if (valorInicial) {
    valorAnterior = valorInicial;
    indice = this.length - 1;
  } else {
    valorInicial = this[this.length - 1];
  }

  for (var i = indice; i >= 0; i--) {
    valorActual = this[i];
    valorAnterior = callback(valorAnterior, valorActual, i, vector);
  }

  return valorAnterior;
};

/**
 *
 * Check if at least one element of the horroy complies with the condition implemented by the provided function.
 *
 * @param {Function} callback - The expresion to evaluate
 *
 * @throws {TypeError} - when array is not an Horroy
 * @throws {TypeError} - when callback is not a function
 *
 * @return {boolean} - true if the callback function returns a truthy value for any element in the horroy; otherwise, false.
 */
Horroy.prototype.some = function(callback) {
  if (!(this instanceof Horroy)) {
    throw new TypeError(this + " is not an horroy");
  }

  if (!(typeof callback === "function")) {
    throw new TypeError(callback + " is not a function");
  }

  for (var i = 0; i < this.length; i++) {
    var value = this[i];
    if (callback(value)) return true;
  }
  return false;
};

/**
 * Sorts the elements of an horroy in place and returns the array.
 *
 * @param {Function} [compareFunction] - Specifies a function that defines the sort order.
 *
 * @returns {Horroy} - The sorted horroy.
 */
Horroy.prototype.sort = function(compareFunction) {
  compareFunction = !!compareFunction
    ? compareFunction
    : function(a, b) {
        return a - b;
      };

  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j < this.length; j++) {
      if (
        compareFunction(
          this[j].toString().charCodeAt(),
          this[i].toString().charCodeAt()
        ) > 0
      ) {
        var tmp = this[i];
        this[i] = this[j];
        this[j] = tmp;
      }
    }
  }
};

/**
 * Returns a string representing the source code of the array
 *
 * @returns {String} - A string representing the source code of the horroy.
 */
Horroy.prototype.toSource = function() {
  var string = "[";

  for (var i = 0; i < this.length; i++) {
    if (i === this.length - 1) string += "'" + this[this.length - 1] + "']";
    else string += "'" + this[i] + "', ";
  }

  return string;
};

/**
 *
 * Changes the contents of an horroy by removing or replacing existing
 * elements and/or adding new elements.
 *
 * @param {number} start -number to start to splice
 * @param {number} delated - number of elements to delate
 * @param {*} items - items that I want to add. The number of items can be infinit.
 *
 * @throws {TypeError} - when horroy is not an Horroy
 * @throws {TypeError} - when del or start are not numbers
 *
 * @return {Array} - cut horroy
 */

Horroy.prototype.splice = function(start, deleteCount) {
  if (!(this instanceof Horroy)) throw TypeError(this + " should be an Horroy");
  if (typeof start !== "number") throw TypeError(start + " is not a number");

  deleteCount =
    deleteCount === undefined || deleteCount > this.length - start
      ? this.length - start
      : deleteCount;

  start = start > this.length ? this.length : start;
  start = start < 0 ? this.length + start : start;

  var itemsToAdd = [];
  var itemsDeleted = [];
  var itemsEnd = [];
  var itemsIni = [];
  var finalArr = [];

  if (arguments.length > 2) {
    for (var i = 0; i < arguments.length - 2; i++) {
      itemsToAdd[i] = arguments[i + 2];
    }
  }

  var indexIni = 0;
  var indexDeleted = 0;
  var indexEnd = 0;

  for (var i = 0; i < this.length; i++) {
    if (i < start) {
      itemsIni[indexIni++] = this[i];
    } else if (i >= start && i < deleteCount + start) {
      itemsDeleted[indexDeleted++] = this[i];
    } else {
      itemsEnd[indexEnd++] = this[i];
    }
  }

  var index = 0;

  this.length = itemsIni.length + itemsEnd.length + itemsToAdd.length;

  for (var j = 0; j < itemsToAdd.length; j++) {
    this[j + start] = itemsToAdd[j];
  }
  for (var j = 0; j < itemsEnd.length; j++) {
    this[j + start + itemsToAdd.length] = itemsEnd[j];
  }

  return itemsDeleted;
};

/**
 *
 * Add one or more elements to the beginning of the horroy.
 *
 *
 * @throws {TypeError} - when arr is not an Horroy
 *
 * @return {boolean} - returns the new length of the horroy.
 */
Horroy.prototype.unshift = function() {
  if (!(this instanceof Horroy)) {
    throw new TypeError(this + " is not an horroy");
  }

  var newArr = new Horroy(0);

  for (var i = 0; i < arguments.length; i++) {
    newArr[newArr.length++] = arguments[i];
  }

  for (var i = 0; i < this.length; i++) {
    newArr[newArr.length++] = this[i];
  }

  for (var i = 0; i < newArr.length; i++) {
    var element = newArr[i];
    this[i] = element;
  }
  this.length = newArr.length;

  return this.length;
};
