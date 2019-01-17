/**
 * Abstraction of Unshift
 * 
 * This method adds one or more items in the begggining of an array
 * and returns the length of the new array
 * 
 * @param {Array} array - Array to add the items
 * 
 * @throws {TypeError} - when array is not an Array
 * 
 * @return {number} - new length of the array
 */

function unshift(array){

    if(!(array instanceof Array)) throw TypeError(array+' should be an Array')

    items=[];
    items.length=arguments.length-1;
    
    var copy=Object.assign([],array);
    countCopy=0;

    for (var i=0; i<items.length; i++){
        items[i]=arguments[i+1]
    }

    array.length += items.length;

    for (var i=0; i<items.length; i++){
        array[i]=items[i];
    }
    
    for( var i=items.length; i<array.length; i++){
        array[i]=copy[countCopy];
        countCopy++
    }

    return array.length

}