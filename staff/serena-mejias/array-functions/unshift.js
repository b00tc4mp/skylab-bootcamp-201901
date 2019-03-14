var array1 = [1, 2, 3];

function unshift(array) {

    var temp = [];
    for(var i = 0; i<arguments.length-1; i++) {
        temp[i] = arguments[i+1];

    }

    for(var j = 0; j<array.length; j++) {
        temp[temp.length] = array[j];
    }

    for (let k = 0; k < temp.length; k++) {
        array[k] = temp[k];
    }

    return array.length;
}


console.log(unshift(array1,4,5));
console.log(array1);

