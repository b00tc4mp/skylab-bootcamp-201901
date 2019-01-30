function filter(array,callback) {

    if(!(array instanceof Array)){throw TypeError (array + ' should be an array')}
    if(!(callback instanceof Function)){throw TypeError (callback + ' should be an array')}


    var res = [];

    for(i=0;i<array.length;i++)
    {
        
        if(callback(array[i]))
        {
            
            res[res.length] = array[i];
        }


    }

    return res;
}


