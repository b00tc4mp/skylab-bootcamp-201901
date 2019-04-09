
/**
 * iterates trough an array and compares each value of callback funtion to check if its true or false
 *
 *@param{array} this is de array to iterate
 *@param{function} callback the evaluation
 */


function every(array,callback){
    for(let i=0;i<array.length;i++){
        if(!callback(array[i])) return false;
        return true;
    }
}
