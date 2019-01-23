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

  if(fromIndex < 0) {
    fromIndex = this.length + fromIndex;
  } else if(typeof fromIndex === 'undefined') {
    fromIndex = this.length - 1;
  }

  for (var i = fromIndex; i >= 0; i--){
    if(this[i] === searchElement) return i;
  }

  return -1;

};


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

  var valorAnterior = 0;
  var indice = this.length - 1;
  var vector = this;

  if (valorInicial) {
    valorAnterior = valorInicial;
    indice = this.length - 1;
  } else {
    valorInicial = this[this.length - 1];
  }
  

  console.log('@', indice, valorActual);

  for (var i = indice; i >= 0; i--) {
    valorActual = this[i];
    valorAnterior = callback(valorAnterior, valorActual, i, vector);
  }

  return valorAnterior;
};