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

Hooray.isHooray = function (value) {
    if (value instanceof Hooray) return true;

    return false;
}

// Horray.lengthCheck = function(value){
//     var i, j = 0;
//     for (i = 0; i < value.length; i++){
//         j++;
//     }
//     value.length = j;
// }
//FOREACH
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

//CONCAT
/**
 * This function will take as many arrays as arguments as wished and it will write a new one with all the items in order of introduction.
 * 
 * 
 */
Hooray.prototype.concat = function () {
    if (arguments.length <= 0) throw TypeError("introduce at least 2 argument");

    var i, j, newhorray = new Hooray();

    for (i = 0; i < this.length; i++) {
        newhorray[newhorray.length++] = this[i];
    }

    for (i = 0; i < arguments.length; i++) {
        for (j = 0; j < arguments[i].length; j++) {
            newhorray[newhorray.length++] = arguments[i][j];
        }
    }

    return newhorray
};

//EVERY
/**
 * Iterates an array and evaluates an expression on each of its values, returning true if all of them match it. Otherwise returns false.
 * @param {Function} callback The expression to evalute.
 * @returns {boolean} True if all values match the expression, otherwise false.
 */

Hooray.prototype.every = function (callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var i = 0;

    while (i < this.length) {
        if (callback(this[i])) {
            i++;
        } else {
            return false;
        }
    }

    return true;
};

// FILL
/** 
* 
* @param {number} filling The number to fill the array
* @param {number} firstposition the first index to be filled
* @param {number} lastposition  the last index to be filled
*/

Hooray.prototype.fill = function (filling, firstposition, lastposition) {
    if (isNaN(filling)) throw TypeError(firstposition + ' is not a valid array index value');
    if (firstposition < 0) throw TypeError(firstposition + ' is not a valid array index value');
    if (lastposition === 0 || lastposition > this.length - 1) throw TypeError(lastposition + ' is not a valid array last index value');

    var i = 0, j, newHooray = new Hooray();

    {
        if (lastposition !== undefined && lastposition >= lastposition && lastposition <= this.length - 1) {
            for (j = 0; j < this.length; j++) {
                if (i < firstposition || i > lastposition, i++) {
                    newHooray[newHooray.length++] = this[i];
                    i++;
                } else {
                    newHorray[newHooray.length++] = filling;
                    i++;
                }
            }
            return newHooray;
        } else if (lastposition === undefined) {
            for (j = 0; j < this.length; j++) {
                if (i < firstposition) {
                    newHooray[newHooray.length++] = this[i];
                    i++;
                } else {
                    newHooray[newHooray.length++] = filling;
                    i++;
                }
            }
            return newHooray;
        } else {
            for (i = 0; i < this.length; i++) {
                newHooray[newHooray.length++] = filling;
            }

            return newHooray;
        }
    }
};

//FILTER
/**
 * The filter() method creates a new array with all elements that pass the test implemented by the provided function.
 *
 * @param {function} callback function to apply;
 */

Hooray.prototype.filter = function (callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var i, newhorray = new Hooray();

    for (i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            newhorray[newhorray.length++] = this[i];
        }
    }
    return newhorray;
};

//INDEX OF
/**It will look for an element on an array, it will retur -1 if it is not present or the value of the last index presented.
 * 
 * @param {element} searchElement value to look for index
 * @param {number} index first value to start looking
 */

Hooray.prototype.indexof = function (searchElement, startingIndex) {
    if (startingIndex !== undefined) {
        if (startingIndex < 0 || startingIndex > this.length - 1) throw TypeError(startingIndex + ' is not a valid array last index value');
    }

    var i, j = -1;

    if (startingIndex === undefined) {
        for (i = 0; i < this.length; i++) {
            if (this[i] === searchElement) {
                return i;
            }
        }
    } else {
        for (i = startingIndex; i < this.length; i++) {
            if (this[i] === searchElement) {
                return i;
            }
        }
    }

    return j;
};

//JOIN
/**It while join all the values of an array into a string.
 * 
 * @param {primitive} separator value between valies
 */

Hooray.prototype.join = function (separator) {
    if (separator === (undefined || NaN)) throw TypeError(separator + ' is not  valid separator');


    var i, ensurestring = separator.toString(), newString = "";

    for (i = 0; i < this.length; i++) {
        if (i + 1 < this.length) {
            newString += (this[i] + ensurestring);
        } else {
            newString += (this[i]);
        }
    }
    return newString
};

//LAST INDEX OF
/**It will look for an element on an array, it will retur -1 if it is not present or the value of the last index presented.
 * 
 * 
 * @param {element} searchElement vale to look for index
 */

Hooray.prototype.lastIndexOf = function (searchElement) {
    var i, j = -1;

    for (i = 0; i < this.length; i++) {
        if (this[i] === searchElement) {
            j = i;
        }
    }
    return j;
};

//MAP
/**It will create a new array with an iteration of the original after passing for the callback fuction.
 * 
 * @param {function} callback function to proces each element.
 */

Hooray.prototype.map = function (callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var i, newhorray = new Hooray();

    for (i = 0; i < this.length; i++) {
        newhorray[i] = callback(this[i]);
    }

    newhorray.length = this.length;
    return newhorray;
};

//POP
/**It will erase the last index 
 *
 */

Hooray.prototype.pop = function () {

    var value = new Hooray();

    if (this.length > 0) {
        value[0] = this[this.length - 1];
        delete this[this - 1];
        this.length = this.length - 1;

        return value[0];
    } else {
        return undefined;
    }
};

