/**
 * Abstraction of fill.
 * 
 * 
 * 
 * @param {Array} arr
 * 
 * @throws {TypeError} - If array is not an array
 */
var arr = ["1", "2", "3", "4", "5"];
var res = []

function somier(array, question) {
    if (!(ele instanceof Array))
        throw new TypeError(array + ' is not an array');

    for (var i = 0; i < array.length+1; i++) {
        if(array[i] >= question){
            return 'true';
        };
    };
};

somier(arr)
console.log(res)
