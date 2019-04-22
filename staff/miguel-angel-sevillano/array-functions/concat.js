
/**
 *This function merge two or more arrays and returns a new aarray
 *@returns Array with values of merged arrays
 *
 */
function concat()  {
    if(arguments.length == 0)throw TypeError('undefined');
    if(!(arguments[0] instanceof Array))throw TypeError('not an array');
    
    
    var i, j, k = 0, newarray = [];
 
    for (i = 0; i < arguments.length; i++){
        for (j = 0; j < arguments[i].length; j++){
            newarray[k] = arguments[i][j];
            k++;
        }
    }
    return newarray;
 }
 
