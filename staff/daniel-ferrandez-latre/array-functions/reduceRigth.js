/**
 * Convine all element into an array depending the instruction is passad by
 * 
 * @param {Array} array The array to iterate.
 * 
 * @param {Function} callback The expression to evalute.
 * 

 */
function reduceRigth(array, callback) {
    var aCC = 0;
    var auxAcc = 0;
    if(array !== null && array !== undefined) {
        aCC = array[array.length - 1];
        for(var i = array.length-2; i >-1; i--) {
            aCC = callback(aCC, array[i]);
        }
        return aCC;
    }
    return aCC;
}
   /** TODO Object reducing functionality **/
