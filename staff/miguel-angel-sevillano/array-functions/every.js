
var a=[1,2,3,4,5]

function lower(currentValue) {
    return currentValue < 40;
  }

function every(array,callback){
    for(let i=0;i<array.length;i++){
        if(!callback(array[i])) return false;
        return true
    }
}
every(a)