/**This function executes a reducer function (that you provide) on each member of the array resulting in a single output value.
 * 
 * @param {*} array the array you want to iterate for
 * @param {*} callback the function that defines what you want to do with each element of the array
 * @param {*} item Optional , the argument you want to pass for  every item of the array
 */


function reduce(array,callback,item){
    var i,acc,newArray =[];


    if(item== undefined){
        acc = array[0]

        for(i=1;i<array.length;i++){
            acc = callback(acc,array[i])
        }
        
        newArray = acc;
        return newArray;
    }
    else{
        acc=item
        for(i=0;i<array.length;i++){
            acc = callback(acc,array[i])
        }
        
        newArray = acc;
        return newArray;
    }
}

