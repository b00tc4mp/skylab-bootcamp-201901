'use strict';

/**
 * 
 */
function Hooray() {

	if (arguments.length > 2){

    	for (var i = 0; i < arguments.length; i++) {
			this[i] = arguments[i];	
		}
		this.length = arguments.length;

	} else if (arguments.length === 1){ 
		if (typeof arguments[0] === "number"){
			this.length = arguments[0];
		}else {
			this[0] = arguments[0];
			this.length = 1;
		}

	} else {
		this.length = 0;
	}
}

//FOREACH
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


// //CONCAT
// /**
//  * This function will take as many arrays as arguments as wished and it will write a new one with all the items in order of introduction.
//  * 
//  * @param {arguments} array all the arrays to iterate.
//  * 
//  */

// 	Hooray.prototype.concat = function ()  {
//     if (arguments.length <= 0) throw TypeError("introduce at least 2 argument");
    
//     var i, j, newhorray = new Hooray();

//     for (i = 0; i < arguments.length; i++){
//         for (j = 0; j < arguments[i].length; j++){
//             newhorray[newhorray.length] = arguments[i][j];
//         }
//     }

//     return newhorray
// };

//EVERY
/**
 * Iterates an array and evaluates an expression on each of its values, returning true if all of them match it. Otherwise returns false.
 * @param {Array} array The array to iterate.
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


// // FILL
// /** 
// * @param {array} arraytofill The array to iterate
// * @param {number} filling The number to fill the array
// * @param {number} firstposition the first index to be filled
// * @param {number} lastposition  the last index to be filled
// */

// Hooray.prototype.fill = function(arraytofill, filling, firstposition, lastposition) {
//    if (!(arraytofill instanceof Array)) throw TypeError(array + ' is not an array');
//    if (isNaN(filling)) throw TypeError(firstposition + ' is not a valid array index value');
//    if (firstposition < 0) throw TypeError(firstposition + ' is not a valid array index value');
//    if (lastposition === 0 || lastposition > arraytofill.length -1) throw TypeError(lastposition + ' is not a valid array last index value');
   
//    var i = 0, j, newarray = [];

//    if (firstposition !== undefined  && firstposition >= 0) {
// 	   if (lastposition !== undefined && lastposition >= lastposition && lastposition <= arraytofill.length -1){
// 		   for (j = 0; j < arraytofill.length; j++){
// 			  if (i < firstposition || i > lastposition) {
// 				  newarray[i] = arraytofill[i];
// 				  i++
// 			  }else {
// 				  newarray[i] = filling;
// 				  i++
// 			  }
// 			}   
// 		   return newarray;
// 	   } else {
// 		   for (j = 0; j < arraytofill.length; j++){
// 			   if (i < firstposition) {
// 				   newarray[i] = arraytofill[i];
// 				   i++
// 			   }else {
// 				   newarray[i] = filling;
// 				   i++
// 			   }
// 			 }  
// 		   return newarray;
// 	   }
//    } else {
// 	   for (i = 0; i < arraytofill.length; i++){
// 	   newarray[i] = filling;
// 	   }
//    }
//    return newarray;
// };

// //FILTER
// /**
//  * The filter() method creates a new array with all elements that pass the test implemented by the provided function.
//  * @param {array} array array to iterate
//  * @param {function} callback function to apply;
//  */

// Hooray.prototype.filter = function(array, callback){
//     if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
//     if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
//     var i, newArray = [], j = 0;

//     for (i = 0; i < array.length; i++){
//         if (callback(array[i])){
//             newArray[j] = array[i];
//             j++
//         }
//     }
//     return newArray;
// };

// //INDEX OF
// /**It will look for an element on an array, it will retur -1 if it is not present or the value of the last index presented.
//  * 
//  * @param {array} array array to iterate
//  * @param {element} searchElement value to look for index
//  * @param {number} index first value to start looking
//  */

// Hooray.prototype.indexof = function(array, searchElement, startingIndex){
//     if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
//     if (startingIndex !== undefined ){
//     if (startingIndex < 0 || startingIndex > array.length -1) throw TypeError(startingIndex + ' is not a valid array last index value');
//     }

//     var i, j = -1;