///PUSH
/**It will introduce a new index with the value given
 * 
 *
 * @param {*} newElement element to add at the end of the array
 */


Hooray.prototype.push = function (value) {
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++)
            this[this.length++] = arguments[i];
    }

    return this.length;
};

//REDUCE
/**It will add each number of the array depeding if an initial value has been declared.
 * 
 * @param {function} callback function to call
 * @param {number} initial number to initialize
 */

Hooray.prototype.reduce = function (callback, initial) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    if (isNaN(initial) && initial !== undefined) throw TypeError(initial + ' is not a starting value');

    var i, acc = 0;

    if (initial === undefined) {
        acc = this[0];
        for (i = 1; i < this.length; i++) {
            acc = callback(acc, this[i]);
        }
    } else {
        acc = initial;
        for (i = 0; i < this.length; i++) {
            acc = callback(acc, this[i]);
        }
    }
    return acc;
};

//REDUCE RIGHT
/**It will add each number of the array depeding if an initial value has been declared starting from the last value.
 * 
 * @param {function} callback function to call
 * @param {number} initial number to initialize
 */

Hooray.prototype.reduceRight = function (callback, initial) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    if (isNaN(initial) && initial !== undefined) throw TypeError(initial + ' is not a starting value');

    var i, acc = 0;

    if (initial === undefined) {
        acc = this[this.length - 1];
        for (i = this.length - 2; i >= 0; i--) {
            acc = callback(acc, this[i]);
        }
    } else {
        acc = initial;
        for (i = this.length - 1; i >= 0; i--) {
            acc = callback(acc, this[i]);
        }
    }

    return acc
};

//REVERSE
/**
 * This will reverse the elemets of a given array
 * 
 */

Hooray.prototype.reverse = function () {

    var i, newhorray = new Hooray(), j = 0;

    newhorray.length = this.length;

    for (i = this.length - 1; i >= 0; i--) {
        newhorray[j] = this[i];
        j++;
    }

    for (i = this.length - 1; i >= 0; i--) {
        this[i] = newhorray[i];
    }

    return this;
};

//SHIFT
/**
 * Return an array with the first value of the original array hile modifing the original to erase the element.
 * 
 * @return {array} newArray 
 */

Hooray.prototype.shift = function () {

    var i, delement, copy = new Hooray();

    delement = this[0];

    for (i = 1; i < this.length; i++) {
        copy[copy.length++] = this[i];
    }

    for (i = 0; i < copy.length; i++) {
        this[i] = copy[i];
    }

    delete this[this.length -1];
    this.length = copy.length;

    return delement;
};

//SLICE
/**
 * It will create a new array after eliminating the choosed index of the original array-
 * @param {number} from from (or whichone if this argument is given) where to cut
 * @param {number} to up to where to cut from from
 */

Hooray.prototype.slice = function (from, to) {
    if (isNaN(from) || NaN) throw TypeError(from + ' is not a valid array index value');
    if (isNaN(to) && to !== undefined && to !== NaN) throw TypeError(firstposition + ' is not a valid array index value');

    var i, newHooray = new Hooray(), k = 0;

    if (to !== undefined && to >= from && to < this.length) {
        for (i = from; i <= to; i++) {
            newHooray[newHooray.length++] = this[i];
        }
        return newHooray;
    } else {
        for (i = from; i < this.length; i++) {
            newHooray[newHooray.length++] = this[i];
        }
        return newHooray
    }

};

//SOME
/**
 * The some() method tests whether at least one element in the array passes the test implemented by the provided function.
 * @param {function} callback function to proces the array
 */

Hooray.prototype.some = function (callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var i;

    for (i = 0; i < this.length; i++) {
        if (callback(this[i]) === true) {
            return true
        }
    }

    return false;
};

//SORT
/**
 * The sort() method sorts the elements of an array in place and returns the array
 * 
 */
Hooray.prototype.sort = function () {
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
    return this;
};

//SPLICE
/**
 * The function changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
 * 
 * @param {number} origin 
 * @param {number} erase 
 * @param {*} add 
 */

Hooray.prototype.splice = function (start, todelete, items) {
    if (isNaN(start) && start === undefined) throw TypeError(start + ' is not a starting value');
    if (todelete > (this.length - start) || todelete === undefined) { todelete = this.length - start };

    var items = new Hooray(), initial = new Hooray(), end = new Hooray(), tempHoo = new Hooray(), i, remover = [];

    //add the items for the arguments in items array;
    if (arguments.length > 2) {
        for (i = 2; i < arguments.length; i++) {
            items[items.length++] = arguments[i];
        }
    }

    // SAVING THE INDEX TO REMOVE
    for (i = start; i < (start + todelete); i++){
        remover[remover.length++] = this[i];
    }

    //Start of the new
    for (i = 0; i < start; i++) {
        initial[initial.length++] = this[i];
    }

    //end of the new
    for (i = (start + todelete); i < this.length; i++) {
        end[end.length++] = this[i];
    }


    //Put all argumnets into an array 
    for (i = 0; i < initial.length; i++) {
        tempHoo[tempHoo.length++] = initial[i];
    }
    for (i = 0; i < items.length; i++) {
        tempHoo[tempHoo.length++] = items[i];

    }
    for (i = 0; i < end.length; i++) {
        tempHoo[tempHoo.length++] = end[i];
    }

    this.length = 0;

    for (i = 0; i < tempHoo.length; i++) {
        this[this.length++] = tempHoo[i];
    }

    return remover;
};
