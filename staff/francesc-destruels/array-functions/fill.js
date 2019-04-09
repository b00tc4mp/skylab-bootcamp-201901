
/**Given an array and a filling it will fill all he values in the array with it, if an inicial index is given it will fill it from there, it a last index is also given it whil do it from the initial to the final.
 * 
 * @param {array} arraytofill The array to iterate
 * @param {number} filling The number to fill the array
 * @param {number} firstposition the first index to be filled
 * @param {number} lastposition  the last index to be filled
 */

var fill = (function(arraytofill, filling, firstposition, lastposition) {
    "use strict";
    if (!(arraytofill instanceof Array)) throw TypeError(array + ' is not an array');
    if (isNaN(filling)) throw TypeError(firstposition + ' is not a valid array index value');
    if (firstposition < 0) throw TypeError(firstposition + ' is not a valid array index value');
    if (lastposition === 0 || lastposition > arraytofill.length -1) throw TypeError(lastposition + ' is not a valid array last index value');
    
    var i = 0, j, newarray = [];

    if (firstposition !== undefined  && firstposition >= 0) {
        if (lastposition !== undefined && lastposition >= lastposition && lastposition <= arraytofill.length -1){
            for (j = 0; j < arraytofill.length; j++){
               if (i < firstposition || i > lastposition) {
                   newarray[i] = arraytofill[i];
                   i++
               }else {
                   newarray[i] = filling;
                   i++
               }
             }   
            return newarray;
        } else {
            for (j = 0; j < arraytofill.length; j++){
                if (i < firstposition) {
                    newarray[i] = arraytofill[i];
                    i++
                }else {
                    newarray[i] = filling;
                    i++
                }
              }  
            return newarray;
        }
    } else {
        for (i = 0; i < arraytofill.length; i++){
        newarray[i] = filling;
        }
    }
    return newarray;
});