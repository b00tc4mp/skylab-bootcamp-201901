/**
 * Modifies the array content deleting the element of the index
 * @param {Element} index 
 * @param {Array} arr 
 */
    function splice(index,arr){
        if(!(array instanceof Array)) throw TypeError(array + ' is not an array')
        for(i=0;i<arr.length-1;i++)
            if(i==index-1){
                for(j=i;j<arr.length-1;j++)
                    arr[j]=arr[j+1]
            }
            new_arr=[];
            for(i=0;i<arr.length-1;i++)
                new_arr[i]=arr[i]
        return new_arr;
    }

