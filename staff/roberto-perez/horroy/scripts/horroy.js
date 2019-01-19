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
 * Creates a new array with the results of the call to the indicated function applied to each of its elements.
 *
 * @param {Function} callback - The expression to evaluate.
 *
 * @returns {Array} - The new generated array
 */
Horroy.prototype.map = function(callback) {
  if (!(callback instanceof Function))
    throw new TypeError(callback + " is not a function");

  var arrayMaped = new Horroy();

  for (var i = 0; i < this.length; i++) {
    arrayMaped[i] = callback(this[i]);
  }

  arrayMaped.length = this.length;

  return arrayMaped;
};

/**
 * Creates a string of characters representing the array
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

// Horroy.prototype.fill = function(value, start, end) {
//     start = start || 0;
//     end = end || this.length;
// };

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

  var array = new Horroy();

  array.length = !value.length ? 0 : value.length;

  for (var i = 0; i < value.length; i++) {
    if (callback) array[i] = callback(value[i]);
    else array[i] = value[i];
  }

  return array;
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
  var newHorroy = new Horroy();

  for (var i = 0; i < arguments.length; i++) newHorroy[i] = arguments[i];
  newHorroy.length = arguments.length;

  return newHorroy;
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

  var newHorroy = new Horroy();

  for (var i = 0; i < this.length; i++) newHorroy[i] = this[i];

  newHorroy.length = this.length;

  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] instanceof Horroy)
      for (var j = 0; j < arguments[i].length; j++)
        newHorroy[newHorroy.length++] = arguments[i][j];
    else newHorroy[newHorroy.length++] = arguments[i];
  }

  return newHorroy;
};

/**
 * Transfer a flat copy from one section to another within the same array
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
 * Returns a new Array Iterator object that contains the key/value pairs for each index in the array.
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
 * Tests whether all elements in the array pass the test implemented by the provided function.
 *
 * @param {Function} callback - The expression to evaluate.
 *
 * @returns {Boolean} - True if whether all elements in the array pass the test.
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
 *  Returns the last index at which a given element can be found in the array, or -1 if it is not present
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


Horroy.prototype.flat = function() {

};
