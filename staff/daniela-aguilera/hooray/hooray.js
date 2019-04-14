'use strict';
/**
 * 
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
 * Method determines whether the passed value is an Hooray.
 * @param {Value} The value to be checked.
 * @returns {boolean} true if the value is an Hooray; otherwise, false.
 */
//Propiedad de la función. Un método del proto.
Hooray.isHooray = function (toCheck) {
    return toCheck instanceof Hooray
}

// const hooray = new Hooray(2, 4, 8, 'a', true, {a: 1})
// console.log(hooray)
// {0: 2, 1: 4, 2: 8, 3: 'a', 4: true, 5: { a: 1}, length: 6}

/**
* Adds a value at the end of an hooray, incrementing its length by 1.
* 
* @param {*} values The values to push in the hooray.
* 
* @returns {number} The length of the hooray after adding the new value.
*/
Hooray.prototype.push = function () {
    if (arguments.length > 0)
        for (var i = 0; i < arguments.length; i++)
            this[this.length++] = arguments[i];

    return this.length;
}

// const hooray = new Hooray('a', 'b')
// console.log(hooray) {0: 'a', 1: 'b', length: 2}
// hooray.push('c', 'd')
// console.log(hooray) {0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4}


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


// Metodo Every

/**
 * Iterates an Hooray and evaluates an expression on each of its values, returning true if all of them match it. Otherwise returns false.
 * 
 * @param {Function} callback The expression to evalute.
 * 
 * @returns {boolean} True if all values match the expression, otherwise false.
 */

Hooray.prototype.every = function (callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    for (var i = 0; i < this.length; i++)
        if (!callback(this[i])) return false;

    return true;
}

//Filter

/**
 * 
 * Method creates a new Hooray with all elements that pass the test implemented by the provided function.
 * 
 * 
 * @param {callback} function is a predicate, to test each element of the Hooray. Return true to keep the element, false otherwise. It accepts three arguments:
 * 
 * @returns {Hooray} A new Hooray with the elements that pass the test. If no elements pass the test, an empty hooray will be returned.
 */


Hooray.prototype.filter = function (callback){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');  
    var hoorayFiltered = new Hooray();  
    
    for (var i = 0; i < this.length; i++){
        if (callback(this[i], i) === true) {
            hoorayFiltered.push(this[i])
        }  
    }

    return hoorayFiltered
}


//Indexof
/**
 * @param {*} searchElement 
 * @returns the index of the element that you are looking for
 * The indexOf() method returns the first index at which a given element can be found in the hooray, or -1 if it is not present.
 */

Hooray.prototype.indexOf = function(searchElement) {
    if (!(typeof searchElement === 'number')) throw TypeError(searchElement + ' is not a number.'); 

    for (var i = 0; i < this.length; i++){
        if(this[i] == searchElement){
           return i;
        } 
    }
    return -1;
}

/**
 * Method is used to merge two or more hoorays. This method does not change the existing hoorays, but instead returns a new hooray.
 * 
 * @param {Hooray[n]} hoorays and/or values to concatenate into a new hooray. If valueN is undefined, concat returns a shallow copy of the existing hooray on which it is called. See the description below for more details.
 * 
 * @returns {Hooray} A new Hooray instance. 
 */

Hooray.prototype.concat = function(hooray) {
    //if (!(hooray instanceof Hooray)) throw TypeError(hooray + ' is not a Hooray.');

    var newHooray = new Hooray();
 
    for (var i = 0; i < this.length; i++) {
      newHooray.push(this[i]);
      
    }
    
    for (var j = 0; j < hooray.length; j++) {
      newHooray.push(hooray[j]);
    }
    return newHooray;
  }

/**
 *  method applies a function against an accumulator and each value of the hooray (from right-to-left) to reduce it to a single value.
 * @param {callback} function (variable to save, hooray to iterates) Function to execute on each element in the hooray, taking four arguments.
 * @returns {Hooray} A new Hooray
 */

