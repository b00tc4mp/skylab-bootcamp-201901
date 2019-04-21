/**
 * puts element into the array given at the start position deleting the end number of positions starting by the start position
 *
 * @param {array} array
 * @param {number} start
 * @param {number} end
 * @param {any} elements
 */
function splice(array, start, end, ...elements){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if ((typeof start !=='number') && (start !== undefined)) throw new TypeError(start + ' is not a number');
    if ((typeof end !=='number') && (end !== undefined)) throw new TypeError(end + ' is not a number');
    var startArr = [];
    var newArgsArr = [];
    var endArr = [];
    var returnArr = [];
    var i = 0;

    if ((start == undefined) || (start > array.length) || (arguments.length ==3) && (end == 0)){
        return returnArr;
    }

    if(start < 0) {
        start = array.length + start;
    }
    if(!end || end >= array.length - start) {
        end = array.length;
    }
    if(end < 0) end = start;

    for(i = 0; i < start; i++) {
        startArr[startArr.length] = array[i];
    }

    for(i = start; i < end; i++) {
        returnArr[returnArr.length] = array[i];
    }

    for(i = end; i < array.length; i++) {
        endArr[endArr.length] = array[i];
    }

    if(arguments.length > 3) {
        for(i = 3; i < arguments.length; i++) {
            newArgsArr[newArgsArr.length] = arguments[i];
        };
    }
    array.length = 0;
    for ( i = 0; i < startArr.length; i++){
        array[array.length] = startArr[i];
    }
    for(i = 0; i < newArgsArr.length; i++){
        array[array.length] = newArgsArr[i];
    }
    for(i = 0; i < endArr.length; i++){
        array[array.length] = endArr[i];
    }
    return returnArr;
}