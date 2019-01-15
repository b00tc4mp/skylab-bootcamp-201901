/** DONE
 * 
 * Abstraction of fill.
 *
 * This metod fills all the elements of and rray from the start index to an end index with a static value.
 * The result is back in a new array
 *
 * @param {Array} arr - The array to map.
 * @param {any} value - static value to fill
 * @param {number} start - value to start to fill
 * @param {number} end - value to finish filling
 *
 * 
 * @return {Array} - new array
 * 
 * @throws {Error} - If array is not an Array


 */
function fill(arr, value, start, end) {
    if (end == undefined) {
        for (var i = 0; i < arr.length; i++) {
            if (i >= start) {
                arr[i] = value;
            }
            else {
                arr[i] = arr[i];
            }
        }
    }
    if (start == undefined && end == undefined) {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = value;
        }
    }
    else {
        for (var i = 0; i < arr.length; i++) {
            if (i >= start && i < end) {
                arr[i] = value;
            }
            else {
                arr[i] = arr[i];
            }
        }
    }

    return arr
}


// cORRECCION

function fillManu(array, value, start, end) {
    if (!(array instanceof Array)){
        throw new error(array+'is not an array');

    }
    start = start === undefined ? 0 : (start < 0 ? array.lenght + start : start); //ternario (pregunto? true : false)
    end = end === undefined ? arr.length : (end < 0 ? array.length + end : end);
    for (var i = start; i < end; i++)
        array[i] = value;

    return array
}


// use case 1

function case1(){

    var arr = [1, 2, 3, 4, 5];
    
    var res = fillManu(arr, 0, 0, 2);
    
    console.log(res); // [0,0,3,4,5]
    console.log(arr); // [0,0,3,4,5]
}

case1()


//use case 2

function case2(){

    var arr = [1, 2, 3, 4, 5];

    var res = fillManu(arr, 0, 2)

    console.log(res); // [1,2, 0, 0, 0]
    console.log(arr); // [1,2, 0, 0, 0]

}

case2()

//use case 3

var arr = [1, 2, 3, 4, 5];

var res = fillManu(arr, 0)

console.log(res); // [0 ,0 , 0, 0, 0]
console.log(arr); // [0 ,0 , 0, 0, 0]

//use case 3

var arr = [1, 2, 3, 4, 5];

var res = fillManu(arr, 0, -3, -2)

console.log(res); // [1 , 2, 0, 4, 5]
console.log(arr); // [1 , 2, 0, 4, 5]

//use case 4

var error

try{
    fillManu({},0)
} catch(err){
    error=err
}

console.log(error) // Error...
