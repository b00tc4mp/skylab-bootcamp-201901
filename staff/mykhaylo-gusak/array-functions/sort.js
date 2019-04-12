/**
 * method sorts the elements of an array in place and returns the array. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.
 * 
 * 
 * @return The sorted array. Note that the array is sorted in place, and no copy is made.
 */

var numbers = [5, 3, 11, 1, 4, 2, 4];
var expected = [1, 11, 2, 3, 4, 5];

function sort(array, compareFunction) {

    var newArray = [];

    // if (typeof compareFunction === 'function') throw TypeError(compareFunction + ' is not a function.');


    for (var i = 0; i < array.length; i++) {

        for (var j = 0; j < array.length; j++) {

            if (j < array.length - 1) {

                if (array[i] > array[i + 1]) {

                    newArray[i] = array[i + 1]

                } else {

                    newArray[i] = array[i]

                }
            }
            array = newArray;
            newArray = [];
        }


    }

    compareFunction();

}

console.log(numbers); // [1,11,2,3,4,5];