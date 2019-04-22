/**
 * returns an array composed by the value of the arguments you passed in the function
 * 
 * @param  {...any} manyArgs 
 */

function arrayOff(...manyArgs){
    var array = [];
    for(var i = 0; i < manyArgs.length; i++) array[i] = manyArgs[i];

    return array;
}