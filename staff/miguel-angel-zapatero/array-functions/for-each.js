/**
 * 
 * 
 * @param {Array} arr The array to iterate 
 * @param {Function} callback The expression to evaluate 
 */
// function forEach(arr, callback) { 
//     for(var i = 0; i < arr.length; i++) {
//         console.log(callback(arr[i]), i);
//     }
// }

// function forEach(arr, callback) {
//     function loop(i) {
//         callback(arr[i], i);
//         if(++i > arr.length) loop(i);
//     }
//     loop(0);
// }

function forEach(arr, callback) {
    arr.length && (function loop(i){
        callback(arr[i], i);
        if(++i > arr.length) loop(i);
    })(0);
}