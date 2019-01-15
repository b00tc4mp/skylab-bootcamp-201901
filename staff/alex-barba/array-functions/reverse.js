function reverse (array) {
    var duplicate = array;
    array.length = 0;

    for (let i = duplicate.length-1; i > 0; i--){
       array += duplicate[i];
    }
    return array
};

var array = ['alex', 'marti', 'carlos'];

reverse(array);
