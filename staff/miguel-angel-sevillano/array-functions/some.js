var test=[3,4,5,6]

function some(array,callback,item){

    acc=item

    for(var i=0;i<array.length;i++){
         var value=callback(acc,array[i])
    }
    return value;
}

some(test,function(acc,array){return acc<array})