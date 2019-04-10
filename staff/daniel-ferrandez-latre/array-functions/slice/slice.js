/**
 * Return a new array mapped by callback fuction instuctions
 * 
 * @param {Array} array Takes of the first position of the array and rearrenge it into current state
 * 
 *  @param {Number} indexStart Takes of the first position of the array and rearrenge it into current state
 * 
 *  @param {Number} indexEnd Takes of the first position of the array and rearrenge it into current state
 * 
 */
function slice(array, indexStart, indexEnd) {
    var arraySlicedEnd = [];
    var arraySlicedStart = [];
    for(var i in array) {
        arraySlicedEnd[arraySlicedEnd.length] = array[i];
    }
    if(indexStart > array.length) return [];

    if(typeof indexStart !== 'undefined') {
        if(indexStart < 0) {
            arraySlicedEnd.length = (arraySlicedEnd - 1) - indexStart;
            return arraySlicedEnd; 
        }
        if(indexStart >= 0) {
            for(var i = indexStart; i > array.length; i++) {
                arraySlicedStart[arraySlicedStart.length] = array[i];
            }
            return arraySlicedStart;
        }
    } 


}

