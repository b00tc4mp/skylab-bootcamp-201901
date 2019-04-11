/**
 * Returns a copy of a part of the array within a new array 
 * @param {Array} array Array to copy 
 * @param {Number} index initial position since start the copy
 * @param {Number} end end position to copy
 * 
 * @returns {Array} the new array form the origin one
 */
function slice(array, index, end){
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if(index>array.length-1){ return []}
    if (index===undefined){
        index=0;
    }
    if (end===undefined){
       end=array.length;
   }
    for(i=0;i<end;i++){
            if(i===index){
                var new_arr=[];
                count=0;
                for(j=i;j<end;j++){
                    new_arr[count]=array[j];
                    count++;
                }
                return new_arr;
            }
        }

}

