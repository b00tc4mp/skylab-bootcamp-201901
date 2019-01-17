function slice(array,begin,end){

if(!(array instanceof Array)) throw TypeError (array + ' is not an array')
begin =  typeof begin === 'number' ? (begin >= 0 ? (begin > array.length? 0: begin): arr.length+begin):0 
end =  typeof end === 'number' ? (end>=0 ? (end>array.length?array.length:end ): array.length+end ): array.length;

var sliced = [];

for(i=begin;i<end;i++){

    if(sliced.length == 0)
    {
        sliced[0]= array[i];
    }else{
        sliced[sliced.length] = array[i]
    }
}

return sliced;

}