//         if (startingIndex === undefined){
//             for (i = 0; i < array.length; i++){
//                 if (array[i] === searchElement){
//                 return i;
//                 }
//             }
//         } else {
//             for (i = startingIndex; i <array.length; i++){
//                 if (array[i] === searchElement){
//                 return i;
//                 }
//             }
//         }

//         return j;
// };

// //ISHORRAY
// /**
//  * It checks if a determinate value is an isntance of array or not
//  * @param {any} value value to check;
//  */


// Hooray.prototype.ishorray = function (value){
//     "use strict";
//     if (value instanceof Hooray) return true;

//     return false;
// };

// //JOIN
// /**It while join all the values of an array into a string.
//  * 
//  * @param {array} array Array to iterate 
//  * @param {primitive} separator value between valies
//  */


// Hooray.prototype.join= function(array, separator){
//     "use strict";
//     if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
//     if (separator === (undefined || NaN)) throw TypeError(separator + ' is not  valid separator');


//     var i, ensurestring = separator.toString(), newString = "";

//     for (i = 0; i < array.length; i++){
//         if (i + 1 < array.length){
//             newString += (array[i] + ensurestring);
//         } else{
//             newString += (array[i]);
//         }
//     }
//     return newString
// };

// //LAST INDEX OF
// /**It will look for an element on an array, it will retur -1 if it is not present or the value of the last index presented.
//  * 
//  * @param {array} array array to iterate
//  * @param {element} searchElement vale to look for index
//  */

// Hooray.prototype.lastindexof = function(array, searchElement){
//     if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

//     var i, j = -1;

//         for (i = 0; i <array.length; i++){
//             if (array[i] === searchElement){
//                 j = i;
//             }
//         }
//     return j;
// };

// //MAP
// /**It will create a new array with an iteration of the original after passing for the callback fuction.
//  * 
//  * @param {array} array array to iterate
//  * @param {function} callback function to proces each element.
//  */

// Hooray.prototype.map = function(array, callback){
//     "use strict";
//     if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
//     if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
//     var i, newArray = [];

//     for (i = 0; i < array.length; i++){
//         newArray[i] = callback(array[i]);
//     }

//     return newArray;
// };

//POP
/**It will erase the last index 
 *
 */

