"use strict";

/**
 *
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
 * Iterates the current hooray and evaluates an expression on each of its values.
 *
 * @param {Function} callback The expression to evaluate.
 */
Hooray.prototype.forEach = function(callback) {
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");

  var self = this;

  this.length &&
    (function forEach(index) {
      callback(self[index], index);

      if (++index < self.length) forEach(index);
    })(0);
};
/**
 * This method cconcetenats two hoorays
 * @param {Hooray} hooray First hooray, used as a base
 * @param {Hooray} hooray2 Second hooray which will be added in the end of the first one
 */
Hooray.prototype.concat = function(hooray) {
  if (!(hooray instanceof Hooray))
    throw TypeError(hooray + " is not an hooray");

  var newhorray = new Hooray();

  for (var j = 0; j < this.length; j++) {
    newhorray.push(this[j]);
  }
  var keys = Object.keys(arguments[0]);
  var len = keys.length;
  for (var i = 0; i < len - 1; i++) {
    newhorray.push(arguments[0][i]);
  }
  return newhorray;
}
/**
 * Iterates an hooray and evaluates an expression on each of its values, returning true if all of them match it. Otherwise returns false.
 *
 * @param {hooray} hooray The hooray to iterate.
 * @param {Function} callback The expression to evalute.
 *
 * @returns {boolean} True if all values match the expression, otherwise false.
 */
Hooray.prototype.every = function(callback) {
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");
  for (var i = 0; i < arguments.length; i++)
    if (!callback(this[i])) return false;

  return true;
}
/**
 * Iterates an hooray and get a new hooray form the original hooray
 * @param {Hooray} hooray
 * @param {Function} callback The expression to evaluate.
 *
 *@return a new hooray with only the elements which meet the condition
 */
Hooray.prototype.filter = function(callback) {
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");
  var hooray = new Hooray();
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      hooray.push(this[i]);
    }
  }
  return hooray;
}

/** Given an hooray and a value, the function returns the index where is the value inside the hooray
 * If the value is not on the array the function returns -1
 *
 * @param {Array} array
 * @param {Element} searchElement
 */

Hooray.prototype.indexOf = function(searchElement) {
  if (searchElement === undefined) {
    return -1;
  }
  for (var i = 0; i < this.length; i++) {
    if (this[i] === searchElement) {
      return i;
    }
  }
  return -1;
}

/**
 * This method verify if the param is an hooray
 * @param {Hooray} obj The hooray to check
 * @returns {boolean} True if the param is an array, otherwise false.
 */

Hooray.prototype.isArray = function() {
  return this instanceof Hooray;
}

Hooray.isHooray = function(obj) {
  return obj.constructor === Hooray;
}
/**
 * Join all the elements of the hooray
 * @param {Hooray} hooray
 * @param {*} separator
 */
Hooray.prototype.join = function(separator) {
  var value = "";
  if (this.length !== 0) {
    var i = 0;
    do {
      if (separator === undefined) {
        value += this[i] + ",";
      } else {
        value += this[i] + separator;
      }
      i++;
    } while (i < this.length - 1);
    value += this[i];
  }
  return value;
}
/**
 * Ceate a new hooray with the results of the function called
 * @param {Hooray} horray to evaluate
 * @param {Function} callback
 *
 * @returns {Horray} the new hooray
 */
Hooray.prototype.map = function(callback) {
  if (typeof callback !== "function")
    throw TypeError(callback + " is not a function");
  var newarray = new Hooray();
  for (var i = 0; i < this.length; i++) {
    newarray.push(callback(this[i], i, this));
  }

  return newarray;
}
/**
 * Retunr the first element of the hooray and move the rest of the elements on the hooray to the correct position
 * @param {Hooray} array
 *
 * @returns {Element} first element of the array
 */
Hooray.prototype.shift = function() {

  var firstItem = this[0];

  for (var i=1; i < this.length; i++) {
      this[i-1] = this[i];
  }
  delete this[this.length - 1]
  this.length = this.length - 1;

  return firstItem;
  
}
/**
 * Iterates an array and check if at least one element of the array meets the condition implemented by the function
 * @param {Hooray} hooray  to check
 * @param {Function} callback The expression to evaluate.
 */

Hooray.prototype.some = function(callback) {
  if (typeof callback !== "function")
    throw TypeError(callback + " is not a function");
  var flag = false;
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      flag = true;
    }
  }
  return flag;
}

/**
 * Returns the last index at which a given element can be found in the hooray, or -1 if it is not present.
 * The array is searched backwards, starting at fromIndex.
 *
 * @param {horray} horrat       The hooray to iterate.
 * @param {*} searchElement     The element to search in the array
 * @param {[number]} fromIndex  The index at which to start searching backwards.
 *
 * @returns {number} - The last index of the element in the array; -1 if not found.
 *
 */

