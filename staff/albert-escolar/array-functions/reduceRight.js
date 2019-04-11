
function reduce(array, callback, initialValue) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var valorAnterior = array[array.length-1];
    if (initialValue) {
        valorAnterior = initialValue;
        var a = array.length-1;
    }else{
        a = array.length-2;
    }
    for (var i = a; i > array.length; i--) {
        valorAnterior = callback(valorAnterior, array[i]);

    } return valorAnterior;
};