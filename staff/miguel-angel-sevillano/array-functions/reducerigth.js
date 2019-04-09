/**This function do the same as reduce but it starts from the end of the array
 * 
 * @param {*} array The array you want to pass by
 * @param {*} callback the function that defines what you want to do with each element of the array
 * @param {*} item Optional , the argument you want to pass for  every item of the array
 */


function reduceRigth(array,callback,item){
    var i,acc,newArray =[]
    

    if(item === undefined){
        acc = array[0]

        for(i=array.length-1;i>0;i--){
            acc = callback(acc,array[i])
        }
        
        newArray = acc;
        return newArray;
    }
    else{
        acc=item
        for(i=array.length-1;i>0;i--){
            acc = callback(acc,array[i])
        }
        
        newArray = acc;
        return newArray;
    }
}

