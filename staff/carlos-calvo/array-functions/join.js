/**
 * 
 * @param {*} array 
 * 
 * Returns a string that concatenates the content of array
 */

function join(array){

    if(!(array instanceof Array)) throw new Error('Argument not an array')
    var result = ''

    for(var i = 0; i < array.length; i++){
        if(i !== array.length-1){
            result = result.concat(array[i].toString(), ',')
        } else {
            result = result.concat(array[i].toString())
        }
    }
    console.log(result)
    return result
}

join([1,2,3,4])