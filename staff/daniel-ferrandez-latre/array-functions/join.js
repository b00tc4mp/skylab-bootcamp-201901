/**
 * Join all element inside an array or and arraylike object together on a String
 * 
 * @param {Array} Array The array to iterate.
 * 
 * @returns {String} Concatenate by the string is passed by.
 */
function join(array, srtElement) {
    var strJoin = '';
    if(array instanceof Array) {
        if(srtElement instanceof String) {
            for(var i = 0; i < array.length; i++) {
                strJoin += array[i];
            }
        }
            for(var i = 0; i < array.length; i++) {
                strJoin += array[i] + srtElement;
        }
        return strJoin;
    } else {
        return [];
    }
    
}