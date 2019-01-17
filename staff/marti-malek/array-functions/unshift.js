/**
 * Abstraction of unshift.
 * 
 * Puts the desired elements at the beginning of the array.
 * 
 * @returns {number} - The length of the array
 * 
 * @throws {TypeError} - If the first argument is not an array
 * 
 */
function unshift() {

    if (!(arguments[0] instanceof Array)) throw TypeError (arguments[0] + 'should be an array');
    
    var arr = arguments[0];
    var res = Object.assign([], arr);
    var elem = [];
    var j = 0;
    var m = 0;

    for (var i = 1; i < arguments.length; i++) {
        elem[j] = arguments[i];
        j++;
    };
    for (var k = 0; k < res.length+elem.length; k++) {
        if (k < elem.length) {
            arr[k] = elem[k];
            arr.length = elem.length;
        } else {
            arr[k] = res[m];
            m++;
        }
    }
    return arr.length;
};

var a = [1,2,3,4];

unshift(a,0,1,2,3);