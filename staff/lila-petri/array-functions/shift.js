/**
 * Retunr the first element of the array and move the rest of the elements on the array to the correct position
 * @param {*} arr 
 */

function shift(arr){
    var element;
    for(i=0;i<arr.length-1;i++)
            if(i==0){
                element=arr[i]
                for(j=i;j<arr.length-1;j++)
                    arr[j]=arr[j+1] 
            }
            new_arr=[];
            for(i=0;i<arr.length-1;i++)
                new_arr[i]=arr[i]
        arr=new_arr
        console.log(arr)
    return element;
}