Hooray.prototype.lastIndexOf = function(searchElement, fromIndex) {
  var indexStart = 0;
  if (fromIndex === undefined || fromIndex >= this.length) {
    indexStart = this.length - 1;
  } else {
    if (fromIndex < 0) {
      indexStart = this.length + fromIndex;
    } else {
      indexStart = fromIndex;
    }
  }
  for (var i = indexStart; i >= 0; i--) {
    if (this[i] === searchElement) {
      return i;
    }
  }

  return -1;
};
/**
 * The reduce method applies a function to accumulate every value of the hooray
 * @param {Hooray} horrat The array with values to accumulate
 * @param {Function} callback The function which makes the accumulation
 * @returns {Element} Retunrs the accumulated value
 */

Hooray.prototype.reduce = function(callback) {
  if (typeof callback !== "function") throw TypeError(callback + " is not a function");
  var accumulated = this[0];
  for (var i = 1; i < this.length; i++) {
    accumulated = callback(accumulated, this[i]);
  }
  return accumulated;
};
/**
 * The reduce method applies a function to accumulate every value of the array, going through the horray from the end 
 * @param {Horray} horray The array with values to accumulate
 * @param {Function} callback The function which makes the accumulation 
 * @returns {Element} Retunrs the accumulated value
 */
Hooray.prototype.reduceRight= function(callback){
    if(typeof callback !== 'function') throw TypeError (callback+' is not a function');

    var accumulated=this[this.length-1] 
    for (var i = this.length-2; i >-1; i--){
        accumulated=(callback(accumulated, this[i]))
    }
    return accumulated;
}

/**
 * Revert the order of the elements of an array
 * @param {Hooray} horray Array to revert
 * 
 * @returns the horray with all elements reverted
 */
Hooray.prototype.reverse= function(){
    var hooray2=new Hooray;
    for (var j=0; j<this.length;j++){
      hooray2.push(this[j]);
    }
    var count=0;
    for (var i = hooray2.length-1 ; i >= 0; i--){
      this[count]=hooray2[i];  
      count++;
    }
    
    return this
  }
/**
 * Returns a copy of a part of the horray within a new horray 
 * @param {Hooray} horray horray to copy 
 * @param {Number} index initial position since start the copy
 * @param {Number} end end position to copy
 * 
 * @returns {Hooray} the new hooray form the origin one
 */

Hooray.prototype.slice = function(index, end){
  var newHorray=new Hooray;
    if(index>this.length-1) return newHorray 
    if (index===undefined){
        index=0;
    }
    if (end===undefined){
        end=this.length;
    }
    for(var i=0;i<end;i++){
            if(i===index){
                for(var j=i;j<end;j++){
                  newHorray.push(this[j]);
                }
                return newHorray;
            }
        }
}

/**
 *  Changes the contents of an hoorar by removing or replacing existing elements and/or adding new elements 
 * 
 * @param {Hooray} hooray    Array to iterate
 * @param {number} start   Index to start of cutting
 * @param {number} deleteCount number of elements to delete
 * @param {any} item1, item2,... All items to add instead of chopped elements 
 * 
 * @returns {Hooray} Modified array
 */
Hooray.prototype.splice= function(start, deleteCount){
  if(start === undefined)throw Error ('You have to send at least start index')
  var result = new Hooray;
  for (var i = 0; i < Math.min(start, this.length); i++) {
    result.push(this[i]);
  }
  for (var i = 2; i < arguments.length; i++) {
    result.push(arguments[i]);
  }
  if(deleteCount===undefined) deleteCount=1;
  for (var i = start + deleteCount; i < this.length; i++) {
    result.push(this[i]);
  }
  this.length = result.length;
  for (var i = 0; i < this.length; i++) {
    this[i] = result[i]; 
  }
  return result;

}

/**
 * Returns a hooray ordered
 * @param {Hooray} array to order
 * 
 * @returns {Horray} Hooray ordered 
 */
Hooray.prototype.sort= function(){
  if(this.length===0) return this;
  var done = false;
  while (!done) {
    done = true;
    for (var i = 1; i < this.length; i += 1) {
      if (this[i - 1] > this[i]) {
        done = false;
        var tmp = this[i - 1];
        this[i - 1] = this[i];
        this[i] = tmp;
      }
    }
  }

  return this;

}
// function sort(array) {
//   if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
//   if(array.length===0) return []
//   var done = false;
//   while (!done) {
//     done = true;
//     for (var i = 1; i < array.length; i += 1) {
//       if (array[i - 1] > array[i]) {
//         done = false;
//         var tmp = array[i - 1];
//         array[i - 1] = array[i];
//         array[i] = tmp;
//       }
//     }
//   }

//   return array;
// }

