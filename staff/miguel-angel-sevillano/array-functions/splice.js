'use strict'
/**
 * thisfunction changes the contents of an array by removing or replacing existing elements and/or adding new elements
 * @param {array} array The array to iterate
 * @param {number} index the index position where start
 * @param {} remove the amount of item you want  to eliminate
 * @param {} add the item you want to add
 */




function splice(array,index,erase,add){

    if(!(array instanceof Array)) throw TypeError('is not an array');
    if(typeof index !== 'number') throw new TypeError ('is not a number');

    var n = 0;
    var token =0;
    var newarr=[];
    for(let i=0;i<array.length;i++){
        if(i == index){
           
            if(erase>0){
                erase--
            }
            if(add != undefined){
               
                newarr[n] = add
                n++
                newarr[n] = array[i]
                add = undefined
                token =3
            }
        }
        else if(token == 1){ 
            newarr[n] = array[i];
        }
        else if(token == 0){
            newarr[n] = array[i];
            n++
            
        }
        else if(token == 3){
            n++
            newarr[n] = array[i];
            
        }      
    
    }
    array = newarr;
    return array;
}



