function pop(arr){

    if(!(arr instanceof Array)) throw TypeError('arr should be an Array');

    if(arr.length == 0){
        return undefined;
    }

    var value=arr[arr.length-1] ;
    arr.length=arr.length-1;
    return value;
    
}