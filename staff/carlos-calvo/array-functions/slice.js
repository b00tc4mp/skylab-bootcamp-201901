/**
 * 
 * @param {Array} array 
 * @param {Number} start 
 * @param {Number} end 
 */

function slice(array, start, end){
    if(!(array instanceof Array)) throw new Error('Not an array!')
    if(arguments.length==1) {
        start = 0
        end = array.length
    }
    if(isNaN(start)) throw new Error('1st parameter not a number')
    if(arguments.length == 2) end = array.length
    if(isNaN(end)) throw new Error('2nd parameter not a number')
    //Si estan intercanviats
    if(start < 0) start = array.length + start
    if(end < 0) end = array.length + end
    if(end >array.length) end = array.length
    //Si estàn creuats, els intercanviem
    if(end < start){
        var x = end
        end = start
        start = x
    }
    var arrayreturn = []
    var j = 0;
    for (var i = start; i < end; i++){
        arrayreturn[j] = array[i]
        j++
    }
    return arrayreturn
}