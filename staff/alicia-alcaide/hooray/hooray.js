'use strict';

/**
 * Crate a New Object Hooray with the same methods of Object Hooray
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
Hooray.prototype.forEach = function(callback) {
	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var self = this;

	this.length && (function forEach(index) {
		callback(self[index], index);

		if (++index < self.length)
			forEach(index);
	})(0);
}


/**
 * Determines whether the passed value is a Hooray
 * 
 * @returns {boolean}  true if the value is an Hooray; otherwise, false.
 */
Hooray.prototype.isHooray = function() {
    return this.constructor === Hooray.prototype.constructor;
}


/**
 * Creates a new Hooray instance from a variable number of arguments, 
 * regardless of number or type of the arguments.
 * 
 * @param {*}    values Elements of which to create the hooray.
  * 
 * @returns {number} Index of last occurrence. -1 if not present
 */
Hooray.prototype.of = function() {
    var newHooray = new Hooray;
    for(var i = 0; i < arguments.length; i++)  {
        newHooray.push(arguments[i]);
    };
    return newHooray;  
}


/**
 *  Used to merge two or more hoorays with the original hooray
 *  This method does not change the existing hoorays, instead returns a new hooray.
 * 
 * @param {*} values Hoorays and/or values to concatenate into a new hooray. 
 *                   If valueN is undefined, concat returns a shallow copy of the existing hooray on which it is called. 
 * 
 * @returns {Hooray} A new Hooray instance.
 */
Hooray.prototype.concat = function() {
    var newHooray = new Hooray;

    for (var i=0; i < this.length; i++) {
        newHooray.push(this[i]);
    };

    for (var j=0; j < arguments.length; j++) {
        for (var k=0; k < arguments[j].length; k++) {
            newHooray.push(arguments[j][k]);
        };
    };
    
    return newHooray;
}


/**
 * Iterates an hooray and evaluates an expression on each of its values, returning true if all of them match it. 
 * Otherwise returns false.
 * 
 * @param {Function} callback The expression to evalute.
 * 
 * @returns {boolean} True if all values match the expression, otherwise false.
 */
Hooray.prototype.every = function(callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
    for (var i = 0; i < this.length; i++)
        if (!callback(this[i])) return false;

    return true;
}

/**
 * Fills (modifies) all the elements of an hooray from a start index (default zero) to an end index 
 * (default hooray length) with a static value. It returns the modified hooray. 
 *
 * @param {*} value         value used to fill the element of the hooray
 * @param {number} start    index to start filling. Default 0
 * @param {[number]} end    index to end filling. Default the length of the hooray
 */
Hooray.prototype.fill = function (value, start, end) {

  if (typeof value !== 'string' && typeof value !== 'number') throw TypeError(value + ' is not a number or string');
  if (typeof start !== 'number')  throw TypeError(start + ' is not a number');
  if (typeof end !== 'undefined' && typeof end !== 'number') throw TypeError(end + ' is not a number');
  
  var posStart = start || 0;
  var posEnd = end || this.length;
  while (posStart < posEnd) {
    this[posStart] = value;
    posStart++;
  }
  return this;

}


/**
 * Creates a new hooray with all elements that pass the test implemented by the provided function.
 * 
 * @param {Function} callback - The expression to evaluate.
 * 
 * @returns {Hooray} - A new hooray with the elements that pass the test. 
 * If no elements pass the test, an empty hooray will be returned.
 */
Hooray.prototype.filter = function(callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
    var newHooray = new Hooray();

	for (var i = 0; i < this.length; i++) {
        if(callback(this[i])){
            newHooray.push(this[i]);
        }
    }
        
    return newHooray;
}


/**
 * returns the index of the first element in the hooray that satisfies the provided testing function. 
 * Otherwise, it returns -1, indicating no element passed the test.
 * 
 * @param {Function} callback - The expression to evaluate.
 * 
 * @returns {number} - An index in the hooray if an element passes the test; otherwise, -1.
 */
