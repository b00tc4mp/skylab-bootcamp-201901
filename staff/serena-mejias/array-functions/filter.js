var words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

function filter(array, method) {
    var newArray = [];
    var index = 0;
    for(var i = 0; i<array.length; i++){
        if(method(array[i])){
            newArray[index] = array[i];
            index++
        }
    }
    return newArray;
}

console.log(filter(words, function(value){return value.length > 6}))