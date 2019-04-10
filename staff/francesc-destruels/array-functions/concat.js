
/**
 * This function will take as many arrays as arguments as wished and it will write a new one with all the items in order of introduction.
 * 
 *@param {arguments} array all the arrays to iterate.
 */

var concat = (function ()  {
    "use strict";
    if (arguments.length = 0) throw TypeError("introduce at least 1 argument");
    
    var i, j, k = 0, newarray = [];

    for (i = 0; i < arguments.length; i++){
        for (j = 0; j < arguments[i].length; j++){
            newarray[k] = arguments[i][j];
            k++;
        }
    }
    return newarray;
});