function indexOf (element, array) {
    for(var i=0; i<array.length; i++) {
        if (array[i] === element){
            return i
        }
    }
};

var element = 'marti'
var array = ['marti', 'alex', 'carlos']

indexOf(element, array);