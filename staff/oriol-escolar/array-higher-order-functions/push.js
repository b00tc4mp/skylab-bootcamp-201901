
function push(array,value){

if(!(array instanceof Array)) throw TypeError (array + ' is not an array ')
if(value === undefined) return array.length;

array[array.length] = value;

return array.length


}


var arr = [1,2,3];

push(arr);