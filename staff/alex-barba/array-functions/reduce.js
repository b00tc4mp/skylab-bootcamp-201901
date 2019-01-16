/**
 * Abstraction of reduce.
 * 
 * executes a reducer function (that you provide) on each member of the array resulting in a single output value.
 * 
 */

 function reduce(callback) {
     var res = 0;

        callback (initial, currentValue, currentIndex, array); {
            res = initial;
            for (let i = 0; i < array-length; i++) {
                res = Number(res) + Number(array[i]);
            }
        }
     return res;

 };

const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

reduce(array1, reducer);