Hooray.prototype.reduceRight = function (callback) {
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function.');
  
  var reduceRightHooray = "";
  var self = this;
  for (var i = self.length -1; i >= 0  ;i--){
    reduceRightHooray = callback(reduceRightHooray, self[i]);
  }

 return reduceRightHooray;
}

/**
 *  method executes a reducer function (that you provide) on each member of the hooray resulting in a single output value.
 * @param {callback} function (variable to save, hooray to iterates) Function to execute on each element in the hooray, taking four arguments
 * @returns {reducedHooray} 
 */

Hooray.prototype.reduce = function (callback){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function'); 
    var reducedHooray = "";
    var self = this
   for (var i = 0; i < self.length; i++) {
    reducedHooray = callback(reducedHooray, self[i]);
   }
  return reducedHooray;
}

/**
 *  method reverses an hooray in place. The first hooray element becomes the last, and the last hooray element becomes the first. 
 * @returns {reversedHooray} 
 */
Hooray.prototype.reverse = function() {
    let reverseHooray = new Hooray()
    var self = this;
    for (let i = self.length - 1; i >= 0; i--) {
        reverseHooray.push(self[i])
    }
    return reverseHooray
}

/**
 * method creates and returns a new string by concatenating all of the elements in an hooray (or an hooray-like object), separated by commas or a specified separator string. If the hooray has only one item, then that item will be returned without using the separator.
 * @param {separator}Specifies a string to separate each pair of adjacent elements of the hooray. The separator is converted to a string if necessary. If omitted, the hooray elements are separated with a comma (","). If separator is an empty string, all elements are joined without any characters in between them.
 * @returns {String} A new String with all hooray elements joined. 
 */

Hooray.prototype.join = function (separator) {
    if (typeof separator === 'undefined') throw new TypeError(separator + ' is not a separator');
    var self = this;
    var newHooray = '';
  
    for (var i = 0; i < self.length; i++) {
        newHooray += self[i] + separator   
    } 
    return newHooray
  }

/**
 * Method returns the last index at which a given element can be found in the hooray, or -1 if it is not present. The hooray is searched backwards, starting at fromIndex.
 * @param {*} searchElement 
 * @returns the index of the element that you are looking for
 * 
 */

 
Hooray.prototype.lastindexOf = function (earchElement) {
    if (!(typeof searchElement === 'number')) throw TypeError(searchElement + ' is not a number.'); 
    var self = this;   
      for (var i = self.length+1; i > 0; i--){     
        if (self[i] === searchElement){       
          return i;          
        }  
      }
    return -1;
  }
  /**
 * The map() method creates a new hooray with the results of calling a provided function on every element in the calling hooray.
 * @param {function} callback
 * @returns {Hooray} newHooray 
 */

Hooray.prototype.map = function (callback){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    var self = this
    let hoorayMaped = new Hooray;
    for (let i = 0; i < self.length; i++){
        hoorayMaped.push(callback(self[i], i)) 
    }
    return hoorayMaped
}

/**
 * 
 * Method removes the first element from an hooray and returns that removed element. This method changes the length of the hooray.
 * @returns {*} 
 */

Hooray.prototype.shift = function() {
    if (this.length === 0) return undefined

    var firstElement = this[0]

    for (var i = 0; i < this.length - 1; i++) {
        this[i] = this[i + 1]
    }
    this.length--
    delete this[this.length];

    return firstElement
}

/**
 * The some() method tests whether at least one element in the hooray passes the test implemented by the provided function.
 * @param {function} callback 
 * @returns {boolean} 
 */

Hooray.prototype.some = function(callback){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    var self = this;  
    for (var i = 0; i < self.length; i++){
        if (callback(self[i], i) === true){
            return true
        }  
     }  
    return false
  }

/**
 * Retrieves the last value of an hooray, decrementing its length by 1.
 * @returns {*} The value retrievied from the hooray.
 */

