var animals = ['pigs', 'goats', 'sheep'];

function push(array,value){
    for(var i = 0; i<value.length; i++){
        array[array.length] = value;
    }
    return array.length;
}
push(animals,"cows","horse");