Hooray.prototype.findIndex = function(callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');


	for (var i = 0; i < this.length; i++) {
        if(callback(this[i])) return i;
    }
    return -1;
}


/**
 * Returns the value of the first element in the hooray that satisfies the provided testing function. 
 * Otherwise undefined is returned.
 * 
 * @param {Function} callback  - The expression to evaluate.
 * 
 * @returns {*} - The value of the first element in the hooray that satisfies the provided 
 *                    testing function; otherwise, undefined is returned.
 */
Hooray.prototype.find = function(callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

	for (var i = 0; i < this.length; i++) {
        if(callback(this[i])) return this[i];
    }
}


/**
 * This function determines whether an hooray includes a certain value among its entries, 
 * returning true or false as appropriate.
 * 
 * @param {*} searchElement The value to search for.
 * @param {[number]} fromIndex     The position in this hooray at which to begin searching for valueToFind
 * 
* @returns {boolean} - A Boolean which is true if the value valueToFind is found within the hooray 
                       (or the part of the hooray indicated by the index fromIndex, if specified). 
                       Values of zero are all considered to be equal regardless of sign (that is, -0 is 
                       considered to be equal to both 0 and +0), but false is not considered to be the same as 0.
 */
Hooray.prototype.includes = function(searchElement, fromIndex) {
    if (typeof searchElement !== 'string' && typeof searchElement !== 'number') throw TypeError(searchElement + ' is not a number or string');
    if (typeof fromIndex !== 'undefined' && typeof fromIndex !== 'number') throw TypeError(fromIndex + ' is not a number');

    var startIndex = fromIndex || 0;

	for (var i = startIndex; i < this.length; i++) {
        if(this[i] ===  searchElement) {
            return true
        }
    }
    return false;
}


/**
 * Returns the first index at which a given element can be found in the hooray, or -1 if it is not present.
 * 
 * @param {*} searchElement  The element to search in the hooray
 * @param {[number]} fromIndex      The index to start the search at. If the index is greater than or equal to the hooray's 
 *                           length, -1 is returned, which means the hooray will not be searched. If the provided 
 *                           index value is a negative number, it is taken as the offset from the end of the hooray. 
 *                           Note: if the provided index is negative, the hooray is still searched from front to back. 
 *                           If the provided index is 0, then the whole hooray will be searched. 
 *                           Default: 0 (entire hooray is searched).
 *
 * @returns {number}         The first index of the element in the hooray; -1 if not found.
 * 
 */
Hooray.prototype.indexOf = function(searchElement, fromIndex) {
    if (typeof searchElement !== 'string' && typeof searchElement !== 'number') throw TypeError(searchElement + ' is not a number or string');
    if (typeof fromIndex !== 'undefined' && typeof fromIndex !== 'number') throw TypeError(fromIndex + ' is not a number');

    var startIndex = fromIndex || 0;

	for (var i = startIndex; i < this.length; i++) {
        if(this[i] ===  searchElement) {
            return i
        }
    }
    return -1;
}


/**
 * Concatenate all elements in a string separated by the separator
 * 
 * @param {[string]} separator Optional. Inserted between each element. Default: empty
 * 
 * @returns {string} All elements concatenated with the separator between
 */
Hooray.prototype.join = function(separator) {
    if (typeof separator !== 'undefined' && typeof separator !== 'string') throw TypeError(separator + ' is not a string');

    var result = '';
    if (arguments.length === 0) {
        separator = ','; 
    }

    for (var i=0; i < this.length; i++) {
        if (result === '') {
            result = this[i]
        }
        else {
            result = result + separator + this[i]
        }
    }
    return result;  
}

/**
 * Returns the last index at which a given element can be found in the hooray, or -1 if it is not present. 
 * The hooray is searched backwards, starting at fromIndex.
 * @param {*} searchElement     The element to search in the hooray
 * @param {[number]} fromIndex  The index at which to start searching backwards. 
 * 
 * @returns {number} - The last index of the element in the hooray; -1 if not found.
 * 
 */