Hooray.prototype.pop = function(){

	var value = new Hooray();

    if (this.length > 0) {
        value[0] = this[this.length - 1];
		delete this[this -1];
		this.length = this.length-1;

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


Hooray.prototype.push = function(value){
	if(arguments.length > 0) {
		for(var i = 0; i < arguments.length; i++)
		    this[this.length++] = arguments[i];
	}

    return this.length;
};

// //REDUCE
// /**It will add each number of the array depeding if an initial value has been declared.
//  * 
//  * @param {array} array array to iterate
//  * @param {function} callback function to call
//  * @param {number} initial number to initialize
//  */

// Hooray.prototype.reduce = function(array, callback, initial) {
// 	if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
// 	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
// 	if (isNaN(initial) && initial !== undefined ) throw TypeError(initial + ' is not a starting value');
  
// 	var i, acc = [], initial, newArray = [];
  
// 	  if (initial === undefined){
// 		acc[0] = array[0];
// 		for (i = 1; i < array.length ; i++){
// 		  acc[0] = callback(acc[0], array[i]);
// 		}
// 	  } else {
// 		acc[0] = initial;
// 		for (i = 0; i < array.length; i++){
// 		  acc[0] = callback(acc[0], array[i]);
// 		}
// 	  }
// 	  newArray[0] = acc[0];
// 	  return newArray
//   };

// //REDUCE RIGHT
// /**It will add each number of the array depeding if an initial value has been declared starting from the last value.
//  * 
//  * @param {array} array array to iterate
//  * @param {function} callback function to call
//  * @param {number} initial number to initialize
//  */

// Hooray.prototype.reduceright = function(array, callback, initial) {
//     if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
//     if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
//     if (isNaN(initial) && initial !== undefined ) throw TypeError(initial + ' is not a starting value');

//     var i, acc = [], initial, newArray = [];
  
//       if (initial === undefined){
//         acc[0] = array[array.length -1];
//         for (i = array.length -2; i >= 0; i--){
//           acc[0] = callback(acc[0], array[i]);
//         }
//       } else {
//         acc[0] = initial;
//         for (i = array.length -1; i >= 0; i--){
//           acc[0] = callback(acc[0], array[i]);
//         }
//       }
//       newArray[0] = acc[0];
//       return newArray
//   };

//REVERSE
/**
 * This will reverse the elemets of a given array
 * 
 * @param {array} array array to iterate
 */

Hooray.prototype.reverse = function(){

	var i, newhorray = new Hooray(), j = 0;
	
	newhorray.length = this.length;

    for (i = this.length -1; i >= 0; i--){
        newhorray[j] = this[i];
        j++;
    }

    for (i = this.length -1; i >= 0; i--){
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

Hooray.prototype.shift = function(){

	var i, newHooray = new Hooray(), copy= new Hooray();
	
	newHooray[0] = this[0];

    for (var i = 1; i < this.length -1; i++) {
		copy[copy.length] = this[i];
    }

    for (var i = 0; i < copy.length; i++) {
        this[i] = copy[i];
	}
	
	this.length = copy.length;

    return newHooray[0];
};

//SLICE
/**
 * It will create a new array after eliminating the choosed index of the original array-
 * @param {number} from from (or whichone if this argument is given) where to cut
 * @param {number} to up to where to cut from from
 */

Hooray.prototype.slice = function(from, to){
    if (isNaN(from)) throw TypeError(from + ' is not a valid array index value');
    if (isNaN(to) && to !== undefined) throw TypeError(firstposition + ' is not a valid array index value');
    
	var i, newHooray = new Hooray(), k = 0;
	
	newHooray.length = this.length +1 - (to + from);  
	
    if (from !== undefined){
        if(to !== undefined && to >= from && to < this.length){
            for (i = from; i <= to; i++){
                newHooray[k] = this[i];
                k++;
            }
            return newHooray;
        } else {
            for (i = from; i < this.length; i++){
                this[k] = this[i];
                k++;
			}
            return newHooray
        }
    } else {
        console.log("At least you need to introduce from where")
    }
};

//SOME
/**
 * The some() method tests whether at least one element in the array passes the test implemented by the provided function.
 * @param {function} callback function to proces the array
 */

Hooray.prototype.some = function(callback){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
    var i;

    for (i = 0; i < this.length; i++){
        if(callback(this[i]) === true) {
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
Hooray.prototype.sort = function() {
	var i,j,k,z;
    
    for (i = 0; i < this.length; i++){
        for (j = 0; j < this.length -i; j++){
            k = this[j];
            z = this[j+1];
            if (k > z){
                this[j] = z;
                this[j+1] = k;
            }
        }
    }
    return this;
};

// //SPLICE
// /**
//  * The function changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
//  * 
//  * @param {array} array 
//  * @param {number} origin 
//  * @param {number} erase 
//  * @param {*} add 
//  */

// Hooray.prototype.splice = function (array, start, todelete, item) {
//     if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
//     if (isNaN(start) && start === undefined ) throw TypeError(start + ' is not a starting value');
//     if (todelete > (array.length - start) || todelete === undefined) { todelete = array.length - start };

//     var items = [], initial = [], end = [], items = [], tempArr = [], i, k = 0;

//     //add the items for the arguments in items array;
//     if (arguments.length > 3) {
//         for (var i = 3; i < arguments.length; i++) {
//             items[items.length] = arguments[i];
//         }
//     }

//     //Start of the new
//     for (i = 0; i < start; i++) {
//         initial[i] = array[i]
//     };

//     //end of the new
//     for (i = (start + todelete); i < array.length; i++) {
//         end[k] = array[i]
//         k++;
//     };


//     //Put all argumnets into an array 
//     for (i = 0; i < initial.length; i++) {
//         tempArr[tempArr.length] = initial[i];
//     }
//     for (i = 0; i < items.length; i++) {
//         tempArr[tempArr.length] = items[i];
//     }
//     for (i = 0; i < end.length; i++) {
//         tempArr[tempArr.length] = end[i];
//     }

//     array.length = tempArr.length;

//     for (i = 0; i < tempArr.length; i++) {
//         array[i] = tempArr[i];
//     }

//     return array;
// };

  
  