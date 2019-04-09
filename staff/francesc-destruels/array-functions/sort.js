
/**
 * The sort() method sorts the elements of an array in place and returns the array
 * 
 * @param {array} Array to iterate.
 * 
 */

function sort (array) {
    var i,j, emptyarray = [], k = 0, q = 0, z, repeated = false;

    emptyarray.length = array.length;

    for (i = emptyarray.length -1; i >= 0; i--){
        emptyarray[i] = undefined;
    }
    
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array.length; j++) {
            if (array[i] >= array[j] && repeated === false){
                k++;
                repeated = true;
            } else if (array[i] >= array[j] && repeated === true){
                q++;
            }
        }

        if (emptyarray[k -1] === undefined && q === 0){
            emptyarray[k -1] = array[i];
        } else {
            for (z = (k -1) + q; z <= q; z++){
                if (emptyarray[k-1+z] === undefined){
                    emptyarray[k-1+z] = array[i];
                }
            }
        }    

        k = 0;
        repeated = false;
    }

    for (i = 0; i < array.length; i++){
        array[i] = emptyarray[i];
    }

    return array;
}
