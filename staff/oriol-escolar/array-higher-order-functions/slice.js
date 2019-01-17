function slice(array,begin,end){

if(!(array instanceof Array)) throw TypeError (array + ' is not an array')
begin =  typeof begin === Number ? (begin >= 0 ? begin:arr.length+begin):0 
end =  typeof end === Number ? (end >= 0 ? end-1:arr.length+end):arr.length

var sliced = [];

for(i=begin;i<end;i++){

    sliced[i]=array[i];
}

return sliced;

}


var arr =[1,2,3,4]

slice(arr);