Hooray.prototype.pop = function(){
    if (this.length === 0) throw new TypeError("this hooray is empty");
    if (this.length) {
        var value = this[this.length - 1];
        delete this[this.length - 1];
        this.length--;
        return value;
    }
}

/**
 * The slice() method extracts a section of a string and returns it as a new string, without modifying the original string.
 * @param {Number} valorinicial 
 * @param {Number} valorfinal 
 */

Hooray.prototype.slice = function (valorinicial, valorfinal){
    if (typeof valorinicial !== 'number') throw new TypeError(valorinicial + ' is not a number');
    if (typeof valorfinal !== 'number') throw new TypeError(valorfinal + ' is not a number');
    var hooraySlice = new Hooray;
     for ( var i = valorinicial; i <= valorfinal; i++){ 
        hooraySlice.push(this[i]);   
     }
    return hooraySlice;
}

/**
 * method changes the contents of an hooray by removing or replacing existing elements and/or adding new elements in place.
 * @param {*} inicio Index at which to start changing the hooray (with origin 0). If greater than the length of the hooray, actual starting index will be set to the length of the hooray. If negative, will begin that many elements from the end of the hooray (with origin -1, meaning -n is the index of the nth last element and is therefore equivalent to the index of hooray.length - n) and will be set to 0 if absolute value is greater than the length of the hooray.
 * @param {*} eliminar An integer indicating the number of old hooray elements to remove.
 * @return An hooray containing the deleted elements. If only one element is removed, an hooray of one element is returned. If no elements are removed, an empty hooray is returned.
 */

Hooray.prototype.splice = function (inicio, eliminar) {
    // if (!(typeof inicio === 'number')) throw TypeError(inicio + ' is not a number');
    var spliceHooray = new Hooray()

    for (var i = 0; i < this.length; i++) {
        if (i < inicio || i >= inicio + eliminar) {
            spliceHooray.push(this[i])
        }
        
        if(arguments.length > 2 && inicio === i){
            for (var a = 2; a < arguments.length; a++) {
                spliceHooray.push(arguments[a])
            }
        }
    }

    var length = this.length
    if (spliceHooray.length > this.length) {
        length = spliceHooray.length
    }

    for (var p = 0; p < length; p++){
        if (p >= spliceHooray.length) {
            delete(this[p])
        } else {
            this[p] = spliceHooray[p]
        }
    }

    this.length = spliceHooray.length;

    return this
}

/**
 * The sort() method sorts the elements of an hooray in place and returns the hooray
 * 
 */



Hooray.prototype.sort = function (callback) {
    var sorted = new Hooray()
    sorted.push(this[0])

    for (var i = 1; i < this.length; i++) {
        var indexToInsert = 0

        // console.log('number', numbers[i])
        for (var j = 0; j < sorted.length; j++) {
            if (callback(this[i], sorted[j])) {
                indexToInsert = j + 1
            } else {
                break
            }
            // console.log('sortedNum', sorted[j])
        }

        // debugger
        sorted.splice(indexToInsert, 0, this[i])
    }

    console.log(sorted)

    return sorted
}
    





//     var numbers = [7, 2, 8, 3, 4, 1, 3, 2, 3, 12]

// function sort (array, callback) {
//     var sorted = [array[0]]
//     callback = callback || function (a, b) { return String(a) >= String(b); }
    
//     for (var i = 1; i < array.length; i++) {
//       var indexToInsert = 0
      
//       // console.log('number', numbers[i])
//       for (var j = 0; j < sorted.length; j++) {
//         if (callback(array[i], sorted[j])) {
//           indexToInsert = j + 1
//         } else {
//           break
//         }
//         // console.log('sortedNum', sorted[j])
//       }
      
//       sorted.splice(indexToInsert, 0, array[i])
//     }
  
//   return sorted
// }

// console.log(sort(numbers))

// console.log(sort(numbers, function (a, b) {
//   return a >= b
// }))
