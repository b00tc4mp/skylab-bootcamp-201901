/**
 * Abstraction of fill.
 * 
 * 
 * @param {Word} - word to find
 * @param {Array} array
 * 
 * @throws {TypeError} - If array is not an array
 */
var arr = ["1","2","3","4","5"];

function buscar(array, word){    
for(var i = 1; i < array.length+1;i++){
    if (!(array instanceof Array))
    throw new TypeError(ele + ' is not an array');

        if(array[i] === word){
            
        console.log(word + ' is element num ' + (i+1) + ' at the array.')
        }
    }
};

buscar(arr, "4")

