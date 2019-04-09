/**
 * determines if and array contains the value determined. Return true if the value is contained or false if not
 * 
 * @param {Array} array 
 * @param {any} value 
 */

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
function Includes(array, value){
    for(var i = 0; i < array.length; i++)  if(array[i] === value) return true;
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
function Includes(array, value, index){
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if((typeof index !== 'number')&&(index !== undefined)) throw TypeError(index + ' is not a number');

    var i = (index === undefined) ? 0 : index;
    for( i; i < array.length; i++)  if(array[i] === value) return true;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> develop
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

    return false;
}