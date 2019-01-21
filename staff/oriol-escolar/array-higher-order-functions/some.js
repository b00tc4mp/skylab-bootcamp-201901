function some(array,callback) {

    for(i=0;i<array.length;i++)
    {

        if(callback(array[i]))
        {
            
            return true;
        }


    }

    return false;
}


var arr = [1, 2, 3, 4, 5];

some(arr,function(item){

return item %2 ===0;


});