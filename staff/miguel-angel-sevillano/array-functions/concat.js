
/**
 *This function merge two or more arrays and returns a new aarray
 *@returns array 
 *
 */

function concat ()  {
    var i, j, k = 0, newarray = [];
 
    for (i = 0; i < arguments.length; i++){
        for (j = 0; j < arguments[i].length; j++){
            newarray[k] = arguments[i][j];
            k++;
        }
    }
    return newarray;
 }