


function join(arr,separator) {

    if (!(arr instanceof Array)) { throw new TypeError(arr + ' is not an array'); }

    if(!( typeof separator == 'string')){separator = ","}    
    
    

    var joined = "";

    

    for(i=0;i<arr.length;i++){

        joined = joined + arr[i]
        
        if(i<arr.length-1){
        joined+=separator;
        }

    }

    

    joined = joined.toString();
    
    return joined;
}




