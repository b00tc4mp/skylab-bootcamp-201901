/**
 * Abstraction of splice.
 * 
 * The splice() method changes the contents of an array by removing or replacing
 * existing elements and/or adding new elements.
 * 
 * @param {Array}  array - * array to slice
 * @param {Number} begin - * index from which you start deleting items
 *                          if bigger than array.length, then begin = 0
 *                          If negative, will begin that many elements
 *                          from the end of the array (with origin -1)
 * @param {Number} removeItems - (optional) number of items to delete. default = array.length - begin
 *                          if bigger than array.length - begin, then = array.length - begin
 *                          
 * @param {arguments} arguments - (optional) items to add to array
 *                          if no elements to add, splice will only remove elements
 * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {Array} array - An array containing the deleted elements. If only one element is removed,
 *                         an array of one element is returned. If no elements are removed,
 *                         an empty array is returned.
 * 
 */

function splice() {
    if (!(arguments[0] instanceof Array))
        throw new TypeError(arguments[0] + ' is not an array');
    if (isNaN(arguments[1]))
        throw new TypeError(arguments[1] + ' is not a number');
    if (arguments[2] === undefined)
        throw new Error('value expected, number of items to delete or items to add');
    
        console.log(arguments);
    
    arguments[1] = arguments[1] >= arguments.length ? 0 : (arguments[1] < 0 ? array.length + arguments[1] : arguments[1]);
        
    var arrayOriginal = arguments[0];
    var begin = arguments[1];
    var end = arguments.length;
    
    if (!isNaN(arguments[2])) {
        var removeItems = arguments[2];
        var firstItemIndex = 3;
        removeItems = removeItems > arrayOriginal.length-begin ? arrayOriginal.length-begin : removeItems;
    }
    [1,2,3,4,5]
    else {
        var firstItemIndex = 2;
        var removeItems;
    }
    console.log(array);  
    
    // -- DELETE -------------------------
debugger;
    if (removeItems) {
        for (var i = begin; i<end; i++) {
            arrayOriginal[i] = arrayOriginal[i+removeItems];
        }
        debugger;
        arrayOriginal.length = arrayOriginal.length-(removeItems);
        console.log(array);
    }
    

    // -- ADD ----------------------------

    var count=0;
    
    for (var i = firstItemIndex; i<end; i++) {
        for (var j = arrayOriginal.length; j>=i; j--) {
            arrayOriginal[j]=arrayOriginal[j-1];
        }
        arrayOriginal[begin+count]=arguments[i];
        count++;
    }
    return arguments[2];
}

var array = [1,2,3, 'pizza', 'morcilla'];
res = splice(array, 2,2, "optimus", "prime", "walpurgis", "yoyooyoyo");
console.log(array); 
console.log(res);