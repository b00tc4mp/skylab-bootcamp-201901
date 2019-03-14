var array = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']

if(typeof arguments !== 'array'){'the arguments must be an array'}

function pop(array){
    var value = array[array.length-1];
    array = delete array[array.length-1];
    console.log(array);
    
    return value;
}

pop(array);