Hooray.prototype.lastIndexOf = function(searchElement, fromIndex) {
    if (typeof searchElement !== 'string' && typeof searchElement !== 'number') throw TypeError(searchElement + ' is not a number or string');
    if (typeof fromIndex !== 'undefined' && typeof fromIndex !== 'number') throw TypeError(fromIndex + ' is not a number');

    var indexStart = 0;

    if (arguments.length === 1 || fromIndex >= this.length) {
        indexStart = this.length - 1;
    } else {
        if (fromIndex < 0) {
            indexStart = this.length + (fromIndex);

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
}

/**
 * Returns a new hooray with the value returned by the callback for each element
 * @param {Function} callbackfn  the expression to evaluate
 * 
 * @returns {Hooray} New hooray with the value returned by the callback for each element
 */
Hooray.prototype.map = function(callback) {
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');

    var newHooray = new Hooray();
	for (var i = 0; i < this.length; i++) {
        newHooray.push(callback(this[i]))
	}
	return newHooray;
} 


/**
 * Retrieves the last value of a hooray, decrementing its length by 1.
 * 
 * @returns {*} The value retrievied from the hooray.
 */
Hooray.prototype.pop = function() {
    if (this.length) {
        var value = this[this.length - 1];
        delete this[this.length - 1];
        this.length--;

        return value;
    };
}


/**
 * executes a reducer function on each member of the hooray resulting in a single output value.
 * 
 * @param {Function} callbackfn  Function to execute on each element in the hooray
 * @param {[*]} initialValue  Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the hooray will be used. 
 * 
 * @returns {*} The value that results from the reduction.
 */
 Hooray.prototype.reduce = function(callback, initialValue) {
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
    if (typeof initialValue !== 'undefined' && typeof initialValue !== 'number') throw TypeError(initialValue + ' is not a number');

    var start = 0;
    var accumulator = 0;
    if (arguments.length > 1) {
        accumulator = initialValue
    } else {
        start = 1;
        accumulator = this[0];
    }

    for (var i=start; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
} 

/**
 * applies a function against an accumulator and each value of the hooray
 *  (from right-to-left) to reduce it to a single value.
 * 
 * @param {Function} callbackfn  Function to execute on each element in the hooray
 * @param {[*]} initialValue  Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the hooray will be used. 
 * 
 * @returns {*} The value that results from the reduction.
 */
Hooray.prototype.reduceRight = function(callback, initialValue) {
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
    if (typeof initialValue !== 'undefined' && typeof initialValue !== 'number') throw TypeError(initialValue + ' is not a number');

    var start = this.length - 1;
    var accumulator;
    if (arguments.length > 1) {
        accumulator = initialValue
    } else {
        accumulator = this[start];
        start = start - 1;    
    }
    
    for (var k=start; k >= 0; k--) {
        accumulator = callback(accumulator, this[k], k, this);
    }
    return accumulator;
} 

/**
 * Create a new Hooray with all elements in reverse order
 * 
 * @returns {hooray} A new Hooray instance with all elements in reverse order
*/
Hooray.prototype.reverse = function() {

    var newHooray = new Hooray();

    for (var i= this.length - 1 ; i >= 0 ; i--) {
        newHooray.push(this[i]);
    }
    
    return newHooray;
}

/**
 * Removes the first element from an hooray and returns that removed element. 
 * This method changes the length of the hooray.
 * 
 * @returns {*} The element removed
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
 * Returns a new hooray with the elements between start index and end index (this not included)
 * 
 * @param {[number]} begin  Zero-based index at which to begin extraction.
 * @param {[number]} end    Zero-based index before which to end extraction. 
 *                          slice extracts up to but not including end.
 * 
 * @returns {Hooray} A new hooray containing the extracted elements.
 */
Hooray.prototype.slice = function(begin, end) {
    if (typeof begin !== 'undefined' && typeof begin !== 'number') throw TypeError(begin + ' is not a number');
    if (typeof end !== 'undefined' && typeof end !== 'number') throw TypeError(end + ' is not a number');

    var newHooray = new Hooray();
    
    var start = begin || 0;
    var last = end || this.length;

    for (var i = start; i < last; i++) {
        newHooray.push(this[i]);
    }
    return newHooray;
} 


/**
 * Tests whether at least one element in the hooray passes the test implemented by the provided function.
 * @param {Function} callback Function to test for each element
 * 
 * @returns {boolean} True if the callback function returns a truthy value for any hooray element; otherwise, false.
 */
Hooray.prototype.some = function(callback) {
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');

    for (var i = 0; i < this.length; i++) {
        if (callback(this[i], i, this))  {
            return true;
        }
    }
    return false;
} 


/**
 * Sort in place the hooray. If no compare function, the default comparison is the standar comparison > not MDN documentation UTF16)
 */
Hooray.prototype.sort = function() {
    var i, j, k, z;

    for (i = 0; i < this.length; i++) {
        for (j = 0; j < this.length - i; j++) {
            k = this[j];
            z = this[j + 1];
            if (k > z) {
                this[j] = z;
                this[j + 1] = k;
            }
        }
    }
};


/**
 *  Changes the contents of an hooray by removing or replacing existing elements and/or adding new elements 
 * 
 * @param {number} start   Index to start of cutting
 * @param {[number]} deleteCount number of elements to delete
 * @param {[any]}    item1, item2,... The elements to add to the hooray, beginning at the start index. 
 *                                    If you don't specify any elements, splice() will only remove elements from the hooray.  
 *  
 * @returns {Hooray} A new horray containing the deleted elements. If no elements are removed, an empty hoooray is returned.
 * 
 */
Hooray.prototype.splice = function(start, deleteCount) {
    if (typeof start !== 'number') throw TypeError(start + ' is not a number');
    if (typeof deleteCount !== 'undefined' && typeof deleteCount !== 'number') throw TypeError(deleteCount + ' is not a number');


    /* index at which to start changing the hooray (with origin 0). 
       if greater than the length of the hooray, actual starting index will be set to the length of the hooray. 
       if negative, will begin that many elements from the end of the hooray (hooray.length - n) */
    if (start > this.length) start = this.length;
    if (start < 0) start = this.length + start;


    /* if deleteCount is omitted, or if its value is equal to or larger than hooray.length - start 
      (that is, if it is equal to or greater than the number of elements left in the hooray, starting at start), 
      then all of the elements from start through the end of the hooray will be deleted. */

    if (deleteCount === 'undefined' || deleteCount > (this.length - start) ) {
        deleteCount = this.length;
    }
    /* if deleteCount is 0 or negative, no elements are removed. 
       In this case, you should specify at least one new element */
    if (deleteCount < 0 ) deleteCount = 0;
    if (deleteCount === 0 && arguments.length < 3) return new Hooray();
    

   var items = new Hooray();
   var initial = new Hooray();
   var end = new Hooray(); 
   var tmpHooray = new Hooray();
   var deletedElements = new Hooray();

    // new elemets to add
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            items[items.length++] = arguments[i];
        }
    }

    // initial elements to keep before start index
    for (var i = 0; i < start; i++) {
        initial[initial.length++] = this[i];
    }

    // elements to keep after deleteCount index
    for (var i = (start + deleteCount); i < this.length; i++) {
        end[end.length++] = this[i];
    }

    // elements to delete
    for (var i = start; i < (start + deleteCount); i++) {
        deletedElements[deletedElements.length++] = this[i];
    }

    // put all argumnets into an temporary hooray 
    for (var i = 0; i < initial.length; i++) {
        tmpHooray[tmpHooray.length++] = initial[i];
    }
    for (var i = 0; i < items.length; i++) {
        tmpHooray[tmpHooray.length++] = items[i];

    }
    for (var i = 0; i < end.length; i++) {
        tmpHooray[tmpHooray.length++] = end[i];
    }
    
    // modify the original Hooray
    for (var i = 0; i < this.length; i++) {
        delete this[i];
    }
    this.length = 0;
    for (var i = 0; i < tmpHooray.length; i++) {
        this[this.length++] = tmpHooray[i];
    }

    return deletedElements;
}