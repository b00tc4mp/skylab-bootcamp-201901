/**
 * Abstraction of Unshift
 * 
 * This method adds one or more items in the begggining of an array
 * and returns the length of the new array
 * 
 * @param {Array} arr - Array to add the items
 */

function unshift(arr){

    if(!(arr instanceof Array)) throw TypeError(arr+' should be an Array')

    items=[];
    items.length=arguments.length-1;
    
    var copy=Object.assign([],arr);
    countCopy=0;

    for (var i=0; i<items.length; i++){
        items[i]=arguments[i+1]
    }

    arr.length += items.length;

    for (var i=0; i<items.length; i++){
        arr[i]=items[i];
    }
    
    for( var i=items.length; i<arr.length; i++){
        arr[i]=copy[countCopy];
        countCopy++
    }

    return arr.length

}