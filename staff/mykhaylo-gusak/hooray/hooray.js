'use strict';

/**
 * The JavaScript Hooray object is a global object that is used in the construction of Hoorays; which are high-level, list-like objects.
 */
function Hooray() {
    var first = arguments[0];

    if (arguments.length === 1 && typeof first === 'number')
        if (parseInt(first) !== first) throw RangeError('Invalid hooray');
        else return this.length = first;

    for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
    this.length = arguments.length;
}

/**
* Adds a value at the end of an hooray, incrementing its length by 1.
* 
* @param {*} value The value to push in the hooray.
* 
* @returns {number} The length of the hooray after adding the new value.
*/
Hooray.prototype.push = function (value) {
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
Hooray.prototype.forEach = function (callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var self = this;

    this.length && (function forEach(index) {
        callback(self[index], index);

        if (++index < self.length)
            forEach(index);
    })(0);
}

/**
 * Method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
 * 
 * @param {Array[n]} Arrays and/or values to concatenate into a new array. If valueN is undefined, concat returns a shallow copy of the existing array on which it is called. See the description below for more details.
 * 
 * @returns {Array} A new Array instance. 
 */

Hooray.prototype.concat = function (hooray) {

    if (!(this instanceof Hooray)) throw TypeError(this + ' is not an Hooray.');
    if (!(hooray instanceof Hooray)) throw TypeError(hooray + ' is not an Hooray.');
  
    var newHooray = new Hooray;
    var n = 0;
    var self = this;
    
    for (var i = 0; i < hooray.length; i++) {
        newHooray[n++] = self[i];
        newHooray.length++;
    }
    for (var j = 0; j < hooray.length; j++) {
        newHooray[n++] = hooray[j];
        newHooray.length++;
    }
    
    return newHooray;
  }

  
/**
 * Iterates an array and evaluates an expression on each of its values, returning true if all of them match it. Otherwise returns false.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evalute.
 * 
 * @returns {boolean} True if all values match the expression, otherwise false.
 */

Hooray.prototype.every = function (callback) {

    if (!(this instanceof Hooray)) throw TypeError(this + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
    var self = this;

    for (var i = 0; i < self.length; i++)
        if (!callback(self[i])) return false;

    return true;
}
/**
 * 
 * Method creates a new array with all elements that pass the test implemented by the provided function.
 * 
 * @param {array} Array and/or values to concatenate into a new array. If valueN is undefined, concat returns a shallow copy of the existing array on which it is called. See the description below for more details.
 * 
 * @param {callback} function is a predicate, to test each element of the array. Return true to keep the element, false otherwise. It accepts three arguments:
 * 
 * @returns {Array} A new array with the elements that pass the test. If no elements pass the test, an empty array will be returned.
 */
Hooray.prototype.filter = function (callback) {

    if (!(this instanceof Hooray)) throw TypeError(this + ' is not an Hooray.');
    if (!(typeof callback === 'function')) throw TypeError(callback + ' is not a function.');
    var self = this;
    var n = 0;
    var newHooray = new Hooray();
  
    for (var i = 0; i < self.length; i++) {  
      if (callback(self[i], i) === true) {  
        newHooray[n++] = self[i]; 
        newHooray.length++; 
      }  
    }
    return newHooray;  
  }

  /**
 * method returns the first index at which a given element can be found in the array, or -1 if it is not present.
 * 
 * @param {*} array An array.
 * @param {*} searchElement Element to locate in the array.
 * 
 * @returns The first index of the element in the array; -1 if not found.
 * 
 */

Hooray.prototype.indexOf = function (searchElement) {
    
    if (!(this instanceof Hooray)) throw TypeError(this + ' is not an Hooray.');
    if (!(typeof searchElement === 'number')) throw TypeError(searchElement + ' is not a number.'); 
    var self = this;   
    for (var i = 0; i < self.length; i++){
        if(self[i] === searchElement){
           return i;
        } 
    }
    return -1;
}


/**
 * Method determines whether the passed value is an Array.
 * 
 * @param {Value} The value to be checked.
 * 
 * @returns {boolean} true if the value is an Array; otherwise, false.
 */

Hooray.prototype.isArray = function (hooray) {

    if (!(hooray instanceof Hooray)) throw TypeError(hooray + ' is not an Hooray.');

    if (hooray instanceof Hooray) {
        return true;
    } else {
        return false;
    }
   
}

/**
 * method creates and returns a new string by concatenating all of the elements in an hooray (or an hooray-like object), separated by commas or a specified separator string. If the hooray has only one item, then that item will be returned without using the separator.
 * @param {hooray} An existing hooray.
 * @param {separator}Specifies a string to separate each pair of adjacent elements of the hooray. The separator is converted to a string if necessary. If omitted, the hooray elements are separated with a comma (","). If separator is an empty string, all elements are joined without any characters in between them.
 *
 *  @returns {hooray} A string with all hooray elements joined. If arr.length is 0, the empty string is returned.
 */

Hooray.prototype.join = function (separator) {

    if (!(this instanceof Hooray)) throw TypeError(this + ' is not an Hooray.');
    if (separator instanceof Hooray) throw new TypeError('Can not be a Hooray.');
  
    var newString = '';
    var self = this;

    if(typeof separator === 'undefined') {
        separator =',';
    }
  
    for (var i = 0; i < self.length; i++) {  
      if (i < self.length - 1) {
        newString = newString + self[i] + separator;
      } else {
        newString = newString + self[i];      }
  
    }  
    return newString  
  }


  /**
 * Method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
 * 
 * @param {*} array 
 * @param {*} searchElement 
 * @returns the index of the element that you are looking for
 * 
 */
Hooray.prototype.lastIndexOf = function (searchElement) {
    
    if (!(this instanceof Hooray)) throw TypeError(this + ' is not an Hooray.');
    if (searchElement instanceof Hooray) throw TypeError('It can not be a Hooray.'); 
    var self = this;   
    for (var i = self.length+1; i > 0; i--){
        if(self[i] === searchElement){
           return i;
        } 
    }
    return -1;
}

/**
 * The map() method creates a new array with the results of calling a provided function on every element in the calling array.
 * @param {Array} array 
 * @param {function} callback
 * @returns {Array} newNumbers 
 */

Hooray.prototype.map = function (callback){

    // if (!(this instanceof Horray)) throw TypeError(this + ' is not an Horray');
    if (typeof callback !== 'function') throw new TypeError('It is not a function');
    // if (typeof this === 'undefined') throw new TypeError(this + ' is undefined');
  
    var newHooray = new Hooray ();
    var self = this;
    var selfLength = this.length;
    for (var i = 0; i < self.length; i++){
        newHooray[i] = callback(self[i]);
        newHooray.length += 1;

    }
    // var newhooray = new Hooray (newNumbers);
    // newhooray.length = i;
    return newHooray;
   }

/**
 * removes the last element from an array and returns that element
 * 
 * @param {Hooray} Hooray The Hooray to pop the value from.
 * 
 * @returns {*} The value retrievied from the Hooray.
 */
Hooray.prototype.pop = function () {
    // if (!(self instanceof Hooray)) throw TypeError(self + ' is not an Hooray');
    var self = this;
    if (self.length) {
        return self[self.length - 1];
    }
}

/**
 *  method executes a reducer function (that you provide) on each member of the array resulting in a single output value.
 * 
 * @param {Array} Arrays and/or values to concatenate into a new array. If valueN is undefined, concat returns a shallow copy of the existing array on which it is called. See the description below for more details.
 * @param {callback} function (variable to save, array to iterates) Function to execute on each element in the array, taking four arguments
 *  
 * @returns {Array} A new Array instance. 
 */

Hooray.prototype.reduce = function (callback) {

    if (!(this instanceof Hooray)) throw TypeError(this + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    // if (typeof array === 'undefined') throw new TypeError(array + ' is undefined');
  
    var hooray = 0;
    var self = this;  
    for (var i = 0; i < self.length; i++) {  
        hooray = callback(hooray, self[i]);  
    }
   return hooray;
  }

/**
 *  method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.
 * 
 * @param {Hooray} Hoorays and/or values to concatenate into a new array. If valueN is undefined, concat returns a shallow copy of the existing array on which it is called. See the description below for more details.
 * @param {callback} function (variable to save, array to iterates) Function to execute on each element in the array, taking four arguments
 *  
 * @returns {Hooray} A new Hooray instance. 
 */
  
  Hooray.prototype.reduceRight = function (callback) {

    if (!(this instanceof Hooray)) throw TypeError(this + ' is not an Hooray');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    // if (typeof array === 'undefined') throw new TypeError(array + ' is undefined');
  
    var hooray = 0;
    var self = this;  
    for (var i = self.length -1; i >= 0  ;i--){ 
        hooray = callback(hooray, self[i]);  
    }
   return hooray;
  }
  /**
 *  method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
 * 
 * @param {Array} Arrays and/or values to concatenate into a new array. If valueN is undefined, concat returns a shallow copy of the existing array on which it is called. See the description below for more details.
 *  
 * @returns {Array} The reversed array.
 */

Hooray.prototype.reverse = function () {

    if (!(this instanceof Hooray)) throw TypeError(horray + ' is not an array');
      
    var newHooray = new Hooray;
    var self = this;
    var n = 0;
  
    for (var i = self.length - 1; i >= 0; i--) {  
        newHooray[n] = self[i];
        n++;
        newHooray.length++;
    }  
    return newHooray  
  }

  /**
 * Method removes the first element from an array and returns that removed element. This method changes the length of the array.
 * 
 * @param {Array} array 
 * 
 * @returns {*} 
 */

Hooray.prototype.shift = function () {
    // if (!(this instanceof Hooray)) throw TypeError(this + ' is not an array');
    var temp = this[0];
    var self = this;
    var newHooray = new Hooray();
     
    for (var i = 1; i <= self.length - 1; i++) {  
        newHooray[i - 1] = self[i]; 
        newHooray.length++; 
    }
    self = newHooray;
    return temp;
  }
  
  /**
 * The slice() method extracts a section of a string and returns it as a new string, without modifying the original string.
 * @param {Array} array 
 * @param {Number} valorinicial 
 * @param {Number} valorfinal 
 */
Hooray.prototype.slice = function (valorinicial, valorfinal){
    if (!(this instanceof Hooray)) throw ReferenceError(this + ' is not an array');
    if (typeof valorinicial !== 'number') throw new TypeError(valorinicial + ' is not a number');
    if (typeof valorfinal !== 'number') throw new TypeError(valorfinal + ' is not a number');
    
    var newHooray = new Hooray;
    var n = 0;
    var self = this;
     for ( var i = valorinicial; i <= valorfinal-1; i++){ 
        newHooray[n] = self[i];  
        n++;
        newHooray.length++;
     }
     return newHooray;
    }
 /**
 *  method tests whether at least one element in the array passes the test implemented by the provided function.
 * @param {function} callback 
 * @param {Array} array 
 * @returns {boolean} 
 */

Hooray.prototype.some =  function (callback){
    
    if (!(this instanceof Hooray)) throw TypeError(this + ' is not an hooray');
    if (typeof callback !== 'function') throw TypeError('It is not a function');
    var self = this;
      for (var i = 0; i < self.length; i++){
        if (callback(self[i], i) === true){
            return true;
        }  
     }  
    return false;
  }
  /**
   * method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
   * 
   * @param {*} array An array to iterates.
   * @param {*} inicio Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1, meaning -n is the index of the nth last element and is therefore equivalent to the index of array.length - n) and will be set to 0 if absolute value is greater than the length of the array.
   * @param {*} eliminar An integer indicating the number of old array elements to remove.
   * @param {*} agregar1 The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   * @param {*} agregar2 The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   * 
   * @return An array containing the deleted elements. If only one element is removed, an array of one element is returned. If no elements are removed, an empty array is returned.
   */
  
  Hooray.prototype.splice = function (inicio, eliminar, agregar1, agregar2) {
  
      if (!(this instanceof Hooray)) throw TypeError(this + ' is not an array');
      if (!(typeof inicio === 'number')) throw TypeError(inicio + ' is not a number');
    
      var newHooray = new Hooray;
      var n = 0;
      var elim = eliminar;
      var self = this;
  
      for (var i = 0; i < self.length; i++) {
  
          if (i < inicio) {
  
              newHooray[n++] = self[i];
              newHooray.length++;
  
          } else if (elim >= 0) {
  
              if (elim === 0) {
  
                  newHooray[n++] = self[i];
                  newHooray.length++;
  
  
                  if (agregar1 != 0) {
  
                      newHooray[n++] = agregar1;
                      agregar1 = 0;
                      newHooray.length++;
  
                      if (agregar2 != 0) {
                          newHooray[n++] = agregar2;
                          agregar2 = 0;
                          newHooray.length++;
                      }
                  }
  
              } else if (elim-- === 1) {
  
                  if (agregar1 != 0) {
                      newHooray[n++] = agregar1;
                      agregar1 = 0;
                      newHooray.length++;
                      if (agregar2 != 0) {
                          newHooray[n++] = agregar2;
                          agregar2 = 0;
                          newHooray.length++;
                      }
                  }
              }
  
          } else if (self.length > inicio + eliminar) {
  
              newHooray[n++] = self[i];
              newHooray.length++;
  
          }
      }
      return newHooray;
  }
  
/**
 * method sorts the elements of an array in place and returns the array. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.
 * 
 * 
 * @return The sorted array. Note that the array is sorted in place, and no copy is made.
 */

Hooray.prototype.sort = function (compareFunction) {

    var newHooray = new Hooray();
    // var self = this;

    for (let i = 0; i < this.length; i++) {
        newHooray[i] = this[i];
        newHooray.length++;
    }

    var self = this;

    if (typeof compareFunction === 'function') throw TypeError(compareFunction + ' is not a function.');

    for (var i = 0; i < newHooray.length; i++) {
        for (var j = 0; j < newHooray.length; j++) {

            var prev = newHooray[j];
            var next = newHooray[j + 1];

            if (j < newHooray.length - 1) {
                if (prev > next) {
                    newHooray[j] = next;
                    newHooray[j + 1] = prev;
                }
            }
        }
    }
    return newHooray
}
 


