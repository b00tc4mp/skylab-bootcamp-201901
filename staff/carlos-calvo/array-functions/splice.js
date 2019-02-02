/**
 * 
 * @param {*} array 
 * @param {*} start 
 * @param {*} end 
 * @param {*} element 
 */

function splice(array, start, end, element){
    if(!array instanceof Array) throw new Error('Not an array')
    if(isNaN(start)) throw new Error('Not a number 1st')
    if(isNaN(end)) throw new Error('Not a number 2nd')
        

    if(arguments.length > 3){
        var element = []
        for(var i = 3; i < arguments.length; i++){
            element[i-3] = arguments[i]
        }
    }

    if(start < 0) start = array.length - start
    if(end < 0) end = array.length - end
    if(start > end){
        var x = start
        start = end
        end = x
    }
    if(arguments.length == 2){ //Removes 
        array.length = array.length - (array.length - start)
    }
    if(arguments.length == 3){ //Remove end items starting from start
        for(var i = start; i < start + end; i++){
            
        }
    }

}