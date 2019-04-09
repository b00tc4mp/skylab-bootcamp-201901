/**
 * search for an element and gives you the index, if nor -1 will be given
 * 
 * @param {Array} array The array to be fitted
 * @param {string} separate (OPTIONAL)string separator to be use between array elements in the string
 * 
 * @return {string} your array fitted in a string
 */
function join(array,separate){
    var separator
    (separate==='undefined' || separate===null)? separator=',': separator=separate
    var string='';
    for (var i = 0; i < array.length; i++){
        string+=array[i]
        if(i+1<array.length) string+=separator
    }
    return string;
}