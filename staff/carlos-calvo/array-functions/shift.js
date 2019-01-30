/*var a = {"a" : 10};
var b = {};
Object.assign(b,a);*/
/**
 * 
 * @param {Array} arr 
 */

function shift(arr){

    if(arguments.length !== 1) throw new Error('Too Many or less arguments') //Check de longitud de args
    if(!(arr instanceof Array)) throw new Error('Not an array') //Check que es un array
    
    var b = []
    if(arr.length == 1){
        throw new Error('Array of only one item!')

    } else {
        i = 1
        while (i < arr.length){
            b[i-1] = arr[i]
            i++
        }        
        return b
    }
}