
/**
 * This function will take as many arrays as arguments as wished and it will write a new one with all the items in order of introduction.
 * 
 * @param {arguments} array all the arrays to iterate.
 * 
 */

var concat = (function ()  {
    "use strict";
    if (arguments.length <= 1) throw TypeError("introduce at least 2 argument");
    
    var i, j, newarray = [];

    for (i = 0; i < arguments.length; i++){
        for (j = 0; j < arguments[i].length; j++){
            newarray[newarray.length] = arguments[i][j];
        }
    }

    return newarray
});