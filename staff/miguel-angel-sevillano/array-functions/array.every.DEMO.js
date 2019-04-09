var a=[1,2,3,4,5]


function every(array,callback){
    for(let i=0;i<array.length;i++){
        if(!callback(array[i])) return false;
        return true;
    }
}
var newA = every(a, function(v) { return v > 0; })