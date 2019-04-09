/**
 * 
 * @param {Array} arr 
 * @param {*} index 
 * @param {*} end 
 */
function slice(arr, index, end){
   if (end==undefined){
       end=arr.length;
   }
    for(i=0;i<end;i++)
            if(i==index){
                var new_arr=[];
                count=0;
                for(j=i;j<end;j++){
                    new_arr[count]=arr[j];
                    count++;
                }
                return new_arr;
            }
}

a=[1,2,3,4,5,6]
console.log(slice(a, 2, 4))