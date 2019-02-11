var animals = ["ant", "bison", "camel", "duck", "elephant"];

function slice(array,start,end) {
    if(!(typeof array === 'array'),'first argument must be an Array');
    start === 'undefined'? 0 : start;
    end === 'undefined'? array.length : end;
    var newArray = [];
    var index = 0
    
for (var i = start; i<end; i++){
    newArray[index] = array[i];
    index++;
}
return newArray;
};

console.log(slice(animals,2,6));
