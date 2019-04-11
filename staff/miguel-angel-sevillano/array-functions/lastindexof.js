'use strict'
/**this function returns the last index where the item passed by is
 * 
 * @param {array} array The array you want to iterate
 * @param {*} item The item you want to know the idex
 * 
 */





function lastindex(array,item,index){
    if(!(array instanceof Array)) throw TypeError('its not an array');
    if(typeof item !== 'number') throw new TypeError ('its not a number');
    
    var temp=undefined
    
    if(index === undefined){
        for(var i=0;i<array.length-1;i++){
            if(array[i] == item){
                temp = i
            }
        }
        if(temp !== undefined){
            return temp
        }
        else{
            return false
        }
    }
    else{
        for(var j=index;j<array.length;j++){
            if(array[j] == item){
                temp = j;
            }
        
        }
        if(temp !== undefined){
            return temp
        }
        else{
            return false
        }
    }



}

