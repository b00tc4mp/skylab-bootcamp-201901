
/**this function iterates over an array , taking the arguments to compare a number from an index start and end position
 * 
 * @param {*} array the array you want to iterate
 * @param {*} item  the number you want to check if its inside the array
 * @param {*} start the index position you want to start
 * @param {*} end the index position you want to end
 */

function fill(array,item,start,end){
    

    if(typeof item === "number" && typeof start === "number" && typeof end === "number"){
        for(let i=start;i<end+1;i++){
            array[i]=item;
        }
    }

    if(typeof item === "number" && typeof start === "number" && end === undefined){
        for(let i=start;i<array.length;i++){
            array[i]=item;
        }
    }


    if(typeof item === "number" && start === undefined && end === undefined){
        for(let i=0;i<array.length;i++){
            array[i]=item;
        }
    }
   
}



