function join (element, array) {
    var result = '';
    for (let i=0; i<array.length; i++) {
        result += array[i]
        if (i == array.length-1) {
            return result
        }
        result += element
    }
    return result
};

var element = '-'
var array = ['alex', 'marti']
join(element, array);